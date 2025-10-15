# ============================================================
# 🧠 GraphRAG local con ChromaDB + Ollama + Clustering
# Inspirado en Microsoft GraphRAG (2025)
# ============================================================

from langchain_ollama import OllamaLLM
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sklearn.cluster import AgglomerativeClustering
import networkx as nx
import numpy as np
import json, re, os
import time
# ============================================================
# 1️⃣ Cargar documento base
# ============================================================
start_time = time.time()
loader = TextLoader("Documentos_antiguos.txt", encoding="utf-8")
docs = loader.load()
end_time = time.time()
print("Tiempo de carga de datos:", (end_time - start_time)/60 if (end_time - start_time) > 60 else (end_time - start_time),"min" if (end_time - start_time) > 60 else "seg")
texto_completo = docs[0].page_content

# ============================================================
# 2️⃣ Inicializar modelo local (Ollama)
# ============================================================
llm = OllamaLLM(model="llama3:instruct")

# ============================================================
# 3️⃣ Extraer entidades y relaciones con LLM
# ============================================================
prompt_extract = f"""
Eres un extractor de conocimiento estructurado.
Extrae entidades y relaciones del siguiente texto en formato JSON puro.
Cada entrada debe tener: entidad1, relacion, entidad2.

Texto:
{texto_completo[:3500]}

Formato esperado:
[
  {{ "entidad1": "...", "relacion": "...", "entidad2": "..." }},
  ...
]
"""
start_time = time.time()
respuesta = llm.invoke(prompt_extract)
end_time = time.time()
print("Tiempo de respuesta de llm:", (end_time - start_time)/60 if (end_time - start_time) > 60 else (end_time - start_time),"min" if (end_time - start_time) > 60 else "seg")

json_match = re.search(r"\[.*\]", respuesta, re.DOTALL)
if json_match:
    relaciones_texto = json_match.group(0)
else:
    relaciones_texto = "[]"

try:
    relaciones = json.loads(relaciones_texto)
except Exception as e:
    print("⚠️ No se pudo interpretar la salida como JSON válido:", e)
    relaciones = []

# ============================================================
# 4️⃣ Construir el grafo de conocimiento
# ============================================================
start_time = time.time()
G = nx.Graph()
for r in relaciones:
    G.add_edge(r["entidad1"], r["entidad2"], relation=r.get("relacion", r.get("relación", "")))
end_time = time.time()
print("Tiempo de creacion del grafo:", (end_time - start_time)/60 if (end_time - start_time) > 60 else (end_time - start_time),"min" if (end_time - start_time) > 60 else "seg")
print(f"✅ Grafo inicial con {len(G.nodes)} entidades y {len(G.edges)} relaciones.")
print("\n📋 Entidades detectadas inicialmente:")
print(", ".join(G.nodes))

# ============================================================
# 5️⃣ Aplicar clustering para fusionar entidades similares
# ============================================================
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def aplicar_clustering(G, embeddings_model, threshold=0.7):
    nodos = list(G.nodes)
    if len(nodos) < 2:
        print("⚠️ Muy pocas entidades para aplicar clustering.")
        return G

    vectores = embeddings_model.embed_documents(nodos)
    X = np.array(vectores)

    clustering = AgglomerativeClustering(
        n_clusters=None,
        distance_threshold=1 - threshold,
        metric="cosine",
        linkage="average"
    )
    etiquetas = clustering.fit_predict(X)

    clusters = {}
    for i, etiqueta in enumerate(etiquetas):
        clusters.setdefault(etiqueta, []).append(nodos[i])

    print(f"\n🔍 Se identificaron {len(clusters)} grupos de entidades similares.")

    for cluster_nodos in clusters.values():
        if len(cluster_nodos) < 2:
            continue
        nodo_principal = cluster_nodos[0]
        for nodo_similar in cluster_nodos[1:]:
            for vecino, datos in list(G[nodo_similar].items()):
                G.add_edge(nodo_principal, vecino, **datos)
            G.remove_node(nodo_similar)

    print("✅ Clustering aplicado. Grafo fusionado.")
    return G
start_time = time.time()
G = aplicar_clustering(G, embeddings)
end_time = time.time()
print("Tiempo de aplicacion de clustering:", (end_time - start_time)/60 if (end_time - start_time) > 60 else (end_time - start_time),"min" if (end_time - start_time) > 60 else "seg")
print(f"\n📋 Entidades después del clustering:")
print(", ".join(G.nodes))
print(f"\n✅ Grafo final con {len(G.nodes)} entidades y {len(G.edges)} relaciones.")

# ============================================================
# 6️⃣ Crear índice vectorial (Chroma)
# ============================================================
splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=100)
fragmentos = splitter.split_text(texto_completo)

persist_dir = "./chroma_db"
os.makedirs(persist_dir, exist_ok=True)
start_time = time.time()
vectorstore = Chroma.from_texts(
    texts=fragmentos,
    embedding=embeddings,
    persist_directory=persist_dir
)
end_time = time.time()
print("Tiempo de creacion de indice vectorial:", (end_time - start_time)/60 if (end_time - start_time) > 60 else (end_time - start_time),"min" if (end_time - start_time) > 60 else "seg")
print("✅ ChromaDB inicializado y persistente en 'chroma_db/'.")

# ============================================================
# 7️⃣ Función de búsqueda híbrida (Graph + Text)
# ============================================================
def buscar_contexto(pregunta):
    entidades_encontradas = [n for n in G.nodes if n.lower() in pregunta.lower()]

    contexto_grafo = []
    for e in entidades_encontradas:
        for vecino in G[e]:
            relacion = G[e][vecino]["relation"]
            contexto_grafo.append(f"{e} —({relacion})→ {vecino}")
    contexto_grafo = "\n".join(contexto_grafo) if contexto_grafo else "Sin relaciones directas encontradas."

    resultados = vectorstore.similarity_search(pregunta, k=3)
    contexto_texto = "\n".join([r.page_content for r in resultados])

    return contexto_grafo, contexto_texto

# ============================================================
# 8️⃣ Generación de respuesta
# ============================================================
def responder(pregunta):
    contexto_grafo, contexto_texto = buscar_contexto(pregunta)
    prompt = f"""
            Eres un analista de información. Usa exclusivamente los datos provistos.
            No inventes hechos.

            📘 RELACIONES DEL GRAFO:
            {contexto_grafo}

            📄 FRAGMENTOS DE TEXTO:
            {contexto_texto}

            ❓ PREGUNTA:
            {pregunta}

            💬 RESPUESTA:
            """
    respuesta = llm.invoke(prompt)
    print("\n🧠 Respuesta:\n", respuesta)
    return respuesta
import time
# ============================================================
# 9️⃣ Interfaz en consola
# ============================================================
# print("\n💼 GraphRAG con Chroma + Clustering listo. Escribe 'salir' para terminar.\n")
# while True:
#     pregunta = input("🤔 Pregunta sobre el conocimiento: ")
#     if pregunta.lower() == "salir":
#         break
#     start_time = time.time()
#     responder(pregunta)
#     end_time = time.time()
#     print("Tiempo de respuesta:", (end_time - start_time)/60 if (end_time - start_time) > 60 else (end_time - start_time),"min" if (end_time - start_time) > 60 else "seg")
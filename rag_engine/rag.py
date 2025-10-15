from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA

# 1️⃣ Cargar el documento base
loader = TextLoader("Reglamento.txt", encoding="utf-8")
docs = loader.load()

# 2️⃣ Dividir en fragmentos (chunks)
splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
fragmentos = splitter.split_documents(docs)

# 3️⃣ Crear embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# 4️⃣ Crear el índice vectorial
vectorstore = Chroma.from_documents(fragmentos, embeddings)

# 5️⃣ Crear el modelo Ollama (usa gemma2, llama3 o mistral)
llm = OllamaLLM(model="llama3:instruct", temperature=0.3)

# 6️⃣ Crear el sistema RAG
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    chain_type="stuff",
)

print("💼 Sistema RAG listo. Escribe 'salir' para terminar.\n")

while True:
    pregunta = input("❓ Tu pregunta: ")
    if pregunta.lower() == "salir":
        break
    respuesta = qa_chain.invoke({"query": pregunta})
    print("🤖 Respuesta:", respuesta["result"], "\n")
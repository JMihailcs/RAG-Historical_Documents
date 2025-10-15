from fastapi import FastAPI, Body
import uvicorn
from graphrag import responder  # tu función responder(pregunta)

app = FastAPI()

@app.post("/rag")
def rag_endpoint(data: dict = Body(...)):
    pregunta = data.get("pregunta", "")
    respuesta = responder(pregunta)
    return {"respuesta": respuesta}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// ✅ Permitir peticiones desde tu frontend
app.use(cors({
  origin: "http://localhost:3000", // o "*" si quieres permitir todo
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { pregunta } = req.body;

  try {
    const respuesta = await fetch("http://192.168.31.80:5000/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta }),
    });

    const data = await respuesta.json();
    res.json(data);
  } catch (error) {
    console.error("Error al consultar el RAG:", error);
    res.status(500).json({ error: "Error en el servidor Express" });
  }
});

app.listen(4000, () => console.log("✅ Backend conectado en puerto 4000"));

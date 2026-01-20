import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.post("/api/query", async (req, res) => {
  const { pregunta } = req.body;

  if (!pregunta) {
    return res.status(400).json({ error: "Pregunta vacía" });
  }

  // Ajusta este path a tu proyecto GraphRAG
  const CONDA = "/opt/miniconda3/bin/conda";
  const GRAPH_RAG_PATH = "/home/mikhail/Laad/RAG/Microsoft_GraphRag_GPT-5-nano";

  const command = `
  cd ${GRAPH_RAG_PATH} &&
  ${CONDA} run -n IA graphrag query --method local -q "${pregunta.replace(/"/g, '\\"')}"
`;

  exec(`bash -lc ${command}`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
      console.error("Error GraphRAG:", error);
      return res.status(500).json({ error: "Error ejecutando GraphRAG" });
    }

    if (stderr) {
      console.warn("GraphRAG stderr:", stderr);
    }

    res.json({
      role: "assistant",
      content: stdout.trim(),
      sources: [], // luego puedes parsear fuentes si quieres
    });
  });
});

app.listen(4000, () => {
  console.log("✅ Backend GraphRAG escuchando en puerto 4000");
});

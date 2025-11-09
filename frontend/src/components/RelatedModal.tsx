"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PreviewModal from "./PreviewModal";

type Source = {
  title: string;
  url: string;
  snippet?: string;
  content?: string;
  highlight?: string;
};

export default function RelatedModal({
  sources,
  answer,
  question,
  onClose,
}: {
  sources: Source[];
  answer: string;
  question?: string;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<Source | null>(null);
  console.log("RelatedModal sources:", sources);

  return (
    <>
      {/* Fondo principal */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Contenedor del modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-[#121314]/95 border border-[#2d2e30] rounded-2xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto shadow-xl backdrop-blur-md"
        >
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#22d3ee]">
              🔗 Páginas relacionadas
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#22d3ee] text-xl transition"
            >
              ✕
            </button>
          </div>

          {/* Lista de fuentes */}
          <div className="space-y-3">
            {sources.map((src, i) => (
              <div
                key={i}
                className="bg-[#1e1f20]/80 p-4 rounded-xl border border-[#2d2e30] hover:border-[#14b8a6]/50 transition"
              >
                <h3 className="font-semibold text-[#14b8a6]">
                  {src.title}
                </h3>
                {src.snippet && (
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {src.snippet}
                  </p>
                )}

                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setPreview(src)}
                    className="text-xs bg-gradient-to-r from-[#14b8a6] to-[#22d3ee] hover:opacity-90 text-white px-3 py-1.5 rounded-lg transition shadow-md"
                  >
                    Vista previa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 📖 Modal de vista previa */}
      {preview && (
        <PreviewModal
          url={preview.url}
          content={preview.content || ""}
          highlight={preview.highlight}
          question={question}
          answer={answer}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
}

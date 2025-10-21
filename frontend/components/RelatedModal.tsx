"use client";
import { useState } from "react";
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
  onClose,
}: {
  sources: Source[];
  answer: string;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<Source | null>(null);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1e1f20] rounded-2xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Páginas relacionadas</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            {sources.map((src, i) => (
              <div
                key={i}
                className="bg-[#2a2b2d] p-3 rounded-xl text-sm border border-gray-700"
              >
                <h3 className="font-semibold text-gray-100">{src.title}</h3>
                {src.snippet && (
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {src.snippet}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => setPreview(src)}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
                  >
                    Vista previa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📖 Modal de vista previa */}
      {preview && (
        <PreviewModal
          url={preview.url}
          content={preview.content || ""}
          highlight={preview.highlight}
          answer={answer}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
}

"use client";
import { useState } from "react";
import RelatedModal from "./RelatedModal"; // 👈 Asegúrate de esta ruta

type Source = {
  title: string;
  url: string;
  snippet?: string;
  content?: string;
  highlight?: string;
};

export default function MessageBubble({
  role,
  content,
  sources = [],
}: {
  role: string;
  content: string;
  sources?: Source[];
}) {
  const isUser = role === "user";
  const [showRelated, setShowRelated] = useState(false);

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-[#2a2b2d] text-gray-100 rounded-bl-none"
        }`}
      >
        {content}
      </div>

      {/* 🔘 Botón de páginas relacionadas */}
      {!isUser && sources.length > 0 && (
        <button
          onClick={() => setShowRelated(true)}
          className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
        >
          🔗 <span>Páginas relacionadas</span>
        </button>
      )}

      {/* 🪟 Modal de fuentes */}
      {showRelated && (
        <RelatedModal
          sources={sources}
          answer={content} // 👈 se pasa la respuesta al modal
          onClose={() => setShowRelated(false)}
        />
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-800 p-4 flex items-center gap-2 bg-[#131314]"
    >
      <textarea
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="flex-1 resize-none bg-[#1e1f20] rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition"
      >
        Enviar
      </button>
    </form>
  );
}

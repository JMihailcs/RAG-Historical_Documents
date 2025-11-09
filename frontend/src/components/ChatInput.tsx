"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky bottom-0 flex justify-center w-full p-4 bg-gradient-to-t from-[#0f1011]/95 to-transparent backdrop-blur-sm"
    >
      <div className="flex items-center w-full max-w-3xl bg-[#1e1f20] border border-[#2d2e30] rounded-2xl px-4 py-2 shadow-md">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 resize-none bg-transparent text-gray-200 text-sm focus:outline-none placeholder-gray-500"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 bg-gradient-to-r from-[#14b8a6] to-[#22d3ee] hover:opacity-90 rounded-xl text-white text-sm transition font-medium"
        >
          Enviar
        </button>
      </div>
    </motion.form>
  );
}

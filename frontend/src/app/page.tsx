"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hola, soy tu asistente. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Hacer scroll automático al final del chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    // Simulación de respuesta (luego se reemplaza con fetch al backend)
    setTimeout(() => {
      const newBotMessage: Message = {
        role: "assistant",
        content: "🤖 Esta es una respuesta simulada. Luego vendrá del backend.",
      };
      setMessages((prev) => [...prev, newBotMessage]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Cabecera */}
      <header className="p-4 bg-white shadow-md text-center font-semibold text-gray-700">
        Chat RAG Assistant
      </header>

      {/* Mensajes */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm md:text-base ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t flex items-center gap-2"
      >
        <input
          type="text"
          className="text-black flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

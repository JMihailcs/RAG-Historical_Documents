"use client";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { motion } from "framer-motion";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `
👋 Hola, soy tu **asistente histórico RAG**.  
Puedo ayudarte a explorar *documentos coloniales*, identificar personajes o analizar eventos antiguos.  

¿Sobre qué tema te gustaría conversar hoy?
`,
      sources: [],
    },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 1. Mostrar mensaje del usuario inmediatamente
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, sources: [] },
    ]);

    try {
      // 2. Llamada al backend
      const response = await fetch("http://localhost:4000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pregunta: text }),
      });

      if (!response.ok) {
        throw new Error("Error en el backend");
      }

      const data = await response.json();

      // 3. Mostrar respuesta del asistente
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          sources: data.sources || [],
        },
      ]);
    } catch {
      // 4. Manejo de error visible en el chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Ocurrió un error al consultar el sistema. Intenta nuevamente.",
          sources: [],
        },
      ]);
    }
  };
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0f1011] to-[#1a1b1d]">
      {/* Área de mensajes */}
      <motion.div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-thumb-[#2d2e30] scrollbar-track-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {messages.map((msg, i) => {
          const previousUserMessage = [...messages]
            .slice(0, i)
            .reverse()
            .find((m) => m.role === "user");

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MessageBubble
                role={msg.role}
                content={msg.content}
                sources={msg.sources || []}
                question={previousUserMessage?.content || ""}
              />
            </motion.div>
          );
        })}
        <div className="h-6"></div>
      </motion.div>

      {/* Input fijo al fondo */}
      <div className="sticky bottom-0">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

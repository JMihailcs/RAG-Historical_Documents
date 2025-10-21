"use client";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hola, soy tu asistente RAG. ¿En qué puedo ayudarte hoy?",
      sources: [],
    },
    {
      role: "user",
      content: "Pregunta",
      sources: [],
    },
    {
      role: "assistant",
      content: "Según mis resultados, esto es lo que encontré:",
      sources: [
        {
          title: "Página 1",
          url: "expediente_49#1",
          snippet: "Expediente seguido por el indio Manuel Mancachoque...",
          content:
            "Expediente seguido por el indio Manuel Mancachoque ... el cacique del Ayllu Tinta D. Andrés Chuquitapa ...",
        },
        {
          title: "Página 2",
          url: "expediente_49#2",
          snippet: "En el pueblo de Tinta, en primero de agosto de 1806...",
          content: "Yo el sargento Don Isidro Cano ... hizo polvo.",
        },
      ],
    },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Añadir mensaje del usuario
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, sources: [] },
    ]);

    // (Luego aquí puedes conectar con tu backend)
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            role={msg.role}
            content={msg.content}
            sources={msg.sources || []}
          />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

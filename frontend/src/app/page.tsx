"use client";

import { useState } from "react";
// import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#131314]">
      {/* <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} /> */}

      <div className="flex flex-col flex-1">
        <header className="border-b border-gray-800 p-4 flex items-center justify-between bg-[#1e1f20]">
          <h1 className="text-lg font-semibold">🤖 RAG Assistant</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          >
            ☰
          </button>
        </header>

        <Chat />
      </div>
    </div>
  );
}

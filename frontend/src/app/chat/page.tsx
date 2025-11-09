'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Chat from '../../components/Chat'
import Link from 'next/link'
// import Sidebar from '../../components/Sidebar' // si decides usarla luego

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <main className="flex h-screen bg-gradient-to-b from-[#0f1011] to-[#1a1b1d] text-white">
      {/* <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} /> */}

      <div className="flex flex-col flex-1 backdrop-blur-sm">
        {/* Header */}
        <motion.header
          className="border-b border-gray-800 p-4 flex items-center justify-between bg-[#1e1f20]/80 backdrop-blur-lg shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            🤖 RAG Assistant
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-300"
          >
            ☰
          </button>
        </motion.header>

        {/* Chat */}
        <Chat />
      </div>
    </main>
  )
}

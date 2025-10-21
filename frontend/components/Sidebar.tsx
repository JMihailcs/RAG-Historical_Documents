"use client";
import { motion } from "framer-motion";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: open ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="fixed md:static z-50 top-0 left-0 h-full w-64 bg-[#1e1f20] border-r border-gray-800 flex flex-col p-4 md:translate-x-0"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Chats</h2>
        <button onClick={() => setOpen(false)} className="md:hidden text-gray-400">✕</button>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 mb-4">
        + Nuevo chat
      </button>
    </motion.aside>
  );
}

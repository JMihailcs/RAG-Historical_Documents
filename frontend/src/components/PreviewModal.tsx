"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export default function PreviewModal({
  url,
  content,
  highlight,
  question,
  answer,
  onClose,
}: {
  url: string;
  content: string;
  highlight?: string;
  question?: string;
  answer?: string;
  onClose: () => void;
}) {
  // 🔍 función para resaltar texto dentro de markdown
  const highlightText = (text: string) => {
    if (!highlight) return text;
    const safe = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safe})`, "gi");
    return text.replace(
      regex,
      `<mark class="bg-[#22d3ee33] text-[#22d3ee] font-semibold rounded px-1">$1</mark>`
    );
  };

  const highlightedContent = highlightText(content);
  const highlightedAnswer = answer ? highlightText(answer) : "";

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 🧩 Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-between items-center p-4 bg-[#1e1f20] border-b border-[#2d2e30]"
      >
        <h2 className="text-white text-lg font-semibold truncate max-w-[80%]">
          Página relacionada
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-[#22d3ee] text-xl transition"
        >
          x
        </button>
      </motion.div>

      {/* ⚡ Cuerpo dividido en dos secciones */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* 💬 Conversación estilo chat */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="p-8 bg-black border-r border-[#2d2e30] overflow-y-auto text-gray-100 flex flex-col space-y-6"
        >
          <h3 className="font-semibold text-[#22d3ee] text-2xl uppercase tracking-wide text-center">
            Conversación
          </h3>

          {question && (
            <div className="flex justify-center w-full">
              <div className="bg-gradient-to-r from-[#14b8a6] to-[#22d3ee] text-white px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md max-w-[85%] text-center">
                {question}
              </div>
            </div>
          )}

          {answer && (
            <div className="w-full text-gray-100 leading-relaxed text-[15px]">
              <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-400 font-medium">
                <span>🤖 Asistente histórico</span>
                <span className="h-[1px] w-12 bg-gray-700"></span>
              </div>

              <article
                className="
                  prose prose-invert prose-sm sm:prose-base max-w-none mx-auto
                  leading-relaxed text-justify
                  [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4 [&>blockquote]:mb-4
                  [&>blockquote]:italic [&>blockquote]:border-l-2 [&>blockquote]:border-[#22d3ee33] [&>blockquote]:pl-4
                  [&>hr]:border-[#22d3ee33] [&>hr]:my-6
                  [&>h2]:text-[#22d3ee] [&>h3]:text-[#14b8a6]
                  [&>mark]:bg-[#22d3ee33] [&>mark]:text-[#22d3ee] [&>mark]:rounded [&>mark]:px-1
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                >
                  {highlightedAnswer}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </motion.div>

        {/* 📄 Texto del documento */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8 bg-[#1e1f20] overflow-y-auto text-gray-100 text-sm leading-relaxed"
        >
          <h3 className="font-semibold mb-4 text-[#22d3ee] text-2xl uppercase tracking-wide break-all">
            {url}
          </h3>

          <article className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {highlightedContent}
            </ReactMarkdown>
          </article>
        </motion.div>
      </div>
    </motion.div>
  );
}

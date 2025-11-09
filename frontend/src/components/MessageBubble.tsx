"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RelatedModal from "../components/RelatedModal";
import { motion } from "framer-motion";

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
  question = "",
}: {
  role: string;
  content: string;
  sources?: Source[];
  question?: string;
}) {
  const isUser = role === "user";
  const [showRelated, setShowRelated] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-center w-full"
    >
      <div className="flex flex-col items-center w-full max-w-3xl px-4">
        {isUser ? (
          <div className="flex justify-end w-full mb-3">
            <div className="bg-gradient-to-r from-[#14b8a6] to-[#22d3ee] text-white px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md max-w-[80%]">
              {content}
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#1e1f20] border border-[#2d2e30] rounded-2xl px-5 py-4 shadow-md text-gray-200 text-[15px] leading-relaxed">
            <div className="flex items-center gap-2 mb-3 text-sm text-[#9ca3af] font-medium">
              <span>🧠 Asistente</span>
              <span className="h-[1px] w-12 bg-[#2d2e30]"></span>
            </div>

            <article
              className="
                prose prose-invert prose-sm sm:prose-base max-w-none
                leading-relaxed text-justify
                [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4
                [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6
                [&>blockquote]:border-l-2 [&>blockquote]:border-[#14b8a6]/40 [&>blockquote]:bg-[#2d2e30]/40
                [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-300
                [&>h2]:text-[#22d3ee] [&>h3]:text-[#14b8a6]
                [&>hr]:border-[#2d2e30]/60 [&>hr]:my-6
              "
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>

            {sources.length > 0 && (
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setShowRelated(true)}
                  className="text-sm text-[#22d3ee] hover:text-[#2dd4bf] transition flex items-center gap-1"
                >
                  🔗 <span>Ver fuentes</span>
                </button>
              </div>
            )}
          </div>
        )}

        {showRelated && (
          <RelatedModal
            sources={sources}
            answer={content}
            question={question}
            onClose={() => setShowRelated(false)}
          />
        )}
      </div>
    </motion.div>
  );
}

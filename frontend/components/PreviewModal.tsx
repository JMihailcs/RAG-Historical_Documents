"use client";

export default function PreviewModal({
  url,
  content,
  highlight,
  answer,
  onClose,
}: {
  url: string;
  content: string;
  highlight?: string;
  answer?: string;
  onClose: () => void;
}) {
  const highlightedContent = highlight
    ? content.replace(
        new RegExp(`(${highlight})`, "gi"),
        '<mark class="bg-yellow-300 text-black font-semibold">$1</mark>'
      )
    : content;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-[#1e1f20] border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold truncate max-w-[80%]">
          {url}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-6 bg-[#2a2b2d] border-r border-gray-700 overflow-y-auto text-gray-100">
          <h3 className="font-semibold mb-2 text-blue-400">
            Respuesta del asistente
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {answer}
          </p>
        </div>

        <div
          className="p-6 bg-[#1e1f20] overflow-y-auto text-gray-100 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        />
      </div>
    </div>
  );
}

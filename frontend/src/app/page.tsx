'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1011] to-[#1a1b1d] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800 backdrop-blur-lg sticky top-0 z-50">
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ChatIA
        </motion.h1>

        <div className="flex items-center gap-6">
          <Link href="#features" className="hover:text-teal-400 transition">Características</Link>
          <Link href="#about" className="hover:text-teal-400 transition">Sobre nosotros</Link>
          <Link
            href="/chat"
            className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-400 transition"
          >
            Ir al chat
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <motion.h2
          className="text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Tu asistente IA personal, <br /> rápido y siempre disponible
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Experimenta una conversación fluida e inteligente con nuestra IA avanzada.
          Aprende, pregunta, crea y resuelve tus dudas en segundos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/chat"
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-400 rounded-xl hover:shadow-lg hover:scale-105 transition-transform"
          >
            Comenzar chat →
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-8 bg-[#121314]">
        <h3 className="text-3xl font-bold text-center mb-12">Características principales</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: 'Respuestas instantáneas',
              desc: 'Obtén información al instante con precisión y contexto inteligente.',
            },
            {
              title: 'Diseño adaptable',
              desc: 'Interfaz moderna y fluida que se adapta a todos los dispositivos.',
            },
            {
              title: 'Potenciado por IA',
              desc: 'Impulsado por modelos avanzados de lenguaje como GPT.',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="bg-[#1e1f20] rounded-2xl p-6 border border-gray-800 hover:border-teal-500 transition"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-xl font-semibold mb-2 text-teal-400">{f.title}</h4>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 text-center">
        <motion.h3
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Sobre el proyecto
        </motion.h3>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Este proyecto fue creado con Next.js, TailwindCSS y Framer Motion para ofrecer una
          experiencia de chat moderna e interactiva. Nuestro objetivo es acercar la inteligencia
          artificial a todos, con una interfaz simple, estética y potente.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ChatIA — Desarrollado con ❤️ y Next.js
      </footer>
    </main>
  )
}

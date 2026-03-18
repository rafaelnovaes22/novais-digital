"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contato" className="relative py-24 px-6 overflow-hidden" ref={ref}>
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-background/92" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-medium uppercase tracking-wider">
            Contato
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Vamos construir algo incrível?
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Conte-nos sobre o seu projeto e descubra como a IA pode transformar
            o seu negócio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-semibold text-lg mb-4">Fale conosco</h3>
              <div className="space-y-4">
                <a
                  href="mailto:contato@novaisdigital.com.br"
                  className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                >
                  <Mail size={18} className="text-accent-light" />
                  contato@novaisdigital.com.br
                </a>
                <div className="flex items-center gap-3 text-muted">
                  <MapPin size={18} className="text-accent-light" />
                  Brasil
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Redes</h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/rafaelnovaes22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/rafaelnovaes22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Decorative image */}
            <div className="relative rounded-2xl overflow-hidden aspect-video hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
                alt="Workspace tecnológico"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-accent/30 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="text-accent-light" size={28} />
                </div>
                <h3 className="font-semibold text-xl mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-muted">
                  Obrigado pelo contato. Retornaremos em breve.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-card-border p-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                    placeholder="Conte-nos sobre o seu projeto..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-light transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar mensagem
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

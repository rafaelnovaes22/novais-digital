"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquare,
  LayoutDashboard,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Chatbots com IA",
    description:
      "Assistentes conversacionais multi-agente para WhatsApp e web. Vendas, qualificação de leads e atendimento 24/7 com LangGraph e RAG.",
    tags: ["WhatsApp", "Multi-agente", "LangGraph", "RAG"],
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=900&q=80",
  },
  {
    icon: LayoutDashboard,
    title: "Plataformas SaaS",
    description:
      "Sistemas web completos com dashboards, APIs robustas, autenticação e pagamentos. Do MVP à produção com arquitetura escalável.",
    tags: ["React", "Next.js", "NestJS", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
  {
    icon: Workflow,
    title: "Automação de Processos",
    description:
      "Workflows inteligentes que eliminam tarefas manuais. Validação de documentos com visão computacional, integrações e scraping.",
    tags: ["Automação", "Integrações", "AI Vision", "Scraping"],
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + services.length) % services.length);
    },
    []
  );

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const service = services[current];

  return (
    <section id="servicos" className="py-24 px-6 bg-card-bg/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-medium uppercase tracking-wider">
            Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            O que fazemos
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl bg-background border border-card-border overflow-hidden">
            <div className="grid md:grid-cols-2 min-h-[420px]">
              {/* Image side */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:hidden" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Content side */}
              <div className="relative p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <service.icon
                        className="text-accent-light"
                        size={28}
                      />
                    </div>
                    <h3 className="font-bold text-2xl md:text-3xl mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 rounded-full bg-accent/10 text-accent-light text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full bg-card-bg border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-accent"
                      : "w-2 bg-card-border hover:bg-muted/50"
                  }`}
                  aria-label={`Ir para serviço ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full bg-card-bg border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

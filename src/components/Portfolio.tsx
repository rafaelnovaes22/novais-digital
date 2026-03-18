"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Car,
  FileText,
  Music,
  Home,
} from "lucide-react";

const projects = [
  {
    icon: MessageSquare,
    title: "CarInsight",
    category: "IA Multi-Indústria",
    description:
      "Assistente de vendas conversacional via WhatsApp com arquitetura multi-agente adaptável a qualquer indústria. Workflow de 7 nós com LangGraph, busca semântica com RAG e roteamento multi-LLM com circuit breaker.",
    highlights: [
      "1.028+ testes automatizados",
      "Detecção de prompt injection",
      "Conformidade LGPD/GDPR",
    ],
    tags: ["TypeScript", "LangGraph", "pgvector", "OpenAI", "WhatsApp API"],
    gradient: "from-blue-800 to-blue-500",
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&q=80",
  },
  {
    icon: Car,
    title: "FacilIAuto",
    category: "SaaS B2B",
    description:
      "Plataforma SaaS completa para concessionárias com motor de recomendação, chatbot WhatsApp e painel administrativo. Arquitetura multi-tenant com 12 agentes de IA especializados.",
    highlights: [
      "12 agentes de IA",
      "Calculadora TCO",
      "Scraping automático de inventário",
    ],
    tags: ["Python", "FastAPI", "React", "LangGraph", "Docker"],
    gradient: "from-amber-700 to-amber-500",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
  },
  {
    icon: FileText,
    title: "DestravaCV",
    category: "Produto B2C",
    description:
      "Otimizador de currículo com IA que analisa compatibilidade ATS contra múltiplas vagas simultaneamente. Sistema de créditos com Stripe, PWA e painel administrativo completo.",
    highlights: [
      "Análise de 3-7 vagas simultâneas",
      "PWA com Service Worker",
      "14 suítes E2E com Cypress",
    ],
    tags: ["Node.js", "Express", "OpenAI", "Stripe", "Cypress"],
    gradient: "from-sky-700 to-sky-500",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
  },
  {
    icon: Music,
    title: "Fichas GEM",
    category: "Sistema Web",
    description:
      "Sistema de gestão de ensino musical para Congregação Cristã no Brasil. Controle de alunos, instrutores, fichas de acompanhamento M11, avaliações e geração de relatórios em PDF.",
    highlights: [
      "Dashboard responsivo",
      "Geração de PDF",
      "Testes E2E com Playwright",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    gradient: "from-yellow-700 to-yellow-500",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80",
  },
  {
    icon: Home,
    title: "Agente Imobiliário",
    category: "Agente de IA",
    description:
      "Agente de qualificação imobiliária construído com Google ADK que entrevista clientes para entender necessidades de imóveis. Pipeline de 4 agentes especializados com persistência de leads.",
    highlights: [
      "87 testes passando",
      "MVP 100% completo",
      "Metodologia TDD + XP",
    ],
    tags: ["Python", "Google ADK", "pytest", "TDD"],
    gradient: "from-teal-700 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-medium uppercase tracking-wider">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Projetos que entregam resultado
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos, cada um com foco em
            resolver problemas reais com tecnologia de ponta.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl bg-card-bg border border-card-border hover:border-accent/30 transition-all overflow-hidden flex flex-col"
            >
              {/* Project image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-card-bg/50 to-transparent" />
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}
                />
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.1] backdrop-blur-md border border-white/[0.15] flex items-center justify-center">
                    <project.icon className="text-accent-light" size={20} />
                  </div>
                  <span className="text-xs text-white/70 font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-foreground/80 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-light" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-card-border text-muted text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

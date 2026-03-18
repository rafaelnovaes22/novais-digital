"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techCategories = [
  {
    label: "Linguagens",
    techs: ["TypeScript", "Python", "JavaScript"],
  },
  {
    label: "Frontend",
    techs: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Chakra UI"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "NestJS", "FastAPI", "Express"],
  },
  {
    label: "IA & LLMs",
    techs: [
      "LangGraph",
      "LangChain",
      "OpenAI",
      "Google ADK",
      "Groq",
      "RAG",
      "pgvector",
    ],
  },
  {
    label: "Dados",
    techs: ["PostgreSQL", "Prisma", "Sequelize", "Redis", "DuckDB", "SQLite"],
  },
  {
    label: "Infra & DevOps",
    techs: ["Docker", "Railway", "Vercel", "GitHub Actions", "Nginx"],
  },
  {
    label: "Testes",
    techs: ["Vitest", "Jest", "Cypress", "Playwright", "pytest"],
  },
  {
    label: "Integrações",
    techs: ["WhatsApp API", "Stripe", "Firecrawl", "Google APIs"],
  },
];

export default function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tecnologias"
      className="py-24 px-6 bg-card-bg/50"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-medium uppercase tracking-wider">
            Tecnologias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Stack que domina o mercado
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-background border border-card-border"
            >
              <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-sm text-foreground/80 hover:border-accent/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

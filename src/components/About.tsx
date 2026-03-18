"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Zap, Shield, Users } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Brain,
    title: "IA de ponta",
    description:
      "Utilizamos LangGraph, RAG e arquiteturas multi-agente para criar soluções que realmente entendem o seu negócio.",
  },
  {
    icon: Zap,
    title: "Entrega ágil",
    description:
      "Do conceito ao MVP em semanas, não meses. Metodologia focada em resultados rápidos e mensuráveis.",
  },
  {
    icon: Shield,
    title: "Qualidade comprovada",
    description:
      "Mais de 1.100 testes automatizados nos nossos projetos. Código robusto, seguro e bem documentado.",
  },
  {
    icon: Users,
    title: "Sob medida",
    description:
      "Cada solução é projetada para o contexto específico do cliente, do automotivo ao imobiliário.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Split layout: text + image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent-light text-sm font-medium uppercase tracking-wider">
              Sobre nós
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              Inteligência Artificial que resolve problemas reais
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              A <strong className="text-foreground">Novais Digital</strong> é
              especializada em criar soluções com Inteligência Artificial para
              empresas que querem automatizar, escalar e vender mais. Combinamos
              engenharia de software moderna com as tecnologias de IA mais
              avançadas do mercado.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                  6+
                </div>
                <div className="text-muted text-sm">Projetos entregues</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                  12+
                </div>
                <div className="text-muted text-sm">Agentes de IA</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-muted text-sm">Automação</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
                alt="Inteligência Artificial e tecnologia"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Decorative accent border */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent-blue/20 -z-10 blur-sm" />
          </motion.div>
        </div>

        {/* Value cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-2xl bg-card-bg border border-card-border hover:border-accent/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon className="text-accent-light" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

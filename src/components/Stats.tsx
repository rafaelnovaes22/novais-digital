"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
  { value: "6+", label: "Projetos entregues" },
  { value: "1.100+", label: "Testes automatizados" },
  { value: "12+", label: "Agentes de IA em produção" },
  { value: "95%", label: "Automação de processos manuais" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6 overflow-hidden" ref={ref}>
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 via-transparent to-accent/10" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

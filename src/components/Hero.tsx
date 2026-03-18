"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const floatingCards = [
  { label: "Agentes IA", value: "12+", x: "left-[8%]", y: "top-[18%]" },
  { label: "Uptime", value: "99.9%", x: "right-[6%]", y: "top-[25%]" },
  { label: "Testes", value: "1.100+", x: "left-[5%]", y: "bottom-[22%]" },
  { label: "Automação", value: "95%", x: "right-[8%]", y: "bottom-[18%]" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-blue-light)_0%,_transparent_50%)] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--accent)_0%,_transparent_40%)] opacity-15" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating glassmorphism cards - hidden on mobile */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 + i * 0.2 }}
          className={`absolute ${card.x} ${card.y} hidden lg:flex flex-col items-center px-5 py-3 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.1] shadow-lg`}
        >
          <span className="text-xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
            {card.value}
          </span>
          <span className="text-xs text-muted">{card.label}</span>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-sm border border-accent/30 text-accent-light text-sm font-medium mb-8">
            Inteligência Artificial aplicada ao seu negócio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Transformamos processos em{" "}
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
            soluções inteligentes
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
        >
          Desenvolvemos chatbots com IA, plataformas SaaS e automações que
          aceleram vendas e otimizam operações para o seu negócio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors"
          >
            Ver Projetos
          </a>
          <a
            href="https://wa.me/5511949105033"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-white/[0.05] backdrop-blur-sm border border-card-border text-foreground font-medium hover:border-accent/50 transition-colors"
          >
            Fale Conosco
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#sobre">
          <ArrowDown className="text-muted animate-bounce" size={24} />
        </a>
      </motion.div>
    </section>
  );
}

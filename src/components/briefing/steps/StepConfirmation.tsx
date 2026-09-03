"use client";

import Link from "next/link";
import { CheckCircle2, Calendar, MessageCircle } from "lucide-react";

export default function StepConfirmation() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-card-border p-12 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <CheckCircle2 className="text-accent" size={32} />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">
            Recebemos seus dados!
          </h2>
          <p className="text-muted max-w-md mx-auto">
            Nossa IA já está analisando os materiais que você enviou para montar
            um diagnóstico completo da sua empresa.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-white/[0.02] p-6 text-left space-y-4 max-w-md mx-auto">
          <h3 className="text-sm font-semibold text-foreground">
            Próximos passos:
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">1</span>
              </div>
              <p className="text-sm text-muted">
                Vamos analisar seu site, redes sociais e materiais com IA para
                extrair tom de voz, catálogo, FAQ e identidade da marca
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">2</span>
              </div>
              <p className="text-sm text-muted">
                Em até 24h úteis, entraremos em contato para agendar uma reunião
                de alinhamento de 30 minutos
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">3</span>
              </div>
              <p className="text-sm text-muted">
                Na reunião, você valida o que montamos e definimos juntos os
                ajustes finais
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/5511949105033"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-card-border text-foreground hover:border-accent/40 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

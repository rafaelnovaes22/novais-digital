"use client";

import { CheckCircle2 } from "lucide-react";

export default function StepConfirmation() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-card-border p-12 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <CheckCircle2 className="text-accent" size={32} />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">Briefing enviado com sucesso!</h2>
          <p className="text-muted max-w-md mx-auto">
            Recebemos todas as informações sobre sua empresa. Nossa equipe vai analisar o briefing e entrar em contato em até 24 horas úteis.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/5511949105033"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
          >
            Falar no WhatsApp
          </a>
          <a
            href="/"
            className="px-6 py-3 rounded-xl border border-card-border text-foreground hover:border-accent/40 transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

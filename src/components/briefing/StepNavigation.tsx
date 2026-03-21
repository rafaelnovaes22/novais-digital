"use client";

import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { TOTAL_STEPS } from "@/lib/briefing/constants";

interface StepNavigationProps {
  currentStep: number;
  onPrev: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  isSubmitting?: boolean;
  lastSaved?: string;
}

export default function StepNavigation({
  currentStep,
  onPrev,
  onNext,
  onSaveDraft,
  isSubmitting,
  lastSaved,
}: StepNavigationProps) {
  const isFirst = currentStep === 1;
  const isLast = currentStep === TOTAL_STEPS;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-card-border mt-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-card-border text-sm font-medium text-foreground/70 hover:text-foreground hover:border-accent/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-accent transition-colors"
        >
          <Save size={15} />
          Salvar rascunho
        </button>

        {lastSaved && (
          <span className="text-xs text-muted hidden sm:block">
            Salvo {lastSaved}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : isLast ? (
          "Enviar briefing"
        ) : (
          <>
            Próximo
            <ChevronRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}

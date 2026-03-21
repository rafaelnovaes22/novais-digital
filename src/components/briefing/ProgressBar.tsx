"use client";

import { STEP_GROUPS, TOTAL_STEPS } from "@/lib/briefing/constants";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="space-y-4">
      {/* Barra de progresso geral */}
      <div className="flex items-center justify-between text-xs text-muted mb-1">
        <span>Etapa {currentStep} de {TOTAL_STEPS}</span>
        <span>{progress}% completo</span>
      </div>
      <div className="h-1.5 rounded-full bg-card-border overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Grupos de etapas */}
      <div className="flex gap-1 flex-wrap">
        {STEP_GROUPS.map((group) => {
          const isDone = group.steps.every((s) => s < currentStep);
          const isActive = (group.steps as readonly number[]).includes(currentStep);
          return (
            <div
              key={group.label}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : isDone
                  ? "bg-accent/20 text-accent"
                  : "bg-card-border/40 text-muted"
              }`}
            >
              {isDone && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              )}
              {group.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import TextareaField from "@/components/briefing/fields/TextareaField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import type { BriefingFormData } from "@/lib/briefing/types";

const PRECO_OPTIONS = [
  { value: "premium", label: "Premium — preço acima do mercado, foco em exclusividade" },
  { value: "intermediario", label: "Intermediário — equilíbrio entre preço e qualidade" },
  { value: "economico", label: "Econômico — foco em preço competitivo" },
] as const;

type PosicionamentoPreco = "premium" | "intermediario" | "economico";

export default function Step11Competition() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();
  const posicionamentoPreco = watch("posicionamentoPreco") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Análise de Concorrência</h2>
        <p className="mt-1 text-sm text-muted">
          Entender o mercado nos ajuda a posicionar o assistente de forma competitiva.
        </p>
      </div>

      <div className="space-y-4">
        <TextareaField
          label="Principais concorrentes"
          registration={register("principaisConcorrentes")}
          error={errors.principaisConcorrentes}
          placeholder="Liste os 2-3 principais concorrentes. Ex: Empresa X, Empresa Y..."
          rows={3}
        />

        <TextareaField
          label="Diferencial competitivo"
          registration={register("diferencialCompetitivo")}
          error={errors.diferencialCompetitivo}
          placeholder="O que faz sua empresa melhor ou diferente dos concorrentes?"
          rows={3}
          required
        />

        <TextareaField
          label="Pontos em que os concorrentes se destacam"
          registration={register("pontosFracosVsCompetidor")}
          error={errors.pontosFracosVsCompetidor}
          placeholder="Em quais aspectos seus concorrentes se destacam sobre você?"
          rows={2}
        />

        <RadioGroup<PosicionamentoPreco>
          label="Posicionamento de preço"
          options={PRECO_OPTIONS}
          value={posicionamentoPreco as PosicionamentoPreco | ""}
          onChange={(val) => setValue("posicionamentoPreco", val)}
          error={errors.posicionamentoPreco}
        />
      </div>
    </div>
  );
}

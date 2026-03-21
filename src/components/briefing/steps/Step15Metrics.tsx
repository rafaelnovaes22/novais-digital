"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import { METRICAS_SUCESSO } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";
import type { FieldError } from "react-hook-form";

const FREQ_RELATORIOS = ["Semanal", "Quinzenal", "Mensal", "Trimestral"];

export default function Step15Metrics() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const metricas = watch("metricasSucesso") ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Métricas e Indicadores de Sucesso</h2>
        <p className="mt-1 text-sm text-muted">
          Defina como medir o sucesso do assistente IA.
        </p>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          label="Métricas de sucesso"
          options={METRICAS_SUCESSO}
          value={metricas}
          onChange={(val) => setValue("metricasSucesso", val)}
          error={errors.metricasSucesso as FieldError | undefined}
        />

        <TextareaField
          label="KPIs principais"
          registration={register("kpisPrincipais")}
          error={errors.kpisPrincipais}
          placeholder="Descreva os KPIs mais importantes. Ex: CSAT acima de 4.5, tempo de resposta < 30s..."
          rows={3}
        />

        <TextareaField
          label="Baseline atual"
          registration={register("baselineAtual")}
          error={errors.baselineAtual}
          placeholder="Qual é a performance atual do seu atendimento? (se souber)"
          rows={2}
        />

        <SelectField
          label="Frequência de relatórios"
          registration={register("frequenciaRelatorios")}
          error={errors.frequenciaRelatorios}
          options={FREQ_RELATORIOS}
        />

        <TextField
          label="Ferramenta de análise"
          registration={register("ferramentaAnalise")}
          error={errors.ferramentaAnalise}
          placeholder="Ex: Google Data Studio, Power BI, Planilhas Google..."
        />
      </div>
    </div>
  );
}

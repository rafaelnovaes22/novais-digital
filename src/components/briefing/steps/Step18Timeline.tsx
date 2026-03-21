"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import CurrencyInput from "@/components/briefing/fields/CurrencyInput";
import { EXPECTATIVAS_PRAZO } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step18Timeline() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const orcamento = watch("orcamentoMensal") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Expectativas, Prazo e Investimento</h2>
        <p className="mt-1 text-sm text-muted">
          Essas informações nos ajudam a adequar a proposta ao seu contexto.
        </p>
      </div>

      <div className="space-y-4">
        <SelectField
          label="Prazo de implantação"
          registration={register("prazoImplantacao")}
          error={errors.prazoImplantacao}
          options={EXPECTATIVAS_PRAZO}
          required
        />

        <TextField
          label="Data desejada de lançamento"
          registration={register("dataDesejadaLancamento")}
          error={errors.dataDesejadaLancamento}
          type="date"
          hint="Se houver uma data específica em mente"
        />

        <CurrencyInput
          label="Orçamento mensal disponível"
          value={orcamento}
          onChange={(val) => setValue("orcamentoMensal", val)}
          error={errors.orcamentoMensal}
          hint="Isso nos ajuda a sugerir a solução mais adequada"
        />

        <TextareaField
          label="Expectativa de ROI"
          registration={register("expectativaROI")}
          error={errors.expectativaROI}
          placeholder="Qual retorno você espera com a implementação do assistente?"
          rows={2}
        />

        <TextareaField
          label="Riscos percebidos"
          registration={register("riscosPercebidos")}
          error={errors.riscosPercebidos}
          placeholder="Há riscos ou preocupações que você antecipa?"
          rows={2}
        />

        <TextareaField
          label="Dependências externas"
          registration={register("dependenciasExternas")}
          error={errors.dependenciasExternas}
          placeholder="Há aprovações, integrações ou terceiros que podem impactar o prazo?"
          rows={2}
        />
      </div>
    </div>
  );
}

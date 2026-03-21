"use client";

import { useFormContext } from "react-hook-form";
import TextareaField from "@/components/briefing/fields/TextareaField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { COMPLIANCE_REQUISITOS } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";
import type { FieldError } from "react-hook-form";

type SimNao = "sim" | "nao";
const SIM_NAO = [
  { value: "sim" as const, label: "Sim" },
  { value: "nao" as const, label: "Não" },
];

export default function Step17Compliance() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const requisitos = watch("requisitosCompliance") ?? [];
  const privacidade = watch("politicaPrivacidade") ?? "";
  const termos = watch("termosUso") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Compliance e Requisitos Legais</h2>
        <p className="mt-1 text-sm text-muted">
          A segurança e conformidade dos dados dos seus clientes é fundamental. Informe os requisitos que se aplicam ao seu negócio.
        </p>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          label="Requisitos de compliance"
          options={COMPLIANCE_REQUISITOS}
          value={requisitos}
          onChange={(val) => setValue("requisitosCompliance", val)}
          error={errors.requisitosCompliance as FieldError | undefined}
        />

        <RadioGroup<SimNao>
          label="Possui política de privacidade publicada?"
          options={SIM_NAO}
          value={privacidade as SimNao | ""}
          onChange={(val) => setValue("politicaPrivacidade", val)}
          inline
        />

        <RadioGroup<SimNao>
          label="Possui termos de uso?"
          options={SIM_NAO}
          value={termos as SimNao | ""}
          onChange={(val) => setValue("termosUso", val)}
          inline
        />

        <TextareaField
          label="Restrições legais do setor"
          registration={register("restricoesLegais")}
          error={errors.restricoesLegais}
          placeholder="Há restrições legais específicas do seu setor?"
          rows={2}
        />

        <TextareaField
          label="Dados não permitidos"
          registration={register("dadosNaoPermitidos")}
          error={errors.dadosNaoPermitidos}
          placeholder="Que tipos de dados o assistente NUNCA deve coletar ou armazenar?"
          rows={2}
        />
      </div>
    </div>
  );
}

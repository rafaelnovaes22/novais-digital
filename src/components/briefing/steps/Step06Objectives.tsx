"use client";

import { useFormContext } from "react-hook-form";
import TextareaField from "@/components/briefing/fields/TextareaField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { OBJETIVOS_ASSISTENTE } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

const ABRANGENCIA_OPTIONS = [
  {
    value: "apenas_novo_canal",
    label: "Novo canal (adicionar ao atual)",
  },
  {
    value: "complementar",
    label: "Complementar ao humano",
  },
  {
    value: "substituir_atendimento",
    label: "Substituir atendimento manual",
  },
];

export default function Step06Objectives() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const objetivosPrincipais = watch("objetivosPrincipais") ?? [];
  const abrangenciaAssistente = watch("abrangenciaAssistente") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Objetivo do Assistente
        </h2>
        <p className="mt-1 text-sm text-muted">
          Alinhe as metas e o papel do assistente dentro da sua operação para
          garantir resultados concretos.
        </p>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          label="Objetivos Principais"
          options={OBJETIVOS_ASSISTENTE}
          value={objetivosPrincipais}
          onChange={(val) => setValue("objetivosPrincipais", val)}
          error={errors.objetivosPrincipais as import("react-hook-form").FieldError | undefined}
          required
        />

        <TextareaField
          label="Meta Principal (primeiros 3 meses)"
          registration={register("metaPrincipal")}
          error={errors.metaPrincipal}
          rows={3}
          required
          placeholder="Qual é a principal meta que o assistente deve atingir nos primeiros 3 meses?"
        />

        <TextareaField
          label="Resultado Esperado"
          registration={register("resultadoEsperado")}
          error={errors.resultadoEsperado}
          rows={3}
          required
          placeholder="Como você saberá que o assistente está tendo sucesso? Descreva o resultado ideal..."
        />

        <RadioGroup
          label="Abrangência do assistente"
          options={ABRANGENCIA_OPTIONS}
          value={abrangenciaAssistente}
          onChange={(val) => setValue("abrangenciaAssistente", val as "apenas_novo_canal" | "substituir_atendimento" | "complementar")}
          error={errors.abrangenciaAssistente}
        />
      </div>
    </div>
  );
}

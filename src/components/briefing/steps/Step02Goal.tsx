"use client";

import { useFormContext } from "react-hook-form";
import TextareaField from "@/components/briefing/fields/TextareaField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import TextField from "@/components/briefing/fields/TextField";
import { OBJETIVOS_ASSISTENTE } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

const SIM_NAO = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

export default function Step02Goal() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const objetivo = watch("objetivoPrincipal");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          O que você precisa?
        </h2>
        <p className="mt-1 text-sm text-muted">
          Entender seu objetivo e sua maior dor é tudo que precisamos para
          montar uma proposta sob medida.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          label="Objetivo principal do assistente IA"
          options={OBJETIVOS_ASSISTENTE}
          value={objetivo ?? ""}
          onChange={(v) => setValue("objetivoPrincipal", v as BriefingFormData["objetivoPrincipal"])}
          error={errors.objetivoPrincipal}
          required
        />

        {objetivo === "outro" && (
          <TextField
            label="Qual objetivo?"
            registration={register("objetivoOutro")}
            error={errors.objetivoOutro}
            placeholder="Descreva o objetivo do assistente..."
          />
        )}

        <TextareaField
          label="Qual é a maior dor da sua operação hoje?"
          registration={register("maiorDor")}
          error={errors.maiorDor}
          rows={4}
          required
          placeholder="Ex: Perdemos muitos leads porque não conseguimos responder rápido no WhatsApp..."
          hint="Não precisa ser técnico — conte com suas palavras o que mais incomoda"
        />

        <TextField
          label="Volume mensal de atendimentos (aproximado)"
          registration={register("volumeAtendimentos")}
          error={errors.volumeAtendimentos}
          placeholder="Ex: 500 mensagens/mês"
          hint="Opcional — nos ajuda a dimensionar a solução"
        />

        <RadioGroup
          label="Já usa alguma solução de IA no atendimento?"
          options={SIM_NAO}
          value={watch("jaUsaIA") ?? ""}
          onChange={(v) => setValue("jaUsaIA", v as "sim" | "nao")}
          error={errors.jaUsaIA}
        />
      </div>
    </div>
  );
}

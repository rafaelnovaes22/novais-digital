"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { IDIOMAS } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";
import type { FieldError } from "react-hook-form";

type SimNao = "sim" | "nao";
const SIM_NAO = [
  { value: "sim" as const, label: "Sim" },
  { value: "nao" as const, label: "Não" },
];

export default function Step14Languages() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const idiomas = watch("idiomasPrincipais") ?? [];
  const traducao = watch("necessidadeTraducaoAutomatica") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Idiomas e Regionalização</h2>
        <p className="mt-1 text-sm text-muted">
          Defina os idiomas e a abrangência regional do assistente.
        </p>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          label="Idiomas principais"
          options={IDIOMAS}
          value={idiomas}
          onChange={(val) => setValue("idiomasPrincipais", val)}
          error={errors.idiomasPrincipais as FieldError | undefined}
          required
        />

        <TextField
          label="Idioma secundário"
          registration={register("idiomaSecundario")}
          error={errors.idiomaSecundario}
          placeholder="Outro idioma de suporte (se aplicável)"
        />

        <TextField
          label="Região de atendimento"
          registration={register("regiaoAtendimento")}
          error={errors.regiaoAtendimento}
          placeholder="Ex: Grande São Paulo, Sul do Brasil, todo o território nacional"
        />

        <RadioGroup<SimNao>
          label="Precisa de tradução automática?"
          options={SIM_NAO}
          value={traducao as SimNao | ""}
          onChange={(val) => setValue("necessidadeTraducaoAutomatica", val)}
          hint="O assistente precisará detectar e responder automaticamente em múltiplos idiomas?"
          inline
        />
      </div>
    </div>
  );
}

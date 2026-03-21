"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import { CANAIS_VENDA } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step03Channels() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const canaisAtivos = watch("canaisAtivos") ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Canais de Venda
        </h2>
        <p className="mt-1 text-sm text-muted">
          Entender onde seus clientes te encontram é essencial para definir onde
          o assistente vai atuar.
        </p>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          label="Canais Ativos"
          options={CANAIS_VENDA}
          value={canaisAtivos}
          onChange={(val) => setValue("canaisAtivos", val)}
          error={errors.canaisAtivos as import("react-hook-form").FieldError | undefined}
          required
        />

        <SelectField
          label="Canal Principal"
          registration={register("canalPrincipal")}
          error={errors.canalPrincipal}
          options={CANAIS_VENDA}
          placeholder="Selecione o canal mais importante"
          required
        />

        <TextField
          label="Volume Mensal de Atendimentos"
          registration={register("volumeMensalAtendimentos")}
          error={errors.volumeMensalAtendimentos}
          placeholder="ex: 500 atendimentos/mês"
          hint="Quantos atendimentos ou contatos você recebe por mês?"
        />

        <TextareaField
          label="Ferramentas Atuais"
          registration={register("ferramentasAtuais")}
          error={errors.ferramentasAtuais}
          rows={2}
          placeholder="Ex: CRM HubSpot, WhatsApp Business, Zendesk..."
        />

        <TextareaField
          label="Integrações Desejadas"
          registration={register("integracoesDesejadas")}
          error={errors.integracoesDesejadas}
          rows={2}
          placeholder="Quais sistemas o assistente precisará se integrar?"
        />
      </div>
    </div>
  );
}

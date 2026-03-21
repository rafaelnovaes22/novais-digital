"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import MaskedInput from "@/components/briefing/fields/MaskedInput";
import { MODALIDADES_ESCALACAO } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";
import type { FieldError } from "react-hook-form";

export default function Step13Escalation() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const modalidades = watch("modalidadesEscalacao") ?? [];
  const whatsapp = watch("contadoEscalacaoWhatsapp") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Escalação e Atendimento Humano</h2>
        <p className="mt-1 text-sm text-muted">
          Configure quando e como o assistente deve transferir para um humano.
        </p>
      </div>

      <div className="space-y-4">
        <TextareaField
          label="Critérios de escalação"
          registration={register("criteriosEscalacao")}
          error={errors.criteriosEscalacao}
          placeholder="Em quais situações o assistente deve passar para um atendente humano?"
          rows={3}
          required
        />

        <CheckboxGroup
          label="Modalidades de escalação"
          options={MODALIDADES_ESCALACAO}
          value={modalidades}
          onChange={(val) => setValue("modalidadesEscalacao", val)}
          error={errors.modalidadesEscalacao as FieldError | undefined}
        />

        <TextField
          label="Responsável pela escalação"
          registration={register("responsavelEscalacao")}
          error={errors.responsavelEscalacao}
          placeholder="Nome e cargo do responsável pelo atendimento humano"
        />

        <MaskedInput
          label="WhatsApp para escalação"
          mask="(99) 99999-9999"
          value={whatsapp}
          onChange={(val) => setValue("contadoEscalacaoWhatsapp", val)}
          error={errors.contadoEscalacaoWhatsapp}
          placeholder="(11) 94910-5033"
        />

        <TextField
          label="Tempo máximo de resposta"
          registration={register("tempoMaximoResposta")}
          error={errors.tempoMaximoResposta}
          placeholder="Ex: 4 horas em dias úteis"
        />

        <TextField
          label="Sistema de tickets"
          registration={register("sistemaTickets")}
          error={errors.sistemaTickets}
          placeholder="Ex: Zendesk, Freshdesk, Google Sheets..."
        />
      </div>
    </div>
  );
}

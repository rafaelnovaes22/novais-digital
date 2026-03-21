"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import TimeRangePicker from "@/components/briefing/fields/TimeRangePicker";
import { HORARIOS_ATENDIMENTO } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step04Philosophy() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const horarioAtendimento = watch("horarioAtendimento") ?? [];
  const horarioInicio = watch("horarioInicio") ?? "";
  const horarioFim = watch("horarioFim") ?? "";

  const mostrarHorarioEspecifico = !horarioAtendimento.includes(
    "24 horas / 7 dias"
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Filosofia de Atendimento
        </h2>
        <p className="mt-1 text-sm text-muted">
          A personalidade do seu atendimento define como o assistente vai se
          comportar e quais limites respeitará.
        </p>
      </div>

      <div className="space-y-4">
        <TextareaField
          label="Filosofia de Atendimento"
          registration={register("filosofiaAtendimento")}
          error={errors.filosofiaAtendimento}
          rows={4}
          required
          placeholder="Como sua empresa trata os clientes? Qual é a cultura de atendimento?"
        />

        <TextField
          label="Valor Central da Empresa"
          registration={register("valorEmpresa")}
          error={errors.valorEmpresa}
          required
          placeholder="Ex: 'O cliente sempre em primeiro lugar'"
        />

        <TextareaField
          label="Proibições de Atendimento"
          registration={register("proibicoesAtendimento")}
          error={errors.proibicoesAtendimento}
          rows={2}
          placeholder="O que o assistente NUNCA deve fazer ou dizer?"
        />

        <TextareaField
          label="Exemplo de Bom Atendimento"
          registration={register("exemploBomAtendimento")}
          error={errors.exemploBomAtendimento}
          rows={3}
          placeholder="Descreva um exemplo de atendimento exemplar que já aconteceu..."
        />

        <TextareaField
          label="Exemplo de Mau Atendimento"
          registration={register("exemploMauAtendimento")}
          error={errors.exemploMauAtendimento}
          rows={3}
          placeholder="Descreva um exemplo de atendimento ruim que devemos evitar..."
        />

        <CheckboxGroup
          label="Horário de Atendimento"
          options={HORARIOS_ATENDIMENTO}
          value={horarioAtendimento}
          onChange={(val) => setValue("horarioAtendimento", val)}
          error={errors.horarioAtendimento as import("react-hook-form").FieldError | undefined}
          hint="Quando o assistente deve estar ativo?"
        />

        {mostrarHorarioEspecifico && (
          <TimeRangePicker
            label="Horário de funcionamento"
            startValue={horarioInicio}
            endValue={horarioFim}
            onStartChange={(val) => setValue("horarioInicio", val)}
            onEndChange={(val) => setValue("horarioFim", val)}
          />
        )}
      </div>
    </div>
  );
}

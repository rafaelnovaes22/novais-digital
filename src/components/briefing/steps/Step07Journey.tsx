"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step07Journey() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BriefingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Jornada do Cliente
        </h2>
        <p className="mt-1 text-sm text-muted">
          Mapeie o caminho que seus clientes percorrem para que o assistente
          possa apoiá-los no momento certo.
        </p>
      </div>

      <div className="space-y-4">
        <TextareaField
          label="Etapas da Jornada"
          registration={register("etapasJornada")}
          error={errors.etapasJornada}
          rows={4}
          required
          placeholder="Descreva as etapas que seu cliente percorre: desde a descoberta da marca até a compra..."
        />

        <TextareaField
          label="Principais Pontos de Contato"
          registration={register("pontosPrincipaisContato")}
          error={errors.pontosPrincipaisContato}
          rows={2}
          placeholder="Em quais momentos o cliente mais entra em contato? (ex: pré-venda, pós-compra)"
        />

        <TextField
          label="Duração Média do Ciclo de Venda"
          registration={register("duracaoMediaCicloVenda")}
          error={errors.duracaoMediaCicloVenda}
          placeholder="ex: 3 dias, 2 semanas, 1 mês"
        />

        <TextareaField
          label="Momento Ideal de Abordagem"
          registration={register("momentoIdealAbordagem")}
          error={errors.momentoIdealAbordagem}
          rows={2}
          placeholder="Quando é o melhor momento para o assistente abordar o cliente?"
        />

        <TextareaField
          label="Ação Após a Venda"
          registration={register("acaoAposVenda")}
          error={errors.acaoAposVenda}
          rows={2}
          placeholder="O que acontece após a venda? Há onboarding, suporte, pesquisa de satisfação?"
        />
      </div>
    </div>
  );
}

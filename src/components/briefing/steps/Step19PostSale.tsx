"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import type { BriefingFormData } from "@/lib/briefing/types";

type SimNao = "sim" | "nao";
const SIM_NAO = [
  { value: "sim" as const, label: "Sim" },
  { value: "nao" as const, label: "Não" },
];

export default function Step19PostSale() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const programaFidelidade = watch("programaFidelidade") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Pós-Venda e Informações Adicionais</h2>
        <p className="mt-1 text-sm text-muted">
          Últimas informações para completar o perfil do seu atendimento.
        </p>
      </div>

      <div className="space-y-4">
        <TextareaField
          label="Política de devolução"
          registration={register("politicaDevolucao")}
          error={errors.politicaDevolucao}
          placeholder="Como funciona sua política de devolução/cancelamento?"
          rows={2}
        />

        <TextareaField
          label="Garantia do serviço"
          registration={register("garantiaServico")}
          error={errors.garantiaServico}
          placeholder="Qual a garantia dos seus produtos/serviços?"
          rows={2}
        />

        <RadioGroup<SimNao>
          label="Possui programa de fidelidade?"
          options={SIM_NAO}
          value={programaFidelidade as SimNao | ""}
          onChange={(val) => setValue("programaFidelidade", val)}
          inline
        />

        {programaFidelidade === "sim" && (
          <TextareaField
            label="Descrição do programa de fidelidade"
            registration={register("descricaoProgramaFidelidade")}
            error={errors.descricaoProgramaFidelidade}
            placeholder="Como funciona? Quais os benefícios?"
            rows={2}
          />
        )}

        <TextField
          label="NPS / CSAT atual (se souber)"
          registration={register("npsAtual")}
          error={errors.npsAtual}
          placeholder="Ex: NPS 67, CSAT 4.2/5"
        />

        <TextareaField
          label="Principais reclamações"
          registration={register("principaisReclamacoes")}
          error={errors.principaisReclamacoes}
          placeholder="Quais são as reclamações mais frequentes que você recebe?"
          rows={2}
        />

        <TextareaField
          label="Processo de pós-venda"
          registration={register("processoPosvenda")}
          error={errors.processoPosvenda}
          placeholder="Descreva o processo de pós-venda atual."
          rows={2}
        />

        <TextareaField
          label="Informações adicionais"
          registration={register("informacoesAdicionais")}
          error={errors.informacoesAdicionais}
          placeholder="Há algo mais que queira nos contar sobre sua empresa ou suas expectativas?"
          rows={4}
          hint="Campo livre — compartilhe qualquer contexto relevante"
        />
      </div>
    </div>
  );
}

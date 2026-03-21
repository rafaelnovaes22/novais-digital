"use client";

import { useFormContext } from "react-hook-form";
import TextareaField from "@/components/briefing/fields/TextareaField";
import RepeatableField from "@/components/briefing/fields/RepeatableField";
import type { BriefingFormData, FAQItem } from "@/lib/briefing/types";

const FAQ_COLUMNS: {
  key: keyof FAQItem;
  label: string;
  placeholder?: string;
  textarea?: boolean;
}[] = [
  {
    key: "pergunta",
    label: "Pergunta",
    placeholder: "Ex: Qual é o prazo de entrega?",
  },
  {
    key: "resposta",
    label: "Resposta",
    placeholder: "Resposta que o assistente deve dar...",
    textarea: true,
  },
];

export default function Step08FAQ() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const perguntasFrequentes: FAQItem[] = watch("perguntasFrequentes") ?? [];

  const handleAdd = () => {
    setValue("perguntasFrequentes", [
      ...perguntasFrequentes,
      { pergunta: "", resposta: "" },
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = perguntasFrequentes.filter((_, i) => i !== index);
    setValue("perguntasFrequentes", updated);
  };

  const handleUpdate = (index: number, key: keyof FAQItem, value: string) => {
    const updated = perguntasFrequentes.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setValue("perguntasFrequentes", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          FAQ e Base de Conhecimento
        </h2>
        <p className="mt-1 text-sm text-muted">
          Cadastre as perguntas mais frequentes dos seus clientes para que o
          assistente responda com precisão e agilidade.
        </p>
      </div>

      <div className="space-y-4">
        <RepeatableField<FAQItem>
          label="Perguntas Frequentes"
          fields={perguntasFrequentes}
          columns={FAQ_COLUMNS}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
          addLabel="Adicionar pergunta"
        />

        <TextareaField
          label="Tópicos que o Assistente NÃO deve responder"
          registration={register("topicosNaoResponder")}
          error={errors.topicosNaoResponder}
          rows={2}
          placeholder="Tópicos, assuntos ou perguntas que o assistente NÃO deve responder..."
        />

        <TextareaField
          label="Resposta Padrão Fora do Escopo"
          registration={register("respostaPadraoForaEscopo")}
          error={errors.respostaPadraoForaEscopo}
          rows={2}
          placeholder="O que o assistente deve responder quando receber uma pergunta fora do escopo?"
        />
      </div>
    </div>
  );
}

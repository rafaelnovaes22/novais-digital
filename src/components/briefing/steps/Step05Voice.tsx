"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { TONS_VOZ } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

const TONS_VOZ_OPTIONS = TONS_VOZ.map((tom) => ({ value: tom, label: tom }));

const EMOJIS_OPTIONS = [
  { value: "sim", label: "Sim" },
  { value: "moderado", label: "Moderado" },
  { value: "nao", label: "Não" },
];

const TRATAMENTO_OPTIONS = [
  { value: "voce", label: "Você" },
  { value: "senhor_senhora", label: "Senhor/Senhora" },
];

export default function Step05Voice() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const tomVoz = watch("tomVoz") ?? "";
  const usarEmojis = watch("usarEmojis") ?? "";
  const tratamentoCliente = watch("tratamentoCliente") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Tom de Voz e Personalidade
        </h2>
        <p className="mt-1 text-sm text-muted">
          Defina como o assistente vai se comunicar para que reflita
          perfeitamente a identidade da sua marca.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          label="Tom de Voz"
          options={TONS_VOZ_OPTIONS}
          value={tomVoz}
          onChange={(val) => setValue("tomVoz", val)}
          error={errors.tomVoz}
          required
        />

        <TextField
          label="Adjetivos da Personalidade"
          registration={register("adjetivosPersonalidade")}
          error={errors.adjetivosPersonalidade}
          required
          placeholder="Ex: empático, ágil, confiável, descontraído..."
        />

        <TextField
          label="Nome do Assistente"
          registration={register("nomeAssistente")}
          error={errors.nomeAssistente}
          placeholder="Ex: Sofia, Max, Aria — deixe em branco para definirmos juntos"
        />

        <RadioGroup
          label="Usar emojis?"
          options={EMOJIS_OPTIONS}
          value={usarEmojis}
          onChange={(val) => setValue("usarEmojis", val as "sim" | "nao" | "moderado")}
          error={errors.usarEmojis}
          inline
        />

        <RadioGroup
          label="Tratamento"
          options={TRATAMENTO_OPTIONS}
          value={tratamentoCliente}
          onChange={(val) => setValue("tratamentoCliente", val as "voce" | "senhor_senhora")}
          error={errors.tratamentoCliente}
          inline
        />

        <TextareaField
          label="Linguagem Proibida"
          registration={register("linguagemProibida")}
          error={errors.linguagemProibida}
          rows={2}
          placeholder="Palavras, expressões ou temas que o assistente não deve usar..."
        />

        <TextareaField
          label="Exemplos de Mensagens"
          registration={register("exemplosMensagens")}
          error={errors.exemplosMensagens}
          rows={3}
          placeholder="Cole aqui exemplos de mensagens no estilo que você quer para o assistente..."
        />
      </div>
    </div>
  );
}

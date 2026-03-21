"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import DynamicTable from "@/components/briefing/fields/DynamicTable";
import type { BriefingFormData } from "@/lib/briefing/types";

const SIM_NAO = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

type SimNao = "sim" | "nao";

const FILIAIS_COLUMNS = [
  { key: "nome", label: "Nome/Unidade", placeholder: "Ex: Filial SP" },
  { key: "cidade", label: "Cidade", placeholder: "São Paulo" },
  { key: "estado", label: "Estado", placeholder: "SP", width: "80px" },
  { key: "telefone", label: "Telefone", placeholder: "(11) 9..." },
];

export default function Step12Branches() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const possuiFiliais = watch("possuiFiliais") ?? "";
  const atendimentoNacional = watch("atendimentoNacional") ?? "";
  const filiaisRaw = watch("filiais") ?? [];
  // Cast for DynamicTable which expects Record<string, string>[]
  const filiais = filiaisRaw as unknown as Record<string, string>[];

  const updateFiliais = (newFiliais: Record<string, string>[]) => {
    setValue("filiais", newFiliais as unknown as BriefingFormData["filiais"]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Localização e Filiais</h2>
        <p className="mt-1 text-sm text-muted">
          Informe a presença geográfica da sua empresa para configurar o atendimento regional.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup<SimNao>
          label="Possui filiais ou unidades?"
          options={SIM_NAO}
          value={possuiFiliais as SimNao | ""}
          onChange={(val) => setValue("possuiFiliais", val)}
          inline
        />

        {possuiFiliais === "sim" && (
          <div className="space-y-4">
            <TextField
              label="Quantidade de filiais"
              registration={register("quantidadeFiliais")}
              error={errors.quantidadeFiliais}
              placeholder="Ex: 3 unidades"
            />

            <DynamicTable
              label="Filiais"
              columns={FILIAIS_COLUMNS}
              rows={filiais}
              onAdd={() =>
                updateFiliais([...filiais, { nome: "", cidade: "", estado: "", telefone: "" }])
              }
              onUpdate={(index, key, value) => {
                const updated = filiais.map((row, i) =>
                  i === index ? { ...row, [key]: value } : row
                );
                updateFiliais(updated);
              }}
              onRemove={(index) =>
                updateFiliais(filiais.filter((_, i) => i !== index))
              }
              addLabel="Adicionar filial"
            />
          </div>
        )}

        <RadioGroup<SimNao>
          label="Atende todo o Brasil?"
          options={SIM_NAO}
          value={atendimentoNacional as SimNao | ""}
          onChange={(val) => setValue("atendimentoNacional", val)}
          inline
        />

        <TextareaField
          label="Regiões prioritárias"
          registration={register("regioesPrioridade")}
          error={errors.regioesPrioridade}
          placeholder="Quais regiões/cidades têm maior relevância para o seu negócio?"
          rows={2}
        />
      </div>
    </div>
  );
}

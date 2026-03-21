"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { FORMATOS_CATALOGO } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

type PossuiCatalogo = "sim" | "nao" | "parcial";
const CATALOGO_OPTIONS = [
  { value: "sim" as const, label: "Sim" },
  { value: "nao" as const, label: "Não" },
  { value: "parcial" as const, label: "Parcialmente" },
];
const FREQ_PRECOS = ["Diariamente", "Semanalmente", "Mensalmente", "Raramente"];

export default function Step16Catalog() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<BriefingFormData>();

  const possuiCatalogo = watch("possuiCatalogo") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Catálogo de Produtos e Dados</h2>
        <p className="mt-1 text-sm text-muted">
          Informe como seus produtos e dados estão organizados.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup<PossuiCatalogo>
          label="Possui catálogo estruturado?"
          options={CATALOGO_OPTIONS}
          value={possuiCatalogo as PossuiCatalogo | ""}
          onChange={(val) => setValue("possuiCatalogo", val)}
          inline
        />

        <SelectField
          label="Formato do catálogo"
          registration={register("formatoCatalogo")}
          error={errors.formatoCatalogo}
          options={FORMATOS_CATALOGO}
        />

        <TextField
          label="Quantidade de produtos/serviços"
          registration={register("quantidadeProdutos")}
          error={errors.quantidadeProdutos}
          placeholder="Quantidade aproximada de produtos/serviços ativos"
        />

        <SelectField
          label="Frequência de atualização de preços"
          registration={register("atualizacaoPrecos")}
          error={errors.atualizacaoPrecos}
          options={FREQ_PRECOS}
        />

        <TextField
          label="Sistema ERP/CRM"
          registration={register("sistemaERPCRM")}
          error={errors.sistemaERPCRM}
          placeholder="Ex: SAP, Totvs, Salesforce, RD Station..."
        />

        <TextareaField
          label="Dados sensíveis"
          registration={register("dadosSensiveis")}
          error={errors.dadosSensiveis}
          placeholder="Há dados sensíveis que o assistente NÃO deve acessar ou mencionar?"
          rows={2}
        />
      </div>
    </div>
  );
}

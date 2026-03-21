"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { FREQUENCIAS_UPDATE } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

const PROMOCOES_OPTIONS = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "ocasionalmente", label: "Ocasionalmente" },
];

export default function Step10Promos() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const possuiPromocoes = watch("possuiPromocoes") ?? "";
  const mostrarDetalhesPromocoes = possuiPromocoes !== "" && possuiPromocoes !== "nao";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Promoções e Ofertas
        </h2>
        <p className="mt-1 text-sm text-muted">
          Configure como o assistente deve lidar com promoções e comunicar
          ofertas especiais aos clientes.
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          label="Realiza promoções?"
          options={PROMOCOES_OPTIONS}
          value={possuiPromocoes}
          onChange={(val) => setValue("possuiPromocoes", val as "sim" | "nao" | "ocasionalmente")}
          error={errors.possuiPromocoes}
          inline
        />

        {mostrarDetalhesPromocoes && (
          <>
            <TextareaField
              label="Tipos de Promoções"
              registration={register("tiposPromocoes")}
              error={errors.tiposPromocoes}
              rows={2}
              placeholder="Ex: desconto de 15% no aniversário, frete grátis acima de R$ 200..."
            />

            <TextareaField
              label="Regras de Comunicação das Promoções"
              registration={register("regrasComunicacaoPromocoes")}
              error={errors.regrasComunicacaoPromocoes}
              rows={2}
              placeholder="Como o assistente deve comunicar promoções? Há restrições?"
            />

            <TextField
              label="Canal de Divulgação das Promoções"
              registration={register("canalDivulgacaoPromocoes")}
              error={errors.canalDivulgacaoPromocoes}
              placeholder="Onde as promoções são divulgadas?"
            />

            <SelectField
              label="Frequência das Promoções"
              registration={register("frequenciaPromocoes")}
              error={errors.frequenciaPromocoes}
              options={FREQUENCIAS_UPDATE}
              placeholder="Selecione a frequência"
            />
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import MaskedInput from "@/components/briefing/fields/MaskedInput";
import { SEGMENTOS, PORTES } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step01Identity() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const segmento = watch("segmento");
  const cnpj = watch("cnpj") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Identidade da Empresa
        </h2>
        <p className="mt-1 text-sm text-muted">
          Conte-nos sobre sua empresa para que possamos criar um assistente que
          realmente represente sua marca.
        </p>
      </div>

      <div className="space-y-4">
        <TextField
          label="Razão Social"
          registration={register("razaoSocial")}
          error={errors.razaoSocial}
          required
        />

        <TextField
          label="Nome Fantasia"
          registration={register("nomeFantasia")}
          error={errors.nomeFantasia}
          required
        />

        <MaskedInput
          label="CNPJ"
          mask="99.999.999/9999-99"
          value={cnpj}
          onChange={(val) => setValue("cnpj", val)}
          onBlur={() => {}}
          error={errors.cnpj}
          placeholder="00.000.000/0001-00"
        />

        <SelectField
          label="Segmento"
          registration={register("segmento")}
          error={errors.segmento}
          options={SEGMENTOS}
          placeholder="Selecione o segmento da empresa"
          required
        />

        {segmento === "Outro" && (
          <TextField
            label="Qual segmento?"
            registration={register("segmentoOutro")}
            error={errors.segmentoOutro}
            placeholder="Descreva o segmento da sua empresa..."
          />
        )}

        <SelectField
          label="Porte da Empresa"
          registration={register("porte")}
          error={errors.porte}
          options={PORTES}
          placeholder="Selecione o porte"
          required
        />

        <TextField
          label="Site"
          registration={register("site")}
          error={errors.site}
          placeholder="https://..."
        />

        <TextField
          label="Ano de Fundação"
          registration={register("anoFundacao")}
          error={errors.anoFundacao}
          placeholder="ex: 2015"
        />

        <TextareaField
          label="Descrição da Empresa"
          registration={register("descricaoEmpresa")}
          error={errors.descricaoEmpresa}
          rows={4}
          required
          placeholder="Descreva brevemente o que sua empresa faz, sua missão e o que a torna única..."
        />

        <TextareaField
          label="Diferenciais Competitivos"
          registration={register("diferenciais")}
          error={errors.diferenciais}
          rows={3}
          required
          placeholder="O que diferencia sua empresa da concorrência?"
        />
      </div>
    </div>
  );
}

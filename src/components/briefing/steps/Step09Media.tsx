"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import SelectField from "@/components/briefing/fields/SelectField";
import CheckboxGroup from "@/components/briefing/fields/CheckboxGroup";
import RadioGroup from "@/components/briefing/fields/RadioGroup";
import { TIPOS_CONTEUDO, FREQUENCIAS_UPDATE } from "@/lib/briefing/constants";
import type { BriefingFormData } from "@/lib/briefing/types";

const MANUAL_MARCA_OPTIONS = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

export default function Step09Media() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const tiposConteudoDisponiveis = watch("tiposConteudoDisponiveis") ?? [];
  const possuiManualMarca = watch("possuiManualMarca") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Mídia e Conteúdo
        </h2>
        <p className="mt-1 text-sm text-muted">
          Compartilhe os materiais disponíveis para que o assistente utilize
          conteúdo real e atualizado da sua marca.
        </p>
      </div>

      <div className="space-y-4">
        <CheckboxGroup
          label="Tipos de Conteúdo Disponíveis"
          options={TIPOS_CONTEUDO}
          value={tiposConteudoDisponiveis}
          onChange={(val) => setValue("tiposConteudoDisponiveis", val)}
          error={errors.tiposConteudoDisponiveis as import("react-hook-form").FieldError | undefined}
        />

        <TextareaField
          label="Links de Materiais"
          registration={register("linksMateriais")}
          error={errors.linksMateriais}
          rows={3}
          placeholder="Cole links de Google Drive, Dropbox, Notion, site, etc. com materiais que podemos usar..."
        />

        <RadioGroup
          label="Possui manual de marca?"
          options={MANUAL_MARCA_OPTIONS}
          value={possuiManualMarca}
          onChange={(val) => setValue("possuiManualMarca", val as "sim" | "nao")}
          error={errors.possuiManualMarca}
          inline
        />

        <TextField
          label="Responsável pelo Conteúdo"
          registration={register("responsavelConteudo")}
          error={errors.responsavelConteudo}
          placeholder="Nome e e-mail de quem atualiza os conteúdos"
        />

        <SelectField
          label="Frequência de Atualização de Conteúdo"
          registration={register("frequenciaAtualizacaoConteudo")}
          error={errors.frequenciaAtualizacaoConteudo}
          options={FREQUENCIAS_UPDATE}
          placeholder="Selecione a frequência"
        />
      </div>
    </div>
  );
}

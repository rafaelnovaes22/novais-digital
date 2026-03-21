"use client";

import { useFormContext } from "react-hook-form";
import TextareaField from "@/components/briefing/fields/TextareaField";
import CurrencyInput from "@/components/briefing/fields/CurrencyInput";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step02Products() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<BriefingFormData>();

  const ticketMedioMin = watch("ticketMedioMin") ?? "";
  const ticketMedioMax = watch("ticketMedioMax") ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Produtos e Serviços
        </h2>
        <p className="mt-1 text-sm text-muted">
          Detalhe o que você vende e para quem, para que o assistente possa
          oferecer informações precisas e relevantes.
        </p>
      </div>

      <div className="space-y-4">
        <TextareaField
          label="Principais Produtos ou Serviços"
          registration={register("principaisProdutos")}
          error={errors.principaisProdutos}
          rows={4}
          required
          placeholder="Liste os principais produtos ou serviços que você oferece..."
        />

        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <CurrencyInput
              label="Ticket Médio Mínimo"
              value={ticketMedioMin}
              onChange={(val) => setValue("ticketMedioMin", val)}
              onBlur={() => {}}
              error={errors.ticketMedioMin}
              placeholder="R$ 0,00"
            />
            <CurrencyInput
              label="Ticket Médio Máximo"
              value={ticketMedioMax}
              onChange={(val) => setValue("ticketMedioMax", val)}
              onBlur={() => {}}
              error={errors.ticketMedioMax}
              placeholder="R$ 0,00"
            />
          </div>
          <p className="text-xs text-muted">
            Faixa de ticket médio (opcional)
          </p>
        </div>

        <TextareaField
          label="Público-Alvo"
          registration={register("publicoAlvo")}
          error={errors.publicoAlvo}
          rows={3}
          required
          placeholder="Descreva seu cliente ideal: faixa etária, profissão, comportamento..."
        />

        <TextareaField
          label="Dores do Público"
          registration={register("doresPublico")}
          error={errors.doresPublico}
          rows={3}
          required
          placeholder="Quais são as principais dores, problemas ou necessidades do seu público?"
        />

        <TextareaField
          label="Restrições de Produtos"
          registration={register("restricoesProdutos")}
          error={errors.restricoesProdutos}
          rows={2}
          placeholder="Há algum produto/serviço que NÃO deve ser mencionado? Restrições de comunicação?"
        />
      </div>
    </div>
  );
}

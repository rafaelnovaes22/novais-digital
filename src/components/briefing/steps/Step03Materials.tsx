"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import TextareaField from "@/components/briefing/fields/TextareaField";
import type { BriefingFormData } from "@/lib/briefing/types";
import { Globe, Instagram, Facebook, Linkedin, Link } from "lucide-react";

export default function Step03Materials() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BriefingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Envie seus links
        </h2>
        <p className="mt-1 text-sm text-muted">
          Nossa IA vai analisar seus canais para entender sua empresa, tom de
          voz, produtos e público — sem você precisar digitar tudo isso.
        </p>
      </div>

      <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-accent font-medium mb-1">
          Por que pedimos links?
        </p>
        <p className="text-xs text-muted">
          Em vez de você preencher dezenas de campos sobre tom de voz, catálogo,
          FAQ e valores da empresa, nossa IA faz esse trabalho automaticamente.
          Na reunião de alinhamento, você só valida o que montamos.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Globe size={16} className="text-accent" />
            Site da empresa
          </label>
          <input
            type="url"
            placeholder="https://suaempresa.com.br"
            {...register("linkSite")}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Instagram size={16} className="text-accent" />
            Instagram
          </label>
          <input
            type="url"
            placeholder="https://instagram.com/suaempresa"
            {...register("linkInstagram")}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Facebook size={16} className="text-accent" />
            Facebook
          </label>
          <input
            type="url"
            placeholder="https://facebook.com/suaempresa"
            {...register("linkFacebook")}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Linkedin size={16} className="text-accent" />
            LinkedIn
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/company/suaempresa"
            {...register("linkLinkedin")}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Link size={16} className="text-accent" />
            Outros links ou materiais
          </label>
          <textarea
            rows={3}
            placeholder="Google Meu Negócio, catálogos online, drives com PDFs..."
            {...register("outrosLinks")}
            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
          <p className="text-xs text-muted">
            Cole aqui qualquer link útil — quanto mais material, melhor o
            resultado da nossa análise automatizada
          </p>
        </div>

        <TextareaField
          label="Observações ou algo mais que queira nos contar"
          registration={register("observacoes")}
          error={errors.observacoes}
          rows={3}
          placeholder="Informações adicionais, preferências, restrições..."
          hint="Opcional — fique à vontade"
        />
      </div>
    </div>
  );
}

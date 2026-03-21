"use client";

import { useFormContext } from "react-hook-form";
import TextField from "@/components/briefing/fields/TextField";
import type { BriefingFormData } from "@/lib/briefing/types";

export default function Step01Contact() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BriefingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Vamos começar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Precisamos apenas dos seus dados de contato para dar o próximo passo.
        </p>
      </div>

      <div className="space-y-4">
        <TextField
          label="Seu nome completo"
          registration={register("nomeCompleto")}
          error={errors.nomeCompleto}
          placeholder="Ex: João Silva"
          required
        />

        <TextField
          label="Nome da empresa"
          registration={register("empresa")}
          error={errors.empresa}
          placeholder="Ex: Minha Empresa Ltda"
          required
        />

        <TextField
          label="E-mail"
          registration={register("email")}
          error={errors.email}
          placeholder="joao@empresa.com.br"
          type="email"
          required
        />

        <TextField
          label="WhatsApp"
          registration={register("whatsapp")}
          error={errors.whatsapp}
          placeholder="(11) 99999-9999"
          required
        />

        <TextField
          label="Cargo / Função"
          registration={register("cargo")}
          error={errors.cargo}
          placeholder="Ex: Diretor Comercial"
          hint="Opcional — nos ajuda a personalizar a conversa"
        />
      </div>
    </div>
  );
}

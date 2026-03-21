import { z } from "zod";

// Schema do Briefing Invisível — 3 etapas simples

// Etapa 1: Dados de Contato
export const step01Schema = z.object({
  nomeCompleto: z.string().min(2, "Nome obrigatório"),
  empresa: z.string().min(2, "Nome da empresa obrigatório"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "WhatsApp obrigatório"),
  cargo: z.string().optional(),
});

// Etapa 2: Objetivo e Dor Principal
export const step02Schema = z.object({
  objetivoPrincipal: z.enum(
    ["vendas", "agendamento", "suporte", "qualificacao", "outro"],
    { message: "Selecione o objetivo principal" }
  ),
  objetivoOutro: z.string().optional(),
  maiorDor: z
    .string()
    .min(10, "Descreva sua maior dor com pelo menos 10 caracteres"),
  volumeAtendimentos: z.string().optional(),
  jaUsaIA: z.enum(["sim", "nao"]).optional(),
});

// Etapa 3: Ingestão de Dados (links e materiais)
export const step03Schema = z.object({
  linkSite: z.string().optional(),
  linkInstagram: z.string().optional(),
  linkFacebook: z.string().optional(),
  linkLinkedin: z.string().optional(),
  outrosLinks: z.string().optional(),
  observacoes: z.string().optional(),
});

// Schema completo
export const briefingSchema = z.object({
  ...step01Schema.shape,
  ...step02Schema.shape,
  ...step03Schema.shape,
});

export type BriefingSchema = typeof briefingSchema;

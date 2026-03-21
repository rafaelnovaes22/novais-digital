import { z } from "zod";
import { briefingSchema } from "./schema";

export type BriefingFormData = z.infer<typeof briefingSchema>;

export interface BriefingDraft {
  data: Partial<BriefingFormData>;
  currentStep: number;
  lastSaved: string;
}

export interface FAQItem extends Record<string, string> {
  pergunta: string;
  resposta: string;
}

export interface Filial {
  nome: string;
  cidade: string;
  estado: string;
  telefone?: string;
}

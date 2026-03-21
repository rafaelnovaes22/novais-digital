import { z } from "zod";
import { briefingSchema } from "./schema";

export type BriefingFormData = z.infer<typeof briefingSchema>;

export interface BriefingDraft {
  data: Partial<BriefingFormData>;
  currentStep: number;
  lastSaved: string;
}

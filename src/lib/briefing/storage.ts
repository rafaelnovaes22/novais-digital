import { BriefingDraft, BriefingFormData } from "./types";

const STORAGE_KEY = "novais-briefing-draft";

export function saveDraft({ data, currentStep }: { data: Partial<BriefingFormData>; currentStep: number }): void {
  if (typeof window === "undefined") return;
  const draft: BriefingDraft = {
    data,
    currentStep,
    lastSaved: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadDraft(): BriefingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BriefingDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function formatLastSaved(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

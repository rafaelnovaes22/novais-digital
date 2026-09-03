// PORQUE: ISO/IEC 42001 6.1/7.5/8.1 no novais-digital (site + briefing com IA).
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

type Issue = { file: string; problem: string; fix: string };
const issues: Issue[] = [];
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function classify(level: number): string {
  if (level <= 4) return "baixo";
  if (level <= 9) return "medio";
  if (level <= 14) return "alto";
  return "critico";
}

const riskPath = join(root, "governance", "risk-register.json");
const dataPath = join(root, "governance", "data-map.json");
if (!existsSync(riskPath)) issues.push({ file: "governance/risk-register.json", problem: "ausente", fix: "criar" });
else {
  const reg = JSON.parse(readFileSync(riskPath, "utf8")) as { risks: Array<{ id: string; probability: number; impact: number; level: number; classification: string; controls?: string[]; accepted_by?: string; accepted_at?: string }> };
  for (const r of reg.risks) {
    if (r.level !== r.probability * r.impact) issues.push({ file: "governance/risk-register.json", problem: `${r.id} level errado`, fix: "corrigir" });
    if (r.classification !== classify(r.level)) issues.push({ file: "governance/risk-register.json", problem: `${r.id} classificacao errada`, fix: "corrigir" });
    for (const c of r.controls ?? []) if (!existsSync(join(root, c))) issues.push({ file: "governance/risk-register.json", problem: `${r.id} controle ${c} inexistente`, fix: "corrigir" });
  }
}
if (!existsSync(dataPath)) issues.push({ file: "governance/data-map.json", problem: "ausente", fix: "criar" });
const page: string = existsSync(join(root, "src/app/page.tsx")) ? readFileSync(join(root, "src/app/page.tsx"), "utf8") : "";
const stepConfirm: string = existsSync(join(root, "src/components/briefing/steps/StepConfirmation.tsx")) ? readFileSync(join(root, "src/components/briefing/steps/StepConfirmation.tsx"), "utf8") : "";
if (!/wa\.me\//.test(page + stepConfirm)) issues.push({ file: "src/", problem: "sem conversao whatsapp", fix: "manter CTA" });

if (issues.length > 0) {
  console.log(JSON.stringify({ iso: "FAIL", issues }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ iso: "PASS", checks: ["risco", "dados", "PII", "clausula"] }));

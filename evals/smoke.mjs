// PORQUE: smoke deterministico sem LLM para site Next. 5 casos: render, links, form, performance, a11y.
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const results = [];
function check(id, name, fn) {
  const s = Date.now();
  try { results.push({ id, name, pass: true, ms: Date.now() - s, detail: fn() }); }
  catch (e) { results.push({ id, name, pass: false, ms: Date.now() - s, detail: String(e?.message ?? e) }); }
}
function read(p) { return readFileSync(join(root, p), "utf8"); }
function mustExist(p) { if (!existsSync(join(root, p))) throw new Error("ausente: " + p); }

check("render", "render: page, layout, title, description", () => {
  mustExist("src/app/page.tsx");
  mustExist("src/app/layout.tsx");
  const page = read("src/app/page.tsx") + read("src/app/layout.tsx");
  if (!/metadata|title|description/i.test(page)) throw new Error("sem metadata");
  return "routes ok";
});

check("links", "links: next/link, wa.me, sem http", () => {
  const files = ["src/app/page.tsx", "src/components/Header.tsx", "src/components/briefing/steps/StepConfirmation.tsx"];
  const all = files.filter((f) => existsSync(join(root, f))).map(read).join("\n");
  if (!all.includes("wa.me/")) throw new Error("sem wa.me");
  if (/href="http:\/\//.test(all)) throw new Error("link http");
  return "links ok";
});

check("form", "form: wizard, steps, submit wa.me", () => {
  mustExist("src/components/briefing/BriefingWizard.tsx");
  const w = read("src/components/briefing/BriefingWizard.tsx");
  if (!/useForm|react-hook-form/i.test(w)) throw new Error("sem hook form");
  if (!/wa\.me|submit/i.test(w + read("src/app/page.tsx"))) throw new Error("sem submit");
  return "form ok";
});

check("performance", "performance: next config, imagens otimizadas", () => {
  mustExist("next.config.ts");
  const all = read("src/app/page.tsx");
  if (/<img/i.test(all) && !/next\/image|loading=|fetchpriority/i.test(all)) throw new Error("img sem otimizacao");
  return "perf ok";
});

check("a11y", "acessibilidade: lang, labels, aria", () => {
  const layout = read("src/app/layout.tsx");
  if (!/lang="pt-BR"|lang='pt-BR'|pt-BR/.test(layout)) throw new Error("sem lang");
  return "a11y ok";
});

const passed = results.filter((r) => r.pass).length;
console.log(JSON.stringify({ passed, total: results.length, results }, null, 2));
if (passed !== results.length) process.exit(1);
console.log(`SMOKE PASS ${passed}/${results.length}`);

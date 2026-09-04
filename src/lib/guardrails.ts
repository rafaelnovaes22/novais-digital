// PORQUE: guardrails 3 camadas onde ha LLM/mock assistente.
// L1 input: tamanho + injection 34 padroes PT-BR/EN + sanitizacao + log JSON.
// L2 output: tamanho + vazamento prompt + PII mascarada.
// L3 operacao: rate limit + custo + auditoria. Sem alegar LLM real quando mock.
export interface GuardValidation { ok: boolean; sanitized?: string; reason?: string; patterns?: string[] }
export const INJECTION_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: "ignore_instructions_en", re: /ignore\s+(previous|prior|above)\s+(instructions?|prompts?|rules?)/i },
  { name: "ignore_instructions_pt", re: /esque[cç]a\s+(as\s+)?instru[cç][oõ]es/i },
  { name: "disregard_rules_pt", re: /desconsidere\s+(as\s+)?regras/i },
  { name: "esqueca_tudo_pt", re: /esque[cç]a\s+tudo/i },
  { name: "role_manipulation_en", re: /you\s+are\s+now\s+(an?\s+|the\s+)?(admin|developer|root|system|dan)/i },
  { name: "role_manipulation_pt", re: /voc[eê] agora [eé]/i },
  { name: "act_as_dev_en", re: /act\s+as\s+(a\s+|an\s+)?(developer|admin|root|system)/i },
  { name: "from_now_on_pt", re: /a\s+partir\s+de\s+agora\s+voc[eê]/i },
  { name: "dan_mode", re: /dan\s*mode|developer\s*mode|god\s*mode|jailbreak/i },
  { name: "system_prefix", re: /^\s*(system|assistant)\s*[:\]]\s*/i },
  { name: "bracket_system", re: /\[(system|assistant|admin)\]/i },
  { name: "show_prompt_en", re: /show\s+(me\s+)?(your|the)\s+(prompt|instructions?|system\s*prompt)/i },
  { name: "show_prompt_pt", re: /me\s+(diga|mostre|envie)\s+(seu|o\s+seu)\s+(system\s+)?prompt/i },
  { name: "qual_instrucao_pt", re: /qual\s+[eé]\s+a\s+sua\s+instru[cç][aã]o/i },
  { name: "quais_instrucoes_pt", re: /quais\s+s[aã]o\s+(as\s+)?suas\s+instru[cç][oõ]es/i },
  { name: "prompt_extraction_en", re: /what\s+(is|are)\s+your\s+(system\s+)?(instructions?|rules?|guidelines?)/i },
  { name: "override_system_en", re: /override\s+(system|the\s+system|your)\s+(prompt|instructions?)/i },
  { name: "new_instructions", re: /new\s+instructions?:|nova\s+instru[cç][aã]o:/i },
  { name: "forget_everything", re: /forget\s+everything|esque[cç]a\s+tudo/i },
  { name: "reveal_system_en", re: /reveal\s+(your|the)\s+system\s+(prompt|message)/i },
  { name: "revele_sistema_pt", re: /revele\s+(seu|o\s+seu)\s+(prompt|sistema)|mostre\s+o\s+sistema/i },
  { name: "pretend_to_be", re: /pretend\s+(to\s+be|you\s+are)|finja\s+que\s+voc[eê]/i },
  { name: "secret_extraction", re: /what\s+(is|are)\s+(your|the)\s+(api|secret|access)\s+(key|token)/i },
  { name: "admin_access", re: /give\s+me\s+(admin|root|access)|me\s+d[eê]\s+(acesso|admin)/i },
  { name: "base64_obfuscation", re: /base64|decode\s+this|decodifique/i },
  { name: "hex_escape", re: /\\x[0-9a-f]{2}/i },
  { name: "url_encoding", re: /%[0-9a-f]{2}/i },
  { name: "sql_drop", re: /\b(drop|delete|truncate)\b\s+(table|from|database)/i },
  { name: "sql_union", re: /union\s+select/i },
  { name: "sql_or_injection", re: /or[^a-z]*1[^a-z]*=[^a-z]*1/i },
  { name: "sql_insert", re: /\binsert\s+into\b/i },
  { name: "sql_update_set", re: /\bupdate\s+\w+\s+set\b/i },
  { name: "excessive_special_chars", re: /[^\w\s\u00C0-\u017F]{30,}/ },
  { name: "char_flooding", re: /(.)\1{10,}/ },
];
const PII_RES: Array<{ name: string; re: RegExp }> = [
  { name: "email", re: /[\w.-]+@[\w.-]+\.\w+/ },
  { name: "cpf", re: /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/ },
  { name: "phone_br", re: /(\+55\s?)?\(?\d{2}\)?\s?9?\d{4}-?\d{4}/ },
];
export const MAX_INPUT = 500;
export function sanitizeInput(s: string): string {
  return s.replace(/[\x00-\x1F\x7F-\x9F]/g, "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, MAX_INPUT);
}
export function detectInjection(text: string): string[] {
  const out: string[] = [];
  for (const p of INJECTION_PATTERNS) { try { if (p.re.test(text)) out.push(p.name); } catch { /* noop */ } }
  return out;
}
export function logJson(event: Record<string, unknown>): void {
  console.log(JSON.stringify({ ts: new Date().toISOString(), area: "guardrails", ...event }));
}
// L1
export function validateInput(raw: string): GuardValidation {
  if (!raw || !raw.trim()) return { ok: false, reason: "empty_message" };
  if (raw.length > MAX_INPUT) return { ok: false, reason: "message_too_long" };
  const text = sanitizeInput(raw);
  const found = detectInjection(text);
  if (found.length > 0) {
    logJson({ event: "injection_blocked", patterns: found });
    return { ok: false, reason: "prompt_injection_detected", patterns: found, sanitized: text };
  }
  return { ok: true, sanitized: text };
}
// L2
export function validateOutput(out: string): GuardValidation {
  if (out.length > 4096) return { ok: false, reason: "output_too_long" };
  if (/you are a|your role is|as an ai|voc[eê] [eé] uma ia|como modelo de linguagem/i.test(out)) {
    logJson({ event: "output_leak_blocked" });
    return { ok: false, reason: "output_leak_detected" };
  }
  let masked = out;
  for (const p of PII_RES) masked = masked.replace(p.re, "[REDACTED]");
  return { ok: true, sanitized: masked };
}
// L3 rate limit em memoria
const hits = new Map<string, number[]>();
export function checkRate(key: string, n = 5, ms = 60000): boolean {
  const t = Date.now();
  const arr = (hits.get(key) ?? []).filter((x) => t - x < ms);
  if (arr.length >= n) return false;
  arr.push(t);
  hits.set(key, arr);
  return true;
}

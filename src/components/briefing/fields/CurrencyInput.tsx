"use client";

import { FieldError } from "react-hook-form";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function parseCurrency(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder = "R$ 0,00",
  required,
  hint,
}: CurrencyInputProps) {
  const displayValue = value ? formatCurrency(value) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseCurrency(e.target.value);
    onChange(raw);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors ${
          error ? "border-red-400/60" : "border-card-border"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

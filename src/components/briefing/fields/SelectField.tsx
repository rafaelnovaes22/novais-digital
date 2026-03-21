"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  options: string[];
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

export default function SelectField({
  label,
  registration,
  error,
  options,
  placeholder = "Selecione...",
  required,
  hint,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <select
        {...registration}
        className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer ${
          error ? "border-red-400/60" : "border-card-border"
        }`}
      >
        <option value="" className="bg-background">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-background">
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

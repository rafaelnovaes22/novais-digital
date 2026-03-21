"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextareaFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
}

export default function TextareaField({
  label,
  registration,
  error,
  placeholder,
  required,
  rows = 4,
  hint,
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...registration}
        className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none ${
          error ? "border-red-400/60" : "border-card-border"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

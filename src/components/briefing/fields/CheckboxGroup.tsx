"use client";

import { FieldError } from "react-hook-form";

interface CheckboxGroupProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: FieldError;
  required?: boolean;
  hint?: string;
}

export default function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  error,
  required,
  hint,
}: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt);
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                checked
                  ? "border-accent/60 bg-accent/10 text-foreground"
                  : "border-card-border bg-background/50 text-foreground/70 hover:border-accent/30"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked ? "border-accent bg-accent" : "border-muted/40"
                }`}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggle(opt)}
              />
              <span className="text-sm">{opt}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

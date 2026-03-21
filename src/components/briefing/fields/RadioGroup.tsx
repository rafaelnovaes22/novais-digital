"use client";

import { FieldError } from "react-hook-form";

interface RadioGroupProps<T extends string = string> {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
  error?: FieldError;
  required?: boolean;
  hint?: string;
  inline?: boolean;
}

export default function RadioGroup<T extends string = string>({
  label,
  options,
  value,
  onChange,
  error,
  required,
  hint,
  inline = false,
}: RadioGroupProps<T>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <div className={`flex ${inline ? "flex-row flex-wrap gap-3" : "flex-col gap-2"}`}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                selected
                  ? "border-accent/60 bg-accent/10 text-foreground"
                  : "border-card-border bg-background/50 text-foreground/70 hover:border-accent/30"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected ? "border-accent" : "border-muted/40"
                }`}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-accent" />}
              </div>
              <input
                type="radio"
                className="sr-only"
                checked={selected}
                onChange={() => onChange(opt.value as T)}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

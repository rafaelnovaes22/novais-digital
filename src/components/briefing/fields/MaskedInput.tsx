"use client";

import { useCallback } from "react";
import { FieldError } from "react-hook-form";

interface MaskedInputProps {
  label: string;
  mask: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

function applyMask(raw: string, mask: string): string {
  const digits = raw.replace(/\D/g, "");
  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === "9") {
      result += digits[digitIndex++];
    } else {
      result += mask[i];
      if (digits[digitIndex] === mask[i]) {
        digitIndex++;
      }
    }
  }

  return result;
}

export default function MaskedInput({
  label,
  mask,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
  hint,
}: MaskedInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(e.target.value, mask);
      onChange(masked);
    },
    [mask, onChange]
  );

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
        value={value}
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

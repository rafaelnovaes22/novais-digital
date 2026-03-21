"use client";

import { Plus, Trash2 } from "lucide-react";

interface RepeatableFieldProps<T extends Record<string, string>> {
  label: string;
  fields: T[];
  columns: { key: keyof T; label: string; placeholder?: string; textarea?: boolean }[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, key: keyof T, value: string) => void;
  addLabel?: string;
  required?: boolean;
  hint?: string;
  maxItems?: number;
}

export default function RepeatableField<T extends Record<string, string>>({
  label,
  fields,
  columns,
  onAdd,
  onRemove,
  onUpdate,
  addLabel = "Adicionar",
  required,
  hint,
  maxItems = 20,
}: RepeatableFieldProps<T>) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-background/50 border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-card-border bg-white/[0.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-medium">#{index + 1}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            {columns.map((col) =>
              col.textarea ? (
                <textarea
                  key={String(col.key)}
                  value={field[col.key] ?? ""}
                  onChange={(e) => onUpdate(index, col.key, e.target.value)}
                  placeholder={col.placeholder || col.label}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              ) : (
                <div key={String(col.key)} className="space-y-1">
                  <label className="text-xs text-muted">{col.label}</label>
                  <input
                    type="text"
                    value={field[col.key] ?? ""}
                    onChange={(e) => onUpdate(index, col.key, e.target.value)}
                    placeholder={col.placeholder || col.label}
                    className={inputClass}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      {fields.length < maxItems && (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-accent/40 text-accent text-sm hover:bg-accent/10 transition-colors"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      )}
    </div>
  );
}

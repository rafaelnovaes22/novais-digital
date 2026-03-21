"use client";

import { Plus, Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  placeholder?: string;
  width?: string;
}

interface DynamicTableProps {
  label: string;
  rows: Record<string, string>[];
  columns: Column[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, key: string, value: string) => void;
  addLabel?: string;
  required?: boolean;
  hint?: string;
  maxRows?: number;
}

export default function DynamicTable({
  label,
  rows,
  columns,
  onAdd,
  onRemove,
  onUpdate,
  addLabel = "Adicionar linha",
  required,
  hint,
  maxRows = 50,
}: DynamicTableProps) {
  const inputClass =
    "w-full px-2 py-1.5 rounded-lg bg-background/50 border border-card-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors text-sm";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-white/[0.02]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-2 text-left text-xs font-medium text-muted"
                    style={{ width: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-card-border last:border-0">
                  {columns.map((col) => (
                    <td key={col.key} className="px-2 py-2">
                      <input
                        type="text"
                        value={row[col.key] ?? ""}
                        onChange={(e) => onUpdate(index, col.key, e.target.value)}
                        placeholder={col.placeholder || col.label}
                        className={inputClass}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      className="p-1 rounded text-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {rows.length < maxRows && (
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

"use client";

import { Upload, X, FileText } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  hint?: string;
  onChange?: (files: File[]) => void;
}

export default function FileUploadField({
  label,
  accept,
  multiple = false,
  required,
  hint,
  onChange,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    const updated = multiple ? [...files, ...arr] : arr;
    setFiles(updated);
    onChange?.(updated);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-accent bg-accent/10"
            : "border-card-border hover:border-accent/40"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <Upload className="mx-auto mb-2 text-muted" size={24} />
        <p className="text-sm text-muted">
          Arraste arquivos aqui ou{" "}
          <span className="text-accent underline">clique para selecionar</span>
        </p>
        {accept && <p className="text-xs text-muted/60 mt-1">{accept}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-lg border border-card-border bg-white/[0.02]"
            >
              <FileText size={16} className="text-accent flex-shrink-0" />
              <span className="text-sm truncate flex-1">{file.name}</span>
              <span className="text-xs text-muted">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="p-1 rounded text-muted hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

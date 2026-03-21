"use client";

interface TimeRangePickerProps {
  label: string;
  startValue: string;
  endValue: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  required?: boolean;
  hint?: string;
}

export default function TimeRangePicker({
  label,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  required,
  hint,
}: TimeRangePickerProps) {
  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-background/50 border border-card-border text-foreground focus:outline-none focus:border-accent/50 transition-colors";

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <div className="flex items-center gap-3">
        <input
          type="time"
          value={startValue}
          onChange={(e) => onStartChange(e.target.value)}
          className={inputClass}
        />
        <span className="text-muted text-sm flex-shrink-0">até</span>
        <input
          type="time"
          value={endValue}
          onChange={(e) => onEndChange(e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}

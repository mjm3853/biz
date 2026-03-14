interface ScoreInputProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  rationale?: string;
  onRationaleChange?: (value: string) => void;
}

const scoreColor = (v: number) => {
  if (v >= 8) return "text-green-600";
  if (v >= 5) return "text-amber-600";
  return "text-red-600";
};

const barColor = (v: number) => {
  if (v >= 8) return "bg-green-500";
  if (v >= 5) return "bg-amber-500";
  return "bg-red-500";
};

export default function ScoreInput({
  label,
  description,
  value,
  onChange,
  rationale,
  onRationaleChange,
}: ScoreInputProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-900">{label}</span>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <span className={`text-lg font-bold tabular-nums ${scoreColor(value)}`}>{value}</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none cursor-pointer accent-gray-900"
        />
        <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor(value)}`}
            style={{ width: `${value * 10}%` }}
          />
        </div>
      </div>
      {onRationaleChange !== undefined && (
        <input
          type="text"
          placeholder="Brief rationale..."
          value={rationale ?? ""}
          onChange={(e) => onRationaleChange?.(e.target.value)}
          className="w-full text-xs px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-600 placeholder:text-gray-300"
        />
      )}
    </div>
  );
}

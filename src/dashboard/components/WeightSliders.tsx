import { CATEGORIES } from "../../db/constants";

interface WeightSlidersProps {
  weights: Record<string, number>;
  onChange: (category: string, weight: number) => void;
}

export default function WeightSliders({ weights, onChange }: WeightSlidersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Weights</h3>
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const w = weights[cat.key] ?? 1;
          return (
            <div key={cat.key} className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-xs text-gray-600 w-28 flex-shrink-0">{cat.label}</span>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={w}
                onChange={(e) => onChange(cat.key, Number(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-gray-700"
              />
              <span className="text-xs font-mono text-gray-500 w-6 text-right">
                {w.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

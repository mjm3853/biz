import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import type { Severity } from "../types/analysis";

interface RiskSummaryProps {
  overallRisk: Severity;
  summary: string;
  clauseCounts: { high: number; medium: number; low: number };
  onReset: () => void;
}

const riskConfig: Record<Severity, { bg: string; icon: typeof Shield; label: string }> = {
  low: { bg: "bg-green-50 border-green-200", icon: ShieldCheck, label: "Low Risk" },
  medium: { bg: "bg-yellow-50 border-yellow-200", icon: Shield, label: "Medium Risk" },
  high: { bg: "bg-red-50 border-red-200", icon: ShieldAlert, label: "High Risk" },
};

const riskTextColor: Record<Severity, string> = {
  low: "text-green-700",
  medium: "text-yellow-700",
  high: "text-red-700",
};

export default function RiskSummary({ overallRisk, summary, clauseCounts, onReset }: RiskSummaryProps) {
  const config = riskConfig[overallRisk];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border p-6 ${config.bg}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-8 h-8 ${riskTextColor[overallRisk]}`} />
          <div>
            <h2 className={`text-xl font-bold ${riskTextColor[overallRisk]}`}>{config.label}</h2>
            <div className="flex gap-3 mt-1 text-xs">
              {clauseCounts.high > 0 && <span className="text-red-600 font-medium">{clauseCounts.high} high risk</span>}
              {clauseCounts.medium > 0 && <span className="text-yellow-600 font-medium">{clauseCounts.medium} medium risk</span>}
              {clauseCounts.low > 0 && <span className="text-green-600 font-medium">{clauseCounts.low} standard</span>}
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-white transition-colors"
        >
          Scan Another
        </button>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
}

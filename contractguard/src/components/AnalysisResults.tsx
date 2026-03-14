import { CheckCircle } from "lucide-react";
import type { AnalysisResponse } from "../types/analysis";
import RiskSummary from "./RiskSummary";
import ClauseCard from "./ClauseCard";

interface AnalysisResultsProps {
  analysis: AnalysisResponse;
  onReset: () => void;
}

export default function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  const clauseCounts = {
    high: analysis.clauses.filter((c) => c.severity === "high").length,
    medium: analysis.clauses.filter((c) => c.severity === "medium").length,
    low: analysis.clauses.filter((c) => c.severity === "low").length,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <RiskSummary
        overallRisk={analysis.overallRisk}
        summary={analysis.summary}
        clauseCounts={clauseCounts}
        onReset={onReset}
      />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Flagged Clauses ({analysis.clauses.length})
        </h3>
        <div className="space-y-3">
          {analysis.clauses
            .sort((a, b) => {
              const order = { high: 0, medium: 1, low: 2 };
              return order[a.severity] - order[b.severity];
            })
            .map((clause, i) => (
              <ClauseCard key={clause.id} clause={clause} defaultExpanded={i === 0} />
            ))}
        </div>
      </div>

      {analysis.positives.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard / Fair Terms</h3>
          <div className="bg-green-50 rounded-xl border border-green-200 p-4 space-y-2">
            {analysis.positives.map((positive, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{positive}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

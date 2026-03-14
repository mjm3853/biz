import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import type { FlaggedClause } from "../types/analysis";
import SeverityBadge from "./SeverityBadge";

const categoryLabels: Record<string, string> = {
  liability: "Liability",
  termination: "Termination",
  intellectual_property: "IP Rights",
  non_compete: "Non-Compete",
  data_privacy: "Data Privacy",
  auto_renewal: "Auto-Renewal",
  arbitration: "Arbitration",
  indemnification: "Indemnification",
  payment: "Payment",
  confidentiality: "Confidentiality",
  other: "Other",
};

export default function ClauseCard({ clause, defaultExpanded }: { clause: FlaggedClause; defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(clause.suggestedAlternative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <SeverityBadge severity={clause.severity} />
        <span className="font-medium text-gray-900 flex-1">{clause.title}</span>
        <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-100 rounded">
          {categoryLabels[clause.category] ?? clause.category}
        </span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Original Clause</p>
            <blockquote className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border-l-3 border-gray-300 italic">
              "{clause.originalText}"
            </blockquote>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Why This Matters</p>
            <p className="text-sm text-gray-700 leading-relaxed">{clause.explanation}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Suggested Counter-Language</p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="text-sm text-gray-700 bg-amber-50 rounded-lg p-3 border border-amber-200">
              {clause.suggestedAlternative}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

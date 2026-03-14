import type { Severity } from "../types/analysis";

const styles: Record<Severity, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const labels: Record<Severity, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[severity]}`}>
      {labels[severity]}
    </span>
  );
}

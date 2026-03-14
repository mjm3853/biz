export type Severity = "low" | "medium" | "high";

export type ClauseCategory =
  | "liability"
  | "termination"
  | "intellectual_property"
  | "non_compete"
  | "data_privacy"
  | "auto_renewal"
  | "arbitration"
  | "indemnification"
  | "payment"
  | "confidentiality"
  | "other";

export interface FlaggedClause {
  id: string;
  title: string;
  originalText: string;
  explanation: string;
  severity: Severity;
  category: ClauseCategory;
  suggestedAlternative: string;
}

export interface AnalysisResponse {
  summary: string;
  overallRisk: Severity;
  clauses: FlaggedClause[];
  positives: string[];
}

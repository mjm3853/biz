export interface DimensionDef {
  key: string;
  label: string;
  description: string;
  inverted?: boolean; // true means "10 = best scenario" for a naturally negative trait
}

export interface CategoryDef {
  key: string;
  label: string;
  color: string;
  dimensions: DimensionDef[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    key: "market",
    label: "Market",
    color: "#3b82f6",
    dimensions: [
      { key: "market_size", label: "Market Size (TAM)", description: "Total addressable market magnitude" },
      { key: "market_growth", label: "Market Growth", description: "CAGR and trajectory of the market" },
      { key: "market_timing", label: "Market Timing", description: "Is the market ready for this now?" },
    ],
  },
  {
    key: "feasibility",
    label: "Feasibility",
    color: "#10b981",
    dimensions: [
      { key: "tech_complexity", label: "Technical Simplicity", description: "How simple is the tech to build? (10 = trivial)", inverted: true },
      { key: "time_to_mvp", label: "Speed to MVP", description: "How fast can you ship an MVP? (10 = days)", inverted: true },
      { key: "resource_req", label: "Low Resource Needs", description: "How few resources are needed? (10 = solo founder)", inverted: true },
    ],
  },
  {
    key: "business_model",
    label: "Business Model",
    color: "#f59e0b",
    dimensions: [
      { key: "revenue_potential", label: "Revenue Potential", description: "Magnitude of potential revenue" },
      { key: "unit_economics", label: "Unit Economics", description: "Strength of per-unit profitability" },
      { key: "margins", label: "Margins", description: "Gross margin potential (software = high)" },
      { key: "ltv_cac", label: "LTV/CAC Ratio", description: "Lifetime value vs. acquisition cost" },
    ],
  },
  {
    key: "competitive",
    label: "Competitive",
    color: "#ef4444",
    dimensions: [
      { key: "defensibility", label: "Defensibility", description: "Strength of moat (network effects, data, switching costs)" },
      { key: "competition", label: "Low Competition", description: "How uncrowded is the space? (10 = blue ocean)", inverted: true },
      { key: "differentiation", label: "Differentiation", description: "How unique is the value proposition?" },
    ],
  },
  {
    key: "execution_risk",
    label: "Execution Risk",
    color: "#8b5cf6",
    dimensions: [
      { key: "team_fit", label: "Team Fit", description: "Does the builder have the right skills?" },
      { key: "regulatory_risk", label: "Low Regulatory Risk", description: "How few regulatory hurdles? (10 = none)", inverted: true },
      { key: "dependencies", label: "Low Dependencies", description: "How few external dependencies? (10 = self-contained)", inverted: true },
    ],
  },
  {
    key: "experimentation",
    label: "Experimentation",
    color: "#ec4899",
    dimensions: [
      { key: "validation_ease", label: "Validation Ease", description: "How easily can you test assumptions?" },
      { key: "experiment_cost", label: "Low Experiment Cost", description: "How cheaply can you run a smoke test? (10 = free)", inverted: true },
    ],
  },
];

export const ALL_DIMENSIONS = CATEGORIES.flatMap((c) => c.dimensions);

export const DIMENSION_MAP = Object.fromEntries(ALL_DIMENSIONS.map((d) => [d.key, d]));

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export const IDEA_STATUSES = ["evaluating", "shortlisted", "passed", "active"] as const;
export type IdeaStatus = (typeof IDEA_STATUSES)[number];

export const STATUS_COLORS: Record<IdeaStatus, string> = {
  evaluating: "bg-gray-100 text-gray-700",
  shortlisted: "bg-blue-100 text-blue-700",
  passed: "bg-red-100 text-red-700",
  active: "bg-green-100 text-green-700",
};

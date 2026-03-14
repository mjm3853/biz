import type { IdeaStatus } from "../db/constants";

export interface SeedScore {
  ideaId: string;
  dimension: string;
  score: number;
  rationale: string;
}

export interface SeedNote {
  ideaId: string;
  title: string;
  content: string;
  noteType: "insight" | "risk" | "hypothesis";
}

// ─── Statuses ────────────────────────────────────────────────
// Tier 1 = shortlisted, Tier 2 = evaluating, Tier 3 = evaluating, Tier 4 = passed

export const SEED_STATUSES: Record<string, IdeaStatus> = {
  datashield: "shortlisted",
  contractguard: "shortlisted",
  "inboxzero-pro": "shortlisted",
  mealsync: "evaluating",
  "sidehustle-radar": "evaluating",
  apibundle: "evaluating",
  calmcycle: "evaluating",
  fitloop: "evaluating",
  "greenthumb-ai": "evaluating",
  micromentor: "evaluating",
  homekeeper: "evaluating",
  petpulse: "evaluating",
  wardrobeiq: "passed",
  dreamlog: "passed",
};

// ─── Scores ──────────────────────────────────────────────────
// 15 ideas × 16 dimensions = 240 entries

export const SEED_SCORES: SeedScore[] = [
  // ════════════════════════════════════════════════════════════
  // DATASHIELD — Tier 1 (Strong Conviction)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "datashield", dimension: "market_size", score: 9, rationale: "~130M U.S. adults have data broker footprints. Global privacy-conscious population expanding with regulation." },
  { ideaId: "datashield", dimension: "market_growth", score: 8, rationale: "Privacy regulation (CCPA, GDPR, state-level bills) expanding addressable market annually. Data broker industry itself growing 15%+ CAGR." },
  { ideaId: "datashield", dimension: "market_timing", score: 9, rationale: "Peak regulatory tailwinds. Consumer privacy awareness at all-time high post-Cambridge Analytica and ongoing breach headlines." },
  // Feasibility
  { ideaId: "datashield", dimension: "tech_complexity", score: 6, rationale: "Web scraping at scale across 400+ brokers requires robust infrastructure, CAPTCHA handling, and continuous maintenance as sites change." },
  { ideaId: "datashield", dimension: "time_to_mvp", score: 6, rationale: "MVP covering top 50 brokers achievable in 4-6 weeks. Full 400+ broker coverage requires ongoing engineering effort." },
  { ideaId: "datashield", dimension: "resource_req", score: 6, rationale: "Solo founder can build MVP, but scaling scraping infrastructure and handling broker-specific edge cases requires dedicated engineering." },
  // Business Model
  { ideaId: "datashield", dimension: "revenue_potential", score: 8, rationale: "At 1-3% penetration of 130M adults at $15 ARPU, revenue opportunity is $200-600M. Family plans increase ARPU." },
  { ideaId: "datashield", dimension: "unit_economics", score: 8, rationale: "Marginal cost per user is compute for scanning and submitting removal requests. Amortizes well at scale." },
  { ideaId: "datashield", dimension: "margins", score: 8, rationale: "Software-native service with automated workflows. Gross margins 80%+ once scraping infrastructure is amortized." },
  { ideaId: "datashield", dimension: "ltv_cac", score: 9, rationale: "Structural re-listing by brokers means users can never safely cancel. Expected 24+ month retention. High organic/word-of-mouth acquisition." },
  // Competitive
  { ideaId: "datashield", dimension: "defensibility", score: 7, rationale: "Moat builds through broker coverage breadth, removal success rate data, and per-broker playbook refinement over time." },
  { ideaId: "datashield", dimension: "competition", score: 5, rationale: "Incumbents exist (DeleteMe, Kanary, Optery) but none dominant. Market is validated but not locked up." },
  { ideaId: "datashield", dimension: "differentiation", score: 6, rationale: "Differentiation via coverage breadth, re-listing monitoring frequency, and pricing. Feature parity is achievable by competitors." },
  // Execution Risk
  { ideaId: "datashield", dimension: "team_fit", score: 7, rationale: "Requires web scraping expertise and privacy regulation knowledge. AI/ML background helps with broker detection at scale." },
  { ideaId: "datashield", dimension: "regulatory_risk", score: 8, rationale: "Regulation is a tailwind, not a risk. CCPA/GDPR mandate broker compliance with opt-out requests." },
  { ideaId: "datashield", dimension: "dependencies", score: 6, rationale: "Dependent on data brokers maintaining accessible opt-out mechanisms. Bot detection escalation is an ongoing arms race." },
  // Experimentation
  { ideaId: "datashield", dimension: "validation_ease", score: 8, rationale: "Can validate immediately: scan yourself, submit opt-outs manually, measure removal rates. Demand signal is strong." },
  { ideaId: "datashield", dimension: "experiment_cost", score: 7, rationale: "Smoke test with manual removal for 20 beta users costs near zero. Automated MVP requires scraping infrastructure investment." },

  // ════════════════════════════════════════════════════════════
  // CONTRACTGUARD — Tier 1 (Strong Conviction)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "contractguard", dimension: "market_size", score: 8, rationale: "Every professional signs contracts. Freelancers (60M+ in U.S.), small businesses, and consumers clicking ToS daily." },
  { ideaId: "contractguard", dimension: "market_growth", score: 7, rationale: "Remote work and gig economy expanding contract volume. Digital agreements proliferating across all sectors." },
  { ideaId: "contractguard", dimension: "market_timing", score: 9, rationale: "LLM capability for legal text analysis just crossed the quality threshold. First-mover window is now." },
  // Feasibility
  { ideaId: "contractguard", dimension: "tech_complexity", score: 8, rationale: "Core product is an LLM inference call with structured output. Browser extension is standard web development." },
  { ideaId: "contractguard", dimension: "time_to_mvp", score: 9, rationale: "MVP (paste-and-scan with risk highlighting) buildable in 1-2 weeks. Browser extension adds another week." },
  { ideaId: "contractguard", dimension: "resource_req", score: 9, rationale: "Solo developer with LLM API access can ship the core product. No specialized infrastructure needed." },
  // Business Model
  { ideaId: "contractguard", dimension: "revenue_potential", score: 7, rationale: "Professional tier at $24/mo targeting freelancers and small business. Legal Team tier opens B2B channel." },
  { ideaId: "contractguard", dimension: "unit_economics", score: 7, rationale: "Cost per scan is one LLM inference call (~$0.05-0.20). At 5 scans/mo on Personal tier, healthy margin on $8/mo." },
  { ideaId: "contractguard", dimension: "margins", score: 8, rationale: "Pure software with LLM API costs as primary COGS. Gross margins 70-85% depending on model choice and usage patterns." },
  { ideaId: "contractguard", dimension: "ltv_cac", score: 7, rationale: "Once a user catches one bad clause, perceived risk of canceling is high. Browser extension creates daily touchpoints." },
  // Competitive
  { ideaId: "contractguard", dimension: "defensibility", score: 5, rationale: "Low technical moat — any LLM wrapper can replicate basic scanning. Moat must come from coverage depth and change tracking data." },
  { ideaId: "contractguard", dimension: "competition", score: 6, rationale: "DoNotPay attempted adjacent territory but fumbled. No dominant player in AI contract review for consumers/SMBs." },
  { ideaId: "contractguard", dimension: "differentiation", score: 7, rationale: "Browser extension auto-scanning ToS before you click Agree is a unique distribution wedge. Counter-language generation adds value." },
  // Execution Risk
  { ideaId: "contractguard", dimension: "team_fit", score: 8, rationale: "Full-stack developer with LLM experience can build this. No legal license required for analysis tool (not legal advice)." },
  { ideaId: "contractguard", dimension: "regulatory_risk", score: 7, rationale: "Must disclaim 'not legal advice' clearly. Unauthorized practice of law is a risk if positioning crosses the line." },
  { ideaId: "contractguard", dimension: "dependencies", score: 7, rationale: "Depends on LLM API availability and pricing. Multi-model strategy mitigates single-provider risk." },
  // Experimentation
  { ideaId: "contractguard", dimension: "validation_ease", score: 9, rationale: "Build a landing page, offer free ToS scans, measure conversion. Can validate in a weekend." },
  { ideaId: "contractguard", dimension: "experiment_cost", score: 9, rationale: "Free tier with 5 scans costs ~$1/user/month in API calls. Near-zero cost to test demand." },

  // ════════════════════════════════════════════════════════════
  // INBOXZERO PRO — Tier 1 (Strong Conviction)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "inboxzero-pro", dimension: "market_size", score: 9, rationale: "4B+ email users globally, 300M+ knowledge workers. Email is universal and the pain is near-universal." },
  { ideaId: "inboxzero-pro", dimension: "market_growth", score: 6, rationale: "Email volume grows 3-4% annually. Market is mature but AI augmentation creates a new spend category." },
  { ideaId: "inboxzero-pro", dimension: "market_timing", score: 8, rationale: "LLM quality for email drafting just crossed the 'good enough' bar. Users are primed by ChatGPT adoption." },
  // Feasibility
  { ideaId: "inboxzero-pro", dimension: "tech_complexity", score: 6, rationale: "Gmail/Outlook API integration is well-documented. Email parsing, classification, and draft generation are standard LLM tasks. Privacy architecture requires care." },
  { ideaId: "inboxzero-pro", dimension: "time_to_mvp", score: 6, rationale: "Gmail OAuth + classification MVP in 3-4 weeks. Draft reply quality requires fine-tuning on user writing style." },
  { ideaId: "inboxzero-pro", dimension: "resource_req", score: 6, rationale: "Needs OAuth infrastructure, email processing pipeline, and LLM integration. Achievable solo but benefits from a small team." },
  // Business Model
  { ideaId: "inboxzero-pro", dimension: "revenue_potential", score: 8, rationale: "Professional tier at $18/mo for 300M+ knowledge workers. Team tier opens B2B with per-seat pricing." },
  { ideaId: "inboxzero-pro", dimension: "unit_economics", score: 7, rationale: "Cost per user scales with email volume. Heavy emailers cost more in inference but also have higher willingness to pay." },
  { ideaId: "inboxzero-pro", dimension: "margins", score: 7, rationale: "LLM inference costs for draft replies are the primary COGS. Margins 65-80% depending on model and volume." },
  { ideaId: "inboxzero-pro", dimension: "ltv_cac", score: 8, rationale: "AI learns user's writing style over time, creating compounding switching costs. Habit formation drives 18+ month retention." },
  // Competitive
  { ideaId: "inboxzero-pro", dimension: "defensibility", score: 6, rationale: "Personalization model trained on user's email history creates moderate switching costs. Data moat deepens with usage." },
  { ideaId: "inboxzero-pro", dimension: "competition", score: 4, rationale: "Crowded field: Superhuman, SaneBox, Shortwave, plus native Gmail/Outlook AI features. Must be demonstrably better." },
  { ideaId: "inboxzero-pro", dimension: "differentiation", score: 6, rationale: "Draft replies in user's voice is the killer feature. Quality of voice matching determines competitive position." },
  // Execution Risk
  { ideaId: "inboxzero-pro", dimension: "team_fit", score: 7, rationale: "Requires experience with email APIs, OAuth flows, and LLM fine-tuning. Standard full-stack + ML skillset." },
  { ideaId: "inboxzero-pro", dimension: "regulatory_risk", score: 6, rationale: "Email privacy is sensitive. GDPR/CCPA compliance and clear data handling policies are mandatory. In-memory processing claim needs to hold up." },
  { ideaId: "inboxzero-pro", dimension: "dependencies", score: 5, rationale: "Entirely dependent on Gmail/Outlook API access. Google or Microsoft could restrict access or ship competing features." },
  // Experimentation
  { ideaId: "inboxzero-pro", dimension: "validation_ease", score: 7, rationale: "Can test with a small cohort using Gmail API. Measure time-in-inbox reduction and draft acceptance rate." },
  { ideaId: "inboxzero-pro", dimension: "experiment_cost", score: 6, rationale: "Requires OAuth app approval and email processing infrastructure. Not free to test but not expensive." },

  // ════════════════════════════════════════════════════════════
  // MEALSYNC — Tier 2 (Promising)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "mealsync", dimension: "market_size", score: 8, rationale: "130M+ U.S. households. Meal planning is a universal need across all demographics." },
  { ideaId: "mealsync", dimension: "market_growth", score: 6, rationale: "Health-conscious eating trends and food inflation driving demand. Stable growth, not explosive." },
  { ideaId: "mealsync", dimension: "market_timing", score: 7, rationale: "AI makes personalized meal planning at scale newly feasible. Grocery delivery integrations create new value." },
  // Feasibility
  { ideaId: "mealsync", dimension: "tech_complexity", score: 8, rationale: "Meal plan generation is a constrained optimization problem well-suited to LLMs. Grocery list generation is deterministic." },
  { ideaId: "mealsync", dimension: "time_to_mvp", score: 8, rationale: "Weekly email with meal plan + grocery list MVP buildable in 1-2 weeks with LLM API." },
  { ideaId: "mealsync", dimension: "resource_req", score: 8, rationale: "Solo developer can ship. No specialized infrastructure beyond LLM API access." },
  // Business Model
  { ideaId: "mealsync", dimension: "revenue_potential", score: 7, rationale: "Family tier at $12/mo is the volume play. Premium tier with Instacart integration adds upsell path." },
  { ideaId: "mealsync", dimension: "unit_economics", score: 8, rationale: "One LLM call per user per week. Cost per user is negligible at $0.05-0.10/week." },
  { ideaId: "mealsync", dimension: "margins", score: 9, rationale: "Near-pure software margins. Weekly LLM inference is the only variable cost. 90%+ gross margins." },
  { ideaId: "mealsync", dimension: "ltv_cac", score: 6, rationale: "Meal planning apps suffer novelty decay — 4-8 week engagement cliff is common. Retention requires constant recipe freshness." },
  // Competitive
  { ideaId: "mealsync", dimension: "defensibility", score: 4, rationale: "Low moat. Recipe generation is commoditized. Personalization data helps but isn't a strong barrier." },
  { ideaId: "mealsync", dimension: "competition", score: 4, rationale: "Mealime, Eat This Much, Whisk, and many others compete. Saturated category." },
  { ideaId: "mealsync", dimension: "differentiation", score: 6, rationale: "Zero-waste ingredient carry-over and budget optimization are genuine differentiators if executed well." },
  // Execution Risk
  { ideaId: "mealsync", dimension: "team_fit", score: 8, rationale: "Standard full-stack + LLM integration. No domain expertise required beyond basic nutrition knowledge." },
  { ideaId: "mealsync", dimension: "regulatory_risk", score: 9, rationale: "No regulatory concerns. Meal suggestions are not medical advice." },
  { ideaId: "mealsync", dimension: "dependencies", score: 8, rationale: "LLM API is the only external dependency. Instacart integration is optional and additive." },
  // Experimentation
  { ideaId: "mealsync", dimension: "validation_ease", score: 9, rationale: "Generate 10 sample meal plans, send to test users, measure satisfaction and willingness to pay. Trivial to test." },
  { ideaId: "mealsync", dimension: "experiment_cost", score: 9, rationale: "Cost of generating sample meal plans is effectively zero. Can validate with a Google Form and manual delivery." },

  // ════════════════════════════════════════════════════════════
  // SIDEHUSTLE RADAR — Tier 2 (Promising)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "sidehustle-radar", dimension: "market_size", score: 7, rationale: "60M+ freelancers in the U.S. alone. Global gig economy valued at $450B+." },
  { ideaId: "sidehustle-radar", dimension: "market_growth", score: 8, rationale: "Gig economy growing 15-20% annually. Remote work normalizing cross-border freelancing." },
  { ideaId: "sidehustle-radar", dimension: "market_timing", score: 7, rationale: "AI-generated cover letters and opportunity matching are newly viable. Platform fragmentation creates aggregation demand." },
  // Feasibility
  { ideaId: "sidehustle-radar", dimension: "tech_complexity", score: 5, rationale: "Aggregating 50+ platforms requires maintaining scrapers/APIs for each. Platform changes break integrations frequently." },
  { ideaId: "sidehustle-radar", dimension: "time_to_mvp", score: 6, rationale: "MVP with 5-10 platform integrations achievable in 3-4 weeks. Full 50+ platform coverage is a long tail." },
  { ideaId: "sidehustle-radar", dimension: "resource_req", score: 6, rationale: "Scraping infrastructure and ongoing maintenance for 50+ platforms benefits from a small team." },
  // Business Model
  { ideaId: "sidehustle-radar", dimension: "revenue_potential", score: 7, rationale: "Hunter tier at $19/mo is well-justified by ROI — one landed gig covers months of subscription." },
  { ideaId: "sidehustle-radar", dimension: "unit_economics", score: 7, rationale: "Per-user cost is scraping compute + LLM for cover letters. Scales efficiently with user count." },
  { ideaId: "sidehustle-radar", dimension: "margins", score: 7, rationale: "Software margins with scraping infrastructure costs. 70-80% gross margin achievable." },
  { ideaId: "sidehustle-radar", dimension: "ltv_cac", score: 7, rationale: "Freelancers constantly need new work. Retention is structural as long as match quality stays high." },
  // Competitive
  { ideaId: "sidehustle-radar", dimension: "defensibility", score: 5, rationale: "Aggregation moat is moderate. Coverage breadth and match quality improve with data, but scraping is replicable." },
  { ideaId: "sidehustle-radar", dimension: "competition", score: 5, rationale: "Job aggregators exist (Indeed, LinkedIn) but none focus specifically on freelance/gig quality filtering." },
  { ideaId: "sidehustle-radar", dimension: "differentiation", score: 7, rationale: "AI-scored opportunity quality and auto-generated cover letters differentiate from passive job boards." },
  // Execution Risk
  { ideaId: "sidehustle-radar", dimension: "team_fit", score: 7, rationale: "Requires scraping expertise and LLM integration skills. Freelance market knowledge is a plus." },
  { ideaId: "sidehustle-radar", dimension: "regulatory_risk", score: 4, rationale: "Platform ToS violations are the primary risk. Upwork, Toptal, and others prohibit scraping and automated applications." },
  { ideaId: "sidehustle-radar", dimension: "dependencies", score: 4, rationale: "Entirely dependent on third-party platform access. Any major platform blocking scrapers degrades the product." },
  // Experimentation
  { ideaId: "sidehustle-radar", dimension: "validation_ease", score: 7, rationale: "Manually curate a weekly digest for 20 freelancers from 5 platforms. Measure click-through and application rates." },
  { ideaId: "sidehustle-radar", dimension: "experiment_cost", score: 7, rationale: "Manual curation for a small cohort costs only time. Automation requires scraping infrastructure investment." },

  // ════════════════════════════════════════════════════════════
  // APIBUNDLE — Tier 2 (Promising)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "apibundle", dimension: "market_size", score: 7, rationale: "30M+ developers globally. Indie developers and small teams are the underserved segment." },
  { ideaId: "apibundle", dimension: "market_growth", score: 8, rationale: "API economy growing 20%+ annually. More apps built, more APIs consumed per app." },
  { ideaId: "apibundle", dimension: "market_timing", score: 7, rationale: "API proliferation creating real subscription fatigue. Developer tooling consolidation trend is emerging." },
  // Feasibility
  { ideaId: "apibundle", dimension: "tech_complexity", score: 5, rationale: "Building a unified SDK across 40+ APIs with different auth methods, rate limits, and response formats is non-trivial." },
  { ideaId: "apibundle", dimension: "time_to_mvp", score: 5, rationale: "MVP with 5-10 APIs achievable in 4-6 weeks. Each additional API requires individual integration work." },
  { ideaId: "apibundle", dimension: "resource_req", score: 5, rationale: "SDK development, documentation, and provider relationship management benefit from a small engineering team." },
  // Business Model
  { ideaId: "apibundle", dimension: "revenue_potential", score: 8, rationale: "Builder tier at $49/mo with $75 in credits. Studio tier at $149/mo. Strong expansion revenue as users scale." },
  { ideaId: "apibundle", dimension: "unit_economics", score: 6, rationale: "Margin is the spread between credit cost and subscription price. Volume discounts from providers determine profitability." },
  { ideaId: "apibundle", dimension: "margins", score: 6, rationale: "Reseller margins are thinner than pure SaaS. Gross margins 40-60% depending on provider pricing and usage mix." },
  { ideaId: "apibundle", dimension: "ltv_cac", score: 8, rationale: "Once integrated via unified SDK, switching costs are very high. Every integration point becomes lock-in." },
  // Competitive
  { ideaId: "apibundle", dimension: "defensibility", score: 7, rationale: "SDK integration lock-in is a strong moat. Breadth of API coverage compounds the switching cost." },
  { ideaId: "apibundle", dimension: "competition", score: 6, rationale: "RapidAPI exists in adjacent space but focused on API marketplace, not bundled credits. Differentiated positioning." },
  { ideaId: "apibundle", dimension: "differentiation", score: 7, rationale: "Unified SDK with provider-swap capability is genuinely differentiated. One-line provider switching is compelling." },
  // Execution Risk
  { ideaId: "apibundle", dimension: "team_fit", score: 7, rationale: "Requires deep API integration experience and SDK design skills. Developer relations background helps." },
  { ideaId: "apibundle", dimension: "regulatory_risk", score: 9, rationale: "No regulatory concerns. Standard SaaS/developer tooling." },
  { ideaId: "apibundle", dimension: "dependencies", score: 3, rationale: "Heavily dependent on upstream API providers. Pricing changes, ToS changes, or deprecations cascade to customers." },
  // Experimentation
  { ideaId: "apibundle", dimension: "validation_ease", score: 6, rationale: "Ship a unified SDK with 3-5 popular APIs. Measure developer adoption and usage patterns." },
  { ideaId: "apibundle", dimension: "experiment_cost", score: 6, rationale: "SDK development and API provider agreements require moderate upfront investment." },

  // ════════════════════════════════════════════════════════════
  // CALMCYCLE — Tier 2 (Promising)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "calmcycle", dimension: "market_size", score: 8, rationale: "Corporate wellness is a $60B+ market. Mental health/burnout affects 76% of workers per APA surveys." },
  { ideaId: "calmcycle", dimension: "market_growth", score: 8, rationale: "Corporate wellness spending growing 8-10% CAGR. Post-pandemic burnout awareness driving employer investment." },
  { ideaId: "calmcycle", dimension: "market_timing", score: 8, rationale: "Burnout is a zeitgeist issue. Wearable adoption provides the data substrate. Employers seeking measurable wellness ROI." },
  // Feasibility
  { ideaId: "calmcycle", dimension: "tech_complexity", score: 5, rationale: "Wearable API integrations (Apple Health, Garmin, Whoop, Oura) each require individual integration. Burnout scoring algorithm needs clinical validation." },
  { ideaId: "calmcycle", dimension: "time_to_mvp", score: 5, rationale: "MVP with Apple Health integration and basic burnout score in 4-6 weeks. Calendar defense adds another 2 weeks." },
  { ideaId: "calmcycle", dimension: "resource_req", score: 5, rationale: "Wearable integrations, algorithm development, and mobile app require a small team or extended solo timeline." },
  // Business Model
  { ideaId: "calmcycle", dimension: "revenue_potential", score: 8, rationale: "Workplace tier at $10/user/mo is the real play. 1000-employee company = $120K ARR per account." },
  { ideaId: "calmcycle", dimension: "unit_economics", score: 7, rationale: "Per-user costs are minimal — data ingestion and algorithm scoring. Enterprise contracts have strong unit economics." },
  { ideaId: "calmcycle", dimension: "margins", score: 7, rationale: "Software margins with some data processing costs. 75-85% gross margins on the Workplace tier." },
  { ideaId: "calmcycle", dimension: "ltv_cac", score: 7, rationale: "B2B wellness purchases are sticky — HR rarely cancels wellness programs. Consumer tier has typical wellness app churn." },
  // Competitive
  { ideaId: "calmcycle", dimension: "defensibility", score: 5, rationale: "Burnout scoring algorithm is proprietary but replicable. Longitudinal user data creates moderate moat." },
  { ideaId: "calmcycle", dimension: "competition", score: 4, rationale: "Headspace, Calm, Whoop, and Apple Health all adding stress metrics. Crowded wellness category." },
  { ideaId: "calmcycle", dimension: "differentiation", score: 7, rationale: "Prevention framing (not recovery) and calendar defense integration differentiate from meditation-first competitors." },
  // Execution Risk
  { ideaId: "calmcycle", dimension: "team_fit", score: 6, rationale: "Requires wearable API expertise, health data handling experience, and ideally clinical advisory for algorithm credibility." },
  { ideaId: "calmcycle", dimension: "regulatory_risk", score: 5, rationale: "Biometric data processing raises HIPAA/BIPA concerns. Burnout scoring could approach FDA device classification if positioned as diagnostic." },
  { ideaId: "calmcycle", dimension: "dependencies", score: 4, rationale: "Dependent on wearable platform APIs (Apple, Garmin, etc.). Platform changes or access restrictions directly impact functionality." },
  // Experimentation
  { ideaId: "calmcycle", dimension: "validation_ease", score: 6, rationale: "Pilot with 20-30 users wearing Apple Watches. Measure correlation between burnout scores and self-reported stress." },
  { ideaId: "calmcycle", dimension: "experiment_cost", score: 5, rationale: "Requires building Apple Health integration and basic scoring algorithm. Moderate upfront investment for a pilot." },

  // ════════════════════════════════════════════════════════════
  // FITLOOP — Tier 3 (Viable but Constrained)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "fitloop", dimension: "market_size", score: 7, rationale: "Global fitness app market ~$15B. Strength training segment growing faster than general fitness." },
  { ideaId: "fitloop", dimension: "market_growth", score: 6, rationale: "Fitness app market growing 15% CAGR but saturated with free alternatives." },
  { ideaId: "fitloop", dimension: "market_timing", score: 6, rationale: "Wearable-informed adaptive training is newly viable, but fitness app fatigue is real." },
  // Feasibility
  { ideaId: "fitloop", dimension: "tech_complexity", score: 6, rationale: "Readiness scoring from wearable data and progressive overload algorithms are well-understood. Multiple wearable integrations add complexity." },
  { ideaId: "fitloop", dimension: "time_to_mvp", score: 6, rationale: "Basic adaptive workout app with Apple Health integration in 4-6 weeks. Multi-wearable support extends timeline." },
  { ideaId: "fitloop", dimension: "resource_req", score: 6, rationale: "Mobile app development with wearable integrations. Manageable solo but benefits from design help." },
  // Business Model
  { ideaId: "fitloop", dimension: "revenue_potential", score: 6, rationale: "Performance tier at $20/mo is competitive. Coached tier at $60/mo reintroduces human cost." },
  { ideaId: "fitloop", dimension: "unit_economics", score: 6, rationale: "Pure AI tiers have good unit economics. Coached tier at $60/mo requires human involvement, eroding margins." },
  { ideaId: "fitloop", dimension: "margins", score: 5, rationale: "AI-only tiers at 80%+ margins, but Coached tier introduces human cost. Blended margins 60-70%." },
  { ideaId: "fitloop", dimension: "ltv_cac", score: 5, rationale: "Fitness apps average ~25% 12-month retention. High churn is an industry-wide challenge." },
  // Competitive
  { ideaId: "fitloop", dimension: "defensibility", score: 4, rationale: "Training data and personalization create some switching costs, but workout programs are easily replicated." },
  { ideaId: "fitloop", dimension: "competition", score: 3, rationale: "Extremely crowded: Strava, Nike Run Club, Strong, JEFIT, Whoop, TRAINIAC, plus YouTube fitness content." },
  { ideaId: "fitloop", dimension: "differentiation", score: 5, rationale: "Readiness-based auto-regulation is a genuine differentiator for serious athletes, but niche appeal." },
  // Execution Risk
  { ideaId: "fitloop", dimension: "team_fit", score: 7, rationale: "Requires mobile development and exercise science knowledge. Wearable integration experience is a plus." },
  { ideaId: "fitloop", dimension: "regulatory_risk", score: 8, rationale: "No regulatory concerns for fitness guidance. Standard health disclaimer suffices." },
  { ideaId: "fitloop", dimension: "dependencies", score: 5, rationale: "Wearable platform APIs are a dependency. Apple Health is the critical integration point." },
  // Experimentation
  { ideaId: "fitloop", dimension: "validation_ease", score: 7, rationale: "Generate adaptive plans for 20 beta users with Apple Watches. Measure adherence and progression rates." },
  { ideaId: "fitloop", dimension: "experiment_cost", score: 6, rationale: "Requires basic mobile app and Apple Health integration. Moderate investment for a meaningful pilot." },

  // ════════════════════════════════════════════════════════════
  // GREENTHUMB AI — Tier 3 (Viable but Constrained)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "greenthumb-ai", dimension: "market_size", score: 5, rationale: "U.S. houseplant market ~$2B. Subset willing to pay for digital plant care is a fraction of that." },
  { ideaId: "greenthumb-ai", dimension: "market_growth", score: 4, rationale: "Post-COVID houseplant boom has normalized. Growth rate returning to pre-pandemic levels of 3-5%." },
  { ideaId: "greenthumb-ai", dimension: "market_timing", score: 6, rationale: "Computer vision for plant ID is mature. But the market window may have already peaked." },
  // Feasibility
  { ideaId: "greenthumb-ai", dimension: "tech_complexity", score: 8, rationale: "Plant ID via existing vision APIs (Google, PlantNet) is straightforward. Care scheduling is rule-based." },
  { ideaId: "greenthumb-ai", dimension: "time_to_mvp", score: 8, rationale: "Photo ID + watering reminders MVP buildable in 1-2 weeks using existing plant ID APIs." },
  { ideaId: "greenthumb-ai", dimension: "resource_req", score: 8, rationale: "Solo developer can ship using third-party vision APIs. No specialized infrastructure needed." },
  // Business Model
  { ideaId: "greenthumb-ai", dimension: "revenue_potential", score: 4, rationale: "Gardener tier at $9/mo is the realistic ceiling. Small TAM limits total revenue opportunity." },
  { ideaId: "greenthumb-ai", dimension: "unit_economics", score: 7, rationale: "Per-user cost is occasional vision API calls for ID and diagnosis. Very low variable cost." },
  { ideaId: "greenthumb-ai", dimension: "margins", score: 8, rationale: "Software margins with minimal API costs. 85%+ gross margins." },
  { ideaId: "greenthumb-ai", dimension: "ltv_cac", score: 5, rationale: "Once plants are on schedule, marginal value drops. Disease detection is episodic, not continuous." },
  // Competitive
  { ideaId: "greenthumb-ai", dimension: "defensibility", score: 3, rationale: "Plant ID is commoditized via free apps (PictureThis, PlantNet). Care data is widely available." },
  { ideaId: "greenthumb-ai", dimension: "competition", score: 3, rationale: "Planta, Greg, PictureThis, and others already compete with millions of downloads and free tiers." },
  { ideaId: "greenthumb-ai", dimension: "differentiation", score: 5, rationale: "Light mapping and environmental personalization are differentiators, but competitors are adding similar features." },
  // Execution Risk
  { ideaId: "greenthumb-ai", dimension: "team_fit", score: 8, rationale: "Standard mobile/web development with vision API integration. No specialized domain expertise required." },
  { ideaId: "greenthumb-ai", dimension: "regulatory_risk", score: 10, rationale: "Zero regulatory risk. Plant care advice has no regulatory implications." },
  { ideaId: "greenthumb-ai", dimension: "dependencies", score: 7, rationale: "Plant ID APIs are the main dependency. Multiple providers available (Google Vision, PlantNet)." },
  // Experimentation
  { ideaId: "greenthumb-ai", dimension: "validation_ease", score: 9, rationale: "Build a simple plant ID + care schedule app. Test with plant community groups on Reddit/Facebook." },
  { ideaId: "greenthumb-ai", dimension: "experiment_cost", score: 9, rationale: "Vision API free tiers are generous. Near-zero cost to validate with a prototype." },

  // ════════════════════════════════════════════════════════════
  // MICROMENTOR — Tier 3 (Viable but Constrained)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "micromentor", dimension: "market_size", score: 7, rationale: "Corporate L&D is a $370B global market. Professional upskilling demand is enormous." },
  { ideaId: "micromentor", dimension: "market_growth", score: 7, rationale: "Online learning growing 10-15% CAGR. Micro-learning specifically growing faster at 20%+." },
  { ideaId: "micromentor", dimension: "market_timing", score: 7, rationale: "AI-generated educational content is newly viable. Attention spans favor micro-format delivery." },
  // Feasibility
  { ideaId: "micromentor", dimension: "tech_complexity", score: 7, rationale: "LLM-generated lessons with spaced repetition scheduling. Well-understood educational technology patterns." },
  { ideaId: "micromentor", dimension: "time_to_mvp", score: 7, rationale: "Daily email/notification with generated lesson MVP in 2-3 weeks. Mobile app adds timeline." },
  { ideaId: "micromentor", dimension: "resource_req", score: 7, rationale: "Content generation via LLM means no content creator team needed. Solo developer can ship." },
  // Business Model
  { ideaId: "micromentor", dimension: "revenue_potential", score: 7, rationale: "Enterprise tier at $8/user/mo is the volume play. 500-person company = $48K ARR." },
  { ideaId: "micromentor", dimension: "unit_economics", score: 7, rationale: "LLM-generated content means near-zero marginal content cost. Per-user cost is one inference call per day." },
  { ideaId: "micromentor", dimension: "margins", score: 8, rationale: "AI-generated content eliminates instructor costs. 85%+ gross margins." },
  { ideaId: "micromentor", dimension: "ltv_cac", score: 5, rationale: "90% dropout rate plagues all learning platforms. Daily engagement apps are hard to sustain beyond the first month." },
  // Competitive
  { ideaId: "micromentor", dimension: "defensibility", score: 4, rationale: "Content is LLM-generated and not proprietary. Spaced repetition algorithms are well-known. Low switching costs." },
  { ideaId: "micromentor", dimension: "competition", score: 3, rationale: "Duolingo (for format), Coursera, LinkedIn Learning, Udemy, and many micro-learning startups compete." },
  { ideaId: "micromentor", dimension: "differentiation", score: 5, rationale: "5-minute format with scenario-based learning is a positioning choice, not a technical differentiator." },
  // Execution Risk
  { ideaId: "micromentor", dimension: "team_fit", score: 7, rationale: "LLM integration and basic app development. Educational design knowledge helps but isn't required." },
  { ideaId: "micromentor", dimension: "regulatory_risk", score: 9, rationale: "No regulatory concerns for professional skill education." },
  { ideaId: "micromentor", dimension: "dependencies", score: 8, rationale: "LLM API is the only external dependency. Low dependency risk." },
  // Experimentation
  { ideaId: "micromentor", dimension: "validation_ease", score: 8, rationale: "Generate a 2-week negotiation course, deliver via email, measure completion rates and perceived value." },
  { ideaId: "micromentor", dimension: "experiment_cost", score: 9, rationale: "Email-based delivery costs nothing. Content generation via LLM is near-free." },

  // ════════════════════════════════════════════════════════════
  // HOMEKEEPER — Tier 3 (Viable but Constrained)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "homekeeper", dimension: "market_size", score: 7, rationale: "85M+ homeowner households in the U.S. Home maintenance spending averages $3,000+/year." },
  { ideaId: "homekeeper", dimension: "market_growth", score: 5, rationale: "Homeownership rate is stable. Home maintenance spending grows with housing age and inflation." },
  { ideaId: "homekeeper", dimension: "market_timing", score: 6, rationale: "Aging housing stock and rising repair costs create demand, but no specific catalyst for timing." },
  // Feasibility
  { ideaId: "homekeeper", dimension: "tech_complexity", score: 7, rationale: "Maintenance scheduling is rule-based by home type, age, and climate. Calendar generation is straightforward." },
  { ideaId: "homekeeper", dimension: "time_to_mvp", score: 7, rationale: "Home profile + seasonal reminder system MVP in 2-3 weeks. Vendor matching requires marketplace development." },
  { ideaId: "homekeeper", dimension: "resource_req", score: 6, rationale: "Reminder system is solo-buildable. Vendor marketplace requires sourcing, vetting, and geographic coverage." },
  // Business Model
  { ideaId: "homekeeper", dimension: "revenue_potential", score: 6, rationale: "Homeowner tier at $12/mo plus referral commissions from vendor bookings. Landlord tier adds per-property revenue." },
  { ideaId: "homekeeper", dimension: "unit_economics", score: 6, rationale: "Subscription is pure software margin. Vendor matching introduces marketplace economics (referral fees, booking commissions)." },
  { ideaId: "homekeeper", dimension: "margins", score: 6, rationale: "Reminder system is high margin. Vendor matching margins depend on commission rates — typically 10-20%." },
  { ideaId: "homekeeper", dimension: "ltv_cac", score: 7, rationale: "Homes always need maintenance — structural retention. Seasons create recurring engagement triggers." },
  // Competitive
  { ideaId: "homekeeper", dimension: "defensibility", score: 4, rationale: "Reminder system has no moat. Vendor marketplace moat requires geographic density that takes years to build." },
  { ideaId: "homekeeper", dimension: "competition", score: 5, rationale: "Thumbtack, Angi, HomeAdvisor dominate contractor matching. Differentiation must come from the scheduling intelligence layer." },
  { ideaId: "homekeeper", dimension: "differentiation", score: 5, rationale: "Preventive scheduling based on home profile is the unique angle, but incumbents can add this feature trivially." },
  // Execution Risk
  { ideaId: "homekeeper", dimension: "team_fit", score: 6, rationale: "Reminder system is standard. Vendor marketplace requires operations, local market knowledge, and contractor relations." },
  { ideaId: "homekeeper", dimension: "regulatory_risk", score: 7, rationale: "Contractor licensing verification may be needed. Low regulatory risk overall." },
  { ideaId: "homekeeper", dimension: "dependencies", score: 5, rationale: "Vendor marketplace depends on contractor supply in each geography. Cold start problem for new markets." },
  // Experimentation
  { ideaId: "homekeeper", dimension: "validation_ease", score: 7, rationale: "Build a home profile quiz, generate a maintenance calendar, and test willingness to pay with landing page." },
  { ideaId: "homekeeper", dimension: "experiment_cost", score: 8, rationale: "Calendar generation is free. Landing page smoke test costs near zero." },

  // ════════════════════════════════════════════════════════════
  // PETPULSE — Tier 3 (Viable but Constrained)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "petpulse", dimension: "market_size", score: 7, rationale: "U.S. pet industry $150B+. 67% of households own pets. Digital pet health is a small but growing segment." },
  { ideaId: "petpulse", dimension: "market_growth", score: 6, rationale: "Pet spending growing 6-8% annually. Pet tech is an emerging category within that." },
  { ideaId: "petpulse", dimension: "market_timing", score: 6, rationale: "Pet humanization trend drives willingness to spend on pet health tech. AI health prediction is newly credible." },
  // Feasibility
  { ideaId: "petpulse", dimension: "tech_complexity", score: 7, rationale: "Daily logging, trend analysis, and anomaly detection are standard ML/stats patterns. No specialized hardware needed." },
  { ideaId: "petpulse", dimension: "time_to_mvp", score: 7, rationale: "Pet profile + daily logging + basic trend alerts MVP in 2-3 weeks." },
  { ideaId: "petpulse", dimension: "resource_req", score: 7, rationale: "Solo developer can build the core product. Vet advisory board adds credibility but isn't required for MVP." },
  // Business Model
  { ideaId: "petpulse", dimension: "revenue_potential", score: 5, rationale: "Multi-Pet tier at $10/mo. TAM is constrained by the intersection of tech-savvy and health-conscious pet owners." },
  { ideaId: "petpulse", dimension: "unit_economics", score: 7, rationale: "Per-user costs are minimal — data storage and occasional anomaly detection. Strong unit economics." },
  { ideaId: "petpulse", dimension: "margins", score: 8, rationale: "Pure software service. 85%+ gross margins." },
  { ideaId: "petpulse", dimension: "ltv_cac", score: 6, rationale: "Fear of missing early health warnings keeps users subscribed. But if nothing happens for 6 months, value perception drops." },
  // Competitive
  { ideaId: "petpulse", dimension: "defensibility", score: 4, rationale: "Longitudinal pet health data creates some switching costs. But data export requirements may weaken this." },
  { ideaId: "petpulse", dimension: "competition", score: 5, rationale: "PetDesk, Pawtrack, and vet-affiliated apps exist. None dominate the AI health prediction niche." },
  { ideaId: "petpulse", dimension: "differentiation", score: 6, rationale: "AI trend detection and early warning is the key differentiator vs. simple logging apps." },
  // Execution Risk
  { ideaId: "petpulse", dimension: "team_fit", score: 7, rationale: "Standard app development with basic ML. Veterinary advisory adds credibility." },
  { ideaId: "petpulse", dimension: "regulatory_risk", score: 6, rationale: "Anything resembling veterinary diagnosis needs careful disclaimers. Not practicing veterinary medicine, but the line is fuzzy." },
  { ideaId: "petpulse", dimension: "dependencies", score: 8, rationale: "Self-contained application with no critical external dependencies." },
  // Experimentation
  { ideaId: "petpulse", dimension: "validation_ease", score: 8, rationale: "Build a logging app, recruit pet owners from Reddit communities, measure daily engagement and perceived value." },
  { ideaId: "petpulse", dimension: "experiment_cost", score: 8, rationale: "Basic logging app costs near zero. Pet owner communities provide free distribution for testing." },

  // ════════════════════════════════════════════════════════════
  // WARDROBEIQ — Tier 4 (Proceed with Caution)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "wardrobeiq", dimension: "market_size", score: 6, rationale: "Fashion and personal styling market is large, but the subset willing to pay for AI outfit suggestions is small." },
  { ideaId: "wardrobeiq", dimension: "market_growth", score: 5, rationale: "Fashion tech growing modestly. AI styling is a niche within a niche." },
  { ideaId: "wardrobeiq", dimension: "market_timing", score: 6, rationale: "Computer vision for clothing categorization works. But the problem isn't painful enough for most to pay monthly." },
  // Feasibility
  { ideaId: "wardrobeiq", dimension: "tech_complexity", score: 7, rationale: "Clothing detection and categorization via vision APIs is feasible. Outfit combination logic is rule-based plus style learning." },
  { ideaId: "wardrobeiq", dimension: "time_to_mvp", score: 6, rationale: "Photo catalog + basic outfit suggestions MVP in 3-4 weeks. Weather and calendar integration add scope." },
  { ideaId: "wardrobeiq", dimension: "resource_req", score: 7, rationale: "Solo developer with vision API access can build. Fashion domain knowledge helps with style rules." },
  // Business Model
  { ideaId: "wardrobeiq", dimension: "revenue_potential", score: 4, rationale: "Stylist tier at $14/mo is optimistic. Most users would churn after the novelty of cataloging wears off." },
  { ideaId: "wardrobeiq", dimension: "unit_economics", score: 6, rationale: "Initial wardrobe cataloging is the expensive part (many vision API calls). Ongoing daily suggestions are cheap." },
  { ideaId: "wardrobeiq", dimension: "margins", score: 7, rationale: "After initial cataloging cost, ongoing margins are high. 75%+ gross margins." },
  { ideaId: "wardrobeiq", dimension: "ltv_cac", score: 3, rationale: "Severe retention cliff after initial cataloging excitement. Expected 3-4 month average lifespan." },
  // Competitive
  { ideaId: "wardrobeiq", dimension: "defensibility", score: 3, rationale: "Wardrobe data is the only moat, and users can re-catalog elsewhere. Low switching costs." },
  { ideaId: "wardrobeiq", dimension: "competition", score: 4, rationale: "Cladwell, Stylebook, Acloset, and others exist. None dominant but the category has been tried many times." },
  { ideaId: "wardrobeiq", dimension: "differentiation", score: 5, rationale: "Gap analysis (suggesting purchases) is the most compelling feature, but it's really an affiliate play, not a subscription." },
  // Execution Risk
  { ideaId: "wardrobeiq", dimension: "team_fit", score: 7, rationale: "Vision API integration and basic recommendation engine. Fashion knowledge helps." },
  { ideaId: "wardrobeiq", dimension: "regulatory_risk", score: 10, rationale: "Zero regulatory risk." },
  { ideaId: "wardrobeiq", dimension: "dependencies", score: 7, rationale: "Vision APIs and weather APIs. Multiple providers available." },
  // Experimentation
  { ideaId: "wardrobeiq", dimension: "validation_ease", score: 7, rationale: "Build a photo-to-outfit prototype. Test with fashion-forward communities." },
  { ideaId: "wardrobeiq", dimension: "experiment_cost", score: 7, rationale: "Vision API free tiers make prototyping cheap. Low cost to validate interest." },

  // ════════════════════════════════════════════════════════════
  // DREAMLOG — Tier 4 (Proceed with Caution)
  // ════════════════════════════════════════════════════════════
  // Market
  { ideaId: "dreamlog", dimension: "market_size", score: 3, rationale: "Niche audience: intersection of dream journalers and tech-forward self-quantifiers. Maybe 2-5M addressable users globally." },
  { ideaId: "dreamlog", dimension: "market_growth", score: 4, rationale: "Sleep tech is growing but dream journaling is a tiny, stable niche within it." },
  { ideaId: "dreamlog", dimension: "market_timing", score: 5, rationale: "Voice-to-text quality now supports groggy mumbling capture. Lucid dreaming interest is steady but not trending." },
  // Feasibility
  { ideaId: "dreamlog", dimension: "tech_complexity", score: 8, rationale: "Voice transcription (Whisper), LLM tagging, and pattern analysis are all off-the-shelf capabilities." },
  { ideaId: "dreamlog", dimension: "time_to_mvp", score: 8, rationale: "Voice recording + transcription + basic tagging MVP in 1-2 weeks." },
  { ideaId: "dreamlog", dimension: "resource_req", score: 8, rationale: "Solo developer with Whisper API and LLM access can ship easily." },
  // Business Model
  { ideaId: "dreamlog", dimension: "revenue_potential", score: 3, rationale: "Explorer tier at $12/mo in a market of 2-5M potential users. Revenue ceiling is low — likely sub-$10M TAM." },
  { ideaId: "dreamlog", dimension: "unit_economics", score: 7, rationale: "Per-user cost is voice transcription + LLM tagging per dream. Affordable at $0.05-0.15/dream." },
  { ideaId: "dreamlog", dimension: "margins", score: 8, rationale: "Software service with minimal API costs. 80%+ gross margins." },
  { ideaId: "dreamlog", dimension: "ltv_cac", score: 4, rationale: "Journaling apps retain <15% at 12 months. Dream journaling has even narrower ongoing engagement." },
  // Competitive
  { ideaId: "dreamlog", dimension: "defensibility", score: 4, rationale: "Dream journal data creates some switching costs. Pattern analysis improves with history." },
  { ideaId: "dreamlog", dimension: "competition", score: 7, rationale: "Few dedicated AI dream journaling apps. Niche is underserved, though market size explains why." },
  { ideaId: "dreamlog", dimension: "differentiation", score: 6, rationale: "Voice-optimized capture for half-asleep state is genuinely thoughtful UX. Pattern analysis over time is compelling." },
  // Execution Risk
  { ideaId: "dreamlog", dimension: "team_fit", score: 8, rationale: "Whisper + LLM integration is straightforward. No specialized domain expertise required." },
  { ideaId: "dreamlog", dimension: "regulatory_risk", score: 9, rationale: "No regulatory concerns. Dream analysis is not medical advice." },
  { ideaId: "dreamlog", dimension: "dependencies", score: 7, rationale: "Whisper API and LLM API. Multiple providers available for both." },
  // Experimentation
  { ideaId: "dreamlog", dimension: "validation_ease", score: 8, rationale: "Build voice recording + transcription prototype. Test with lucid dreaming communities (r/LucidDreaming, etc.)." },
  { ideaId: "dreamlog", dimension: "experiment_cost", score: 8, rationale: "Voice API free tiers make prototyping nearly free. Niche communities provide free distribution." },
];

// ─── Notes ───────────────────────────────────────────────────

export const SEED_NOTES: SeedNote[] = [
  // DATASHIELD
  {
    ideaId: "datashield",
    title: "VC: Thesis & Verdict",
    content: "Top pick in portfolio. The entire value chain — scanning, opt-out generation, re-listing detection — is automatable end-to-end. Recurring value is structural because brokers re-list within months, creating a permanent treadmill users can't safely step off. Sits in the 'insurance premium' psychological bucket where churn is low because canceling feels risky. Proven market with incumbents (DeleteMe, Kanary, Optery) that haven't achieved dominance.",
    noteType: "insight",
  },
  {
    ideaId: "datashield",
    title: "VC: Key Risks",
    content: "Primary risk: data brokers increasingly deploying bot detection and CAPTCHAs on opt-out flows, which could raise per-removal cost and degrade automation reliability. Secondary risk: regulatory changes could mandate broker compliance with centralized opt-out registries (similar to Do Not Call), which would commoditize the removal service. Competitive risk from well-funded incumbents with existing broker relationships.",
    noteType: "risk",
  },
  {
    ideaId: "datashield",
    title: "VC: Validation Hypotheses",
    content: "H1: >40% of users who complete a free data exposure scan will convert to paid monitoring within 30 days. H2: Average user has data on 30+ broker sites, providing sufficient 'shock value' to drive conversion. H3: Re-listing rates are high enough (>50% within 6 months) that ongoing monitoring is objectively necessary.",
    noteType: "hypothesis",
  },

  // CONTRACTGUARD
  {
    ideaId: "contractguard",
    title: "VC: Thesis & Verdict",
    content: "High conviction. LLMs are genuinely excellent at clause extraction and risk classification — this plays directly to frontier model strengths. The browser extension distribution vector is powerful: frictionless, viral through professional word-of-mouth, and creates a habit loop on every ToS encounter. Near-perfect AI-native fitness — the core product is literally an inference call. DoNotPay's failure in adjacent territory is actually bullish, as it validated market awareness.",
    noteType: "insight",
  },
  {
    ideaId: "contractguard",
    title: "VC: Key Risks",
    content: "Commoditization is the primary concern. Every LLM wrapper startup can build basic contract scanning. The moat must come from coverage breadth (leases, employment, vendor agreements), the change-tracking feature (which builds a proprietary data asset), and the counter-language generation quality. Secondary risk: unauthorized practice of law accusations if marketing crosses the 'legal advice' line.",
    noteType: "risk",
  },
  {
    ideaId: "contractguard",
    title: "VC: Validation Hypotheses",
    content: "H1: Browser extension install-to-weekly-active rate >60%, indicating habit formation. H2: Users who receive a 'red flag' alert on a contract will share the product with 2+ colleagues within 30 days (viral coefficient). H3: Professional tier conversion from free scans >15% within first month, driven by counter-language feature.",
    noteType: "hypothesis",
  },

  // INBOXZERO PRO
  {
    ideaId: "inboxzero-pro",
    title: "VC: Thesis & Verdict",
    content: "Strong fundamentals with competitive caveats. Email is the ultimate AI-native product surface — high volume, text-heavy, pattern-rich. Draft replies in the user's voice is the killer feature that converts curiosity into dependency. Once the AI learns communication patterns, switching costs compound over time. AI-native score is 10/10 — genuinely no human in the loop needed.",
    noteType: "insight",
  },
  {
    ideaId: "inboxzero-pro",
    title: "VC: Key Risks",
    content: "Strategic platform risk is existential: Google and Microsoft are shipping 'good enough' AI email features natively. Crowded competitive field (Superhuman, SaneBox, Shortwave) all fighting for the same budget line. Winning requires being demonstrably better at draft-reply quality, which is a moving target as frontier models improve. Email privacy sensitivity creates PR risk if any data handling incident occurs.",
    noteType: "risk",
  },
  {
    ideaId: "inboxzero-pro",
    title: "VC: Validation Hypotheses",
    content: "H1: Draft reply acceptance rate (send without editing) >40% after 2 weeks of learning. H2: Users reduce time-in-email by >50% within first month. H3: NPS >60 among daily active users, indicating strong word-of-mouth potential.",
    noteType: "hypothesis",
  },

  // MEALSYNC
  {
    ideaId: "mealsync",
    title: "VC: Thesis & Verdict",
    content: "Solid consumer subscription with strong unit economics. Weekly meal plan delivery creates a natural engagement cadence that reinforces the habit. AI handles dietary constraint optimization and grocery list generation trivially. Cost per user is essentially one inference call per week. The Instacart integration at Premium tier creates transactional lock-in that could be the real retention lever.",
    noteType: "insight",
  },
  {
    ideaId: "mealsync",
    title: "VC: Key Risks",
    content: "Meal planning apps historically suffer from 'novelty decay' — heavy engagement for 4-8 weeks, then drift. The zero-waste ingredient carry-over and budget optimization must be genuinely superior to maintain engagement. Competitive landscape is saturated (Mealime, Eat This Much, Whisk). Differentiation must come from algorithmic quality, not features.",
    noteType: "risk",
  },

  // SIDEHUSTLE RADAR
  {
    ideaId: "sidehustle-radar",
    title: "VC: Thesis & Verdict",
    content: "Interesting arbitrage play with strong ROI framing. Core aggregation model plus AI cover letters creates genuine value. Freelancers spending $19/mo is trivially justified by one landed gig. LTV/CAC dynamics are favorable because the target audience has high intent — they are actively searching for work.",
    noteType: "insight",
  },
  {
    ideaId: "sidehustle-radar",
    title: "VC: Key Risks",
    content: "Platform ToS violations are potentially fatal. Upwork, Toptal, and others actively prohibit scraping and automated applications. This isn't a technical risk — it's a legal and access risk that could kill the business overnight. Mitigation requires positioning as a 'discovery layer' rather than an application automation tool, but the auto cover letter feature blurs that line.",
    noteType: "risk",
  },

  // APIBUNDLE
  {
    ideaId: "apibundle",
    title: "VC: Thesis & Verdict",
    content: "Clever developer-tools play. The 'Costco model' for APIs — bundled credits with a convenience markup. AI-native by nature since the product is infrastructure. Once integrated via the unified SDK, switching costs are very high because every integration point becomes lock-in. The $49/mo tier giving $75 in credits is smart perceived-value pricing.",
    noteType: "insight",
  },
  {
    ideaId: "apibundle",
    title: "VC: Key Risks",
    content: "Thin margin arbitrage is the core business risk. Without volume discounts from upstream providers, the spread between credit cost and subscription price may compress. Upstream provider pricing or ToS changes cascade directly to customers. If one key provider (e.g., OpenAI) changes terms, the bundled value proposition erodes. API providers' increasingly generous free tiers also threaten the bundling value.",
    noteType: "risk",
  },

  // CALMCYCLE
  {
    ideaId: "calmcycle",
    title: "VC: Thesis & Verdict",
    content: "Timely B2B/B2C hybrid. The enterprise tier at $10/user/mo is where the real money is — corporate wellness budgets are large and growing. Calendar Defense (flagging over-scheduled days) is a genuine differentiator because it operates on existing data rather than requiring new user input. Prevention framing distinguishes it from meditation-first competitors.",
    noteType: "insight",
  },
  {
    ideaId: "calmcycle",
    title: "VC: Key Risks",
    content: "Consumer tier competes with Headspace, Calm, Whoop, and Apple Health, all adding stress metrics. The B2B play is more defensible but requires enterprise sales capability. Regulatory concern: anything approaching health advice based on biometrics needs careful positioning to avoid FDA device classification. HIPAA/BIPA compliance for biometric data adds operational cost.",
    noteType: "risk",
  },

  // FITLOOP
  {
    ideaId: "fitloop",
    title: "VC: Thesis & Verdict",
    content: "Good product in a brutal market. The adaptive training concept (readiness-based auto-regulation) is genuinely superior to static plans. AI-native fitness is high for the $10-20 tiers. However, the $60 Coached tier reintroduces human dependency, violating the AI-native thesis. Fitness apps average ~25% 12-month retention industry-wide.",
    noteType: "insight",
  },
  {
    ideaId: "fitloop",
    title: "VC: Key Risks",
    content: "Market dominated by free content (YouTube), massive communities (Strava, Nike Run Club), and well-funded premium players (Whoop, TRAINIAC). The differentiation of closed-loop wearable adaptation is compelling to serious athletes but narrows the TAM. Price pressure at the $10-20 tier from free alternatives is intense.",
    noteType: "risk",
  },

  // GREENTHUMB AI
  {
    ideaId: "greenthumb-ai",
    title: "VC: Thesis & Verdict",
    content: "Charming niche with ceiling concerns. Fully automatable and technically clean. The $4-9/mo price point is appropriate for casual hobbyists. However, the TAM is narrow — houseplant market boomed during COVID but normalized. Once plants are identified and on a schedule, the marginal subscription value declines unless disease detection is needed frequently. Better positioned as a feature within a broader home app than a standalone subscription.",
    noteType: "insight",
  },
  {
    ideaId: "greenthumb-ai",
    title: "VC: Key Risks",
    content: "Plant ID is commoditized via free apps (PictureThis, PlantNet with millions of downloads). Willingness to pay $9/mo for plant care competes with 'just Google it.' The IoT sensor integration at $18/mo dramatically narrows the audience. Revenue ceiling is fundamentally constrained by market size.",
    noteType: "risk",
  },

  // MICROMENTOR
  {
    ideaId: "micromentor",
    title: "VC: Thesis & Verdict",
    content: "Content flywheel challenge. AI-generated content at near-zero marginal cost is the superpower — unlike Coursera or LinkedIn Learning, no human instructors required. Enterprise tier ($8/user/mo) is the real revenue play. But corporate L&D buyers need to trust AI-generated content quality, which may require human curation that partially breaks the AI-native model.",
    noteType: "insight",
  },
  {
    ideaId: "micromentor",
    title: "VC: Key Risks",
    content: "The 90% dropout rate cited in the problem statement applies to MicroMentor too unless spaced repetition demonstrably works. Perceived quality of AI-generated educational content is the key barrier to enterprise adoption. Competitive moat is weak — 'Duolingo for professional skills' is an obvious idea many teams are pursuing.",
    noteType: "risk",
  },

  // HOMEKEEPER
  {
    ideaId: "homekeeper",
    title: "VC: Thesis & Verdict",
    content: "Underrated sleeper. Structural retention — homes always need maintenance, seasons always change. The real business model is the vendor matching marketplace with referral commissions, making it a lead-gen business wearing a subscription costume. The Landlord tier at $25/mo for 5 properties is compelling for small real estate investors.",
    noteType: "insight",
  },
  {
    ideaId: "homekeeper",
    title: "VC: Key Risks",
    content: "Vendor matching requires building a two-sided marketplace, which is capital-intensive and geography-dependent. Without vetted vendors, the product is just a calendar with extra steps. Thumbtack, Angi, and HomeAdvisor own contractor matching — differentiation must come from preventive scheduling intelligence, not the marketplace itself.",
    noteType: "risk",
  },

  // PETPULSE
  {
    ideaId: "petpulse",
    title: "VC: Thesis & Verdict",
    content: "Emotional purchase driver with decent retention. Pet owners are emotionally motivated spenders in a $150B+ U.S. market. The daily logging to trend detection to early warning pipeline is cleanly AI-native. The 'what if I cancel and miss an early warning' fear is a powerful retention lever at $5-10/mo, which is impulse-tier for owners routinely spending $100+/mo on their animals.",
    noteType: "insight",
  },
  {
    ideaId: "petpulse",
    title: "VC: Key Risks",
    content: "Value realization depends on the AI actually catching something — if nothing happens for 6 months, users question the subscription (the insurance engagement problem). Anything resembling veterinary diagnosis needs disclaimers and potentially professional oversight, adding cost. Competitive apps from vet-affiliated providers could bundle health tracking for free.",
    noteType: "risk",
  },

  // WARDROBEIQ
  {
    ideaId: "wardrobeiq",
    title: "VC: Thesis & Verdict",
    content: "Fun concept with monetization fragility. The core value of outfit suggestions is a 'nice to have' competing with spending 2 minutes looking at your closet. Severe retention cliff after initial cataloging excitement — expected 3-4 month average lifespan. The gap analysis feature (suggesting purchases) is actually the most valuable part, but it repositions the business as an affiliate commerce play, which is a fundamentally different and likely better model.",
    noteType: "insight",
  },
  {
    ideaId: "wardrobeiq",
    title: "VC: Key Risks",
    content: "The $6-14/mo price point is hard to sustain because daily outfit suggestions lose novelty quickly. Cold start problem: photographing an entire wardrobe is friction-heavy onboarding. The category has been tried many times (Cladwell, Stylebook, Acloset) without breakout success, suggesting a structural demand ceiling rather than an execution gap.",
    noteType: "risk",
  },

  // DREAMLOG
  {
    ideaId: "dreamlog",
    title: "VC: Thesis & Verdict",
    content: "Niche enthusiasm product. Voice-to-text dream capture targeting the half-asleep state is genuinely clever UX. AI-native score is 10/10, and it's technically trivial to build. But the addressable market of people who care about dreams, want pattern analysis, and will pay $5-12/mo is extremely small. Lucid dreaming enthusiasts are passionate but tiny. Better positioned as a feature within a broader sleep/wellness app (partnering with Oura, Eight Sleep) than a standalone product.",
    noteType: "insight",
  },
  {
    ideaId: "dreamlog",
    title: "VC: Key Risks",
    content: "Addressable market may be too small to support a standalone business — estimated 2-5M globally. Journaling apps retain <15% at 12 months, and dream journaling has even narrower engagement. Revenue ceiling likely sub-$10M TAM. The product works beautifully but the market doesn't support venture-scale outcomes.",
    noteType: "risk",
  },
];

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import Anthropic from "@anthropic-ai/sdk";

const app = new Hono();
app.use("/*", cors());

const SYSTEM_PROMPT = `You are a contract and Terms of Service analysis expert. Analyze the provided legal text and return ONLY valid JSON (no markdown, no code fences) with this exact structure:

{
  "summary": "2-3 sentence overall assessment of the contract's fairness",
  "overallRisk": "low" | "medium" | "high",
  "clauses": [
    {
      "id": "clause-1",
      "title": "Short descriptive label",
      "originalText": "Exact quoted text from the contract",
      "explanation": "Plain-English explanation of why this matters and the risk to the agreeing party",
      "severity": "low" | "medium" | "high",
      "category": "liability" | "termination" | "intellectual_property" | "non_compete" | "data_privacy" | "auto_renewal" | "arbitration" | "indemnification" | "payment" | "confidentiality" | "other",
      "suggestedAlternative": "Professional counter-language the user could propose"
    }
  ],
  "positives": ["List of fair/standard terms worth noting"]
}

Be thorough but concise. Flag anything unusual, unfavorable to the agreeing party, or deviating from standard fair terms. For each flagged clause, provide the exact text, a plain-English explanation, severity rating, and suggested alternative language. Include sequential IDs like clause-1, clause-2, etc.`;

app.post("/api/analyze", async (c) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return c.json({ error: "ANTHROPIC_API_KEY not configured" }, 500);
  }

  const body = await c.req.json().catch(() => null);
  if (!body?.text || typeof body.text !== "string") {
    return c.json({ error: "Request body must include a 'text' field" }, 400);
  }

  if (body.text.length < 100) {
    return c.json({ error: "Contract text must be at least 100 characters" }, 400);
  }

  if (body.text.length > 100_000) {
    return c.json({ error: "Contract text must be under 100,000 characters" }, 400);
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this contract/Terms of Service and identify all risky, unusual, or unfavorable clauses:\n\n${body.text}`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return c.json({ error: "No text response from AI" }, 500);
    }

    const analysis = JSON.parse(textBlock.text);
    return c.json(analysis);
  } catch (e) {
    console.error("Analysis error:", e);
    const msg = e instanceof Error ? e.message : "Analysis failed";
    return c.json({ error: msg }, 500);
  }
});

const port = 3001;
console.log(`ContractGuard API server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });

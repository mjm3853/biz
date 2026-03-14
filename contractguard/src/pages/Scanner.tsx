import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { AnalysisResponse } from "../types/analysis";
import ContractInput from "../components/ContractInput";
import LoadingState from "../components/LoadingState";
import AnalysisResults from "../components/AnalysisResults";

type ScannerState =
  | { phase: "input" }
  | { phase: "loading" }
  | { phase: "results"; analysis: AnalysisResponse }
  | { phase: "error"; message: string };

export default function Scanner() {
  const [state, setState] = useState<ScannerState>({ phase: "input" });

  async function handleSubmit(text: string) {
    setState({ phase: "loading" });
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Analysis failed" }));
        throw new Error(err.error || `Server error (${res.status})`);
      }
      const analysis: AnalysisResponse = await res.json();
      setState({ phase: "results", analysis });
    } catch (e) {
      setState({ phase: "error", message: e instanceof Error ? e.message : "Something went wrong" });
    }
  }

  function handleReset() {
    setState({ phase: "input" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-semibold text-gray-900">ContractGuard</span>
        </div>
      </header>

      <main className="px-4 py-10">
        {state.phase === "input" && (
          <ContractInput onSubmit={handleSubmit} isLoading={false} />
        )}

        {state.phase === "loading" && <LoadingState />}

        {state.phase === "results" && (
          <AnalysisResults analysis={state.analysis} onReset={handleReset} />
        )}

        {state.phase === "error" && (
          <div className="max-w-3xl mx-auto text-center py-20">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Analysis Failed</h2>
            <p className="text-gray-600 mb-6">{state.message}</p>
            <button
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

import { useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { seedVCAnalysis } from "../../db/seed";

export default function SeedButton({ onComplete }: { onComplete: () => void }) {
  const { db, save } = useDatabase();
  const [seeded, setSeeded] = useState(false);

  function handleSeed() {
    if (!db) return;
    seedVCAnalysis(db);
    save();
    setSeeded(true);
    setTimeout(onComplete, 800);
  }

  if (seeded) {
    return (
      <div className="text-center py-12 text-green-600">
        <p className="text-sm font-medium">Analysis loaded — 240 scores, {">"}40 notes across 15 ideas.</p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-sm text-gray-400 mb-3">No ideas scored yet.</p>
      <button
        onClick={handleSeed}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Load VC Analysis
      </button>
      <p className="text-xs text-gray-400 mt-2">Pre-populate with quantitative scores and qualitative notes for all 15 ideas.</p>
    </div>
  );
}

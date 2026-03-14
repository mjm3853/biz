import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useScores } from "../hooks/useScores";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { CATEGORIES } from "../db/constants";
import ScoreInput from "./components/ScoreInput";
import RadarChartCard from "./components/RadarChartCard";
import { getIcon } from "../utils/icons";

const ideaMap = Object.fromEntries(ideas.map((i) => [i.id, i]));

export default function Scorecard() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const { isLoading } = useDatabase();
  const { scores, saveAllScores } = useScores(ideaId ?? "");
  const idea = ideaMap[ideaId ?? ""];

  const [localScores, setLocalScores] = useState<Record<string, number>>({});
  const [localRationales, setLocalRationales] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const s: Record<string, number> = {};
    const r: Record<string, string> = {};
    for (const [dim, row] of Object.entries(scores)) {
      s[dim] = row.score;
      r[dim] = row.rationale ?? "";
    }
    setLocalScores(s);
    setLocalRationales(r);
    setDirty(false);
  }, [scores]);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;
  if (!idea) return <div className="text-center py-12 text-gray-400">Idea not found</div>;

  const Icon = getIcon(idea.iconName);

  const categoryAverages: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    const vals = cat.dimensions.map((d) => localScores[d.key]).filter((v) => v !== undefined);
    categoryAverages[cat.key] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }

  const handleSave = () => {
    const toSave: Record<string, { score: number; rationale: string | null }> = {};
    for (const cat of CATEGORIES) {
      for (const dim of cat.dimensions) {
        const val = localScores[dim.key];
        if (val !== undefined) {
          toSave[dim.key] = { score: val, rationale: localRationales[dim.key] || null };
        }
      }
    }
    saveAllScores(toSave);
    setDirty(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-gray-500" />}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{idea.name}</h1>
            <p className="text-sm text-gray-500">{idea.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/dashboard/idea/${ideaId}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Notes & Experiments
          </Link>
          <button
            onClick={handleSave}
            disabled={!dirty}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              dirty
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Scores
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <RadarChartCard
            datasets={[{ label: idea.name, color: "#1f2937", scores: categoryAverages }]}
            title="Category Profile"
          />
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Problem</h3>
            <p className="text-sm text-gray-600">{idea.problem}</p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <h2 className="text-sm font-semibold text-gray-800">{cat.label}</h2>
                {categoryAverages[cat.key] > 0 && (
                  <span className="text-xs text-gray-400 ml-auto">
                    avg {categoryAverages[cat.key].toFixed(1)}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {cat.dimensions.map((dim) => (
                  <ScoreInput
                    key={dim.key}
                    label={dim.label}
                    description={dim.description}
                    value={localScores[dim.key] ?? 5}
                    onChange={(v) => {
                      setLocalScores((prev) => ({ ...prev, [dim.key]: v }));
                      setDirty(true);
                    }}
                    rationale={localRationales[dim.key]}
                    onRationaleChange={(v) => {
                      setLocalRationales((prev) => ({ ...prev, [dim.key]: v }));
                      setDirty(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

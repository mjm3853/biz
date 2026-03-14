import { useState } from "react";
import { useAllScores } from "../hooks/useScores";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { CATEGORIES } from "../db/constants";
import IdeaSelector from "./components/IdeaSelector";
import RadarChartCard from "./components/RadarChartCard";

const ideaMap = Object.fromEntries(ideas.map((i) => [i.id, i]));
const COMPARE_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

function cellColor(score: number): string {
  if (score >= 8) return "bg-green-100 text-green-800";
  if (score >= 5) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

export default function ComparisonMatrix() {
  const { isLoading } = useDatabase();
  const [selected, setSelected] = useState<string[]>([]);
  const { scoresByIdea } = useAllScores();

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;

  const radarDatasets = selected.map((id, idx) => {
    const ideaScores = scoresByIdea[id] || {};
    const categoryScores: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      const vals = cat.dimensions.map((d) => ideaScores[d.key]?.score).filter((v): v is number => v !== undefined);
      categoryScores[cat.key] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }
    return {
      label: ideaMap[id]?.name ?? id,
      color: COMPARE_COLORS[idx],
      scores: categoryScores,
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compare Ideas</h1>
        <p className="text-sm text-gray-500 mt-1">Select 2-4 ideas for side-by-side analysis.</p>
      </div>

      <IdeaSelector selected={selected} onChange={setSelected} max={4} />

      {selected.length >= 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RadarChartCard datasets={radarDatasets} title="Category Overlay" />

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-xs text-gray-400 uppercase">Dimension</th>
                    {selected.map((id, idx) => (
                      <th key={id} className="p-3 text-center">
                        <span className="text-xs font-semibold" style={{ color: COMPARE_COLORS[idx] }}>
                          {ideaMap[id]?.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map((cat) => (
                    <>
                      <tr key={cat.key} className="bg-gray-50">
                        <td
                          colSpan={selected.length + 1}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: cat.color }} />
                          {cat.label}
                        </td>
                      </tr>
                      {cat.dimensions.map((dim) => (
                        <tr key={dim.key} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="px-3 py-2 text-gray-600">{dim.label}</td>
                          {selected.map((id) => {
                            const s = scoresByIdea[id]?.[dim.key]?.score;
                            return (
                              <td key={id} className="px-3 py-2 text-center">
                                {s !== undefined ? (
                                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${cellColor(s)}`}>
                                    {s}
                                  </span>
                                ) : (
                                  <span className="text-gray-300">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selected.length < 2 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          Select at least 2 ideas above to start comparing.
        </div>
      )}
    </div>
  );
}

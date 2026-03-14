import { Link } from "react-router-dom";
import { useRankings } from "../hooks/useRankings";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { CATEGORIES, IDEA_STATUSES } from "../db/constants";
import StatusBadge from "./components/StatusBadge";
import WeightSliders from "./components/WeightSliders";
import { getIcon } from "../utils/icons";
import { useState } from "react";

const ideaMap = Object.fromEntries(ideas.map((i) => [i.id, i]));

export default function Overview() {
  const { isLoading } = useDatabase();
  const { rankings, weights, changeWeight, changeStatus } = useRankings();
  const [statusMenu, setStatusMenu] = useState<string | null>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Loading database...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deal Flow Rankings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Weighted aggregate scores across {CATEGORIES.length} categories. Adjust weights to shift priorities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <div className="grid grid-cols-[2rem_minmax(7rem,1fr)_3.5rem_repeat(6,2.5rem)_5.5rem] gap-2 px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <span>#</span>
            <span>Idea</span>
            <span className="text-right">Score</span>
            {CATEGORIES.map((c) => (
              <span key={c.key} className="text-center" title={c.label}>
                {c.label.slice(0, 3)}
              </span>
            ))}
            <span className="text-center">Status</span>
          </div>

          {rankings.map((r, idx) => {
            const idea = ideaMap[r.id];
            if (!idea) return null;
            const Icon = getIcon(idea.iconName);

            return (
              <div
                key={r.id}
                className="grid grid-cols-[2rem_minmax(7rem,1fr)_3.5rem_repeat(6,2.5rem)_5.5rem] gap-2 items-center px-3 py-3 bg-white border border-gray-100 rounded-lg hover:border-gray-300 transition-colors"
              >
                <span className="text-sm font-bold text-gray-300 tabular-nums">{idx + 1}</span>
                <div className="flex items-center gap-2 min-w-0">
                  {Icon && <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                  <Link
                    to={`/dashboard/scorecard/${r.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate"
                  >
                    {idea.name}
                  </Link>
                  <Link
                    to={`/dashboard/idea/${r.id}`}
                    className="text-xs text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    detail
                  </Link>
                </div>
                <span className="text-right text-sm font-bold tabular-nums text-gray-900">
                  {r.overallScore > 0 ? r.overallScore.toFixed(0) : "—"}
                </span>
                {CATEGORIES.map((c) => {
                  const val = r.categoryScores[c.key];
                  return (
                    <div key={c.key} className="flex justify-center">
                      {val > 0 ? (
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium"
                          style={{
                            backgroundColor: `${c.color}${Math.round((val / 10) * 40 + 15).toString(16)}`,
                            color: val >= 5 ? c.color : "#9ca3af",
                          }}
                        >
                          {val.toFixed(0)}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </div>
                  );
                })}
                <div className="flex justify-center relative">
                  <StatusBadge
                    status={r.status}
                    onClick={() => setStatusMenu(statusMenu === r.id ? null : r.id)}
                  />
                  {statusMenu === r.id && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                      {IDEA_STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            changeStatus(r.id, s);
                            setStatusMenu(null);
                          }}
                          className={`block w-full text-left px-3 py-1.5 text-xs capitalize hover:bg-gray-50 ${
                            s === r.status ? "font-bold" : ""
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {rankings.every((r) => r.overallScore === 0) && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No ideas scored yet.</p>
              <p className="text-xs mt-1">Click an idea name above to start scoring.</p>
            </div>
          )}
        </div>

        <div>
          <WeightSliders weights={weights} onChange={changeWeight} />
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useRankings } from "../hooks/useRankings";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { CATEGORIES, IDEA_STATUSES } from "../db/constants";
import StatusBadge from "./components/StatusBadge";
import WeightSliders from "./components/WeightSliders";
import SeedButton from "./components/SeedButton";
import { getIcon } from "../utils/icons";
import { useState, useMemo } from "react";

const ideaMap = Object.fromEntries(ideas.map((i) => [i.id, i]));

export default function Overview() {
  const { isLoading } = useDatabase();
  const { rankings, weights, changeWeight, changeStatus, refresh } = useRankings();
  const [statusMenu, setStatusMenu] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const sortedRankings = useMemo(() => {
    const sorted = [...rankings].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "score") {
        cmp = a.overallScore - b.overallScore;
      } else if (sortKey === "name") {
        const nameA = ideaMap[a.id]?.name ?? "";
        const nameB = ideaMap[b.id]?.name ?? "";
        cmp = nameA.localeCompare(nameB);
      } else if (sortKey === "status") {
        cmp = a.status.localeCompare(b.status);
      } else {
        cmp = (a.categoryScores[sortKey] ?? 0) - (b.categoryScores[sortKey] ?? 0);
      }
      return sortDir === "desc" ? -cmp : cmp;
    });
    return sorted;
  }, [rankings, sortKey, sortDir]);

  const arrow = (key: string) =>
    sortKey === key ? (sortDir === "desc" ? " ▼" : " ▲") : "";

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
          <div className="grid grid-cols-[2rem_minmax(7rem,1fr)_3.5rem_repeat(6,2.5rem)_5.5rem] gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider">
            <span className="text-gray-400">#</span>
            <button onClick={() => handleSort("name")} className={`text-left cursor-pointer hover:text-gray-700 ${sortKey === "name" ? "text-gray-700" : "text-gray-400"}`}>
              Idea{arrow("name")}
            </button>
            <button onClick={() => handleSort("score")} className={`text-right cursor-pointer hover:text-gray-700 ${sortKey === "score" ? "text-gray-700" : "text-gray-400"}`}>
              Score{arrow("score")}
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.key} onClick={() => handleSort(c.key)} title={c.label} className={`text-center cursor-pointer hover:text-gray-700 ${sortKey === c.key ? "text-gray-700" : "text-gray-400"}`}>
                {c.label.slice(0, 3)}{arrow(c.key)}
              </button>
            ))}
            <button onClick={() => handleSort("status")} className={`text-center cursor-pointer hover:text-gray-700 ${sortKey === "status" ? "text-gray-700" : "text-gray-400"}`}>
              Status{arrow("status")}
            </button>
          </div>

          {sortedRankings.map((r, idx) => {
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

          {sortedRankings.every((r) => r.overallScore === 0) && (
            <SeedButton onComplete={refresh} />
          )}
        </div>

        <div>
          <WeightSliders weights={weights} onChange={changeWeight} />
        </div>
      </div>
    </div>
  );
}

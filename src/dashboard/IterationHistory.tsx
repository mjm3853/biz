import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { DIMENSION_MAP } from "../db/constants";
import type { ScoreRow } from "../db/queries";
import type { Database } from "sql.js";
import { getIcon } from "../utils/icons";

const ideaMap = Object.fromEntries(ideas.map((i) => [i.id, i]));

function queryAllHistory(db: Database): ScoreRow[] {
  const stmt = db.prepare(
    "SELECT idea_id, dimension, score, rationale, scored_at FROM scores ORDER BY scored_at DESC LIMIT 200"
  );
  const results: ScoreRow[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as ScoreRow);
  }
  stmt.free();
  return results;
}

export default function IterationHistory() {
  const { db, isLoading } = useDatabase();
  const [history, setHistory] = useState<ScoreRow[]>([]);

  useEffect(() => {
    if (!db) return;
    setHistory(queryAllHistory(db));
  }, [db]);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;

  // Group by date
  const grouped: Record<string, ScoreRow[]> = {};
  for (const row of history) {
    const date = new Date(row.scored_at).toLocaleDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(row);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Iteration History</h1>
        <p className="text-sm text-gray-500 mt-1">
          Timeline of all scoring changes across ideas. Most recent first.
        </p>
      </div>

      {Object.entries(grouped).length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No scoring history yet. Start by scoring ideas on the Scorecard page.
        </div>
      )}

      {Object.entries(grouped).map(([date, rows]) => (
        <div key={date}>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sticky top-0 bg-gray-50/80 backdrop-blur-sm py-1">
            {date}
          </h2>
          <div className="space-y-1">
            {rows.map((row, idx) => {
              const idea = ideaMap[row.idea_id];
              const dim = DIMENSION_MAP[row.dimension];
              const Icon = idea ? getIcon(idea.iconName) : null;

              const scoreColor =
                row.score >= 8 ? "text-green-600" : row.score >= 5 ? "text-amber-600" : "text-red-600";

              return (
                <div
                  key={`${row.idea_id}-${row.dimension}-${row.scored_at}-${idx}`}
                  className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-100 rounded-lg"
                >
                  {Icon && <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                  <Link
                    to={`/dashboard/scorecard/${row.idea_id}`}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 w-28 truncate flex-shrink-0"
                  >
                    {idea?.name ?? row.idea_id}
                  </Link>
                  <span className="text-sm text-gray-500 flex-1 truncate">
                    {dim?.label ?? row.dimension}
                  </span>
                  <span className={`text-sm font-bold tabular-nums ${scoreColor}`}>{row.score}</span>
                  {row.rationale && (
                    <span className="text-xs text-gray-400 max-w-[200px] truncate">{row.rationale}</span>
                  )}
                  <span className="text-xs text-gray-300 flex-shrink-0">
                    {new Date(row.scored_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

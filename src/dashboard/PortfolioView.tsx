import { useState, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  ZAxis,
} from "recharts";
import { useAllScores } from "../hooks/useScores";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { CATEGORIES, ALL_DIMENSIONS } from "../db/constants";
import { useNavigate } from "react-router-dom";

const accentColorMap: Record<string, string> = {
  blue: "#3b82f6", orange: "#f97316", violet: "#8b5cf6", green: "#22c55e",
  amber: "#f59e0b", rose: "#f43f5e", cyan: "#06b6d4", teal: "#14b8a6",
  yellow: "#eab308", fuchsia: "#d946ef", indigo: "#6366f1", emerald: "#10b981",
  sky: "#0ea5e9", slate: "#64748b", red: "#ef4444", pink: "#ec4899",
};

type AxisOption = { key: string; label: string; type: "category" | "dimension" };

const axisOptions: AxisOption[] = [
  ...CATEGORIES.map((c) => ({ key: c.key, label: c.label, type: "category" as const })),
  ...ALL_DIMENSIONS.map((d) => ({ key: d.key, label: d.label, type: "dimension" as const })),
];

function computeAxisValue(
  opt: AxisOption,
  ideaScores: Record<string, { score: number }> | undefined
): number {
  if (!ideaScores) return 0;
  if (opt.type === "dimension") {
    return ideaScores[opt.key]?.score ?? 0;
  }
  const cat = CATEGORIES.find((c) => c.key === opt.key);
  if (!cat) return 0;
  const vals = cat.dimensions.map((d) => ideaScores[d.key]?.score).filter((v): v is number => v !== undefined);
  return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}

export default function PortfolioView() {
  const { isLoading } = useDatabase();
  const { scoresByIdea } = useAllScores();
  const navigate = useNavigate();
  const [xKey, setXKey] = useState("market");
  const [yKey, setYKey] = useState("feasibility");

  const xOpt = axisOptions.find((o) => o.key === xKey) ?? axisOptions[0];
  const yOpt = axisOptions.find((o) => o.key === yKey) ?? axisOptions[1];

  const data = useMemo(() => {
    return ideas.map((idea) => {
      const scores = scoresByIdea[idea.id];
      const x = computeAxisValue(xOpt, scores);
      const y = computeAxisValue(yOpt, scores);
      const allVals = scores ? Object.values(scores).map((s) => s.score) : [];
      const overall = allVals.length > 0 ? allVals.reduce((a, b) => a + b, 0) / allVals.length : 0;
      return {
        id: idea.id,
        name: idea.name,
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        z: Math.max(overall * 8, 20),
        color: accentColorMap[idea.accentColor] ?? "#6b7280",
        scored: allVals.length > 0,
      };
    });
  }, [scoresByIdea, xOpt, yOpt]);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;

  const quadrantLabels = [
    { x: 7.5, y: 7.5, label: "Stars", color: "#16a34a" },
    { x: 2.5, y: 7.5, label: "Question Marks", color: "#ca8a04" },
    { x: 7.5, y: 2.5, label: "Cash Cows", color: "#2563eb" },
    { x: 2.5, y: 2.5, label: "Dogs", color: "#dc2626" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Matrix</h1>
        <p className="text-sm text-gray-500 mt-1">
          Plot ideas across any two dimensions. Dot size reflects overall score.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 uppercase">X-Axis</label>
          <select
            value={xKey}
            onChange={(e) => setXKey(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            {axisOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 uppercase">Y-Axis</label>
          <select
            value={yKey}
            onChange={(e) => setYKey(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            {axisOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis type="number" dataKey="x" domain={[0, 10]} name={xOpt.label} tick={{ fontSize: 11 }}
              label={{ value: xOpt.label, position: "insideBottom", offset: -10, fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis type="number" dataKey="y" domain={[0, 10]} name={yOpt.label} tick={{ fontSize: 11 }}
              label={{ value: yOpt.label, angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "#6b7280" }}
            />
            <ZAxis type="number" dataKey="z" range={[40, 400]} />
            <ReferenceLine x={5} stroke="#e5e7eb" strokeDasharray="4 4" />
            <ReferenceLine y={5} stroke="#e5e7eb" strokeDasharray="4 4" />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs">
                    <p className="font-semibold text-gray-900">{d.name}</p>
                    <p className="text-gray-500">{xOpt.label}: {d.x} | {yOpt.label}: {d.y}</p>
                  </div>
                );
              }}
            />
            <Scatter
              data={data.filter((d) => d.scored)}
              cursor="pointer"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(_: any, __: any, e: any) => { const d = e?.payload; if (d?.id) navigate(`/dashboard/scorecard/${d.id}`); }}
            >
              {data.filter((d) => d.scored).map((d) => (
                <Cell key={d.id} fill={d.color} fillOpacity={0.8} stroke={d.color} strokeWidth={1} />
              ))}
            </Scatter>
            <Scatter data={data.filter((d) => !d.scored)} cursor="pointer"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(_: any, __: any, e: any) => { const d = e?.payload; if (d?.id) navigate(`/dashboard/scorecard/${d.id}`); }}>
              {data.filter((d) => !d.scored).map((d) => (
                <Cell key={d.id} fill="#e5e7eb" fillOpacity={0.5} stroke="#d1d5db" strokeWidth={1} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex justify-between px-8 mt-2">
          {quadrantLabels.map((q) => (
            <span key={q.label} className="text-xs font-medium" style={{ color: q.color }}>
              {q.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {data.map((d) => (
          <div key={d.id} className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.scored ? d.color : "#e5e7eb" }} />
            <span className={d.scored ? "text-gray-700" : "text-gray-400"}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

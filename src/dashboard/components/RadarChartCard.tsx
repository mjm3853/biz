import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CATEGORIES } from "../../db/constants";

interface RadarDataset {
  label: string;
  color: string;
  scores: Record<string, number>; // category key -> average score
}

interface RadarChartCardProps {
  datasets: RadarDataset[];
  title?: string;
}

export default function RadarChartCard({ datasets, title }: RadarChartCardProps) {
  const data = CATEGORIES.map((cat) => {
    const point: Record<string, unknown> = { category: cat.label };
    for (const ds of datasets) {
      point[ds.label] = Number((ds.scores[cat.key] ?? 0).toFixed(1));
    }
    return point;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      {title && <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: "#6b7280" }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 10 }} />
          {datasets.map((ds) => (
            <Radar
              key={ds.label}
              name={ds.label}
              dataKey={ds.label}
              stroke={ds.color}
              fill={ds.color}
              fillOpacity={datasets.length > 1 ? 0.15 : 0.25}
              strokeWidth={2}
            />
          ))}
          {datasets.length > 1 && (
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="circle"
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

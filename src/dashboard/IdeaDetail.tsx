import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { useExperiments } from "../hooks/useExperiments";
import { useScoreHistory } from "../hooks/useScores";
import { useDatabase } from "../hooks/useDatabase";
import { ideas } from "../data/ideas";
import { DIMENSION_MAP } from "../db/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  StickyNote,
  FlaskConical,
  TrendingUp,
  Plus,
  Trash2,
  Play,
  Check,
  X,
} from "lucide-react";
import { getIcon } from "../utils/icons";

const ideaMap = Object.fromEntries(ideas.map((i) => [i.id, i]));
const NOTE_TYPES = ["general", "hypothesis", "risk", "insight"] as const;
const NOTE_TYPE_COLORS: Record<string, string> = {
  general: "bg-gray-100 text-gray-700",
  hypothesis: "bg-blue-100 text-blue-700",
  risk: "bg-red-100 text-red-700",
  insight: "bg-green-100 text-green-700",
};
const EXP_STATUSES = ["planned", "running", "completed", "abandoned"] as const;
const EXP_STATUS_COLORS: Record<string, string> = {
  planned: "border-gray-300 bg-gray-50",
  running: "border-blue-300 bg-blue-50",
  completed: "border-green-300 bg-green-50",
  abandoned: "border-red-300 bg-red-50",
};

type Tab = "notes" | "experiments" | "history";

export default function IdeaDetail() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const { isLoading } = useDatabase();
  const idea = ideaMap[ideaId ?? ""];
  const { notes, addNote, editNote, removeNote } = useNotes(ideaId ?? "");
  const { experiments, addExperiment, changeStatus, removeExperiment } = useExperiments(ideaId ?? "");
  const history = useScoreHistory(ideaId ?? "");
  const [tab, setTab] = useState<Tab>("notes");

  // Note form state
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState<string>("general");
  const [editingNote, setEditingNote] = useState<number | null>(null);

  // Experiment form state
  const [expHypothesis, setExpHypothesis] = useState("");
  const [expMethod, setExpMethod] = useState("");
  const [expMetric, setExpMetric] = useState("");
  const [expCost, setExpCost] = useState("");
  const [resultInput, setResultInput] = useState<{ id: number; text: string } | null>(null);

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;
  if (!idea) return <div className="text-center py-12 text-gray-400">Idea not found</div>;

  const Icon = getIcon(idea.iconName);

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    if (editingNote !== null) {
      editNote(editingNote, noteTitle, noteContent);
      setEditingNote(null);
    } else {
      addNote(noteTitle, noteContent, noteType);
    }
    setNoteTitle("");
    setNoteContent("");
  };

  const handleAddExperiment = () => {
    if (!expHypothesis.trim() || !expMethod.trim()) return;
    addExperiment(expHypothesis, expMethod, expMetric || null, expCost || null);
    setExpHypothesis("");
    setExpMethod("");
    setExpMetric("");
    setExpCost("");
  };

  // Build history chart data
  const historyByTimestamp: Record<string, Record<string, number>> = {};
  for (const row of history) {
    if (!historyByTimestamp[row.scored_at]) historyByTimestamp[row.scored_at] = {};
    historyByTimestamp[row.scored_at][row.dimension] = row.score;
  }
  const historyDates = Object.keys(historyByTimestamp).sort();
  const historyDimensions = [...new Set(history.map((h) => h.dimension))];
  const historyChartData = historyDates.map((date) => ({
    date: new Date(date).toLocaleDateString(),
    ...historyByTimestamp[date],
  }));
  const dimColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899",
    "#06b6d4", "#f97316", "#14b8a6", "#6366f1", "#d946ef", "#84cc16",
    "#0ea5e9", "#e11d48", "#22c55e", "#a855f7", "#f43f5e", "#eab308"];

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { key: "notes", label: "Notes", icon: StickyNote, count: notes.length },
    { key: "experiments", label: "Experiments", icon: FlaskConical, count: experiments.length },
    { key: "history", label: "Score History", icon: TrendingUp, count: historyDates.length },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-gray-500" />}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{idea.name}</h1>
            <p className="text-sm text-gray-500">{idea.tagline}</p>
          </div>
        </div>
        <Link to={`/dashboard/scorecard/${ideaId}`} className="text-sm text-gray-500 hover:text-gray-700">
          Score this idea
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notes Tab */}
      {tab === "notes" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                {NOTE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Write your note..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
            />
            <button
              onClick={handleAddNote}
              disabled={!noteTitle.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" />
              {editingNote !== null ? "Update" : "Add Note"}
            </button>
          </div>

          {notes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${NOTE_TYPE_COLORS[note.note_type]}`}>
                    {note.note_type}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">{note.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingNote(note.id);
                      setNoteTitle(note.title);
                      setNoteContent(note.content);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <StickyNote className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeNote(note.id)} className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">{note.content}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(note.created_at).toLocaleDateString()}</p>
            </div>
          ))}

          {notes.length === 0 && (
            <p className="text-center py-8 text-sm text-gray-400">No notes yet. Add your first note above.</p>
          )}
        </div>
      )}

      {/* Experiments Tab */}
      {tab === "experiments" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <input
              type="text"
              placeholder="Hypothesis: We believe that..."
              value={expHypothesis}
              onChange={(e) => setExpHypothesis(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Method (e.g., landing page test)"
                value={expMethod}
                onChange={(e) => setExpMethod(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Success metric"
                value={expMetric}
                onChange={(e) => setExpMetric(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Cost estimate (e.g., $50, 2hrs)"
                value={expCost}
                onChange={(e) => setExpCost(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <button
              onClick={handleAddExperiment}
              disabled={!expHypothesis.trim() || !expMethod.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Experiment
            </button>
          </div>

          {EXP_STATUSES.map((status) => {
            const filtered = experiments.filter((e) => e.status === status);
            if (filtered.length === 0) return null;
            return (
              <div key={status}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 capitalize">{status}</h3>
                <div className="space-y-2">
                  {filtered.map((exp) => (
                    <div key={exp.id} className={`border rounded-xl p-4 ${EXP_STATUS_COLORS[exp.status]}`}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium text-gray-900">{exp.hypothesis}</p>
                          <p className="text-xs text-gray-600">Method: {exp.method}</p>
                          {exp.success_metric && <p className="text-xs text-gray-500">Success: {exp.success_metric}</p>}
                          {exp.cost_estimate && <p className="text-xs text-gray-500">Cost: {exp.cost_estimate}</p>}
                          {exp.result && <p className="text-xs text-green-700 font-medium mt-1">Result: {exp.result}</p>}
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {exp.status === "planned" && (
                            <button
                              onClick={() => changeStatus(exp.id, "running")}
                              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                              title="Start"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {exp.status === "running" && (
                            <>
                              <button
                                onClick={() => setResultInput({ id: exp.id, text: "" })}
                                className="p-1.5 text-green-600 hover:bg-green-100 rounded"
                                title="Complete"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => changeStatus(exp.id, "abandoned")}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded"
                                title="Abandon"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => removeExperiment(exp.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {resultInput?.id === exp.id && (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="What was the result?"
                            value={resultInput.text}
                            onChange={(e) => setResultInput({ ...resultInput, text: e.target.value })}
                            className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              changeStatus(exp.id, "completed", resultInput.text);
                              setResultInput(null);
                            }}
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {experiments.length === 0 && (
            <p className="text-center py-8 text-sm text-gray-400">No experiments yet. Design your cheapest validation test above.</p>
          )}
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div className="space-y-4">
          {historyChartData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Score Evolution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {historyDimensions.map((dim, i) => (
                    <Line
                      key={dim}
                      type="monotone"
                      dataKey={dim}
                      name={DIMENSION_MAP[dim]?.label ?? dim}
                      stroke={dimColors[i % dimColors.length]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center py-12 text-sm text-gray-400">
              No score history yet. Score this idea to start tracking changes over time.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

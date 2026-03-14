import type { Database } from "sql.js";
import type { IdeaStatus } from "./constants";

export interface ScoreRow {
  idea_id: string;
  dimension: string;
  score: number;
  rationale: string | null;
  scored_at: string;
}

export interface NoteRow {
  id: number;
  idea_id: string;
  title: string;
  content: string;
  note_type: string;
  created_at: string;
  updated_at: string;
}

export interface ExperimentRow {
  id: number;
  idea_id: string;
  hypothesis: string;
  method: string;
  status: string;
  success_metric: string | null;
  result: string | null;
  cost_estimate: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface IdeaRow {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function queryAll<T>(db: Database, sql: string, params: unknown[] = []): T[] {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results: T[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as T);
  }
  stmt.free();
  return results;
}

// --- Ideas ---

export function getIdeaStatus(db: Database, ideaId: string): IdeaRow | null {
  const rows = queryAll<IdeaRow>(db, "SELECT * FROM ideas WHERE id = ?", [ideaId]);
  return rows[0] ?? null;
}

export function getAllIdeaStatuses(db: Database): IdeaRow[] {
  return queryAll<IdeaRow>(db, "SELECT * FROM ideas ORDER BY id");
}

export function updateIdeaStatus(db: Database, ideaId: string, status: IdeaStatus): void {
  db.run("UPDATE ideas SET status = ?, updated_at = datetime('now') WHERE id = ?", [status, ideaId]);
}

// --- Scores ---

export function getLatestScores(db: Database, ideaId: string): ScoreRow[] {
  return queryAll<ScoreRow>(
    db,
    `SELECT s.idea_id, s.dimension, s.score, s.rationale, s.scored_at
     FROM scores s
     INNER JOIN (
       SELECT idea_id, dimension, MAX(scored_at) as max_at
       FROM scores WHERE idea_id = ?
       GROUP BY idea_id, dimension
     ) latest ON s.idea_id = latest.idea_id
       AND s.dimension = latest.dimension
       AND s.scored_at = latest.max_at
     WHERE s.idea_id = ?`,
    [ideaId, ideaId]
  );
}

export function getAllLatestScores(db: Database): ScoreRow[] {
  return queryAll<ScoreRow>(
    db,
    `SELECT s.idea_id, s.dimension, s.score, s.rationale, s.scored_at
     FROM scores s
     INNER JOIN (
       SELECT idea_id, dimension, MAX(scored_at) as max_at
       FROM scores
       GROUP BY idea_id, dimension
     ) latest ON s.idea_id = latest.idea_id
       AND s.dimension = latest.dimension
       AND s.scored_at = latest.max_at`
  );
}

export function getScoreHistory(db: Database, ideaId: string): ScoreRow[] {
  return queryAll<ScoreRow>(
    db,
    "SELECT idea_id, dimension, score, rationale, scored_at FROM scores WHERE idea_id = ? ORDER BY scored_at ASC",
    [ideaId]
  );
}

export function insertScore(
  db: Database,
  ideaId: string,
  dimension: string,
  score: number,
  rationale: string | null
): void {
  db.run(
    "INSERT INTO scores (idea_id, dimension, score, rationale) VALUES (?, ?, ?, ?)",
    [ideaId, dimension, score, rationale]
  );
}

// --- Notes ---

export function getNotes(db: Database, ideaId: string): NoteRow[] {
  return queryAll<NoteRow>(
    db,
    "SELECT * FROM notes WHERE idea_id = ? ORDER BY created_at DESC",
    [ideaId]
  );
}

export function insertNote(
  db: Database,
  ideaId: string,
  title: string,
  content: string,
  noteType: string
): void {
  db.run(
    "INSERT INTO notes (idea_id, title, content, note_type) VALUES (?, ?, ?, ?)",
    [ideaId, title, content, noteType]
  );
}

export function updateNote(db: Database, noteId: number, title: string, content: string): void {
  db.run(
    "UPDATE notes SET title = ?, content = ?, updated_at = datetime('now') WHERE id = ?",
    [title, content, noteId]
  );
}

export function deleteNote(db: Database, noteId: number): void {
  db.run("DELETE FROM notes WHERE id = ?", [noteId]);
}

// --- Experiments ---

export function getExperiments(db: Database, ideaId: string): ExperimentRow[] {
  return queryAll<ExperimentRow>(
    db,
    "SELECT * FROM experiments WHERE idea_id = ? ORDER BY created_at DESC",
    [ideaId]
  );
}

export function insertExperiment(
  db: Database,
  ideaId: string,
  hypothesis: string,
  method: string,
  successMetric: string | null,
  costEstimate: string | null
): void {
  db.run(
    "INSERT INTO experiments (idea_id, hypothesis, method, success_metric, cost_estimate) VALUES (?, ?, ?, ?, ?)",
    [ideaId, hypothesis, method, successMetric, costEstimate]
  );
}

export function updateExperimentStatus(
  db: Database,
  experimentId: number,
  status: string,
  result?: string
): void {
  const now = "datetime('now')";
  if (status === "running") {
    db.run(`UPDATE experiments SET status = ?, started_at = ${now} WHERE id = ?`, [status, experimentId]);
  } else if (status === "completed" || status === "abandoned") {
    db.run(`UPDATE experiments SET status = ?, result = ?, completed_at = ${now} WHERE id = ?`, [
      status,
      result ?? null,
      experimentId,
    ]);
  } else {
    db.run("UPDATE experiments SET status = ? WHERE id = ?", [status, experimentId]);
  }
}

export function deleteExperiment(db: Database, experimentId: number): void {
  db.run("DELETE FROM experiments WHERE id = ?", [experimentId]);
}

// --- Weights ---

export function getWeights(db: Database): Record<string, number> {
  const rows = queryAll<{ category: string; weight: number }>(
    db,
    "SELECT category, weight FROM dimension_weights"
  );
  return Object.fromEntries(rows.map((r) => [r.category, r.weight]));
}

export function updateWeight(db: Database, category: string, weight: number): void {
  db.run("UPDATE dimension_weights SET weight = ? WHERE category = ?", [weight, category]);
}

import type { Database } from "sql.js";
import { ideas } from "../data/ideas";
import { CATEGORIES } from "./constants";
import { seedVCAnalysis } from "./seed";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS ideas (
  id          TEXT PRIMARY KEY,
  status      TEXT NOT NULL DEFAULT 'evaluating',
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS scores (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  idea_id     TEXT NOT NULL REFERENCES ideas(id),
  dimension   TEXT NOT NULL,
  score       INTEGER NOT NULL CHECK (score BETWEEN 1 AND 10),
  rationale   TEXT,
  scored_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_scores_idea_dim ON scores(idea_id, dimension, scored_at DESC);

CREATE TABLE IF NOT EXISTS notes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  idea_id     TEXT NOT NULL REFERENCES ideas(id),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  note_type   TEXT NOT NULL DEFAULT 'general',
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notes_idea ON notes(idea_id, created_at DESC);

CREATE TABLE IF NOT EXISTS experiments (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  idea_id         TEXT NOT NULL REFERENCES ideas(id),
  hypothesis      TEXT NOT NULL,
  method          TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'planned',
  success_metric  TEXT,
  result          TEXT,
  cost_estimate   TEXT,
  started_at      TEXT,
  completed_at    TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_experiments_idea ON experiments(idea_id, created_at DESC);

CREATE TABLE IF NOT EXISTS dimension_weights (
  category    TEXT PRIMARY KEY,
  weight      REAL NOT NULL DEFAULT 1.0 CHECK (weight BETWEEN 0 AND 5)
);
`;

export function initSchema(db: Database): void {
  db.run(SCHEMA_SQL);
  seedIdeas(db);
  seedWeights(db);
  seedVCAnalysisIfEmpty(db);
}

function seedIdeas(db: Database): void {
  const existing = db.exec("SELECT COUNT(*) FROM ideas");
  if (existing[0]?.values[0]?.[0] as number > 0) return;

  const stmt = db.prepare("INSERT INTO ideas (id) VALUES (?)");
  for (const idea of ideas) {
    stmt.run([idea.id]);
  }
  stmt.free();
}

function seedWeights(db: Database): void {
  const existing = db.exec("SELECT COUNT(*) FROM dimension_weights");
  if (existing[0]?.values[0]?.[0] as number > 0) return;

  const stmt = db.prepare("INSERT INTO dimension_weights (category, weight) VALUES (?, ?)");
  for (const cat of CATEGORIES) {
    stmt.run([cat.key, 1.0]);
  }
  stmt.free();
}

function seedVCAnalysisIfEmpty(db: Database): void {
  const existing = db.exec("SELECT COUNT(*) FROM scores");
  if ((existing[0]?.values[0]?.[0] as number) > 0) return;
  seedVCAnalysis(db);
}

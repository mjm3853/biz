import type { Database } from "sql.js";
import { SEED_SCORES, SEED_NOTES, SEED_STATUSES } from "../data/seedAnalysis";

export function seedVCAnalysis(db: Database): void {
  // Insert scores (latest-wins semantics mean re-seeding is safe)
  const scoreStmt = db.prepare(
    "INSERT INTO scores (idea_id, dimension, score, rationale) VALUES (?, ?, ?, ?)"
  );
  for (const s of SEED_SCORES) {
    scoreStmt.run([s.ideaId, s.dimension, s.score, s.rationale]);
  }
  scoreStmt.free();

  // Guard against duplicate notes using "VC:" title prefix sentinel
  const existing = db.exec("SELECT COUNT(*) FROM notes WHERE title LIKE 'VC:%'");
  const hasNotes = (existing[0]?.values[0]?.[0] as number) > 0;

  if (!hasNotes) {
    const noteStmt = db.prepare(
      "INSERT INTO notes (idea_id, title, content, note_type) VALUES (?, ?, ?, ?)"
    );
    for (const n of SEED_NOTES) {
      noteStmt.run([n.ideaId, n.title, n.content, n.noteType]);
    }
    noteStmt.free();
  }

  // Update idea statuses
  for (const [ideaId, status] of Object.entries(SEED_STATUSES)) {
    db.run(
      "UPDATE ideas SET status = ?, updated_at = datetime('now') WHERE id = ?",
      [status, ideaId]
    );
  }
}

export function hasVCAnalysis(db: Database): boolean {
  const result = db.exec("SELECT COUNT(*) FROM scores");
  return (result[0]?.values[0]?.[0] as number) > 0;
}

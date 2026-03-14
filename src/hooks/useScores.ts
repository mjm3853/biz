import { useState, useEffect, useCallback } from "react";
import { useDatabase } from "./useDatabase";
import { getLatestScores, getAllLatestScores, getScoreHistory, insertScore } from "../db/queries";
import type { ScoreRow } from "../db/queries";

export function useScores(ideaId: string) {
  const { db, save } = useDatabase();
  const [scores, setScores] = useState<Record<string, ScoreRow>>({});
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!db) return;
    const rows = getLatestScores(db, ideaId);
    setScores(Object.fromEntries(rows.map((r) => [r.dimension, r])));
  }, [db, ideaId, version]);

  const saveScore = useCallback(
    (dimension: string, score: number, rationale: string | null) => {
      if (!db) return;
      insertScore(db, ideaId, dimension, score, rationale);
      save();
      setVersion((v) => v + 1);
    },
    [db, ideaId, save]
  );

  const saveAllScores = useCallback(
    (newScores: Record<string, { score: number; rationale: string | null }>) => {
      if (!db) return;
      for (const [dimension, { score, rationale }] of Object.entries(newScores)) {
        insertScore(db, ideaId, dimension, score, rationale);
      }
      save();
      setVersion((v) => v + 1);
    },
    [db, ideaId, save]
  );

  return { scores, saveScore, saveAllScores };
}

export function useAllScores() {
  const { db } = useDatabase();
  const [scoresByIdea, setScoresByIdea] = useState<Record<string, Record<string, ScoreRow>>>({});

  const refresh = useCallback(() => {
    if (!db) return;
    const rows = getAllLatestScores(db);
    const grouped: Record<string, Record<string, ScoreRow>> = {};
    for (const row of rows) {
      if (!grouped[row.idea_id]) grouped[row.idea_id] = {};
      grouped[row.idea_id][row.dimension] = row;
    }
    setScoresByIdea(grouped);
  }, [db]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { scoresByIdea, refresh };
}

export function useScoreHistory(ideaId: string) {
  const { db } = useDatabase();
  const [history, setHistory] = useState<ScoreRow[]>([]);

  useEffect(() => {
    if (!db) return;
    setHistory(getScoreHistory(db, ideaId));
  }, [db, ideaId]);

  return history;
}

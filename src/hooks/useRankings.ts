import { useState, useEffect, useCallback, useMemo } from "react";
import { useDatabase } from "./useDatabase";
import { getAllLatestScores, getWeights, updateWeight, getAllIdeaStatuses, updateIdeaStatus } from "../db/queries";
import type { ScoreRow, IdeaRow } from "../db/queries";
import { CATEGORIES, type IdeaStatus } from "../db/constants";

export interface RankedIdea {
  id: string;
  status: IdeaStatus;
  overallScore: number;
  categoryScores: Record<string, number>;
  scoredDimensions: number;
  totalDimensions: number;
}

export function useRankings() {
  const { db, save } = useDatabase();
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [allScores, setAllScores] = useState<ScoreRow[]>([]);
  const [ideaStatuses, setIdeaStatuses] = useState<IdeaRow[]>([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!db) return;
    setWeights(getWeights(db));
    setAllScores(getAllLatestScores(db));
    setIdeaStatuses(getAllIdeaStatuses(db));
  }, [db, version]);

  const changeWeight = useCallback(
    (category: string, weight: number) => {
      if (!db) return;
      updateWeight(db, category, weight);
      save();
      setVersion((v) => v + 1);
    },
    [db, save]
  );

  const changeStatus = useCallback(
    (ideaId: string, status: IdeaStatus) => {
      if (!db) return;
      updateIdeaStatus(db, ideaId, status);
      save();
      setVersion((v) => v + 1);
    },
    [db, save]
  );

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const rankings = useMemo(() => {
    const scoresByIdea: Record<string, Record<string, number>> = {};
    for (const row of allScores) {
      if (!scoresByIdea[row.idea_id]) scoresByIdea[row.idea_id] = {};
      scoresByIdea[row.idea_id][row.dimension] = row.score;
    }

    const statusMap = Object.fromEntries(ideaStatuses.map((r) => [r.id, r.status as IdeaStatus]));
    const totalDimensions = CATEGORIES.reduce((sum, c) => sum + c.dimensions.length, 0);

    const ranked: RankedIdea[] = ideaStatuses.map((idea) => {
      const ideaScores = scoresByIdea[idea.id] || {};
      const categoryScores: Record<string, number> = {};
      let weightedSum = 0;
      let weightSum = 0;

      for (const cat of CATEGORIES) {
        const dimScores = cat.dimensions
          .map((d) => ideaScores[d.key])
          .filter((s): s is number => s !== undefined);
        const avg = dimScores.length > 0 ? dimScores.reduce((a, b) => a + b, 0) / dimScores.length : 0;
        categoryScores[cat.key] = avg;

        if (dimScores.length > 0) {
          const w = weights[cat.key] ?? 1;
          weightedSum += avg * w;
          weightSum += w;
        }
      }

      const overallScore = weightSum > 0 ? (weightedSum / weightSum) * 10 : 0;

      return {
        id: idea.id,
        status: statusMap[idea.id] ?? "evaluating",
        overallScore,
        categoryScores,
        scoredDimensions: Object.keys(ideaScores).length,
        totalDimensions,
      };
    });

    ranked.sort((a, b) => b.overallScore - a.overallScore);
    return ranked;
  }, [allScores, weights, ideaStatuses]);

  return { rankings, weights, changeWeight, changeStatus, refresh };
}

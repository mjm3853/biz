import { useState, useEffect, useCallback } from "react";
import { useDatabase } from "./useDatabase";
import {
  getExperiments,
  insertExperiment,
  updateExperimentStatus,
  deleteExperiment,
} from "../db/queries";
import type { ExperimentRow } from "../db/queries";

export function useExperiments(ideaId: string) {
  const { db, save } = useDatabase();
  const [experiments, setExperiments] = useState<ExperimentRow[]>([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!db) return;
    setExperiments(getExperiments(db, ideaId));
  }, [db, ideaId, version]);

  const addExperiment = useCallback(
    (
      hypothesis: string,
      method: string,
      successMetric: string | null,
      costEstimate: string | null
    ) => {
      if (!db) return;
      insertExperiment(db, ideaId, hypothesis, method, successMetric, costEstimate);
      save();
      setVersion((v) => v + 1);
    },
    [db, ideaId, save]
  );

  const changeStatus = useCallback(
    (experimentId: number, status: string, result?: string) => {
      if (!db) return;
      updateExperimentStatus(db, experimentId, status, result);
      save();
      setVersion((v) => v + 1);
    },
    [db, save]
  );

  const removeExperiment = useCallback(
    (experimentId: number) => {
      if (!db) return;
      deleteExperiment(db, experimentId);
      save();
      setVersion((v) => v + 1);
    },
    [db, save]
  );

  return { experiments, addExperiment, changeStatus, removeExperiment };
}

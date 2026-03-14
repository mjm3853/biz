import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import type { Database } from "sql.js";
import { initDatabase, saveDatabase } from "../db/database";
import React from "react";

interface DatabaseContextValue {
  db: Database | null;
  isLoading: boolean;
  save: () => void;
}

const DatabaseContext = createContext<DatabaseContextValue>({
  db: null,
  isLoading: true,
  save: () => {},
});

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const dbRef = useRef<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setReady] = useState(false);

  useEffect(() => {
    initDatabase().then((db) => {
      dbRef.current = db;
      setIsLoading(false);
      setReady(true);
    });
  }, []);

  const save = useCallback(() => {
    if (dbRef.current) {
      saveDatabase(dbRef.current);
    }
  }, []);

  return React.createElement(
    DatabaseContext.Provider,
    { value: { db: dbRef.current, isLoading, save } },
    children
  );
}

export function useDatabase() {
  return useContext(DatabaseContext);
}

import type { Database } from "sql.js";
import { get, set } from "idb-keyval";
import { initSchema } from "./schema";

const DB_KEY = "biz-ideas-db";
let saveTimeout: ReturnType<typeof setTimeout> | null = null;

export async function initDatabase(): Promise<Database> {
  // sql.js is a CJS module — use dynamic import to avoid verbatimModuleSyntax issues
  const sqlJsModule = await import("sql.js");
  const initSqlJs = sqlJsModule.default ?? sqlJsModule;
  const SQL = await (initSqlJs as (opts?: { locateFile?: (file: string) => string }) => Promise<{ Database: new (data?: Uint8Array) => Database }>)({
    locateFile: () => "/sql-wasm.wasm",
  });

  const savedData = await get<Uint8Array>(DB_KEY);
  const db = savedData ? new SQL.Database(savedData) : new SQL.Database();

  initSchema(db);

  if (!savedData) {
    await saveDatabase(db);
  }

  window.addEventListener("beforeunload", () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
      set(DB_KEY, db.export());
    }
  });

  return db;
}

export function saveDatabase(db: Database): Promise<void> {
  if (saveTimeout) clearTimeout(saveTimeout);
  return new Promise((resolve) => {
    saveTimeout = setTimeout(async () => {
      await set(DB_KEY, db.export());
      saveTimeout = null;
      resolve();
    }, 300);
  });
}

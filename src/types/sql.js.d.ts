declare module "sql.js" {
  interface Database {
    run(sql: string, params?: unknown[]): void;
    exec(sql: string): { columns: string[]; values: unknown[][] }[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }

  interface Statement {
    bind(params?: unknown[]): boolean;
    step(): boolean;
    getAsObject(): Record<string, unknown>;
    run(params?: unknown[]): void;
    free(): void;
  }

  interface SqlJsStatic {
    Database: new (data?: Uint8Array) => Database;
  }

  interface InitSqlJsOptions {
    locateFile?: (file: string) => string;
  }

  export default function initSqlJs(options?: InitSqlJsOptions): Promise<SqlJsStatic>;
  export type { Database, Statement, SqlJsStatic };
}

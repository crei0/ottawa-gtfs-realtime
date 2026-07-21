import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

import { DB } from "./types";

const dialect = new SqliteDialect({
  // database: new SQLite(":memory:"),
  database: new SQLite(":memory:"),
});

export const db = new Kysely<DB>({
  dialect,
})
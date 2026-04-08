import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";

import { env } from "./env";
import * as schema from "./schema";

type GlobalDatabaseCache = {
  adaptitSqlClient?: Sql;
};

const globalDatabase = globalThis as typeof globalThis & GlobalDatabaseCache;

export const sqlClient =
  globalDatabase.adaptitSqlClient ??
  postgres(env.DATABASE_URL, {
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalDatabase.adaptitSqlClient = sqlClient;
}

export const db = drizzle(sqlClient, { schema });

export async function closeDatabaseConnection() {
  await sqlClient.end();
}

import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());

const command = process.argv.find((argument) =>
  ["generate", "migrate", "push", "studio"].includes(argument),
);

const databaseUrl =
  process.env.DATABASE_URL ??
  (command === "generate"
    ? "postgresql://postgres:postgres@127.0.0.1:5432/adaptit"
    : undefined);

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required to run Drizzle commands outside schema generation.",
  );
}

export default defineConfig({
  schema: "./packages/db/src/schema/index.ts",
  out: "./packages/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
});

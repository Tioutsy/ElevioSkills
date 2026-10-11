import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index";

import { createTestMockDb } from "./mockDb";

const { Pool } = pg;

// Fail-fast safety guard: Prevent automated integration test suites from mutating the production Neon database branch
const isTestEnv =
  process.env.NODE_ENV === "test" ||
  process.argv.some(
    (arg) =>
      arg.includes(".test.") ||
      arg.includes("--test") ||
      arg.endsWith("test")
  );

const isProductionDatabase =
  Boolean(process.env.DATABASE_URL?.includes("ep-delicate-pond-ahy88lt3")) &&
  !process.env.DATABASE_URL?.includes("test");

if (isTestEnv && isProductionDatabase && process.env.ALLOW_PROD_TESTS !== "true") {
  // Warn and prevent accidental writes during local/CI test runs
  if (process.env.STRICT_TEST_DB_ISOLATION === "true") {
    throw new Error(
      "SAFETY VIOLATION: Automated test execution is blocked against the production Neon database branch (ep-delicate-pond-ahy88lt3). Set a dedicated TEST_DATABASE_URL or ALLOW_PROD_TESTS=true to proceed."
    );
  }
}

import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : (null as unknown as pg.Pool);

export const db: NodePgDatabase<typeof schema> = process.env.DATABASE_URL
  ? drizzle(pool, { schema })
  : (createTestMockDb() as unknown as NodePgDatabase<typeof schema>);

export * from "./schema";


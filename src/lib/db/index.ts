import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Next.js dev-mode HMR re-evaluates this module on nearly every file edit. Without
// caching the pool across reloads, each reload opens a fresh connection pool that's
// never closed, silently leaking connections until the DB's max_user_connections cap
// is hit. Stashing it on globalThis (the standard Next.js + mysql/Prisma dev pattern)
// makes HMR reuse the same pool instead.
const globalForDb = globalThis as unknown as { __dbPool?: mysql.Pool };

const pool =
  globalForDb.__dbPool ??
  mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectTimeout: 30_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__dbPool = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });

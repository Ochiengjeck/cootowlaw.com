import "server-only";
import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { clients, media } from "@/lib/db/schema";

export type ClientInput = {
  name: string;
  industry: string;
  website: string | null;
  logoId: string | null;
  sortOrder: number;
};

export async function getClients() {
  "use cache";
  cacheTag("clients-list");
  const rows = await db
    .select({ client: clients, logo: media })
    .from(clients)
    .leftJoin(media, eq(clients.logoId, media.id))
    .orderBy(asc(clients.sortOrder));
  return rows.map((r) => ({ ...r.client, logo: r.logo }));
}

export async function adminListClients() {
  await connection();
  return db.select().from(clients).orderBy(asc(clients.sortOrder));
}

export async function adminGetClient(id: string) {
  await connection();
  const rows = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createClient(input: ClientInput) {
  const id = randomUUID();
  await db.insert(clients).values({ id, ...input });
  return { id };
}

export async function updateClient(id: string, input: ClientInput) {
  await db
    .update(clients)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(clients.id, id));
}

export async function deleteClient(id: string) {
  await db.delete(clients).where(eq(clients.id, id));
}

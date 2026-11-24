import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { digestSubscribers } from "@/lib/db/schema";

export async function createDigestSubscriber(email: string) {
  const existing = await db
    .select({ id: digestSubscribers.id })
    .from(digestSubscribers)
    .where(eq(digestSubscribers.email, email))
    .limit(1);
  if (existing[0]) return { id: existing[0].id, alreadySubscribed: true };

  const id = randomUUID();
  await db.insert(digestSubscribers).values({ id, email });
  return { id, alreadySubscribed: false };
}

export async function adminListDigestSubscribers() {
  await connection();
  return db.select().from(digestSubscribers).orderBy(desc(digestSubscribers.createdAt));
}

export async function deleteDigestSubscriber(id: string) {
  await db.delete(digestSubscribers).where(eq(digestSubscribers.id, id));
}

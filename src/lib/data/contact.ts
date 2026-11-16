import "server-only";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions, offices, practiceAreas } from "@/lib/db/schema";

export type ContactSubmissionInput = {
  officeId: string;
  practiceAreaId: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

export async function createContactSubmission(input: ContactSubmissionInput) {
  await db.insert(contactSubmissions).values(input);
}

export async function adminListContactSubmissions() {
  await connection();
  const rows = await db
    .select({
      submission: contactSubmissions,
      office: offices,
      practiceArea: practiceAreas,
    })
    .from(contactSubmissions)
    .leftJoin(offices, eq(contactSubmissions.officeId, offices.id))
    .leftJoin(practiceAreas, eq(contactSubmissions.practiceAreaId, practiceAreas.id))
    .orderBy(desc(contactSubmissions.createdAt));

  return rows.map((r) => ({ ...r.submission, office: r.office, practiceArea: r.practiceArea }));
}

export async function adminMarkContactSubmissionHandled(id: string) {
  await db
    .update(contactSubmissions)
    .set({ handledAt: new Date() })
    .where(eq(contactSubmissions.id, id));
}

export async function adminRecordContactReply(id: string, replyMessage: string) {
  const now = new Date();
  await db
    .update(contactSubmissions)
    .set({ replyMessage, repliedAt: now, handledAt: now })
    .where(eq(contactSubmissions.id, id));
}

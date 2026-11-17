import "server-only";
import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { jobPostings } from "@/lib/db/schema";

export type JobPostingInput = {
  slug: string;
  title: string;
  department: string | null;
  location: string;
  employmentType: string | null;
  summary: string;
  descriptionHtml: string;
  isOpen: boolean;
  sortOrder: number;
};

// --- Public, cached reads ---

export async function getJobPostings() {
  "use cache";
  cacheTag("job-postings-list");
  return db
    .select()
    .from(jobPostings)
    .where(eq(jobPostings.isOpen, true))
    .orderBy(asc(jobPostings.sortOrder));
}

export async function getJobPostingBySlug(slug: string) {
  "use cache";
  cacheTag(`job-posting:${slug}`);
  const rows = await db.select().from(jobPostings).where(eq(jobPostings.slug, slug)).limit(1);
  return rows[0] ?? null;
}

// --- Admin, uncached ---

export async function adminListJobPostings() {
  await connection();
  return db.select().from(jobPostings).orderBy(asc(jobPostings.sortOrder));
}

export async function adminGetJobPosting(id: string) {
  await connection();
  const rows = await db.select().from(jobPostings).where(eq(jobPostings.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createJobPosting(input: JobPostingInput) {
  const id = randomUUID();
  await db.insert(jobPostings).values({ id, ...input });
  return { id };
}

export async function updateJobPosting(id: string, input: JobPostingInput) {
  await db
    .update(jobPostings)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(jobPostings.id, id));
}

export async function deleteJobPosting(id: string) {
  await db.delete(jobPostings).where(eq(jobPostings.id, id));
}

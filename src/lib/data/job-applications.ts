import "server-only";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { jobApplications, jobPostings } from "@/lib/db/schema";

export type JobApplicationInput = {
  jobPostingId: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  resumeUrl: string | null;
  resumeFilename: string | null;
};

export async function createJobApplication(input: JobApplicationInput) {
  await db.insert(jobApplications).values(input);
}

export async function adminListJobApplications() {
  await connection();
  const rows = await db
    .select({ application: jobApplications, jobPosting: jobPostings })
    .from(jobApplications)
    .leftJoin(jobPostings, eq(jobApplications.jobPostingId, jobPostings.id))
    .orderBy(desc(jobApplications.createdAt));

  return rows.map((r) => ({ ...r.application, jobPosting: r.jobPosting }));
}

export async function adminMarkJobApplicationHandled(id: string) {
  await db
    .update(jobApplications)
    .set({ handledAt: new Date() })
    .where(eq(jobApplications.id, id));
}

export async function adminRecordJobApplicationReply(id: string, replyMessage: string) {
  const now = new Date();
  await db
    .update(jobApplications)
    .set({ replyMessage, repliedAt: now, handledAt: now })
    .where(eq(jobApplications.id, id));
}

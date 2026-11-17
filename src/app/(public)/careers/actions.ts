"use server";

import { put } from "@vercel/blob";
import { createJobApplication } from "@/lib/data/job-applications";
import { sendMail } from "@/lib/email";

export type JobApplicationState = { success?: boolean; error?: string } | undefined;

export async function submitJobApplication(
  jobPostingId: string | null,
  jobTitle: string | null,
  _prevState: JobApplicationState,
  formData: FormData,
): Promise<JobApplicationState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) {
    return { error: "Please fill in your name and email." };
  }

  let resumeUrl: string | null = null;
  let resumeFilename: string | null = null;
  const resume = formData.get("resume");
  if (resume instanceof File && resume.size > 0) {
    const blob = await put(resume.name, resume, { access: "public", addRandomSuffix: true });
    resumeUrl = blob.url;
    resumeFilename = resume.name;
  }

  await createJobApplication({
    jobPostingId,
    name,
    email,
    phone: phone || null,
    message: message || null,
    resumeUrl,
    resumeFilename,
  });

  const subject = jobPostingId
    ? `New application for ${jobTitle ?? "a role"} from ${name}`
    : `New talent pool submission from ${name}`;

  await sendMail({
    to: process.env.CONTACT_NOTIFICATION_EMAIL || "info@cootowlaw.com",
    subject,
    text: `From: ${name} <${email}>\nPhone: ${phone || "—"}\nResume: ${resumeUrl || "—"}\n\n${message || "(no message)"}`,
  });

  return { success: true };
}

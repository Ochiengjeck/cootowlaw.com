"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  adminMarkJobApplicationHandled,
  adminRecordJobApplicationReply,
} from "@/lib/data/job-applications";
import { sendMail } from "@/lib/email";

export async function markJobApplicationHandledAction(id: string) {
  await getCurrentAdmin();
  await adminMarkJobApplicationHandled(id);
  revalidatePath("/admin/applications");
}

export type ReplyState = { error?: string } | undefined;

export async function replyToJobApplicationAction(
  id: string,
  recipientEmail: string,
  recipientName: string,
  _prevState: ReplyState,
  formData: FormData,
): Promise<ReplyState> {
  await getCurrentAdmin();

  const replyMessage = String(formData.get("replyMessage") ?? "").trim();
  if (!replyMessage) {
    return { error: "Write a reply before sending." };
  }

  await sendMail({
    to: recipientEmail,
    subject: "Re: Your application to Cootow & Associates Advocates",
    text: `Dear ${recipientName},\n\n${replyMessage}\n\n— Cootow & Associates Advocates`,
  });

  await adminRecordJobApplicationReply(id, replyMessage);
  revalidatePath("/admin/applications");
}

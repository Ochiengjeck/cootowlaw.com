"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { adminMarkContactSubmissionHandled, adminRecordContactReply } from "@/lib/data/contact";
import { sendMail } from "@/lib/email";

export async function markHandledAction(id: string) {
  await getCurrentAdmin();
  await adminMarkContactSubmissionHandled(id);
  revalidatePath("/admin/messages");
}

export type ReplyState = { error?: string } | undefined;

export async function replyToSubmissionAction(
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
    subject: "Re: Your enquiry to Cootow & Associates Advocates",
    text: `Dear ${recipientName},\n\n${replyMessage}\n\n— Cootow & Associates Advocates`,
  });

  await adminRecordContactReply(id, replyMessage);
  revalidatePath("/admin/messages");
}

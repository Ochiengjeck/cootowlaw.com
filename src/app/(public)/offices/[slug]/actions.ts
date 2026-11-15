"use server";

import { createContactSubmission } from "@/lib/data/contact";
import { sendMail } from "@/lib/email";

export type ContactFormState = { success?: boolean; error?: string } | undefined;

export async function submitContactForm(
  officeId: string,
  officeEmail: string,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const practiceAreaId = String(formData.get("practiceAreaId") ?? "").trim() || null;

  if (!name || !email || !message) {
    return { error: "Please fill in your name, email, and message." };
  }

  await createContactSubmission({
    officeId,
    practiceAreaId,
    name,
    email,
    phone: phone || null,
    message,
  });

  await sendMail({
    to: officeEmail,
    subject: `New website enquiry from ${name}`,
    text: `From: ${name} <${email}>\nPhone: ${phone || "—"}\n\n${message}`,
  });

  return { success: true };
}

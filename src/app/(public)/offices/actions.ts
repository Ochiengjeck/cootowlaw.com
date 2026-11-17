"use server";

import { createContactSubmission } from "@/lib/data/contact";
import { getOfficeById } from "@/lib/data/offices";
import { sendMail } from "@/lib/email";

export type ContactFormState = { success?: boolean; error?: string } | undefined;

async function processSubmission(
  officeId: string,
  officeEmail: string,
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
    to: process.env.CONTACT_NOTIFICATION_EMAIL || officeEmail,
    subject: `New website enquiry from ${name}`,
    text: `From: ${name} <${email}>\nPhone: ${phone || "—"}\n\n${message}`,
  });

  return { success: true };
}

export async function submitContactForm(
  officeId: string,
  officeEmail: string,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  return processSubmission(officeId, officeEmail, formData);
}

export async function submitGeneralContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const officeId = String(formData.get("officeId") ?? "").trim();
  if (!officeId) {
    return { error: "Please select an office." };
  }

  const office = await getOfficeById(officeId);
  if (!office) {
    return { error: "Please select a valid office." };
  }

  return processSubmission(office.id, office.email, formData);
}

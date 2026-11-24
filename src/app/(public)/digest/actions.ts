"use server";

import { createDigestSubscriber } from "@/lib/data/digest-subscribers";

export type SubscribeState = { success?: boolean; error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToDigest(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  await createDigestSubscriber(email);

  return { success: true };
}

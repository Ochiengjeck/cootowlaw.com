"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { findAdminByEmail } from "@/lib/data/admins";
import { createSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

// Used when no admin matches the email, so bcrypt.compare still runs and the response
// takes roughly the same time either way — otherwise "unknown email" replies measurably
// faster than "known email, wrong password", leaking which emails are registered.
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Z3BtHSZ3vfvt8I1aPzpZ0Vf2qv4fS";

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const admin = await findAdminByEmail(email);
  const passwordMatches = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !passwordMatches) {
    return { error: "Invalid email or password." };
  }

  await createSession(admin.id);
  redirect("/admin");
}

import "server-only";
import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";

export type SessionData = {
  adminId?: string;
};

const COOKIE_NAME = "cootowlaw_admin_session";

function getPassword() {
  const password = process.env.SESSION_PASSWORD;
  if (!password || password.length < 32) {
    throw new Error("SESSION_PASSWORD must be set to a string of at least 32 characters");
  }
  return password;
}

export async function getSession(): Promise<SessionData> {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookie) {
    return {};
  }
  try {
    return await unsealData<SessionData>(cookie, { password: getPassword() });
  } catch {
    return {};
  }
}

export async function createSession(adminId: string) {
  const sealed = await sealData({ adminId } satisfies SessionData, {
    password: getPassword(),
  });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sealed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

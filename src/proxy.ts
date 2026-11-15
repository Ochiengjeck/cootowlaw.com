import { NextResponse, type NextRequest } from "next/server";
import { unsealData } from "iron-session";
import type { SessionData } from "@/lib/session";

const COOKIE_NAME = "cootowlaw_admin_session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const password = process.env.SESSION_PASSWORD;
  if (!cookie || !password) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const session = await unsealData<SessionData>(cookie, { password });
    if (!session.adminId) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

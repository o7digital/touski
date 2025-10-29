import { NextResponse } from "next/server";
import { directusLogin } from "@/lib/directus";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }
    const { access_token, refresh_token, expires } = await directusLogin(email, password);

    const res = NextResponse.json({ ok: true });
    const maxAge = typeof expires === "number" ? Math.floor(expires / 1000) : 60 * 15; // fallback 15m

    res.cookies.set("d_access_token", access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge
    });
    if (refresh_token) {
      res.cookies.set("d_refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 14 // 14 days
      });
    }
    return res;
  } catch (e) {
    return NextResponse.json({ error: e.message || "Login failed" }, { status: 401 });
  }
}


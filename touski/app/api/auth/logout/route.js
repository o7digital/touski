import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("d_access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  res.cookies.set("d_refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}


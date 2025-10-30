import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const hasToken = Boolean(req.cookies.get("d_access_token")?.value);

  if (pathname.startsWith("/admin") || pathname.startsWith("/supplier")) {
    if (!hasToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname === "/login" && hasToken) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/supplier/:path*", "/login"],
};


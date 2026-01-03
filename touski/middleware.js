import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const hasToken = Boolean(req.cookies.get("d_access_token")?.value);
  const langCookie = req.cookies.get("touski-lang")?.value;

  // Admin / supplier auth protection
  if (pathname.startsWith("/admin") || pathname.startsWith("/supplier")) {
    if (!hasToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname === "/login" && hasToken) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Langue par défaut : la page "/" reste en français.
  // On ne redirige vers "/en" que si l'utilisateur a déjà choisi l'anglais.
  if (pathname === "/") {
    if (langCookie === "en") {
      const url = req.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url);
      res.cookies.set("touski-lang", "en", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/supplier/:path*", "/login", "/product/:path*"],
};

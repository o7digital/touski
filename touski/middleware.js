import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const hasToken = Boolean(req.cookies.get("d_access_token")?.value);
  const langCookie = req.cookies.get("touski-lang")?.value;
  const supportedRedirectLangs = ["en", "de", "es"];

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
  // Redirection vers la langue choisie (en/de/es) si un cookie existe.
  if (pathname === "/") {
    if (supportedRedirectLangs.includes(langCookie)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${langCookie}`;
      const res = NextResponse.redirect(url);
      res.cookies.set("touski-lang", langCookie, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return res;
    }
  }

  // Si l'utilisateur navigue sur un préfixe langue, mémoriser le choix.
  const matchedLocale = supportedRedirectLangs.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (matchedLocale) {
    const res = NextResponse.next();
    res.cookies.set("touski-lang", matchedLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/en",
    "/de",
    "/es",
    "/en/:path*",
    "/de/:path*",
    "/es/:path*",
    "/admin/:path*",
    "/supplier/:path*",
    "/login",
    "/product/:path*",
  ],
};

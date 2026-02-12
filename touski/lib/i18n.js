export const DEFAULT_LOCALE = "fr";
export const SUPPORTED_LOCALES = ["fr", "en", "de", "es"];
export const PREFIXED_LOCALES = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
);

export function getLocaleFromPathname(pathname = "/") {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (PREFIXED_LOCALES.includes(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname = "/") {
  const locale = getLocaleFromPathname(pathname);

  if (locale === DEFAULT_LOCALE) {
    return pathname || "/";
  }

  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped || "/";
}

export function withLocale(pathname = "/", locale = DEFAULT_LOCALE) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const targetLocale = SUPPORTED_LOCALES.includes(locale)
    ? locale
    : DEFAULT_LOCALE;

  if (targetLocale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  return `${`/${targetLocale}`}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function switchLocalePath(pathname = "/", locale = DEFAULT_LOCALE) {
  const basePath = stripLocalePrefix(pathname);
  return withLocale(basePath, locale);
}

export function getLocaleValue(map, locale = DEFAULT_LOCALE) {
  if (!map || typeof map !== "object") return "";
  return map[locale] || map[DEFAULT_LOCALE] || "";
}

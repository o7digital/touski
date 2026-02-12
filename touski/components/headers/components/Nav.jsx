"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue, withLocale } from "@/lib/i18n";

export default function Nav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");

  const isActive = (href) => {
    const [basePath, query] = href.split("?");

    if (basePath !== pathname) return false;

    // On ne depend pas des query params pour garder ce composant compatible SSG.
    if (basePath.endsWith("/products") && query) return false;

    return true;
  };

  const links = [
    {
      href: withLocale("/", locale),
      label: getLocaleValue(
        { fr: "ACCUEIL", en: "HOME", de: "STARTSEITE", es: "INICIO" },
        locale
      ),
    },
    {
      href: withLocale("/products", locale),
      label: getLocaleValue(
        { fr: "BOUTIQUE", en: "SHOP", de: "SHOP", es: "TIENDA" },
        locale
      ),
    },
    {
      href: `${withLocale("/products", locale)}?category_slug=anti-courants-air`,
      label: getLocaleValue(
        {
          fr: "ANTI-COURANTS D'AIR",
          en: "DRAFT PROOFING",
          de: "ZUGLUFTSCHUTZ",
          es: "ANTI CORRIENTES DE AIRE",
        },
        locale
      ),
    },
    {
      href: `${withLocale("/products", locale)}?category_slug=cuisine`,
      label: getLocaleValue(
        { fr: "CUISINE", en: "KITCHEN", de: "KÜCHE", es: "COCINA" },
        locale
      ),
    },
    {
      href: `${withLocale("/products", locale)}?category_slug=salle-de-bain`,
      label: getLocaleValue(
        { fr: "SALLE DE BAIN", en: "BATHROOM", de: "BAD", es: "BAÑO" },
        locale
      ),
    },
    {
      href: withLocale("/contact", locale),
      label: getLocaleValue(
        { fr: "CONTACT", en: "CONTACT", de: "KONTAKT", es: "CONTACTO" },
        locale
      ),
    },
  ];

  return (
    <>
      {links.map((link) => (
        <li key={link.href} className="navigation__item">
          <Link
            href={link.href}
            className={`navigation__link ${isActive(link.href) ? "menu-active" : ""}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

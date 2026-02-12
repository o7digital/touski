"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEnglish = pathname?.startsWith("/en");

  const isActive = (href) => {
    const [basePath, query] = href.split("?");
    const hrefCategory = query
      ? new URLSearchParams(query).get("category_slug")
      : null;
    const currentCategory = searchParams.get("category_slug");

    if (basePath === "/" && pathname === "/") return true;
    if (basePath === "/en" && pathname === "/en") return true;

    if (basePath !== pathname) return false;

    if (basePath === "/shop-1") {
      if (!hrefCategory) return !currentCategory;
      return currentCategory === hrefCategory;
    }

    return true;
  };

  const links = isEnglish
    ? [
        { href: "/en", label: "HOME" },
        { href: "/shop-1", label: "SHOP" },
        {
          href: "/shop-1?category_slug=anti-courants-air",
          label: "DRAFT PROOFING",
        },
        { href: "/shop-1?category_slug=cuisine", label: "KITCHEN" },
        { href: "/shop-1?category_slug=salle-de-bain", label: "BATHROOM" },
        { href: "/en/contact", label: "CONTACT" },
      ]
    : [
        { href: "/", label: "ACCUEIL" },
        { href: "/shop-1", label: "BOUTIQUE" },
        {
          href: "/shop-1?category_slug=anti-courants-air",
          label: "ANTI-COURANTS D'AIR",
        },
        { href: "/shop-1?category_slug=cuisine", label: "CUISINE" },
        { href: "/shop-1?category_slug=salle-de-bain", label: "SALLE DE BAIN" },
        { href: "/contact", label: "CONTACT" },
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

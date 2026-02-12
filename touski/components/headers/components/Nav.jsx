"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const isActive = (href) => {
    const [basePath, query] = href.split("?");

    if (basePath === "/" && pathname === "/") return true;
    if (basePath === "/en" && pathname === "/en") return true;

    if (basePath !== pathname) return false;

    // On ne depend pas des query params pour garder ce composant compatible SSG.
    if (basePath === "/products" && query) return false;

    return true;
  };

  const links = isEnglish
    ? [
        { href: "/en", label: "HOME" },
        { href: "/products", label: "SHOP" },
        {
          href: "/products?category_slug=anti-courants-air",
          label: "DRAFT PROOFING",
        },
        { href: "/products?category_slug=cuisine", label: "KITCHEN" },
        { href: "/products?category_slug=salle-de-bain", label: "BATHROOM" },
        { href: "/en/contact", label: "CONTACT" },
      ]
    : [
        { href: "/", label: "ACCUEIL" },
        { href: "/products", label: "BOUTIQUE" },
        {
          href: "/products?category_slug=anti-courants-air",
          label: "ANTI-COURANTS D'AIR",
        },
        { href: "/products?category_slug=cuisine", label: "CUISINE" },
        { href: "/products?category_slug=salle-de-bain", label: "SALLE DE BAIN" },
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

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const isActive = (href) =>
    (pathname === "/" && href === "/") ||
    (pathname?.startsWith(href) && href !== "/");

  const links = isEnglish
    ? [
        { href: "/en", label: "HOME" },
        { href: "/en/about", label: "TOUSKI" },
        { href: "/en/contact", label: "CONTACT" },
      ]
    : [
        { href: "/", label: "ACCUEIL" },
        { href: "/about", label: "TOUSKI" },
        { href: "/contact", label: "CONTACTER" },
      ];

  return (
    <>
      {links.map((link) => (
        <li key={link.href} className="navigation__item">
          <Link
            href={link.href}
            className={`navigation__link ${
              isActive(link.href) ? "menu-active" : ""
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

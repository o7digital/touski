"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href) => (pathname === "/" && href === "/") || pathname.startsWith(href) && href !== "/";
  return (
    <>
      <li className="navigation__item">
        <Link href="/" className={`navigation__link ${isActive("/") ? "menu-active" : ""}`}>
          ACCUEIL
        </Link>
      </li>
      <li className="navigation__item">
        <Link href="/about" className={`navigation__link ${isActive("/about") ? "menu-active" : ""}`}>
          TOUSKI
        </Link>
      </li>
      <li className="navigation__item">
        <Link href="/contact" className={`navigation__link ${isActive("/contact") ? "menu-active" : ""}`}>
          CONTACTER
        </Link>
      </li>
    </>
  );
}

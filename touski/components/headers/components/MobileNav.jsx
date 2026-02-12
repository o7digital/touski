"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function MobileNav() {
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

    if (basePath === "/products") {
      if (!hrefCategory) return !currentCategory;
      return currentCategory === hrefCategory;
    }

    return true;
  };

  useEffect(() => {
    const selectors = {
      mobileMenuActivator: ".mobile-nav-activator",
      mobileMenu: ".navigation",
      mobileMenuActiveClass: "mobile-menu-opened",
    };

    const mobileMenuActivator = document.querySelector(selectors.mobileMenuActivator);
    const mobileDropdown = document.querySelector(selectors.mobileMenu);

    const toggleMobileMenu = (event) => {
      if (event) event.preventDefault();
      if (!mobileDropdown) return;

      if (document.body.classList.contains(selectors.mobileMenuActiveClass)) {
        document.body.classList.remove(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "";
        mobileDropdown.style.paddingRight = "";
      } else {
        document.body.classList.add(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "scrollWidth";
        mobileDropdown.style.paddingRight = "scrollWidth";
      }
    };

    mobileMenuActivator?.addEventListener("click", toggleMobileMenu);

    return () => {
      mobileMenuActivator?.removeEventListener("click", toggleMobileMenu);
    };
  }, []);

  useEffect(() => {
    const mobileDropdown = document.querySelector(".navigation");
    if (document.body.classList.contains("mobile-menu-opened")) {
      document.body.classList.remove("mobile-menu-opened");
      document.body.style.paddingRight = "";
      if (mobileDropdown) mobileDropdown.style.paddingRight = "";
    }
  }, [pathname]);

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

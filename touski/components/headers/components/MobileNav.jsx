"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue, withLocale } from "@/lib/i18n";

export default function MobileNav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");

  const isActive = (href) => {
    const [basePath, query] = href.split("?");

    if (basePath !== pathname) return false;

    // On ne depend pas des query params pour garder ce composant compatible SSG.
    if (basePath.endsWith("/products") && query) return false;

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

  const links = [
    {
      href: withLocale("/", locale),
      label: getLocaleValue(
        { fr: "ACCUEIL", en: "HOME", de: "STARTSEITE", es: "INICIO" },
        locale
      ),
    },
    {
      href: withLocale("/about", locale),
      label: getLocaleValue(
        { fr: "TOUSKI", en: "TOUSKI", de: "TOUSKI", es: "TOUSKI" },
        locale
      ),
    },
    {
      href: withLocale("/nos-services", locale),
      label: getLocaleValue(
        {
          fr: "NOS SERVICES",
          en: "OUR SERVICES",
          de: "UNSERE LEISTUNGEN",
          es: "NUESTROS SERVICIOS",
        },
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

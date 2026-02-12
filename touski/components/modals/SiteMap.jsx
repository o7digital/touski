"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { getLocaleFromPathname, getLocaleValue, withLocale } from "@/lib/i18n";

export default function SiteMap() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const shopPath = withLocale("/products", locale);

  const mainLinks = [
    {
      href: withLocale("/", locale),
      label: getLocaleValue(
        { fr: "Accueil", en: "Home", de: "Startseite", es: "Inicio" },
        locale
      ),
    },
    {
      href: shopPath,
      label: getLocaleValue(
        { fr: "Boutique", en: "Shop", de: "Shop", es: "Tienda" },
        locale
      ),
    },
    {
      href: `${shopPath}?category_slug=anti-courants-air`,
      label: getLocaleValue(
        {
          fr: "Anti-courants d'air",
          en: "Draft Proofing",
          de: "Zugluftschutz",
          es: "Anti corrientes de aire",
        },
        locale
      ),
    },
    {
      href: `${shopPath}?category_slug=cuisine`,
      label: getLocaleValue(
        { fr: "Cuisine", en: "Kitchen", de: "Küche", es: "Cocina" },
        locale
      ),
    },
    {
      href: `${shopPath}?category_slug=salle-de-bain`,
      label: getLocaleValue(
        { fr: "Salle de bain", en: "Bathroom", de: "Bad", es: "Baño" },
        locale
      ),
    },
    {
      href: withLocale("/contact", locale),
      label: getLocaleValue(
        { fr: "Contact", en: "Contact", de: "Kontakt", es: "Contacto" },
        locale
      ),
    },
  ];

  const companyLinks = [
    {
      href: withLocale("/about", locale),
      label: getLocaleValue(
        {
          fr: "A propos de TOUSKI",
          en: "About TOUSKI",
          de: "Über TOUSKI",
          es: "Sobre TOUSKI",
        },
        locale
      ),
    },
    {
      href: withLocale("/nos-services", locale),
      label: getLocaleValue(
        {
          fr: "Nos services",
          en: "Our services",
          de: "Unsere Leistungen",
          es: "Nuestros servicios",
        },
        locale
      ),
    },
    {
      href: "/legal",
      label: getLocaleValue(
        {
          fr: "Mentions legales",
          en: "Legal notice",
          de: "Rechtliche Hinweise",
          es: "Aviso legal",
        },
        locale
      ),
    },
  ];

  return (
    <div className="modal fade" id="siteMap" tabIndex="-1" aria-labelledby="siteMapLabel">
      <div className="modal-dialog modal-fullscreen">
        <div className="sitemap d-flex">
          <div className="w-50 d-none d-lg-block">
            <Image
              width={960}
              height={950}
              style={{ height: "fit-content" }}
              loading="lazy"
              src="/assets/images/nav-bg.jpg"
              alt="Navigation TOUSKI"
              className="sitemap__bg"
            />
          </div>

          <div className="sitemap__links w-50 flex-grow-1">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-uppercase" id="siteMapLabel">
                  {getLocaleValue(
                    {
                      fr: "Navigation du site",
                      en: "Site navigation",
                      de: "Seitennavigation",
                      es: "Navegación del sitio",
                    },
                    locale
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close-lg"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body pt-4">
                <div className="row">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <h6 className="text-uppercase mb-3">
                      {getLocaleValue(
                        {
                          fr: "Liens principaux",
                          en: "Main links",
                          de: "Hauptlinks",
                          es: "Enlaces principales",
                        },
                        locale
                      )}
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {mainLinks.map((link) => (
                        <li key={link.href} className="mb-2">
                          <Link href={link.href} className="menu-link menu-link_us-s">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <h6 className="text-uppercase mb-3">
                      {getLocaleValue(
                        { fr: "TOUSKI", en: "TOUSKI", de: "TOUSKI", es: "TOUSKI" },
                        locale
                      )}
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {companyLinks.map((link) => (
                        <li key={link.href} className="mb-2">
                          <Link href={link.href} className="menu-link menu-link_us-s">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

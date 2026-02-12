"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SiteMap() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const mainLinks = isEnglish
    ? [
        { href: "/en", label: "Home" },
        { href: "/shop-1", label: "Shop" },
        { href: "/shop-1?category_slug=anti-courants-air", label: "Draft Proofing" },
        { href: "/shop-1?category_slug=cuisine", label: "Kitchen" },
        { href: "/shop-1?category_slug=salle-de-bain", label: "Bathroom" },
        { href: "/en/contact", label: "Contact" },
      ]
    : [
        { href: "/", label: "Accueil" },
        { href: "/shop-1", label: "Boutique" },
        { href: "/shop-1?category_slug=anti-courants-air", label: "Anti-courants d'air" },
        { href: "/shop-1?category_slug=cuisine", label: "Cuisine" },
        { href: "/shop-1?category_slug=salle-de-bain", label: "Salle de bain" },
        { href: "/contact", label: "Contact" },
      ];

  const companyLinks = isEnglish
    ? [
        { href: "/en/about", label: "About TOUSKI" },
        { href: "/en/nos-services", label: "Our services" },
        { href: "/legal", label: "Legal notice" },
      ]
    : [
        { href: "/about", label: "A propos de TOUSKI" },
        { href: "/nos-services", label: "Nos services" },
        { href: "/legal", label: "Mentions legales" },
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
                  {isEnglish ? "Site navigation" : "Navigation du site"}
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
                      {isEnglish ? "Main links" : "Liens principaux"}
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
                      {isEnglish ? "TOUSKI" : "TOUSKI"}
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

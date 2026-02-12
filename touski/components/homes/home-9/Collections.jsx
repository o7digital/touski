"use client";

import { collectionsData } from "@/data/categories";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n";

const categoryConfig = {
  "Anti-courants d'air": {
    slug: "anti-courants-air",
    titles: {
      fr: "Anti-courants d'air",
      en: "Draft Proofing",
      de: "Zugluftschutz",
      es: "Anti corrientes de aire",
    },
    descriptions: {
      fr: "Bas de porte, joints et seuils pour limiter les infiltrations d'air froid.",
      en: "Door sweeps, seals and thresholds to reduce cold air leaks.",
      de: "Türdichtungen, Dichtbänder und Schwellen gegen kalte Zugluft.",
      es: "Burletes, juntas y umbrales para reducir filtraciones de aire frío.",
    },
  },
  Cuisine: {
    slug: "cuisine",
    titles: {
      fr: "Cuisine",
      en: "Kitchen",
      de: "Küche",
      es: "Cocina",
    },
    descriptions: {
      fr: "Degraissants, nettoyants specialises et accessoires utiles pour un entretien efficace.",
      en: "Degreasers, specialty cleaners and practical accessories for efficient cleaning.",
      de: "Fettlöser, Spezialreiniger und praktisches Zubehör für eine effiziente Reinigung.",
      es: "Desengrasantes, limpiadores especializados y accesorios prácticos para limpiar mejor.",
    },
  },
  "Salle de bain": {
    slug: "salle-de-bain",
    titles: {
      fr: "Salle de bain",
      en: "Bathroom",
      de: "Bad",
      es: "Baño",
    },
    descriptions: {
      fr: "Anti-calcaire, traitement des joints/moisissures et accessoires de maintenance.",
      en: "Anti-limescale, grout/mold care and maintenance accessories.",
      de: "Kalkschutz, Fugen-/Schimmelpflege und nützliches Zubehör.",
      es: "Antisarro, cuidado de juntas/moho y accesorios de mantenimiento.",
    },
  },
};

export default function Collections() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const shopPath = withLocale("/products", locale);

  return (
    <section className="collections-grid full-width_padding-20">
      <div className="container">
        <div className="row g-3 g-lg-4">
          {collectionsData.map((item) => {
            const config = categoryConfig[item.title];
            const title = config?.titles?.[locale] || item.title;
            const description = config?.descriptions?.[locale] || item.description;
            const href = config?.slug
              ? `${shopPath}?category_slug=${config.slug}`
              : shopPath;

            return (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <Link
                href={href}
                className="collection-grid__item position-relative d-block text-decoration-none"
                style={{ minHeight: 320 }}
              >
                <div
                  className="background-img"
                  style={{ backgroundImage: `url(${item.imageSrc})` }}
                ></div>
                <div className="content_abs content_bottom content_left p-3 p-lg-4">
                  <h3 className="text-uppercase mb-2">
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "rgb(239, 99, 40)",
                        color: "#fff",
                        padding: "0.2em 0.6em",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {title}
                    </span>
                  </h3>
                  <p className="text-white mb-0" style={{ maxWidth: 280 }}>
                    {description}
                  </p>
                </div>
              </Link>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}

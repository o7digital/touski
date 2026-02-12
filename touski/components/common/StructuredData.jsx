"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue, withLocale } from "@/lib/i18n";

export default function StructuredData() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  
  const baseUrl = "https://touski.online";
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "Touski",
    "description": getLocaleValue(
      {
        fr: "Boutique en ligne d'indispensables maison introuvables au Canada: anti-courants d'air, cuisine et salle de bain.",
        en: "Online store for hard-to-find home essentials in Canada: draft proofing, kitchen and bathroom.",
        de: "Onlineshop für schwer auffindbare Haushaltshelfer in Kanada: Zugluftschutz, Küche und Bad.",
        es: "Tienda online de esenciales del hogar difíciles de encontrar en Canadá: anti corrientes de aire, cocina y baño.",
      },
      locale
    ),
    "url": baseUrl,
    "logo": `${baseUrl}/assets/images/touski-logo.jpeg`,
    "image": `${baseUrl}/assets/images/touski-logo.jpeg`,
    "email": "contact@touski.online",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CA",
      "addressRegion": "QC"
    },
    "priceRange": "$$",
    "currenciesAccepted": "CAD",
    "paymentAccepted": "Credit Card, Debit Card, PayPal",
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Touski",
    "url": baseUrl,
    "description": getLocaleValue(
      {
        fr: "Indispensables maison introuvables au Canada",
        en: "Hard-to-find home essentials in Canada",
        de: "Schwer auffindbare Haushaltshelfer in Kanada",
        es: "Esenciales del hogar difíciles de encontrar en Canadá",
      },
      locale
    ),
    "inLanguage": getLocaleValue(
      { fr: "fr-CA", en: "en-CA", de: "de-DE", es: "es-ES" },
      locale
    ),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/products?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": getLocaleValue(
          { fr: "Accueil", en: "Home", de: "Startseite", es: "Inicio" },
          locale
        ),
        "item": `${baseUrl}${withLocale("/", locale)}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

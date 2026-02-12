"use client";

import { usePathname } from "next/navigation";

export default function StructuredData() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  
  const baseUrl = "https://touski.online";
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "Touski",
    "description": isEnglish 
      ? "Online store for hard-to-find home essentials in Canada: draft proofing, kitchen and bathroom."
      : "Boutique en ligne d'indispensables maison introuvables au Canada: anti-courants d'air, cuisine et salle de bain.",
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
    "description": isEnglish
      ? "Hard-to-find home essentials in Canada"
      : "Indispensables maison introuvables au Canada",
    "inLanguage": isEnglish ? "en-CA" : "fr-CA",
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
        "name": isEnglish ? "Home" : "Accueil",
        "item": isEnglish ? `${baseUrl}/en` : baseUrl
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

export const metadata = {
  title: "Boutique TOUSKI | Anti-courants d'air, cuisine et salle de bain",
  description:
    "Decouvrez des indispensables maison au Canada: anti-courants d'air, produits cuisine, anti-calcaire et accessoires salle de bain.",
  keywords: [
    "boutique produits maison canada",
    "produits cuisine canada",
    "degraissant cuisine",
    "nettoyant four et plaques",
    "produits salle de bain canada",
    "anti-calcaire douche",
    "traitement joints moisissures",
    "accessoires salle de bain",
    "TOUSKI boutique",
  ],
  alternates: {
    canonical: "https://touski.online/products",
    languages: {
      "fr-CA": "https://touski.online/products",
      "en-CA": "https://touski.online/en/products",
      "de-DE": "https://touski.online/de/products",
      "es-ES": "https://touski.online/es/products",
    },
  },
  openGraph: {
    title: "Boutique TOUSKI | Anti-courants d'air, cuisine et salle de bain",
    description:
      "Decouvrez des indispensables maison au Canada: anti-courants d'air, produits cuisine, anti-calcaire et accessoires salle de bain.",
    url: "https://touski.online/products",
    siteName: "TOUSKI",
    locale: "fr_CA",
    type: "website",
  },
};

export default function ProductsLayout({ children }) {
  return children;
}

import HomePage9 from "./(homes)/home-9/page";

export const metadata = {
  title: "Touski — indispensables maison introuvables au Canada",
  description:
    "Anti-courants d'air, cuisine et salle de bain: des indispensables utiles, efficaces et selectionnes pour les foyers au Canada.",
  keywords: [
    "indispensables maison canada",
    "anti-courants d'air canada",
    "bas de porte isolant",
    "degraissant cuisine canada",
    "nettoyant cuisine specialise",
    "anti-calcaire salle de bain",
    "traitement joints moisissures",
    "accessoires salle de bain entretien",
    "TOUSKI",
  ],
  openGraph: {
    title: "Touski — indispensables maison introuvables au Canada",
    description:
      "Anti-courants d'air, cuisine et salle de bain: des indispensables utiles, efficaces et selectionnes pour les foyers au Canada.",
    locale: "fr_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://touski.online",
    languages: {
      'fr-CA': 'https://touski.online',
      'en-CA': 'https://touski.online/en',
      'de-DE': 'https://touski.online/de',
      'es-ES': 'https://touski.online/es',
    },
  },
};
export default function Home() {
  return (
    <>
      <HomePage9 />
    </>
  );
}

import HomePage9 from "./(homes)/home-9/page";

export const metadata = {
  title: "Touski — indispensables maison introuvables au Canada",
  description:
    "Anti-courants d'air, cuisine et salle de bain: des indispensables utiles, efficaces et selectionnes pour les foyers au Canada.",
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

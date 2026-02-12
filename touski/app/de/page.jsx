import HomePage9 from "../(homes)/home-9/page";

export const metadata = {
  title: "Touski — schwer auffindbare Haushaltshelfer in Kanada",
  description:
    "Zugluftschutz, Küche und Bad: nützliche, wirksame und sorgfältig ausgewählte Haushaltsprodukte für Kanada.",
  alternates: {
    canonical: "https://touski.online/de",
    languages: {
      "fr-CA": "https://touski.online",
      "en-CA": "https://touski.online/en",
      "de-DE": "https://touski.online/de",
      "es-ES": "https://touski.online/es",
    },
  },
  openGraph: {
    title: "Touski — schwer auffindbare Haushaltshelfer in Kanada",
    description:
      "Zugluftschutz, Küche und Bad: nützliche, wirksame und sorgfältig ausgewählte Haushaltsprodukte für Kanada.",
    locale: "de_DE",
    type: "website",
  },
};

export default function HomeDe() {
  return <HomePage9 />;
}

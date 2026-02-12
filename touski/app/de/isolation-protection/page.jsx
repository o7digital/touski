import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Dämmung und Schutz des Hauses in Kanada | TOUSKI",
  description:
    "Dämmung und Schutz für kanadische Haushalte: Wärmeverluste senken, Zugluft begrenzen und den Wohnkomfort im Winter verbessern.",
  keywords: [
    "Dämmung Haus Kanada",
    "Wärmeverlust reduzieren",
    "Tür und Fenster abdichten",
    "Zugluftschutz Kanada",
    "Heizkosten senken",
  ],
  alternates: {
    canonical: "https://touski.online/de/isolation-protection",
    languages: {
      "fr-CA": "https://touski.online/isolation-protection",
      "en-CA": "https://touski.online/en/isolation-protection",
      "de-DE": "https://touski.online/de/isolation-protection",
      "es-ES": "https://touski.online/es/isolation-protection",
    },
  },
  openGraph: {
    title: "Dämmung und Schutz des Hauses in Kanada | TOUSKI",
    description:
      "Dämmung und Schutz für kanadische Haushalte: Wärmeverluste senken, Zugluft begrenzen und den Wohnkomfort im Winter verbessern.",
    url: "https://touski.online/de/isolation-protection",
    siteName: "TOUSKI",
    locale: "de_DE",
    type: "article",
  },
};

export default function InsulationProtectionDePage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Dämmung und Schutz für mehr Wohnkomfort</h1>
          <p>
            Schlechte Abdichtung führt zu Zugluft, kalten Zonen und Energieverlust.
            Mit gezielten Maßnahmen an Türen, Fenstern und Übergängen lässt sich
            der Innenkomfort deutlich stabilisieren.
          </p>
          <p>
            TOUSKI setzt auf einfache, wirksame Lösungen, die im Alltag leicht umzusetzen sind.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

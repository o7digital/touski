import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Dämmung und Schutz | TOUSKI",
  description:
    "Verstehen Sie, wie Dämmung und Schutzmaßnahmen den Wohnkomfort verbessern und Wärmeverluste reduzieren.",
  alternates: {
    canonical: "https://touski.online/de/isolation-protection",
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

import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Über TOUSKI | Wohnkomfort und Lebensqualität",
  description:
    "Entdecken Sie die Vision von TOUSKI: Wohnkomfort mit nützlichen und langlebigen Lösungen für den Alltag verbessern.",
  alternates: {
    canonical: "https://touski.online/de/about",
    languages: {
      "fr-CA": "https://touski.online/about",
      "en-CA": "https://touski.online/en/about",
      "de-DE": "https://touski.online/de/about",
      "es-ES": "https://touski.online/es/about",
    },
  },
};

export default function AboutPageDe() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>TOUSKI: Wohnkomfort neu denken</h1>
          <p>
            TOUSKI möchte Wohnungen und Häuser im Alltag spürbar komfortabler machen.
            Unser Fokus liegt auf praktischen Lösungen für Zugluftschutz, Küche und Bad,
            damit das Zuhause funktional, angenehm und einfach zu pflegen bleibt.
          </p>
          <p>
            Statt kurzfristiger Trends setzen wir auf klare Prioritäten: echte Probleme
            im Haushalt lösen, Komfort stabilisieren und den täglichen Aufwand reduzieren.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Unsere Sicht auf Wohnkomfort</h2>
          <p>
            Wohnkomfort entsteht durch das Zusammenspiel von Temperatur, Luftdichtheit,
            Raumorganisation und Nutzungsgewohnheiten. Wenn diese Elemente zusammenpassen,
            steigt die Lebensqualität spürbar.
          </p>
          <p>
            Deshalb wählen wir Produkte aus, die im kanadischen Alltag wirklich nützlich sind:
            leicht anzuwenden, wirksam und auf langfristige Nutzung ausgelegt.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Ein praxisnaher Ansatz</h2>
          <p>
            Wir starten immer mit den realen Situationen zuhause: kalte Zugluft an Türen,
            hartnäckige Verschmutzung in der Küche oder Feuchtigkeit im Bad.
            Daraus leiten wir konkrete, einfache und nachhaltige Lösungen ab.
          </p>
          <p>
            Mehr über unseren Ansatz finden Sie auf
            <a href="/de/nos-services"> Unsere Leistungen</a> sowie auf den Seiten zu
            <a href="/de/chaleur-confort"> Wärme & Innenkomfort</a>,
            <a href="/de/isolation-protection"> Dämmung & Schutz</a>,
            <a href="/de/teletravail-bien-etre"> Homeoffice & Wohlbefinden</a> und
            <a href="/de/cocooning-maison"> Cocooning zuhause</a>.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

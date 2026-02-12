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
            TOUSKI steht dafür, Wohnungen und Häuser im Alltag spürbar komfortabler,
            stabiler und funktionaler zu machen. Unser Ziel ist nicht, möglichst viele
            Produkte zu zeigen, sondern echte Hebel für mehr Wohlbefinden im Zuhause
            verständlich und praktisch umzusetzen.
          </p>
          <p>
            Diese Seite fasst unsere Vision zusammen und erklärt, wie wir Wohnkomfort
            als ganzheitliches Thema betrachten, statt als Sammlung isolierter Produkte.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Unsere Sicht auf Wohnkomfort</h2>
          <p>
            TOUSKI basiert auf einer einfachen Beobachtung: Wohnkomfort ist ein zentraler
            Faktor für Lebensqualität. Durch Homeoffice, mehr Zeit zuhause und
            klimatische Schwankungen ist das Innenraumklima wichtiger denn je.
          </p>
          <p>
            Unsere Vision verbindet mehrere Dimensionen: Raumwärme, Luftdichtheit,
            sinnvolle Organisation der Räume und persönliches Wohlbefinden.
          </p>
          <p>
            Wohnkomfort entsteht für uns durch Balance: Temperatur, Akustik,
            Luftqualität und Alltagstauglichkeit müssen zusammenpassen.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Ein nutzungsorientierter Ansatz</h2>
          <p>
            Bei TOUSKI starten wir mit realen Alltagssituationen: Zugluft an Türen,
            Wärmeverluste an sensiblen Stellen, hartnäckige Verschmutzung in Küche
            oder Feuchtigkeit im Bad.
          </p>
          <p>
            Auf dieser Basis wählen wir Lösungen aus, die leicht integrierbar,
            verständlich und langfristig wirksam sind.
          </p>
          <p>
            Unser Ansatz hilft, überflüssige Produkte zu vermeiden und stattdessen
            auf Maßnahmen mit klarem, praktischem Nutzen zu setzen.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Komfort als Gleichgewicht</h2>
          <p>
            Wohnkomfort lässt sich nicht auf einen einzigen Faktor reduzieren. Er ist das
            Ergebnis mehrerer Elemente: Temperatur, Dämmung, Raumaufteilung und
            ergonomische Nutzung im Alltag.
          </p>
          <p>
            Deshalb betrachten wir das Zuhause als zusammenhängendes System, in dem
            jede Verbesserung einen messbaren Beitrag zur Lebensqualität leisten sollte.
          </p>
          <p>
            Ziel ist ein ruhiges, funktionales und verlässliches Zuhause, das Arbeit,
            Erholung und tägliche Abläufe gleichermaßen unterstützt.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Ein nachhaltiger und verantwortungsvoller Ansatz</h2>
          <p>
            Die Verbesserung des Wohnkomforts ist für uns ein langfristiges Thema.
            TOUSKI setzt auf robuste, nützliche und dauerhaft einsetzbare Lösungen,
            statt auf kurzlebige Trends.
          </p>
          <p>
            Wir bevorzugen klare, praktische Produkte, die Wartung vereinfachen,
            den Alltag entlasten und über mehrere Saisons zuverlässig funktionieren.
          </p>
          <p>
            So bauen wir Vertrauen auf: durch konsistente Qualität und nachvollziehbare
            Entscheidungen entlang realer Bedürfnisse.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>TOUSKI: Ein Projekt für Lebensqualität</h2>
          <p>
            TOUSKI richtet sich an alle, die ihr Zuhause komfortabler, effizienter und
            alltagstauglicher gestalten möchten.
          </p>
          <p>
            Unsere Vorgehensweise ist auf der Seite
            <a href="/de/nos-services"> Unsere Leistungen</a> beschrieben und wird durch
            unsere Kerninhalte ergänzt:
            <a href="/de/chaleur-confort"> Wärme und Innenkomfort</a>,
            <a href="/de/isolation-protection"> Dämmung und Schutz</a>,
            <a href="/de/teletravail-bien-etre"> Homeoffice und Wohlbefinden</a> und
            <a href="/de/cocooning-maison"> Cocooning zuhause</a>.
          </p>
          <p>
            Mit dieser Struktur verfolgt TOUSKI eine klare Linie: Haushalte mit
            zuverlässigen, kohärenten und langlebigen Lösungen beim Wohnkomfort
            konkret zu unterstützen.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

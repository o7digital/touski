import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Unsere Leistungen | TOUSKI",
  description:
    "Entdecken Sie die TOUSKI-Leistungen: praktische und langlebige Lösungen für mehr Wohnkomfort im Alltag.",
  alternates: {
    canonical: "https://touski.online/de/nos-services",
    languages: {
      "fr-CA": "https://touski.online/nos-services",
      "en-CA": "https://touski.online/en/nos-services",
      "de-DE": "https://touski.online/de/nos-services",
      "es-ES": "https://touski.online/es/nos-services",
    },
  },
};

export default function ServicesPageDe() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Unsere Leistungen</h1>
          <p>
            TOUSKI entwickelt Lösungen, die den Alltag zuhause einfacher und komfortabler machen.
            Unser Schwerpunkt liegt auf drei Bereichen: Zugluftschutz, Küche und Bad.
          </p>
          <p>
            Wir wählen Produkte mit echtem Nutzen aus: leicht verständlich, zuverlässig und
            an die klimatischen Bedingungen in Kanada angepasst.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Worauf wir uns konzentrieren</h2>
          <ul>
            <li>
              <a href="/de/chaleur-confort">Wärme und Innenkomfort</a>
            </li>
            <li>
              <a href="/de/isolation-protection">Dämmung und Schutz</a>
            </li>
            <li>
              <a href="/de/teletravail-bien-etre">Homeoffice und Wohlbefinden</a>
            </li>
            <li>
              <a href="/de/cocooning-maison">Cocooning und Lebensqualität</a>
            </li>
          </ul>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Homeoffice und Wohlbefinden zuhause | TOUSKI Kanada",
  description:
    "Verbessern Sie Ihr Homeoffice in Kanada mit stabiler Raumtemperatur, weniger Zugluft und besserem Wohlbefinden im Arbeitsalltag.",
  keywords: [
    "Homeoffice Komfort Kanada",
    "Wohlbefinden zuhause arbeiten",
    "Raumklima verbessern",
    "Zugluft im Büro zuhause",
    "Ergonomie und Temperatur",
  ],
  alternates: {
    canonical: "https://touski.online/de/teletravail-bien-etre",
    languages: {
      "fr-CA": "https://touski.online/teletravail-bien-etre",
      "en-CA": "https://touski.online/en/teletravail-bien-etre",
      "de-DE": "https://touski.online/de/teletravail-bien-etre",
      "es-ES": "https://touski.online/es/teletravail-bien-etre",
    },
  },
  openGraph: {
    title: "Homeoffice und Wohlbefinden zuhause | TOUSKI Kanada",
    description:
      "Verbessern Sie Ihr Homeoffice in Kanada mit stabiler Raumtemperatur, weniger Zugluft und besserem Wohlbefinden im Arbeitsalltag.",
    url: "https://touski.online/de/teletravail-bien-etre",
    siteName: "TOUSKI",
    locale: "de_DE",
    type: "article",
  },
};

export default function RemoteWorkDePage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Homeoffice und Wohlbefinden zuhause</h1>
          <p>
            Wer von zuhause arbeitet, braucht ein stabiles und angenehmes Umfeld:
            passende Temperatur, weniger Zugluft und eine klare Raumaufteilung.
          </p>
          <p>
            Mit kleinen Anpassungen lässt sich die Konzentration verbessern und die tägliche
            Belastung durch Kälte oder Unruhe reduzieren.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

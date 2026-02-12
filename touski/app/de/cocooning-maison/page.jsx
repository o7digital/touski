import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Cocooning zuhause in Kanada | TOUSKI",
  description:
    "Gestalten Sie ein warmes, beruhigendes Zuhause in Kanada: Cocooning, Innenkomfort und Wohlbefinden für den Alltag.",
  keywords: [
    "Cocooning zuhause Kanada",
    "Wohnatmosphäre verbessern",
    "Wohlbefinden zuhause",
    "Innenkomfort Winter",
    "gemütliches Zuhause Kanada",
  ],
  alternates: {
    canonical: "https://touski.online/de/cocooning-maison",
    languages: {
      "fr-CA": "https://touski.online/cocooning-maison",
      "en-CA": "https://touski.online/en/cocooning-maison",
      "de-DE": "https://touski.online/de/cocooning-maison",
      "es-ES": "https://touski.online/es/cocooning-maison",
    },
  },
  openGraph: {
    title: "Cocooning zuhause in Kanada | TOUSKI",
    description:
      "Gestalten Sie ein warmes, beruhigendes Zuhause in Kanada: Cocooning, Innenkomfort und Wohlbefinden für den Alltag.",
    url: "https://touski.online/de/cocooning-maison",
    siteName: "TOUSKI",
    locale: "de_DE",
    type: "article",
  },
};

export default function CocooningDePage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Cocooning zuhause: ein ruhiges, warmes Umfeld schaffen</h1>
          <p>
            Cocooning bedeutet, das Zuhause als Rückzugsort zu gestalten:
            angenehme Wärme, ruhige Atmosphäre und klare Ordnung im Alltag.
          </p>
          <p>
            Es verbindet Wärme, Dämmung und Wohlbefinden zu einem stimmigen Ganzen,
            das Erholung und Lebensqualität unterstützt.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

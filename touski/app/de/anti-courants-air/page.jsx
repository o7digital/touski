import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Zugluftschutz | Türdichtungen und Abdichtungslösungen für Kanada | TOUSKI",
  description:
    "Zugluftschutz für Türen und Fenster in Kanada: Türabdichtungen, Dichtungsbänder und Zubehör für mehr Komfort und Energieeinsparung.",
  alternates: {
    canonical: "https://touski.online/de/anti-courants-air",
    languages: {
      "fr-CA": "https://touski.online/anti-courants-air",
      "en-CA": "https://touski.online/en/anti-courants-air",
      "de-DE": "https://touski.online/de/anti-courants-air",
      "es-ES": "https://touski.online/es/anti-courants-air",
    },
  },
};

const faqItems = [
  {
    question: "Mit welchen Zugluftschutz-Produkten sollte ich starten?",
    answer:
      "Beginnen Sie mit Türzugstoppern und umlaufenden Dichtungen an den am stärksten exponierten Öffnungen.",
  },
  {
    question: "Sind Türzugstopper in kanadischen Wintern wirksam?",
    answer:
      "Ja. In Kombination mit Dichtungen am Türrahmen reduzieren sie kalte Luft am Boden deutlich.",
  },
  {
    question: "Kann ich diese Lösungen ohne große Renovierung installieren?",
    answer:
      "Die meisten Produkte lassen sich schnell mit Klebestreifen oder einfachen Befestigungen montieren.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function DraftProofingDePage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container mw-930 py-5">
          <h1>Zugluftschutz für besseren Winterkomfort in Kanada</h1>
          <p>
            TOUSKI bietet praktische Lösungen gegen Zugluft an Türen, Fenstern
            und Schwellen: Türabdichtungen, Dichtungsbänder und passendes Zubehör.
          </p>
          <p>
            Ziel ist es, die Temperatur im Zuhause stabiler zu halten, kalte Zonen
            zu reduzieren und den Energieverbrauch im Winter zu senken.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>FAQ Zugluftschutz</h2>
          <div className="mt-4">
            {faqItems.map((item, index) => (
              <div key={item.question} className="mb-4">
                <h3 style={{ fontSize: "1.1rem" }}>
                  {index + 1}. {item.question}
                </h3>
                <p className="mb-0">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

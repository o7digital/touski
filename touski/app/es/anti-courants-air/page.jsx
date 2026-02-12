import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Anti corrientes de aire | Burletes y sellos para Canadá | TOUSKI",
  description:
    "Soluciones anti corrientes de aire para puertas y ventanas en Canadá: burletes, sellos y accesorios para mejorar el confort y ahorrar energía.",
  alternates: {
    canonical: "https://touski.online/es/anti-courants-air",
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
    question: "¿Con qué productos anti corrientes conviene empezar?",
    answer:
      "Empieza por burletes inferiores y sellos perimetrales en las aperturas más expuestas.",
  },
  {
    question: "¿Son eficaces en invierno canadiense?",
    answer:
      "Sí. Combinados con sellos de marco, reducen significativamente la entrada de aire frío.",
  },
  {
    question: "¿Se pueden instalar sin obras grandes?",
    answer:
      "La mayoría se instala rápido con adhesivo o fijaciones simples, sin renovaciones mayores.",
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

export default function DraftProofingEsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container mw-930 py-5">
          <h1>Anti corrientes de aire para un mejor confort invernal en Canadá</h1>
          <p>
            TOUSKI selecciona soluciones prácticas para reducir filtraciones en puertas,
            ventanas y umbrales: burletes, sellos y accesorios de acabado.
          </p>
          <p>
            El objetivo es estabilizar la temperatura interior, reducir zonas frías
            y mejorar el confort diario en temporada de frío.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>FAQ anti corrientes de aire</h2>
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

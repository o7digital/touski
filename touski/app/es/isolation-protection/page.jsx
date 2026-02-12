import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Aislamiento y protección del hogar en Canadá | TOUSKI",
  description:
    "Mejora el aislamiento del hogar en Canadá: reduce pérdidas térmicas, limita corrientes de aire y aumenta el confort en invierno.",
  keywords: [
    "aislamiento hogar Canadá",
    "protección térmica vivienda",
    "reducir pérdidas de calor",
    "sellado puertas y ventanas",
    "ahorrar calefacción",
  ],
  alternates: {
    canonical: "https://touski.online/es/isolation-protection",
    languages: {
      "fr-CA": "https://touski.online/isolation-protection",
      "en-CA": "https://touski.online/en/isolation-protection",
      "de-DE": "https://touski.online/de/isolation-protection",
      "es-ES": "https://touski.online/es/isolation-protection",
    },
  },
  openGraph: {
    title: "Aislamiento y protección del hogar en Canadá | TOUSKI",
    description:
      "Mejora el aislamiento del hogar en Canadá: reduce pérdidas térmicas, limita corrientes de aire y aumenta el confort en invierno.",
    url: "https://touski.online/es/isolation-protection",
    siteName: "TOUSKI",
    locale: "es_ES",
    type: "article",
  },
};

export default function InsulationProtectionEsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Aislamiento y protección para más confort</h1>
          <p>
            Un buen aislamiento interior ayuda a evitar corrientes de aire, zonas frías
            y variaciones de temperatura en el hogar.
          </p>
          <p>
            Actuar en puertas, ventanas y zonas sensibles permite ganar estabilidad térmica
            y bienestar diario.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

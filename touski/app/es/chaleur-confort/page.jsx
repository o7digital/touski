import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Calor y confort interior en Canadá | TOUSKI",
  description:
    "Soluciones prácticas para mejorar el confort térmico en Canadá: menos corrientes de aire, temperatura estable y bienestar en casa.",
  keywords: [
    "calor en casa Canadá",
    "confort interior invierno",
    "reducir corrientes de aire",
    "ahorro energético hogar",
    "bienestar térmico",
  ],
  alternates: {
    canonical: "https://touski.online/es/chaleur-confort",
    languages: {
      "fr-CA": "https://touski.online/chaleur-confort",
      "en-CA": "https://touski.online/en/chaleur-confort",
      "de-DE": "https://touski.online/de/chaleur-confort",
      "es-ES": "https://touski.online/es/chaleur-confort",
    },
  },
  openGraph: {
    title: "Calor y confort interior en Canadá | TOUSKI",
    description:
      "Soluciones prácticas para mejorar el confort térmico en Canadá: menos corrientes de aire, temperatura estable y bienestar en casa.",
    url: "https://touski.online/es/chaleur-confort",
    siteName: "TOUSKI",
    locale: "es_ES",
    type: "article",
  },
};

export default function WarmthComfortEsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Calor y confort interior en casa</h1>
          <p>
            La sensación térmica en casa influye directamente en el descanso,
            la concentración y el bienestar diario.
          </p>
          <p>
            Con mejoras simples en sellado y distribución del calor, es posible
            estabilizar el confort sin realizar obras pesadas.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

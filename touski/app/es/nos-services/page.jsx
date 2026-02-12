import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Nuestros servicios | TOUSKI",
  description:
    "Descubre los servicios de TOUSKI: soluciones prácticas y duraderas para mejorar el confort del hogar.",
  alternates: {
    canonical: "https://touski.online/es/nos-services",
    languages: {
      "fr-CA": "https://touski.online/nos-services",
      "en-CA": "https://touski.online/en/nos-services",
      "de-DE": "https://touski.online/de/nos-services",
      "es-ES": "https://touski.online/es/nos-services",
    },
  },
};

export default function ServicesPageEs() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Nuestros servicios</h1>
          <p>
            TOUSKI desarrolla soluciones para mejorar el confort del hogar en el día a día.
            Nos centramos en tres pilares: anti corrientes de aire, cocina y baño.
          </p>
          <p>
            Seleccionamos productos útiles y duraderos, adaptados a las condiciones
            climáticas y a las necesidades reales de los hogares en Canadá.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Nuestras áreas clave</h2>
          <ul>
            <li>
              <a href="/es/chaleur-confort">Calor y confort interior</a>
            </li>
            <li>
              <a href="/es/isolation-protection">Aislamiento y protección</a>
            </li>
            <li>
              <a href="/es/teletravail-bien-etre">Teletrabajo y bienestar</a>
            </li>
            <li>
              <a href="/es/cocooning-maison">Cocooning y calidad de vida</a>
            </li>
          </ul>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import LocationMap from "@/components/otherPages/Contact/LocationMap";
import React from "react";

export const metadata = {
  title: "Contacto - Servicio al cliente TOUSKI | Canadá",
  description:
    "¿Preguntas sobre nuestros productos para el hogar? Contacta al equipo de TOUSKI. Servicio al cliente para todo Canadá.",
  keywords: [
    "contacto TOUSKI",
    "servicio al cliente Canadá",
    "ayuda productos hogar",
    "soporte anti corrientes",
    "atención TOUSKI",
  ],
  alternates: {
    canonical: "https://touski.online/es/contact",
    languages: {
      "fr-CA": "https://touski.online/contact",
      "en-CA": "https://touski.online/en/contact",
      "de-DE": "https://touski.online/de/contact",
      "es-ES": "https://touski.online/es/contact",
    },
  },
  openGraph: {
    title: "Contacto - Servicio al cliente TOUSKI | Canadá",
    description:
      "¿Preguntas sobre nuestros productos para el hogar? Contacta al equipo de TOUSKI. Servicio al cliente para todo Canadá.",
    url: "https://touski.online/es/contact",
    siteName: "TOUSKI",
    locale: "es_ES",
    type: "website",
  },
};

export default function ContactPageEs() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="contact-us container">
          <div className="mw-930">
            <h1 className="page-title">CONTACTO</h1>
            <p className="mb-4">
              Estamos disponibles para ayudarte con dudas sobre corrientes de aire,
              cocina y baño.
            </p>
            <p className="mb-2">
              <strong>TOUSKI Canada</strong>
            </p>
            <p className="mb-2">
              1030, Avenue Muguette
              <br />
              Saint-Élie-de-Caxton QC G0X 2N0
              <br />
              Canadá
            </p>
            <p className="mb-2">
              <a href="mailto:contact@touski.online">contact@touski.online</a>
              <br />
              <a href="tel:+18197010378">+1 819-701-0378</a>
            </p>
          </div>
        </section>

        <section className="google-map mb-5">
          <h2 className="d-none">Contacto</h2>
          <div id="map" className="google-map__wrapper">
            <LocationMap />
          </div>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

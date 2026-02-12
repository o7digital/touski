import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import LocationMap from "@/components/otherPages/Contact/LocationMap";
import React from "react";

export const metadata = {
  title: "Kontakt - TOUSKI Kundenservice | Kanada",
  description:
    "Fragen zu unseren Haushaltsprodukten? Kontaktieren Sie das TOUSKI-Team. Kundenservice für ganz Kanada.",
  keywords: [
    "TOUSKI Kontakt",
    "Kundenservice Kanada",
    "Haushaltsprodukte Hilfe",
    "Zugluftschutz Beratung",
    "TOUSKI Support",
  ],
  alternates: {
    canonical: "https://touski.online/de/contact",
    languages: {
      "fr-CA": "https://touski.online/contact",
      "en-CA": "https://touski.online/en/contact",
      "de-DE": "https://touski.online/de/contact",
      "es-ES": "https://touski.online/es/contact",
    },
  },
  openGraph: {
    title: "Kontakt - TOUSKI Kundenservice | Kanada",
    description:
      "Fragen zu unseren Haushaltsprodukten? Kontaktieren Sie das TOUSKI-Team. Kundenservice für ganz Kanada.",
    url: "https://touski.online/de/contact",
    siteName: "TOUSKI",
    locale: "de_DE",
    type: "website",
  },
};

export default function ContactPageDe() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="contact-us container">
          <div className="mw-930">
            <h1 className="page-title">KONTAKT</h1>
            <p className="mb-4">
              Wir helfen Ihnen gern bei Fragen zu Zugluftschutz, Küche und Bad.
            </p>
            <p className="mb-2">
              <strong>TOUSKI Canada</strong>
            </p>
            <p className="mb-2">
              1030, Avenue Muguette
              <br />
              Saint-Élie-de-Caxton QC G0X 2N0
              <br />
              Kanada
            </p>
            <p className="mb-2">
              <a href="mailto:contact@touski.online">contact@touski.online</a>
              <br />
              <a href="tel:+18197010378">+1 819-701-0378</a>
            </p>
          </div>
        </section>

        <section className="google-map mb-5">
          <h2 className="d-none">Kontakt</h2>
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

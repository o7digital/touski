import Footer8 from "@/components/footers/Footer8";

import Header1 from "@/components/headers/Header1";
import Contact from "@/components/otherPages/Contact/Contact";
import LocationMap from "@/components/otherPages/Contact/LocationMap";

import React from "react";

export const metadata = {
  title: "Contactez-nous - Service client Touski | Québec",
  description: "Questions sur nos gadgets cuisine, ustensiles pratiques ou solutions rangement ? Contactez notre équipe Touski. Service client dédié au Québec, Saint-Élie-de-Caxton.",
  alternates: {
    canonical: "https://touski.online/contact",
    languages: {
      "fr-CA": "https://touski.online/contact",
      "en-CA": "https://touski.online/en/contact",
      "de-DE": "https://touski.online/de/contact",
      "es-ES": "https://touski.online/es/contact",
    },
  },
  keywords: "boutique maison saint-élie-de-caxton, accessoires maison saint-élie-de-caxton, boutique maison mauricie, accessoires maison mauricie, boutique maison québec en ligne, produits pratiques maison québec, accessoires maison pas chers canada, organiser maison québec, rangement maison québec pas cher",
};
export default function ContactPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="contact-us container">
          <div className="mw-930">
            <h2 className="page-title">NOUS CONTACTER</h2>
          </div>
        </section>

        <section className="google-map mb-5">
          <h2 className="d-none">Contactez-nous</h2>
          <div id="map" className="google-map__wrapper">
            <LocationMap />
          </div>
        </section>
        <Contact />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

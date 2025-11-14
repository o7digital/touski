import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Contact from "@/components/otherPages/Contact/Contact";
import LocationMap from "@/components/otherPages/Contact/LocationMap";

import React from "react";

export const metadata = {
  title: "Contactez-nous - Service client Touski | Québec",
  description: "Besoin d'aide pour trouver ce qu'il vous faut pour votre chez-soi ? Contactez notre équipe Touski. Service client dédié au Québec, Saint-Élie-de-Caxton.",
  keywords: "contact touski, service client maison québec, aide achat maison, questions produits maison, livraison québec, saint-élie-de-caxton",
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
      <Footer1 />
    </>
  );
}

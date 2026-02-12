import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import Contact from "@/components/otherPages/Contact/Contact";
import LocationMap from "@/components/otherPages/Contact/LocationMap";
import React from "react";

export const metadata = {
  title: "Contact us - Touski customer service | Quebec Canada",
  description:
    "Questions about our kitchen gadgets, practical tools or storage solutions? Contact the Touski team. Customer service for Canada.",
  alternates: {
    canonical: "https://touski.online/en/contact",
    languages: {
      "fr-CA": "https://touski.online/contact",
      "en-CA": "https://touski.online/en/contact",
      "de-DE": "https://touski.online/de/contact",
      "es-ES": "https://touski.online/es/contact",
    },
  },
  keywords: "home products saint-elie-de-caxton, home accessories mauricie, quebec home shop, quebec online home shop, practical home products quebec, storage solutions quebec, affordable home accessories canada, canadian home products",
  openGraph: {
    title: "Contact Touski - Customer service",
    description: "Need help with our products? Contact our team for questions about kitchen gadgets and home organization.",
    type: "website",
  },
};

export default function ContactPageEn() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="contact-us container">
          <div className="mw-930">
            <h2 className="page-title">CONTACT US</h2>
          </div>
        </section>

        <section className="google-map mb-5">
          <h2 className="d-none">Contact us</h2>
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

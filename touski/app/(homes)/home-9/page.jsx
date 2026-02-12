import Features from "@/components/common/features/Features";
import Footer8 from "@/components/footers/Footer8";
import Header9 from "@/components/headers/Header9";
import BestSellingSpocket from "@/components/homes/home-9/BestSellingSpocket";
import Collections from "@/components/homes/home-9/Collections";
import Hero from "@/components/homes/home-9/Hero";
import React from "react";

export const metadata = {
  title: "Touski — indispensables maison introuvables au Canada",
  description:
    "Anti-courants d'air, cuisine et salle de bain: des indispensables utiles, efficaces et selectionnes pour les foyers au Canada.",
  keywords:
    "anti-courants d'air canada, bas de porte isolation, joints etancheite hiver, degraissant cuisine canada, nettoyant anti-calcaire salle de bain, accessoires maison pratiques canada",
  openGraph: {
    title: "Touski — indispensables maison introuvables au Canada",
    description:
      "Anti-courants d'air, cuisine et salle de bain: des indispensables utiles, efficaces et selectionnes pour les foyers au Canada.",
    type: "website",
  },
};
export default function HomePage8() {
  return (
    <>
      <Header9 />
      <main className="page-wrapper">
        <Hero />
        <div className="mb-3 pb-1"></div>
        <Collections />
        <div className="mb-1 pb-4 mb-xl-5 pb-xl-5"></div>
        <BestSellingSpocket />
        <div className="pt-1 pb-5 mt-4 mt-xl-5"></div>
        {/* <Brands /> */}
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Features />
      </main>
      <Footer8 />
    </>
  );
}

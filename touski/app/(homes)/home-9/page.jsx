import Features from "@/components/common/features/Features";
import Footer8 from "@/components/footers/Footer8";
import Header9 from "@/components/headers/Header9";
import BestSellingSpocket from "@/components/homes/home-9/BestSellingSpocket";
import Brands from "@/components/common/brands/Brands";
import Collections from "@/components/homes/home-9/Collections";
import Hero from "@/components/homes/home-9/Hero";
import Lookbook from "@/components/homes/home-9/Lookbook";
import React from "react";

export const metadata = {
  title: "Touski - Produits pratiques pour organiser la maison | Boutique Québec",
  description: "Découvrez nos gadgets cuisine innovants, ustensiles pratiques et solutions rangement pour organiser votre maison facilement. Accessoires maison indispensables 2025 au Québec.",
  keywords: "produits pratiques pour organiser la maison, organiser une petite maison facilement, gadgets cuisine innovants québec, ustensiles cuisine gain de temps, accessoires cuisine pratiques québec, rangement cuisine petit espace, organiser tiroirs cuisine québec, idées rangement maison pas cher, accessoires maison pratiques, produits maison intelligents québec, articles maison indispensables 2025, solutions rangement salle de bain, produits pratiques salle de bain, organiser le garde-manger québec, paniers rangement maison québec, accessoires maison pas chers canada, boutique maison québec en ligne, gadgets maison utiles au quotidien, organiser la maison rapidement, accessoires minimalistes maison",
  openGraph: {
    title: "Touski - Produits pratiques pour organiser la maison",
    description: "Gadgets innovants, ustensiles pratiques et solutions rangement pour une maison bien organisée au Québec.",
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
        <div className="mb-5 pb-4"></div>
        <Lookbook />
        <div className="pt-1 pb-5 mt-4 mt-xl-5"></div>
        {/* <Brands /> */}
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Features />
      </main>
      <Footer8 />
    </>
  );
}

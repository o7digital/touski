import Features from "@/components/common/features/Features";
import Footer8 from "@/components/footers/Footer8";
import Header9 from "@/components/headers/Header9";
import BestSellingSpocket from "@/components/homes/home-9/BestSellingSpocket";
import Collections from "@/components/homes/home-9/Collections";
import Hero from "@/components/homes/home-9/Hero";
import React from "react";

export const metadata = {
  title: "Touski - Produits pratiques pour organiser la maison | Boutique Québec",
  description: "Découvrez nos gadgets cuisine innovants, ustensiles pratiques et solutions rangement pour organiser votre maison facilement. Accessoires maison indispensables 2025 au Québec.",
  keywords: "organiser maison québec, produits maison saint-élie-de-caxton, accessoires maison mauricie, boutique maison mauricie, organiser petite maison québec mauricie, rangement petite cuisine québec, rangement petit appartement québec, accessoires minimalistes maison québec, organiser maison mauricie, idées rangement maison québec, rangement maison québec pas cher, accessoires maison pratiques québec, produits pratiques maison québec, gadgets cuisine innovants québec, ustensiles cuisine pratiques québec, organiser tiroirs cuisine québec, solutions rangement salle de bain québec, produits pratiques salle de bain québec, boutique maison québec en ligne, accessoires maison pas chers canada, rangement salle de bain mauricie, organiser garde-manger mauricie, paniers rangement mauricie",
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
        <div className="pt-1 pb-5 mt-4 mt-xl-5"></div>
        {/* <Brands /> */}
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Features />
      </main>
      <Footer8 />
    </>
  );
}

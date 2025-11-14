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
  title: "Touski - Tout ce qui est nécessaire pour son chez-soi | Boutique Maison Québec",
  description: "Touski, tout ce que vous avez besoin pour votre chez-soi. Découvrez nos produits malins, solutions pratiques et accessoires pour améliorer votre confort domestique. Livraison au Québec.",
  keywords: "tout ce qui est nécessaire pour son chez-soi, tout ce que vous avez besoin pour votre chez-soi, boutique maison québec, produits maison canada, confort domestique, bien-être à la maison, accessoires maison, décoration intérieur, rangement maison, solutions pratiques maison, vivre mieux chez soi, maison confortable",
  openGraph: {
    title: "Touski - Tout pour votre chez-soi",
    description: "Tout ce qui est bien pour votre maison. Produits malins, décoration et confort au meilleur prix.",
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
        <Brands />
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Features />
      </main>
      <Footer8 />
    </>
  );
}

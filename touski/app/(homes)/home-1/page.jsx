import LoginFormPopup from "@/components/common/LoginFormPopup";
import Footer8 from "@/components/footers/Footer8";

import Header1 from "@/components/headers/Header1";
import Features from "@/components/common/features/Features";
import Hero from "@/components/homes/home-1/Hero";
import InstaGram from "@/components/homes/home-1/InstaGram";
import Products1 from "@/components/homes/home-1/Products1";
import WooProducts from "@/components/homes/home-1/WooProducts";
import Link from "next/link";

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
export default function HomePage1() {
  return (
    <>
      <div>
        <Header1 />
        <main className="page-wrapper">
          <Hero />
          <div className="mb-3 pb-3 mb-md-4 pb-md-4 mb-xl-5 pb-xl-5"></div>
          <div className="pb-1"></div>
          <Products1 />
          <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
          <WooProducts />
          <div className="mb-3 mb-xl-5 pb-1 pb-xl-5"></div>
          <InstaGram />
          <div className="mb-4 pb-4 pb-xl-5 mb-xl-5"></div>
          <div className="bg-white">
            <Features />{" "}
          </div>
        </main>
        <Footer8 />
        <LoginFormPopup />{" "}
      </div>
    </>
  );
}

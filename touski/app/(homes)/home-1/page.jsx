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
  keywords: "organiser maison québec, produits maison saint-élie-de-caxton, accessoires maison mauricie, boutique maison mauricie, organiser petite maison québec mauricie, rangement petite cuisine québec, rangement petit appartement québec, accessoires minimalistes maison québec, organiser maison mauricie, idées rangement maison québec, rangement maison québec pas cher, accessoires maison pratiques québec, produits pratiques maison québec, gadgets cuisine innovants québec, ustensiles cuisine pratiques québec, organiser tiroirs cuisine québec, solutions rangement salle de bain québec, produits pratiques salle de bain québec, boutique maison québec en ligne, accessoires maison pas chers canada, rangement salle de bain mauricie, organiser garde-manger mauricie, paniers rangement mauricie",
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

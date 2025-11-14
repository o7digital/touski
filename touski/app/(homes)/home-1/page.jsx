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
  title: "TOUSKI - Tout ce qui est nécessaire pour son chez-soi",
  description: "TOUSKI est nécessaire pour son chez Soi. Découvrez notre sélection de produits pour la maison, cuisine, salle de bain et plus encore.",
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

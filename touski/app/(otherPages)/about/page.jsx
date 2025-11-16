import Footer8 from "@/components/footers/Footer8";

import Header1 from "@/components/headers/Header1";
import About from "@/components/otherPages/about/About";
import Clients from "@/components/otherPages/about/Clients";
import Services from "@/components/otherPages/about/Services";
import React from "react";

export const metadata = {
  title: "À propos de Touski - Produits pratiques pour organiser votre maison",
  description: "Touski, votre boutique en ligne québécoise spécialisée en gadgets innovants, ustensiles pratiques et solutions rangement pour une maison bien organisée. Mission : simplifier votre quotidien.",
  keywords: "touski, mission touski, boutique maison québec en ligne, produits pratiques pour organiser la maison, gadgets maison utiles au quotidien, organiser la maison rapidement, accessoires maison pratiques, solutions rangement maison, saint-élie-de-caxton, mauricie",
};
export default function AboutPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <About />
        <Services />
        <Clients />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

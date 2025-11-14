import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import About from "@/components/otherPages/about/About";
import Clients from "@/components/otherPages/about/Clients";
import Services from "@/components/otherPages/about/Services";
import React from "react";

export const metadata = {
  title: "À propos de Touski - Notre mission pour votre chez-soi",
  description: "Touski, votre partenaire pour un chez-soi confortable et bien organisé. Découvrez notre philosophie : vous offrir tout ce qui est bien pour votre maison, au Québec.",
  keywords: "touski, mission touski, boutique maison québec, améliorer son intérieur, confort maison, qualité de vie maison, bien vivre chez soi, saint-élie-de-caxton, mauricie",
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
      <Footer1 />
    </>
  );
}

import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import About from "@/components/otherPages/about/About";
import Clients from "@/components/otherPages/about/Clients";
import Services from "@/components/otherPages/about/Services";
import React from "react";

export const metadata = {
  title: "About Touski - Practical products for your home",
  description:
    "Touski is an online shop from Québec focused on clever gadgets, practical tools and smart storage solutions to keep your home organized.",
};

export default function AboutPageEn() {
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


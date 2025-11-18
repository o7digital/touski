import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import About from "@/components/otherPages/about/About";
import Clients from "@/components/otherPages/about/Clients";
import Services from "@/components/otherPages/about/Services";
import React from "react";

export const metadata = {
  title: "About Touski - Practical products for your home | Quebec Canada",
  description:
    "Touski is an online shop from Québec focused on clever gadgets, practical tools and smart storage solutions to keep your home organized.",
  keywords: "home products saint-elie-de-caxton, home accessories mauricie, quebec home shop, quebec online home shop, practical home products quebec, canadian home products, storage solutions quebec, organize small house quebec, practical kitchen accessories quebec, useful home gadgets quebec",
  openGraph: {
    title: "About Touski - Your home organization partner",
    description: "Quebec online shop specialized in practical products and smart solutions for home organization.",
    type: "website",
  },
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


import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Cocooning en casa | TOUSKI",
  description:
    "Crea un hogar cálido y relajante con un enfoque equilibrado de confort y bienestar.",
  alternates: {
    canonical: "https://touski.online/es/cocooning-maison",
  },
};

export default function CocooningEsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Cocooning en casa: un interior cálido y calmado</h1>
          <p>
            El cocooning busca transformar el hogar en un refugio cómodo,
            con una atmósfera estable y acogedora.
          </p>
          <p>
            Combina calor interior, organización y bienestar para mejorar
            la calidad de vida todos los días.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Calor y confort interior | TOUSKI",
  description:
    "Mejora el calor y el confort interior de tu hogar con soluciones prácticas para el uso diario.",
  alternates: {
    canonical: "https://touski.online/es/chaleur-confort",
  },
};

export default function WarmthComfortEsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Calor y confort interior en casa</h1>
          <p>
            La sensación térmica en casa influye directamente en el descanso,
            la concentración y el bienestar diario.
          </p>
          <p>
            Con mejoras simples en sellado y distribución del calor, es posible
            estabilizar el confort sin realizar obras pesadas.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

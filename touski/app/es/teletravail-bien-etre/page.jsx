import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Teletrabajo y bienestar | TOUSKI",
  description:
    "Descubre cómo el confort térmico y la organización del espacio mejoran el bienestar en teletrabajo.",
  alternates: {
    canonical: "https://touski.online/es/teletravail-bien-etre",
  },
};

export default function RemoteWorkEsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Teletrabajo y bienestar en casa</h1>
          <p>
            Trabajar desde casa requiere un entorno estable: temperatura adecuada,
            menos corrientes de aire y una organización clara del espacio.
          </p>
          <p>
            Con ajustes simples se puede mejorar la concentración y reducir la fatiga
            durante la jornada.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Homeoffice und Wohlbefinden | TOUSKI",
  description:
    "Entdecken Sie, wie Temperatur, Ergonomie und Raumklima das Wohlbefinden im Homeoffice verbessern.",
  alternates: {
    canonical: "https://touski.online/de/teletravail-bien-etre",
  },
};

export default function RemoteWorkDePage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Homeoffice und Wohlbefinden zuhause</h1>
          <p>
            Wer von zuhause arbeitet, braucht ein stabiles und angenehmes Umfeld:
            passende Temperatur, weniger Zugluft und eine klare Raumaufteilung.
          </p>
          <p>
            Mit kleinen Anpassungen lässt sich die Konzentration verbessern und die tägliche
            Belastung durch Kälte oder Unruhe reduzieren.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

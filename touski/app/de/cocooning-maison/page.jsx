import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Cocooning zuhause | TOUSKI",
  description:
    "Schaffen Sie ein warmes, beruhigendes Zuhause mit einem ausgewogenen Ansatz für Komfort und Wohlbefinden.",
  alternates: {
    canonical: "https://touski.online/de/cocooning-maison",
  },
};

export default function CocooningDePage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>Cocooning zuhause: ein ruhiges, warmes Umfeld schaffen</h1>
          <p>
            Cocooning bedeutet, das Zuhause als Rückzugsort zu gestalten:
            angenehme Wärme, ruhige Atmosphäre und klare Ordnung im Alltag.
          </p>
          <p>
            Es verbindet Wärme, Dämmung und Wohlbefinden zu einem stimmigen Ganzen,
            das Erholung und Lebensqualität unterstützt.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

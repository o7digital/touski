import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Anti-courants d'air | Bas de porte, joints et etancheite pour l'hiver au Canada | TOUSKI",
  description:
    "Solutions anti-courants d'air pour portes et fenetres au Canada: bas de porte, joints et bandes d'etancheite pour ameliorer le confort et soutenir les economies d'energie en hiver.",
  alternates: {
    canonical: "https://touski.online/anti-courants-air",
    languages: {
      "fr-CA": "https://touski.online/anti-courants-air",
      "en-CA": "https://touski.online/en/anti-courants-air",
      "de-DE": "https://touski.online/de/anti-courants-air",
      "es-ES": "https://touski.online/es/anti-courants-air",
    },
  },
};

const faqItems = [
  {
    question: "Quels produits anti-courants d'air choisir en premier?",
    answer:
      "Commencez par les bas de porte et les joints d'etancheite autour des ouvertures les plus exposees. Ce sont les interventions les plus rapides pour reduire la sensation de froid.",
  },
  {
    question: "Les bas de porte sont-ils efficaces pendant l'hiver canadien?",
    answer:
      "Oui, surtout lorsqu'ils sont combines a des joints de contour de porte. Ils limitent les infiltrations d'air froid au niveau du sol et ameliorent le confort des pieces de vie.",
  },
  {
    question: "Peut-on installer ces solutions sans travaux lourds?",
    answer:
      "La plupart des produits anti-courants d'air se posent rapidement avec des adhesifs ou des fixations simples. Ils conviennent aux appartements et maisons sans renovation majeure.",
  },
  {
    question: "Ces produits peuvent-ils aider a economiser l'energie?",
    answer:
      "En limitant les fuites d'air, le chauffage est moins sollicite pour maintenir une temperature stable. Cela peut soutenir les efforts d'economie d'energie sur la saison froide.",
  },
  {
    question: "Quelle est la difference entre joints, bandes et seuils?",
    answer:
      "Les joints et bandes traitent surtout les micro-interstices autour des cadres, tandis que les seuils et bas de porte renforcent la barriere au niveau du sol et des passages principaux.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function AntiCourantsAirPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container mw-930 py-5">
          <h1>Anti-courants d'air: confort interieur et hiver canadien</h1>
          <p>
            Les courants d'air reduisent rapidement le confort d'une maison, en
            particulier pendant les periodes froides au Canada. TOUSKI propose une
            selection de solutions pratiques pour traiter les infiltrations au niveau
            des portes, fenetres et seuils: bas de porte, joints, bandes d'etancheite
            et accessoires de finition.
          </p>
          <p>
            L'objectif est d'ameliorer la stabilite thermique sans travaux lourds.
            En limitant les fuites d'air, vous reduisez les zones froides, vous
            augmentez le confort des pieces de vie et vous soutenez vos efforts
            d'economie d'energie pendant l'hiver.
          </p>
          <p>
            Cette approche convient autant aux appartements qu'aux maisons.
            Commencez par les ouvertures les plus exposees, puis completez avec des
            solutions de seuil et des joints adaptes. Une etancheite progressive,
            bien executee, offre des gains visibles sur le confort quotidien.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>FAQ Anti-courants d'air</h2>
          <div className="mt-4">
            {faqItems.map((item, index) => (
              <div key={item.question} className="mb-4">
                <h3 style={{ fontSize: "1.1rem" }}>
                  {index + 1}. {item.question}
                </h3>
                <p className="mb-0">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

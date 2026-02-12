import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Draft proofing | Door sweeps, seals and weather stripping for Canada | TOUSKI",
  description:
    "Draft proofing solutions for doors and windows in Canada: door sweeps, seals and weather stripping to improve comfort and support energy savings in winter.",
  alternates: {
    canonical: "https://touski.online/en/anti-courants-air",
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
    question: "Which draft-proofing products should I start with?",
    answer:
      "Start with door sweeps and perimeter seals on the most exposed openings. These are the fastest upgrades to reduce cold drafts.",
  },
  {
    question: "Are door sweeps effective in Canadian winters?",
    answer:
      "Yes. When combined with perimeter seals, they help limit cold air infiltration at floor level and improve everyday comfort.",
  },
  {
    question: "Can I install these solutions without major renovations?",
    answer:
      "Most draft-proofing products are quick to install with adhesive or simple fasteners and are suitable for condos, apartments and houses.",
  },
  {
    question: "Can draft proofing help reduce energy use?",
    answer:
      "By reducing air leakage, heating systems work less to maintain stable temperatures, which can support winter energy savings.",
  },
  {
    question: "What is the difference between seals, strips and thresholds?",
    answer:
      "Seals and strips target micro-gaps around frames, while thresholds and door sweeps reinforce the barrier at floor level and high-traffic openings.",
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

export default function DraftProofingPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container mw-930 py-5">
          <h1>Draft proofing for better winter comfort in Canada</h1>
          <p>
            Drafts can quickly reduce indoor comfort, especially during long,
            cold Canadian winters. TOUSKI curates practical solutions to address
            leakage points around doors, windows and thresholds: door sweeps,
            seals, weather strips and finishing accessories.
          </p>
          <p>
            The goal is to improve thermal stability without heavy renovation.
            By reducing air leakage, you can cut cold spots, improve room comfort
            and support your winter energy-saving efforts.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Draft proofing FAQ</h2>
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

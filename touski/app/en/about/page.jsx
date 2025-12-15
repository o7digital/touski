import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "About TOUSKI | Home comfort and quality of life",
  description:
    "Discover TOUSKI’s vision: improving home comfort with useful, durable solutions tailored to everyday life.",
  alternates: {
    canonical: "https://touski.online/en/about",
  },
};

export default function AboutPageEn() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>TOUSKI: rethinking home comfort</h1>
          <p>
            TOUSKI exists to make every home a genuinely comfortable and stable space, aligned with daily uses.
            Our aim is not to multiply references, but to help households understand the real levers of indoor
            well-being and set clear priorities without unnecessary clutter.
          </p>
          <p>
            This page summarizes our vision and the way we approach home comfort as a coherent whole. It
            complements our pillar pages to provide a clear framework for the brand.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Our view of home comfort</h2>
          <p>
            TOUSKI was born from a simple observation: the comfort of the home plays a central role in quality
            of life. With more time spent indoors and the rise of remote work, the interior environment has
            become a key factor in everyday well-being.
          </p>
          <p>
            Our vision rests on a holistic approach to home comfort, taking into account indoor warmth,
            insulation, physical well-being and the overall atmosphere of the house.
          </p>
          <p>
            By bringing these dimensions together, we seek a balance you can feel in every room. Home comfort is
            not about piling on accessories, but about harmony between temperature, acoustics, air quality and
            the ergonomics of living spaces.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>A focus on real-world use</h2>
          <p>
            At TOUSKI, every solution is grounded in real-life situations. We study how homes are actually used
            to propose solutions that are useful, easy to integrate and durable over time.
          </p>
          <p>
            This approach avoids superfluous products and prioritizes solutions that match the genuine needs of
            the people living there.
          </p>
          <p>
            Observing routines, understanding climatic constraints and spotting friction points help us set the
            right priorities: limiting drafts, stabilizing warmth, organizing work or rest areas. Each
            recommendation targets a precise use and follows a logic of simplicity.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Comfort as a balance</h2>
          <p>
            Home comfort does not come from a single element. It results from balancing several factors:
            indoor temperature, insulation, layout of spaces and personal well-being.
          </p>
          <p>
            TOUSKI views comfort as a coherent whole where each aspect contributes to creating a pleasant,
            functional interior.
          </p>
          <p>
            This balance means addressing sensitive areas (windows, floors, thresholds), ensuring ergonomic
            work and rest zones, and keeping a warm atmosphere without gimmicks. The goal is a reassuring,
            legible home for everyone living in it.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>A durable, responsible approach</h2>
          <p>
            Improving home comfort is a long-term effort. TOUSKI favors reliable solutions designed to last and
            to meet real needs.
          </p>
          <p>
            This approach aims to build trust with users by offering useful solutions rather than chasing short
            trends.
          </p>
          <p>
            Durability comes from solid materials, easy maintenance and solutions that stay effective through
            warm and cold cycles. We focus on measured interventions that improve indoor comfort without
            complicating daily life.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>TOUSKI, a project oriented toward quality of life</h2>
          <p>
            TOUSKI speaks to anyone who wants to enhance their living environment and create a comfortable
            interior adapted to everyday demands.
          </p>
          <p>
            Our approach is detailed on the page
            <a href="/en/nos-services"> Our services</a>, and extends across our pillar content on
            <a href="/en/chaleur-confort"> warmth and indoor comfort</a>,
            <a href="/en/isolation-protection"> home insulation</a>,
            <a href="/en/teletravail-bien-etre"> well-being in remote work</a>, and
            <a href="/en/cocooning-maison"> cocooning at home</a>.
          </p>
          <p>
            By connecting these pillars, we affirm a clear identity: guiding households in mastering home
            comfort with durable, coherent solutions designed for everyday use. This vision informs all our
            choices and prepares future offerings focused on quality of life.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

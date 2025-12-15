import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Our services - Home comfort solutions | TOUSKI",
  description:
    "Discover TOUSKI services: practical, durable home comfort solutions designed for everyday well-being.",
  alternates: {
    canonical: "https://touski.online/en/nos-services",
  },
};

export default function NosServicesEnPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section id="nos-services" className="container mw-930 pb-5">
          <h2>Our services</h2>
          <p>
            At <strong>TOUSKI</strong>, we develop solutions to improve home comfort and quality of life every
            day. Our approach relies on selecting useful, functional products that fit real-world use,
            especially where indoor comfort truly matters.
          </p>

          <h3>Comfort solutions for the home</h3>
          <p>
            TOUSKI offers solutions that make living spaces more pleasant, comfortable and better suited to
            daily needs. Our services apply to apartments and houses alike, covering rooms such as the living
            room, bedroom and home office.
          </p>

          <h3>Improving indoor comfort</h3>
          <p>
            We select products that enhance the feeling of comfort indoors by managing warmth, creating a more
            pleasant atmosphere and fostering a setting suited to well-being. Each solution aims to reduce
            discomfort from indoor cold or insufficient insulation.
          </p>

          <h3>Designed for everyday use</h3>
          <p>
            Unlike generalist shops, TOUSKI avoids gimmicky or seasonal products. Our services are built on a
            rigorous selection of durable solutions for daily use in the home, with constant attention to
            quality, reliability and ease of use.
          </p>

          <h3>Guidance and responsible selection</h3>
          <p>
            TOUSKI supports customers with a coherent selection of products that address concrete needs. We
            favor solutions with high practical value and a low return rate to ensure a dependable, satisfying
            experience.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Why home comfort has become essential</h2>
          <p>
            Comfort at home is no longer a luxury but a necessity. With remote work, more time indoors and
            climatic constraints, the domestic environment directly influences well-being, focus and quality of
            life.
          </p>
          <p>
            A comfortable home helps manage temperature changes, reduces discomfort and creates a space suited to
            both rest and daily activities.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>A focus on real-world use</h2>
          <p>
            TOUSKI designs services and solutions from real-life situations. We analyze genuine needs related to
            housing, remote work and indoor comfort to propose solutions that are truly useful.
          </p>
          <p>
            This approach avoids superfluous products and prioritizes simple, effective and durable solutions for
            the home.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Solutions tailored to different living spaces</h2>
          <p>
            Comfort needs vary by room. Living rooms, bedrooms, home offices or multipurpose spaces all require
            solutions adapted to their use.
          </p>
          <p>
            TOUSKI considers these differences to offer services and solutions aligned with the realities of
            each area in the home.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>A durable vision of home comfort</h2>
          <p>
            Improving home comfort fits a long-term mindset. We favor reliable solutions built to last and to
            deliver tangible benefits over time.
          </p>
          <p>
            This vision helps build trust with users and guarantees a consistent experience, far from short-lived
            trends.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Our domains of focus</h2>
          <p>
            TOUSKI services revolve around complementary pillars that improve overall home comfort. Each one
            addresses a specific everyday need.
          </p>
          <ul>
            <li>
              <a href="/en/chaleur-confort">Warmth and indoor comfort</a>
            </li>
            <li>
              <a href="/en/isolation-protection">Home insulation and protection</a>
            </li>
            <li>
              <a href="/en/teletravail-bien-etre">Remote work and well-being at home</a>
            </li>
            <li>
              <a href="/en/cocooning-maison">Cocooning and quality of life at home</a>
            </li>
          </ul>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

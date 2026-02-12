import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Sobre TOUSKI | Confort del hogar y calidad de vida",
  description:
    "Descubre la visión de TOUSKI: mejorar el confort del hogar con soluciones útiles y duraderas para el día a día.",
  alternates: {
    canonical: "https://touski.online/es/about",
    languages: {
      "fr-CA": "https://touski.online/about",
      "en-CA": "https://touski.online/en/about",
      "de-DE": "https://touski.online/de/about",
      "es-ES": "https://touski.online/es/about",
    },
  },
};

export default function AboutPageEs() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>TOUSKI: repensar el confort en casa</h1>
          <p>
            En TOUSKI buscamos que cada hogar sea más cómodo y funcional en la vida real.
            Nos enfocamos en soluciones prácticas para corrientes de aire, cocina y baño,
            pensadas para mejorar el bienestar diario.
          </p>
          <p>
            No seguimos modas pasajeras: priorizamos productos útiles, eficaces y fáciles
            de integrar en rutinas cotidianas.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Nuestra visión del confort doméstico</h2>
          <p>
            El confort del hogar depende del equilibrio entre temperatura, aislamiento,
            organización de espacios y hábitos diarios. Cuando ese equilibrio existe,
            la calidad de vida mejora de forma tangible.
          </p>
          <p>
            Por eso seleccionamos soluciones concretas adaptadas al contexto canadiense:
            fiables, duraderas y orientadas al uso real.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Un enfoque centrado en el uso real</h2>
          <p>
            Partimos de problemas cotidianos: corrientes frías en puertas, grasa difícil
            en cocina o humedad en baño. A partir de ahí proponemos soluciones simples y
            coherentes, sin complicar el día a día.
          </p>
          <p>
            Más información en
            <a href="/es/nos-services"> Nuestros servicios</a> y en nuestras páginas sobre
            <a href="/es/chaleur-confort"> calor y confort interior</a>,
            <a href="/es/isolation-protection"> aislamiento y protección</a>,
            <a href="/es/teletravail-bien-etre"> teletrabajo y bienestar</a> y
            <a href="/es/cocooning-maison"> cocooning en casa</a>.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

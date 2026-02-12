import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Nuestros servicios para el hogar en Canadá | TOUSKI",
  description:
    "Descubre los servicios de TOUSKI en Canadá: anti corrientes, cocina, baño y soluciones útiles para mejorar el confort del hogar.",
  keywords: [
    "servicios TOUSKI",
    "confort del hogar Canadá",
    "anti corrientes cocina baño",
    "soluciones prácticas hogar",
    "bienestar en casa Canadá",
  ],
  alternates: {
    canonical: "https://touski.online/es/nos-services",
    languages: {
      "fr-CA": "https://touski.online/nos-services",
      "en-CA": "https://touski.online/en/nos-services",
      "de-DE": "https://touski.online/de/nos-services",
      "es-ES": "https://touski.online/es/nos-services",
    },
  },
  openGraph: {
    title: "Nuestros servicios para el hogar en Canadá | TOUSKI",
    description:
      "Descubre los servicios de TOUSKI en Canadá: anti corrientes, cocina, baño y soluciones útiles para mejorar el confort del hogar.",
    url: "https://touski.online/es/nos-services",
    siteName: "TOUSKI",
    locale: "es_ES",
    type: "article",
  },
};

export default function ServicesPageEs() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section id="nos-services" className="container mw-930 pb-5">
          <h2>Nuestros servicios</h2>
          <p>
            En <strong>TOUSKI</strong> desarrollamos soluciones para mejorar el confort
            del hogar y la calidad de vida diaria. Nuestro enfoque se basa en una selección
            cuidadosa de productos útiles, funcionales y adaptados al uso real.
          </p>

          <h3>Soluciones de confort para el hogar</h3>
          <p>
            TOUSKI propone soluciones para hacer los espacios más agradables,
            más cómodos y mejor adaptados a las necesidades cotidianas. Trabajamos
            tanto para apartamentos como para casas.
          </p>

          <h3>Mejora del confort interior</h3>
          <p>
            Seleccionamos productos que mejoran la sensación de bienestar en interiores:
            mejor control del calor, ambiente más agradable y espacios más funcionales
            en el día a día.
          </p>

          <h3>Productos pensados para el uso diario</h3>
          <p>
            A diferencia de tiendas generalistas, TOUSKI evita productos superfluos.
            Priorizamos soluciones duraderas, fiables y fáciles de usar,
            con valor práctico real para la vida en casa.
          </p>

          <h3>Acompañamiento y selección responsable</h3>
          <p>
            TOUSKI acompaña a sus clientes con una selección coherente orientada
            a necesidades concretas. Favorecemos soluciones de alto valor de uso
            para una experiencia estable y satisfactoria.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Por qué el confort del hogar es esencial hoy</h2>
          <p>
            El confort en casa ya no es un lujo, sino una necesidad. El teletrabajo,
            el tiempo en interiores y las exigencias climáticas afectan directamente
            el bienestar, la concentración y la calidad de vida.
          </p>
          <p>
            Un hogar confortable permite gestionar mejor la temperatura,
            reducir molestias y crear un espacio adecuado para descansar y trabajar.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Un enfoque centrado en el uso real</h2>
          <p>
            Nuestras soluciones parten de situaciones concretas de la vida diaria.
            Analizamos necesidades reales del hogar para proponer opciones simples,
            útiles y realmente eficaces.
          </p>
          <p>
            Este enfoque evita lo superfluo y prioriza medidas duraderas
            con impacto práctico en el día a día.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Soluciones adaptadas a cada espacio</h2>
          <p>
            Las necesidades de confort cambian según la zona de la vivienda:
            sala, dormitorio, oficina en casa o espacios polivalentes.
          </p>
          <p>
            TOUSKI tiene en cuenta estas diferencias para ofrecer soluciones coherentes
            con la realidad de cada ambiente.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Una visión duradera del confort doméstico</h2>
          <p>
            Mejorar el confort del hogar es una estrategia a largo plazo.
            TOUSKI prioriza soluciones fiables y sostenibles que aporten beneficios
            reales con el tiempo.
          </p>
          <p>
            Esta visión fortalece la confianza y garantiza una experiencia coherente,
            lejos de tendencias pasajeras.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Nuestras áreas de enfoque</h2>
          <p>
            Los servicios de TOUSKI se estructuran en pilares complementarios
            para mejorar el confort global del hogar.
          </p>
          <ul>
            <li>
              <a href="/es/chaleur-confort">Calor y confort interior</a>
            </li>
            <li>
              <a href="/es/isolation-protection">Aislamiento y protección del hogar</a>
            </li>
            <li>
              <a href="/es/teletravail-bien-etre">Teletrabajo y bienestar en casa</a>
            </li>
            <li>
              <a href="/es/cocooning-maison">Cocooning y calidad de vida en casa</a>
            </li>
          </ul>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

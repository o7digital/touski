import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Sobre TOUSKI | Confort del hogar y soluciones para Canadá",
  description:
    "Conoce la visión de TOUSKI: soluciones prácticas para mejorar el confort del hogar y la vida diaria en Canadá.",
  keywords: [
    "sobre TOUSKI",
    "confort del hogar Canadá",
    "soluciones hogar Canadá",
    "anti corrientes cocina baño",
    "misión TOUSKI",
  ],
  alternates: {
    canonical: "https://touski.online/es/about",
    languages: {
      "fr-CA": "https://touski.online/about",
      "en-CA": "https://touski.online/en/about",
      "de-DE": "https://touski.online/de/about",
      "es-ES": "https://touski.online/es/about",
    },
  },
  openGraph: {
    title: "Sobre TOUSKI | Confort del hogar y soluciones para Canadá",
    description:
      "Conoce la visión de TOUSKI: soluciones prácticas para mejorar el confort del hogar y la vida diaria en Canadá.",
    url: "https://touski.online/es/about",
    siteName: "TOUSKI",
    locale: "es_ES",
    type: "article",
  },
};

export default function AboutPageEs() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="container mw-930 pb-5">
          <h1>TOUSKI: repensar el confort del hogar</h1>
          <p>
            TOUSKI nace con una idea clara: hacer que los hogares sean más cómodos,
            estables y funcionales para la vida real. No buscamos acumular productos,
            sino ayudar a las familias a actuar sobre los factores que realmente
            mejoran el bienestar en casa.
          </p>
          <p>
            Esta página resume nuestra visión y cómo abordamos el confort del hogar
            como un sistema coherente, no como elementos aislados.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Nuestra visión del confort doméstico</h2>
          <p>
            TOUSKI parte de una observación simple: el confort en casa influye
            directamente en la calidad de vida. Con más tiempo en el hogar,
            teletrabajo y exigencias climáticas, el entorno interior se vuelve clave.
          </p>
          <p>
            Nuestra visión integra varias dimensiones: temperatura interior,
            aislamiento, organización de espacios y bienestar cotidiano.
          </p>
          <p>
            Para nosotros, el confort no es acumular accesorios, sino lograr un
            equilibrio entre calor, uso práctico y ambiente interior agradable.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Un enfoque centrado en el uso real</h2>
          <p>
            En TOUSKI partimos de situaciones concretas: corrientes frías en puertas,
            pérdidas de calor, grasa difícil en cocina o humedad en baño.
          </p>
          <p>
            A partir de esos casos seleccionamos soluciones fáciles de aplicar,
            realmente útiles y sostenibles en el tiempo.
          </p>
          <p>
            Este enfoque evita productos superfluos y prioriza medidas simples,
            eficaces y alineadas con necesidades reales del día a día.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>El confort como equilibrio</h2>
          <p>
            El confort del hogar no depende de un solo factor. Es el resultado de la
            combinación entre temperatura, aislamiento, distribución y ergonomía
            de los espacios.
          </p>
          <p>
            Por eso tratamos la vivienda como un conjunto coherente donde cada mejora
            debe aportar un beneficio claro para la vida diaria.
          </p>
          <p>
            El objetivo es un hogar más claro, tranquilo y funcional, que sostenga
            mejor el descanso, el trabajo y la rutina familiar.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Un enfoque duradero y responsable</h2>
          <p>
            Mejorar el confort del hogar es una estrategia de largo plazo. TOUSKI
            prioriza soluciones fiables, útiles y duraderas frente a tendencias pasajeras.
          </p>
          <p>
            Favorecemos productos prácticos, de mantenimiento sencillo y rendimiento
            estable durante diferentes estaciones.
          </p>
          <p>
            Así construimos confianza: decisiones claras, coherentes y orientadas al
            uso real de cada hogar.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>TOUSKI: un proyecto orientado a la calidad de vida</h2>
          <p>
            TOUSKI acompaña a quienes quieren un hogar más cómodo, eficiente y adaptado
            a las exigencias cotidianas.
          </p>
          <p>
            Nuestra metodología se detalla en
            <a href="/es/nos-services"> Nuestros servicios</a> y se completa con
            nuestros pilares:
            <a href="/es/chaleur-confort"> calor y confort interior</a>,
            <a href="/es/isolation-protection"> aislamiento y protección</a>,
            <a href="/es/teletravail-bien-etre"> teletrabajo y bienestar</a> y
            <a href="/es/cocooning-maison"> cocooning en casa</a>.
          </p>
          <p>
            Con esta estructura, TOUSKI afirma una identidad clara: ayudar a los
            hogares a mejorar su confort con soluciones coherentes, útiles y sostenibles.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}

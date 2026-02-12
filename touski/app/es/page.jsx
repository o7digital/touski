import HomePage9 from "../(homes)/home-9/page";

export const metadata = {
  title: "Touski — esenciales del hogar difíciles de encontrar en Canadá",
  description:
    "Anti corrientes de aire, cocina y baño: productos útiles, eficaces y cuidadosamente seleccionados para Canadá.",
  keywords: [
    "esenciales del hogar Canadá",
    "anti corrientes de aire",
    "limpieza cocina Canadá",
    "soluciones baño antical",
    "TOUSKI",
  ],
  alternates: {
    canonical: "https://touski.online/es",
    languages: {
      "fr-CA": "https://touski.online",
      "en-CA": "https://touski.online/en",
      "de-DE": "https://touski.online/de",
      "es-ES": "https://touski.online/es",
    },
  },
  openGraph: {
    title: "Touski — esenciales del hogar difíciles de encontrar en Canadá",
    description:
      "Anti corrientes de aire, cocina y baño: productos útiles, eficaces y cuidadosamente seleccionados para Canadá.",
    locale: "es_ES",
    type: "website",
  },
};

export default function HomeEs() {
  return <HomePage9 />;
}

import HomePage9 from "../(homes)/home-9/page";

export const metadata = {
  title: "Home comfort solutions for cold climates | TOUSKI",
  description:
    "TOUSKI offers solutions to improve indoor warmth, insulation and everyday well-being at home. Practical ideas for comfort in cold climates.",
  alternates: {
    canonical: "https://touski.online/en",
    languages: {
      'fr-CA': 'https://touski.online',
      'en-CA': 'https://touski.online/en',
    },
  },
  openGraph: {
    title: "Home comfort solutions for cold climates | TOUSKI",
    description:
      "TOUSKI curates practical solutions to improve indoor warmth, insulation and everyday well-being at home.",
    locale: "en_CA",
    type: "website",
  },
};

export default function HomeEn() {
  return <HomePage9 />;
}

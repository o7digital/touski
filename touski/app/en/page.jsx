import HomePage9 from "../(homes)/home-9/page";

export const metadata = {
  title: "Touski — hard-to-find home essentials in Canada",
  description:
    "Draft proofing, kitchen and bathroom essentials that are useful, effective and carefully selected for Canada.",
  alternates: {
    canonical: "https://touski.online/en",
    languages: {
      'fr-CA': 'https://touski.online',
      'en-CA': 'https://touski.online/en',
    },
  },
  openGraph: {
    title: "Touski — hard-to-find home essentials in Canada",
    description:
      "Draft proofing, kitchen and bathroom essentials that are useful, effective and carefully selected for Canada.",
    locale: "en_CA",
    type: "website",
  },
};

export default function HomeEn() {
  return <HomePage9 />;
}

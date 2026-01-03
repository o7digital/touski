import HomePage9 from "./(homes)/home-9/page";

export const metadata = {
  title: "Tout ce qui est nécessaire pour son chez soi. Produits pour la maison",
  description: "Tout ce qui est nécessaire pour son chez soi. Produits pour la maison",
  openGraph: {
    title: "Tout ce qui est nécessaire pour son chez soi. Produits pour la maison",
    description: "Tout ce qui est nécessaire pour son chez soi. Produits pour la maison",
    locale: "fr_CA",
    type: "website",
  },
  alternates: {
    canonical: "https://touski.online",
    languages: {
      'fr-CA': 'https://touski.online',
      'en-CA': 'https://touski.online/en',
    },
  },
};
export default function Home() {
  return (
    <>
      <HomePage9 />
    </>
  );
}

import Header1 from "@/components/headers/Header1";
import Footer8 from "@/components/footers/Footer8";
import SingleProduct12 from "@/components/singleProduct/SingleProduct12";
import ProductStructuredData from "@/components/common/ProductStructuredData";
import { getProductBySlug } from "@/lib/woocommerce";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Générer les métadonnées dynamiquement pour le SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produit non trouvé | Touski',
      description: 'Ce produit n\'est plus disponible.',
    };
  }

  const title = `${product.title} | Touski Québec`;
  const description = product.short_description 
    ? product.short_description.replace(/<[^>]*>/g, '').substring(0, 155) 
    : `Achetez ${product.title} chez Touski. Livraison au Québec et Canada.`;
  
  const imageUrl = product.images?.[0]?.src || '/assets/images/touski-logo.jpeg';
  const price = product.sale_price || product.price;

  return {
    title,
    description,
    keywords: `${product.title}, achat en ligne québec, produits maison, ${product.categories?.map(c => c.name).join(', ')}`,
    openGraph: {
      title,
      description,
      type: 'product',
      url: `https://touski.online/produit/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      siteName: 'Touski',
      locale: 'fr_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://touski.online/produit/${slug}`,
    },
    other: {
      'product:price:amount': price,
      'product:price:currency': 'CAD',
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductStructuredData product={product} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct12 product={product} />
      </main>
      <Footer8 />
    </>
  );
}

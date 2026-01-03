"use client";

export default function ProductStructuredData({ product }) {
  if (!product) return null;

  const baseUrl = "https://touski.online";
  const imageUrl = product.images?.[0]?.src || `${baseUrl}/assets/images/touski-logo.jpeg`;
  const price = product.sale_price || product.price || 0;
  const currency = "CAD";

  // Schema Product pour SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.name,
    image: product.images?.map(img => img.src) || [imageUrl],
    description: product.short_description?.replace(/<[^>]*>/g, '') || product.description?.replace(/<[^>]*>/g, '').substring(0, 200),
    sku: product.sku || `TOUSKI-${product.id}`,
    mpn: product.id?.toString(),
    brand: {
      "@type": "Brand",
      name: "Touski"
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/produit/${product.slug}`,
      priceCurrency: currency,
      price: price.toFixed(2),
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      itemCondition: "https://schema.org/NewCondition",
      availability: product.stock_status === 'instock' 
        ? "https://schema.org/InStock" 
        : product.stock_status === 'outofstock'
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "Touski"
      }
    },
    aggregateRating: product.rating_count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.average_rating || "4.5",
      reviewCount: product.rating_count || "1"
    } : undefined,
    category: product.categories?.[0]?.name || "Produits maison",
  };

  // Breadcrumb pour navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: baseUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Boutique",
        item: `${baseUrl}/shop-1`
      },
      ...(product.categories?.[0] ? [{
        "@type": "ListItem",
        position: 3,
        name: product.categories[0].name,
        item: `${baseUrl}/shop-1?category=${product.categories[0].slug}`
      }] : []),
      {
        "@type": "ListItem",
        position: product.categories?.[0] ? 4 : 3,
        name: product.title || product.name,
        item: `${baseUrl}/produit/${product.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

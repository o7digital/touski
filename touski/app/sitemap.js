import { getProducts, getCategories } from '@/lib/woocommerce';

export default async function sitemap() {
  const baseUrl = 'https://touski.online';
  
  // Pages statiques françaises
  const staticRoutesFr = [
    { url: '', priority: 1, changeFrequency: 'daily' },
    { url: '/products', priority: 0.9, changeFrequency: 'daily' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/anti-courants-air', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/chaleur-confort', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/cocooning-maison', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/teletravail-bien-etre', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/isolation-protection', priority: 0.7, changeFrequency: 'weekly' },
  ];

  // Pages statiques anglaises
  const staticRoutesEn = [
    { url: '/en', priority: 1, changeFrequency: 'daily' },
    { url: '/en/anti-courants-air', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/en/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/en/contact', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/en/chaleur-confort', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/en/cocooning-maison', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/en/teletravail-bien-etre', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/en/isolation-protection', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/en/nos-services', priority: 0.7, changeFrequency: 'monthly' },
  ];

  // Récupérer les produits WooCommerce
  let productUrls = [];
  try {
    const products = await getProducts({ per_page: 100, status: 'publish' });
    productUrls = products.map((product) => ({
      url: `${baseUrl}/produit/${product.slug}`,
      lastModified: new Date(product.date_modified || product.date_created),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // Récupérer les catégories
  let categoryUrls = [];
  try {
    const categories = await getCategories({ per_page: 100 });
    categoryUrls = categories
      .filter(cat => cat.count > 0) // Seulement les catégories avec produits
      .map((category) => ({
        url: `${baseUrl}/products?category_slug=${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  // Combiner toutes les URLs
  const staticUrls = [...staticRoutesFr, ...staticRoutesEn].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticUrls, ...productUrls, ...categoryUrls];
}

/**
 * WooCommerce API Integration
 * Connexion et helpers pour consommer l'API REST WooCommerce
 */

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize WooCommerce API client
const api = new WooCommerceRestApi.default({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true, // Force Basic Auth as query string
});

/**
 * Récupérer tous les produits
 * @param {Object} params - Paramètres de filtrage/pagination
 * @returns {Array} Liste des produits
 */
export async function getProducts(params = {}) {
  try {
    const response = await api.get("products", {
      per_page: 20,
      status: 'publish',
      ...params,
    });
    
    return response.data.map(mapWooProductToLocal);
  } catch (error) {
    console.error("Error fetching products from WooCommerce:", error.response?.data || error.message);
    return [];
  }
}

/**
 * Récupérer un produit par ID
 * @param {number|string} id - ID du produit WooCommerce
 * @returns {Object|null} Produit ou null si erreur
 */
export async function getProduct(id) {
  try {
    const response = await api.get(`products/${id}`);
    return mapWooProductToLocal(response.data);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Récupérer un produit par slug
 * @param {string} slug - Slug du produit
 * @returns {Object|null} Produit ou null
 */
export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", {
      slug: slug,
      per_page: 1,
    });
    
    if (response.data.length > 0) {
      return mapWooProductToLocal(response.data[0]);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Récupérer les catégories de produits
 * @param {Object} params - Paramètres
 * @returns {Array} Liste des catégories
 */
export async function getCategories(params = {}) {
  try {
    const response = await api.get("products/categories", {
      per_page: 100,
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    return [];
  }
}

/**
 * Rechercher des produits
 * @param {string} query - Terme de recherche
 * @param {Object} params - Paramètres additionnels
 * @returns {Array} Résultats de recherche
 */
export async function searchProducts(query, params = {}) {
  try {
    const response = await api.get("products", {
      search: query,
      per_page: 20,
      status: 'publish',
      ...params,
    });
    return response.data.map(mapWooProductToLocal);
  } catch (error) {
    console.error("Error searching products:", error.response?.data || error.message);
    return [];
  }
}

/**
 * Mapper format WooCommerce → format utilisé dans le site
 * Transforme la structure WooCommerce en structure compatible avec les composants existants
 * @param {Object} wooProduct - Produit au format WooCommerce
 * @returns {Object} Produit au format local
 */
function mapWooProductToLocal(wooProduct) {
  // Calculer le prix affiché (sale_price si existe, sinon regular_price)
  const displayPrice = wooProduct.sale_price 
    ? parseFloat(wooProduct.sale_price) 
    : parseFloat(wooProduct.regular_price);

  return {
    // IDs et références
    id: wooProduct.id,
    slug: wooProduct.slug,
    sku: wooProduct.sku,
    
    // Informations basiques
    title: wooProduct.name,
    name: wooProduct.name, // alias
    description: wooProduct.description,
    short_description: wooProduct.short_description,
    
    // Prix
    price: displayPrice,
    regular_price: parseFloat(wooProduct.regular_price) || 0,
    sale_price: wooProduct.sale_price ? parseFloat(wooProduct.sale_price) : null,
    on_sale: wooProduct.on_sale,
    
    // Images
    image: wooProduct.images.length > 0 ? wooProduct.images[0].src : null,
    images: wooProduct.images.map(img => ({
      id: img.id,
      src: img.src,
      thumbnail: img.src, // WooCommerce génère automatiquement les thumbnails
      alt: img.alt || wooProduct.name,
    })),
    
    // Catégories et tags
    categories: wooProduct.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
    category: wooProduct.categories.length > 0 ? wooProduct.categories[0].name : '',
    tags: wooProduct.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    
    // Stock
    stock_status: wooProduct.stock_status,
    in_stock: wooProduct.stock_status === 'instock',
    stock_quantity: wooProduct.stock_quantity,
    manage_stock: wooProduct.manage_stock,
    
    // Variations (si produit variable)
    type: wooProduct.type,
    variations: wooProduct.variations || [],
    
    // Attributs
    attributes: wooProduct.attributes.map(attr => ({
      id: attr.id,
      name: attr.name,
      options: attr.options,
    })),
    
    // Dimensions et poids
    weight: wooProduct.weight,
    dimensions: wooProduct.dimensions,
    
    // Métadonnées (pour dropshipping, marges, etc.)
    meta_data: wooProduct.meta_data,
    
    // Infos supplémentaires
    permalink: wooProduct.permalink,
    rating_count: wooProduct.rating_count,
    average_rating: wooProduct.average_rating,
    reviews_allowed: wooProduct.reviews_allowed,
    
    // Date
    date_created: wooProduct.date_created,
    date_modified: wooProduct.date_modified,
    
    // Données brutes (au cas où)
    _raw: wooProduct,
  };
}

/**
 * Helper pour extraire une meta_data spécifique
 * @param {Object} product - Produit mappé
 * @param {string} key - Clé de la meta
 * @returns {*} Valeur de la meta ou null
 */
export function getProductMeta(product, key) {
  if (!product.meta_data) return null;
  const meta = product.meta_data.find(m => m.key === key);
  return meta ? meta.value : null;
}

/**
 * Créer une commande
 * @param {Object} orderData - Données de la commande
 * @returns {Object|null} Commande créée ou null
 */
export async function createOrder(orderData) {
  try {
    const response = await api.post("orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    return null;
  }
}

/**
 * Récupérer une commande par ID
 * @param {number} orderId - ID de la commande
 * @returns {Object|null} Commande ou null
 */
export async function getOrder(orderId) {
  try {
    const response = await api.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error.response?.data || error.message);
    return null;
  }
}

// Export l'instance API pour usage custom si nécessaire
export { api };

export default {
  getProducts,
  getProduct,
  getProductBySlug,
  getCategories,
  searchProducts,
  getProductMeta,
  createOrder,
  getOrder,
  api,
};

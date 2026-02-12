/**
 * WooCommerce API Integration
 * Connexion et helpers pour consommer l'API REST WooCommerce
 */

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const defaultWooUrl = "https://oliviers42.sg-host.com";
const wooUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || defaultWooUrl;
const wooConsumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const wooConsumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const isWooConfigured = Boolean(wooUrl && wooConsumerKey && wooConsumerSecret);
const storeApiBaseUrl = `${wooUrl.replace(/\/$/, "")}/wp-json/wc/store/v1`;

// Initialize WooCommerce API client only when credentials are present.
const api = isWooConfigured
  ? new WooCommerceRestApi({
      url: wooUrl,
      consumerKey: wooConsumerKey,
      consumerSecret: wooConsumerSecret,
      version: "wc/v3",
      queryStringAuth: true, // Force Basic Auth as query string
    })
  : null;

let hasLoggedWooWarning = false;
function ensureWooConfigured() {
  if (api) return true;

  if (!hasLoggedWooWarning) {
    console.warn(
      "WooCommerce REST credentials are not configured. Falling back to public Woo Store API for read operations."
    );
    hasLoggedWooWarning = true;
  }

  return false;
}

function minorToDecimal(value, minorUnit = 2) {
  if (value === undefined || value === null || value === "") return "";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return String(value);
  return (numericValue / 10 ** minorUnit).toFixed(minorUnit);
}

function mapStoreProductToWooLike(storeProduct) {
  const minorUnit = Number(storeProduct?.prices?.currency_minor_unit ?? 2);

  return {
    id: storeProduct.id,
    name: storeProduct.name,
    slug: storeProduct.slug,
    sku: storeProduct.sku || "",
    description: storeProduct.description || "",
    short_description: storeProduct.short_description || "",
    price: minorToDecimal(storeProduct?.prices?.price, minorUnit),
    regular_price: minorToDecimal(storeProduct?.prices?.regular_price, minorUnit),
    sale_price: minorToDecimal(storeProduct?.prices?.sale_price, minorUnit),
    on_sale: Boolean(storeProduct.on_sale),
    images: Array.isArray(storeProduct.images)
      ? storeProduct.images.map((img) => ({
          id: img.id,
          src: img.src,
          alt: img.alt || img.name || storeProduct.name,
        }))
      : [],
    categories: Array.isArray(storeProduct.categories)
      ? storeProduct.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        }))
      : [],
    tags: Array.isArray(storeProduct.tags)
      ? storeProduct.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        }))
      : [],
    stock_status: storeProduct.is_in_stock ? "instock" : "outofstock",
    stock_quantity: null,
    manage_stock: false,
    type: storeProduct.type || "simple",
    variations: [],
    attributes: Array.isArray(storeProduct.attributes)
      ? storeProduct.attributes.map((attribute) => ({
          id: attribute.id || 0,
          name: attribute.name,
          options: Array.isArray(attribute.terms)
            ? attribute.terms.map((term) => term.name)
            : [],
        }))
      : [],
    weight: "",
    dimensions: {},
    meta_data: [],
    permalink: storeProduct.permalink || "",
    rating_count: Number(storeProduct.review_count || 0),
    average_rating: storeProduct.average_rating || "0",
    reviews_allowed: true,
    date_created: null,
    date_modified: null,
  };
}

async function fetchStoreApi(path, params = {}) {
  const search = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });

  const url = `${storeApiBaseUrl}${path}${search.toString() ? `?${search}` : ""}`;
  const response = await fetch(url, { next: { revalidate: 300 } });

  if (!response.ok) {
    throw new Error(`Store API request failed (${response.status})`);
  }

  return response.json();
}

/**
 * Récupérer tous les produits
 * @param {Object} params - Paramètres de filtrage/pagination
 * @returns {Array} Liste des produits
 */
export async function getProducts(params = {}) {
  if (!ensureWooConfigured()) {
    try {
      const storeProducts = await fetchStoreApi("/products", {
        per_page: params.per_page || 20,
        page: params.page || 1,
        search: params.search,
      });

      if (!Array.isArray(storeProducts)) return [];
      return storeProducts.map((product) =>
        mapWooProductToLocal(mapStoreProductToWooLike(product))
      );
    } catch (error) {
      console.error("Error fetching products from Woo Store API:", error.message);
      return [];
    }
  }

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
  if (!ensureWooConfigured()) {
    try {
      const storeProduct = await fetchStoreApi(`/products/${id}`);
      return mapWooProductToLocal(mapStoreProductToWooLike(storeProduct));
    } catch (error) {
      console.error(`Error fetching product ${id} from Store API:`, error.message);
      return null;
    }
  }

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
  if (!ensureWooConfigured()) {
    try {
      const storeProducts = await fetchStoreApi("/products", {
        slug,
        per_page: 1,
      });

      if (Array.isArray(storeProducts) && storeProducts.length > 0) {
        return mapWooProductToLocal(mapStoreProductToWooLike(storeProducts[0]));
      }
      return null;
    } catch (error) {
      console.error(`Error fetching product by slug ${slug} from Store API:`, error.message);
      return null;
    }
  }

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
  if (!ensureWooConfigured()) {
    try {
      const categories = await fetchStoreApi("/products/categories", {
        per_page: params.per_page || 100,
      });
      return Array.isArray(categories) ? categories : [];
    } catch (error) {
      console.error("Error fetching categories from Store API:", error.message);
      return [];
    }
  }

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
  if (!ensureWooConfigured()) {
    try {
      const storeProducts = await fetchStoreApi("/products", {
        search: query,
        per_page: params.per_page || 20,
        page: params.page || 1,
      });

      if (!Array.isArray(storeProducts)) return [];
      return storeProducts.map((product) =>
        mapWooProductToLocal(mapStoreProductToWooLike(product))
      );
    } catch (error) {
      console.error("Error searching products from Store API:", error.message);
      return [];
    }
  }

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
  // Calculer le prix affiché
  // - si promo: sale_price
  // - sinon: regular_price
  // - sinon (ex: produit variable): price (prix min WooCommerce)
  const basePrice =
    (wooProduct.sale_price && String(wooProduct.sale_price).trim()) ||
    (wooProduct.regular_price && String(wooProduct.regular_price).trim()) ||
    (wooProduct.price && String(wooProduct.price).trim());

  const displayPrice = basePrice ? Number(basePrice) : 0;

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
    regular_price: Number(
      (wooProduct.regular_price && String(wooProduct.regular_price).trim()) ||
        (wooProduct.price && String(wooProduct.price).trim()) ||
        0
    ),
    sale_price: wooProduct.sale_price
      ? Number(String(wooProduct.sale_price).trim())
      : null,
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
  if (!ensureWooConfigured()) return null;

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
  if (!ensureWooConfigured()) return null;

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

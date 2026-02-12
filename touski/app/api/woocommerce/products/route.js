import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const defaultWooUrl = "https://oliviers42.sg-host.com";
const wooUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || defaultWooUrl;
const wooConsumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const wooConsumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const isWooConfigured = Boolean(wooUrl && wooConsumerKey && wooConsumerSecret);
const storeApiBaseUrl = `${wooUrl.replace(/\/$/, "")}/wp-json/wc/store/v1`;

const api = isWooConfigured
  ? new WooCommerceRestApi({
      url: wooUrl,
      consumerKey: wooConsumerKey,
      consumerSecret: wooConsumerSecret,
      version: "wc/v3",
    })
  : null;

function minorToDecimal(value, minorUnit = 2) {
  if (value === undefined || value === null || value === "") return "";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return String(value);
  return (numericValue / 10 ** minorUnit).toFixed(minorUnit);
}

function mapStoreProductToWooProduct(storeProduct) {
  const minorUnit = Number(storeProduct?.prices?.currency_minor_unit ?? 2);

  return {
    id: storeProduct.id,
    name: storeProduct.name,
    slug: storeProduct.slug,
    type: storeProduct.type || "simple",
    status: "publish",
    featured: Boolean(storeProduct.featured),
    description: storeProduct.description || "",
    short_description: storeProduct.short_description || "",
    sku: storeProduct.sku || "",
    price: minorToDecimal(storeProduct?.prices?.price, minorUnit),
    regular_price: minorToDecimal(storeProduct?.prices?.regular_price, minorUnit),
    sale_price: minorToDecimal(storeProduct?.prices?.sale_price, minorUnit),
    on_sale: Boolean(storeProduct.on_sale),
    permalink: storeProduct.permalink || "",
    stock_status: storeProduct.is_in_stock ? "instock" : "outofstock",
    stock_quantity: null,
    manage_stock: false,
    average_rating: storeProduct.average_rating || "0",
    rating_count: Number(storeProduct.review_count || 0),
    reviews_allowed: true,
    date_created: storeProduct.add_to_cart?.description || null,
    date_modified: storeProduct.add_to_cart?.description || null,
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
    attributes: Array.isArray(storeProduct.attributes)
      ? storeProduct.attributes.map((attribute) => ({
          id: attribute.id || 0,
          name: attribute.name,
          options: Array.isArray(attribute.terms)
            ? attribute.terms.map((term) => term.name)
            : [],
        }))
      : [],
    dimensions: {},
    weight: "",
    meta_data: [],
    variations: [],
  };
}

async function getStoreCategoryIdsFromSlugs(slugs) {
  const response = await fetch(
    `${storeApiBaseUrl}/products/categories?per_page=100`,
    { cache: "no-store" }
  );

  if (!response.ok) return [];

  const categories = await response.json();
  if (!Array.isArray(categories)) return [];

  const slugSet = new Set(slugs);
  return categories
    .filter((category) => slugSet.has(category.slug))
    .map((category) => category.id);
}

async function fetchProductsFromStoreApi(searchParams) {
  const params = new URLSearchParams();
  params.set("per_page", searchParams.get("per_page") || "50");
  params.set("page", searchParams.get("page") || "1");

  const orderby = searchParams.get("orderby");
  const order = searchParams.get("order");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const categorySlug = searchParams.get("category_slug");

  if (orderby) params.set("orderby", orderby);
  if (order) params.set("order", order.toLowerCase());
  if (featured === "true") params.set("featured", "true");
  if (search) params.set("search", search);
  if (category && category !== "all") params.set("category", category);
  if (minPrice) params.set("min_price", minPrice);
  if (maxPrice) params.set("max_price", maxPrice);

  if (categorySlug) {
    const slugs = categorySlug
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean);

    if (slugs.length > 0) {
      const categoryIds = await getStoreCategoryIdsFromSlugs(slugs);

      if (categoryIds.length === 0) {
        return { products: [], total: "0" };
      }

      params.set("category", categoryIds.join(","));
    }
  }

  const response = await fetch(`${storeApiBaseUrl}/products?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Store API error (${response.status}): ${body.slice(0, 200)}`
    );
  }

  const data = await response.json();
  const products = Array.isArray(data)
    ? data.map(mapStoreProductToWooProduct)
    : [];

  return {
    products,
    total: response.headers.get("x-wp-total") || String(products.length),
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    if (!api) {
      const storeApiResult = await fetchProductsFromStoreApi(searchParams);
      const headers = new Headers();
      headers.set("X-WP-Total", storeApiResult.total);
      return NextResponse.json(storeApiResult.products, { headers });
    }

    const params = {
      per_page: searchParams.get("per_page") || "50",
      page: searchParams.get("page") || "1",
      status: "publish",
      stock_status: "instock",
    };

    const orderby = searchParams.get("orderby");
    const order = searchParams.get("order");
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    const featured = searchParams.get("featured");

    if (orderby) params.orderby = orderby;
    if (order) params.order = order;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (featured === "true") params.featured = true;
    if (featured === "false") params.featured = false;

    // Filtrer par catégorie ID si fournie
    const category = searchParams.get("category");
    if (category && category !== "all") {
      params.category = category;
    }

    // Filtrer par catégorie slug (ex: anti-courants-air)
    const categorySlug = searchParams.get("category_slug");
    if (categorySlug) {
      const slugs = categorySlug
        .split(",")
        .map((slug) => slug.trim())
        .filter(Boolean);

      if (slugs.length > 0) {
        const categoriesResponse = await api.get("products/categories", {
          per_page: 100,
          slug: slugs.join(","),
        });

        const categoryIds = (categoriesResponse.data || []).map((cat) => cat.id);

        if (categoryIds.length === 0) {
          return NextResponse.json([]);
        }

        params.category = categoryIds.join(",");
      }
    }

    // Filtrer par recherche si fournie
    const search = searchParams.get("search");
    if (search) {
      params.search = search;
    }

    const response = await api.get("products", params);

    const headers = new Headers();
    const total = response.headers?.["x-wp-total"];
    if (total) headers.set("X-WP-Total", String(total));

    return NextResponse.json(response.data, { headers });
  } catch (error) {
    console.error("Erreur WooCommerce API:", error);
    return NextResponse.json(
      { error: error.message || "Erreur de chargement des produits" },
      { status: 500 }
    );
  }
}

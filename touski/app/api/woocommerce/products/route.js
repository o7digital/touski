import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

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

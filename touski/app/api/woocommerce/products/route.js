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

    // Filtrer par catégorie si fournie
    const category = searchParams.get("category");
    if (category && category !== "all") {
      params.category = category;
    }

    // Filtrer par recherche si fournie
    const search = searchParams.get("search");
    if (search) {
      params.search = search;
    }

    const response = await api.get("products", params);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erreur WooCommerce API:", error);
    return NextResponse.json(
      { error: error.message || "Erreur de chargement des produits" },
      { status: 500 }
    );
  }
}

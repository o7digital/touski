import { redirect } from "next/navigation";

export const metadata = {
  title: "Boutique TOUSKI | indispensables maison au Canada",
  description:
    "Decouvrez notre selection TOUSKI: anti-courants d'air, solutions cuisine et accessoires salle de bain pour le Canada.",
};

export default async function ShopPage1({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams(params || {}).toString();
  redirect(query ? `/products?${query}` : "/products");
}

export const dynamic = "force-dynamic";

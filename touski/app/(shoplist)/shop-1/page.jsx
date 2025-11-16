import Footer8 from "@/components/footers/Footer8";

import Header1 from "@/components/headers/Header1";
import Shop1 from "@/components/shoplist/Shop1";
import { getProducts } from "@/lib/woocommerce";
import React from "react";
import { headers } from "next/headers";

export const metadata = {
  title: "Boutique - Gadgets cuisine et accessoires maison pratiques | Touski Québec",
  description: "Découvrez nos gadgets cuisine innovants, ustensiles pratiques, organisateurs tiroirs et solutions rangement petits espaces. Articles maison indispensables 2025 au Québec.",
  keywords: "produits pratiques maison, gadgets cuisine innovants, ustensiles cuisine pratiques, rangement cuisine petits espaces, organisateurs tiroirs cuisine, solutions rangement maison, articles maison indispensables, gadgets maison utiles, accessoires maison minimalistes, organisation maison rapide, boutique maison québec en ligne, gadgets maison utiles au quotidien, accessoires maison pas chers canada, paniers rangement maison québec",
};
function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

export default async function ShopPage1(props) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const category = searchParams?.category || "";
  const source = (searchParams?.source || "woocommerce").toLowerCase(); // 'woocommerce' | 'eprolo' | 'cj' | 'directus'
  const page = Number(searchParams?.page || 1);
  const pageSize = Number(searchParams?.pageSize || 24);
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const sort = searchParams?.sort || ""; // e.g., price_asc, price_desc

  let items = [];
  let loadError = null;
  try {
    if (source === "woocommerce") {
      // Charger depuis WooCommerce
      const wooParams = {
        per_page: pageSize,
        page: page,
      };
      if (q) wooParams.search = q;
      if (category) wooParams.category = category;
      if (minPrice) wooParams.min_price = minPrice;
      if (maxPrice) wooParams.max_price = maxPrice;
      if (sort === "price_asc") wooParams.orderby = "price", wooParams.order = "asc";
      if (sort === "price_desc") wooParams.orderby = "price", wooParams.order = "desc";
      
      const products = await getProducts(wooParams);
      items = products || [];
    } else if (source === "eprolo" || source === "cj") {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (sort) params.set("sort", sort);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
      // No preset filter: let backend return full results for the query
      const h = headers();
      const proto = h.get("x-forwarded-proto") || "https";
      const host = h.get("x-forwarded-host") || h.get("host");
      const origin = `${proto}://${host}`;
      const endpoint = source === "cj" ? "/api/cj/products" : "/api/eprolo/products";
      const res = await fetch(`${origin}${endpoint}?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || data?.ok === false) throw new Error(String(data?.error || `HTTP ${res.status}`));
      items = data?.items || [];
    } else {
      const filter = {};
      if (q) filter.name = { _contains: q };
      if (category) filter.category = { _eq: category };
      const res = await getProducts({ fields: "*", limit: 50, filter });
      items = res?.data || [];
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Erreur chargement produits (shop-1):", e);
    loadError = e?.message || "Erreur inconnue";
  }

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container my-4">
          <h2 className="h4 mb-3">Produits {source === 'eprolo' ? 'Fournisseur (EPROLO)' : source === 'cj' ? 'Fournisseur (CJ)' : 'Directus'}</h2>
          <form method="get" className="mb-3" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input name="q" defaultValue={q} placeholder="Recherche (nom)" style={{ padding: 8, flex: 1, minWidth: 220 }} />
            <input name="category" defaultValue={category} placeholder="Catégorie (ex: maison)" style={{ padding: 8, width: 180 }} />
            <input name="minPrice" defaultValue={minPrice} placeholder="Prix min" style={{ padding: 8, width: 120 }} />
            <input name="maxPrice" defaultValue={maxPrice} placeholder="Prix max" style={{ padding: 8, width: 120 }} />
            <select name="sort" defaultValue={sort} style={{ padding: 8 }}>
              <option value="">Tri (défaut)</option>
              <option value="price_asc">Prix ↑</option>
              <option value="price_desc">Prix ↓</option>
            </select>
            <select name="source" defaultValue={source} style={{ padding: 8 }}>
              <option value="directus">Directus</option>
              <option value="cj">CJ</option>
              <option value="eprolo">EPROLO</option>
            </select>
            <input type="number" name="page" defaultValue={page} min={1} style={{ padding: 8, width: 90 }} />
            <input type="number" name="pageSize" defaultValue={pageSize} min={6} max={60} step={6} style={{ padding: 8, width: 110 }} />
            <button type="submit">Filtrer</button>
          </form>
          {loadError && (
            <p style={{ color: "#c00" }}>
              Erreur de chargement: {String(loadError)}
            </p>
          )}
          {items.length === 0 ? (
            <p>Aucun produit trouvé.</p>
          ) : source === 'eprolo' ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: 16,
              }}
            >
              {items.map((it, i) => {
                const title = it?.name || "Sans nom";
                const img = Array.isArray(it?.images) ? it.images[0] : null;
                const sku = it?.sku || `ep-${i}`;
                const price = it?.price;
                return (
                  <div
                    key={`${sku}-${i}`}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 10,
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      background: "#fff",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "75%",
                        background: "#fafafa",
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={title}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : null}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{title}</div>
                    <div className="text-secondary" style={{ fontSize: 12 }}>
                      SKU: {sku} {price != null ? `· ${price}` : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <ul className="list-unstyled">
              {items.map((prod) => {
                const title =
                  pick(prod, ["name", "Name", "title", "Title", "nom", "Nom"]) ||
                  "Sans nom";
                const sku = pick(prod, ["sku", "SKU"]);
                const price = pick(prod, ["price", "Price"]);
                const cost = pick(prod, ["cost_price", "costPrice", "Cost Price"]);
                const status = pick(prod, ["status", "Status"]);
                const description = pick(prod, ["Description", "description"]);
                return (
                  <li key={prod.id} className="mb-2">
                    <strong>{title}</strong>
                    <div className="text-secondary small">
                      SKU: {sku || "—"} · Prix: {price ?? "—"} · Coût: {cost ?? "—"}
                      {" "}· Statut: {status || "—"}
                    </div>
                    {description && (
                      <div className="small" style={{maxWidth: '60ch'}}>
                        {description}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <a href={`?${new URLSearchParams({ q, category, source, minPrice, maxPrice, sort, page: String(Math.max(1, page - 1)), pageSize: String(pageSize) }).toString()}`}>
              ← Précédent
            </a>
            <a href={`?${new URLSearchParams({ q, category, source, minPrice, maxPrice, sort, page: String(page + 1), pageSize: String(pageSize) }).toString()}`}>
              Suivant →
            </a>
          </div>
        </section>
        <Shop1 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
export const dynamic = "force-dynamic";

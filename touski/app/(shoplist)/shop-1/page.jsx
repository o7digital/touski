import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Shop1 from "@/components/shoplist/Shop1";
import { getProducts } from "@/lib/directus";
import React from "react";

export const metadata = {
  title: "Shop 1 || Uomo eCommerce React Nextjs Template",
  description: "Uomo eCommerce React Nextjs Template",
};
function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

export default async function ShopPage1({ searchParams }) {
  const q = searchParams?.q || "";
  const category = searchParams?.category || "";
  const source = (searchParams?.source || "directus").toLowerCase(); // 'directus' | 'cj'

  let items = [];
  let loadError = null;
  try {
    if (source === "cj") {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      params.set("page", "1");
      params.set("pageSize", "50");
      const res = await fetch(`/api/cj/products?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      const data = await res.json();
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
          <h2 className="h4 mb-3">Produits {source === 'cj' ? 'Fournisseur (CJ)' : 'Directus'}</h2>
          <form method="get" className="mb-3" style={{ display: 'flex', gap: 8 }}>
            <input name="q" defaultValue={q} placeholder="Recherche (nom)" style={{ padding: 8, flex: 1 }} />
            {source !== 'cj' && (
              <input name="category" defaultValue={category} placeholder="Catégorie (ex: maison)" style={{ padding: 8, width: 200 }} />
            )}
            <select name="source" defaultValue={source} style={{ padding: 8 }}>
              <option value="directus">Directus</option>
              <option value="cj">Fournisseur (CJ)</option>
            </select>
            <button type="submit">Filtrer</button>
          </form>
          {loadError && (
            <p style={{ color: "#c00" }}>
              Erreur de chargement: {String(loadError)}
            </p>
          )}
          {items.length === 0 ? (
            <p>Aucun produit trouvé.</p>
          ) : (
            <ul className="list-unstyled">
              {items.map((prod, idx) => {
                if (source === 'cj') {
                  const title = prod.name || 'Sans nom';
                  const sku = prod.sku;
                  const price = prod.price;
                  const cost = prod.cost_price;
                  const description = prod.description;
                  return (
                    <li key={`${sku || idx}-cj`} className="mb-2">
                      <strong>{title}</strong>
                      <div className="text-secondary small">
                        SKU: {sku || "—"} · Prix: {price ?? "—"} · Coût: {cost ?? "—"}
                      </div>
                      {description && (
                        <div className="small" style={{maxWidth: '60ch'}}>
                          {description}
                        </div>
                      )}
                      <form action={`/api/cj/import-one?sku=${encodeURIComponent(sku || '')}`} method="post" style={{ marginTop: 6 }}>
                        <button type="submit">Importer dans Directus</button>
                      </form>
                    </li>
                  );
                }
                // Directus rendering
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
        </section>
        <Shop1 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}

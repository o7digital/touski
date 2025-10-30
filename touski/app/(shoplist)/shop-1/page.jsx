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

export default async function ShopPage1() {
  let directusItems = [];
  try {
    const res = await getProducts({ fields: "*", limit: 50 });
    directusItems = res?.data || [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Erreur chargement produits Directus (shop-1):", e);
  }

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container my-4">
          <h2 className="h4 mb-3">Produits Directus</h2>
          {directusItems.length === 0 ? (
            <p>Aucun produit trouvé.</p>
          ) : (
            <ul className="list-unstyled">
              {directusItems.map((prod) => {
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

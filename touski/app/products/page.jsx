import { getProducts } from "../../lib/woocommerce";

export const dynamic = "force-dynamic";

function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

export const metadata = {
  title: "Products | WooCommerce",
  description: "Liste des produits depuis WooCommerce",
};

export default async function ProductsPage() {
  let items = [];
  let error = null;
  try {
    const products = await getProducts({ per_page: 100 });
    items = products || [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Erreur WooCommerce products:", e);
    error = e?.message || "Erreur inconnue";
  }

  return (
    <main className="container" style={{ padding: 32 }}>
      <h1 style={{ marginBottom: 16 }}>Produits</h1>
      {error && (
        <p style={{ color: "#c00" }}>Erreur de chargement: {String(error)}</p>
      )}
      {items.length === 0 && !error ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((prod) => {
            // Données déjà mappées par lib/woocommerce.js
            const title = prod.title || prod.name || "Sans nom";
            const description = prod.short_description || prod.description;
            const sku = prod.sku;
            const status = prod.stock_status;
            const price = prod.price;
            const costPrice = prod.meta_data?.find(m => m.key === '_cost_price')?.value;
            const weight = prod.weight;
            const dateCreated = prod.date_created;

            return (
              <li
                key={prod.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 600 }}>{title}</div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  {description || "Description non renseignée"}
                </div>
                <div style={{ marginTop: 8, fontSize: 14 }}>
                  <span>SKU: {sku || "—"}</span> · {" "}
                  <span>Status: {status || "—"}</span> · {" "}
                  <span>Prix: {price ?? "—"}</span> · {" "}
                  <span>Prix coûtant: {costPrice ?? "—"}</span> · {" "}
                  <span>Poids: {weight ?? "—"}</span> · {" "}
                  <span>Créé: {String(dateCreated || "—")}</span>
                </div>
                <div style={{ color: "#888", fontSize: 12, marginTop: 6 }}>
                  ID: {prod.id}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}


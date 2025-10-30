import { getProducts } from "../../lib/directus";

export const dynamic = "force-dynamic";

function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

export const metadata = {
  title: "Products | Directus",
  description: "Liste des produits depuis Directus",
};

export default async function ProductsPage() {
  let items = [];
  let error = null;
  try {
    const res = await getProducts({ fields: "*", limit: 100 });
    items = res?.data || [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Erreur Directus products:", e);
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
            const title =
              pick(prod, [
                "name",
                "Name",
                "title",
                "Title",
                "nom",
                "Nom",
              ]) || "Sans nom";
            const description = pick(prod, ["description", "Description"]);
            const sku = pick(prod, ["sku", "SKU"]);
            const status = pick(prod, ["status", "Status"]);
            const price = pick(prod, ["price", "Price"]);
            const costPrice = pick(prod, [
              "cost_price",
              "Cost Price",
              "costPrice",
              "costprice",
            ]);
            const weight = pick(prod, ["weight", "Weight"]);
            const dateCreated = pick(prod, [
              "date_created",
              "created_at",
              "createdAt",
              "Date Created",
            ]);

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


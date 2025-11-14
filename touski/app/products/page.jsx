"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Même logique de filtres que la section « Nos Meilleurs Produits »
const categories = [
  { label: "Tous", key: "all" },

  // Maison / Home
  { label: "Maison", key: "maison", categoryId: 16, search: "home" },
  { label: "Cuisine", key: "cuisine", categoryId: 17, search: "kitchen" },
  { label: "Séjour", key: "sejour", categoryId: 16, search: "sofa living" },
  { label: "Salle de bain", key: "salle-de-bain", categoryId: 16, search: "bathroom bath" },
  { label: "Toilettes", key: "toilettes", categoryId: 16, search: "toilet wc" },
  { label: "Détergents", key: "detergents", categoryId: 16, search: "cleaner detergent" },
  { label: "Fournitures", key: "fournitures", categoryId: 16, search: "storage organizer supply" },
  { label: "Électricité & lampes", key: "lumieres", categoryId: 16, search: "lamp light led" },

  // Garage / Jardin / Meubles / Bricolage
  { label: "Garage", key: "garage", categoryId: 16, search: "garage" },
  { label: "Jardin", key: "jardin", search: "garden" },
  { label: "Meubles", key: "meubles", search: "furniture" },
  { label: "Bricolage", key: "bricolage", search: "tool diy repair" },
];

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("maison");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        per_page: "100",
      });

      const activeFilter =
        categories.find((c) => c.key === selectedCategory) || categories[0];

      if (activeFilter?.categoryId) {
        params.set("category", String(activeFilter.categoryId));
      }

      // La recherche libre dans le champ texte
      // remplace la recherche par défaut du filtre.
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else if (activeFilter?.search) {
        params.set("search", activeFilter.search);
      }

      const res = await fetch(`/api/woocommerce/products?${params.toString()}`);
      if (!res.ok) throw new Error("Erreur de chargement");
      
      const products = await res.json();
      setItems(products || []);
    } catch (e) {
      console.error("Erreur WooCommerce products:", e);
      setError(e?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    loadProducts();
  }

  return (
    <main className="container" style={{ padding: 32 }}>
      <h1 style={{ marginBottom: 24, textAlign: "center" }}>Produits Touski (WooCommerce)</h1>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} style={{ marginBottom: 24, display: "flex", gap: 12, justifyContent: "center" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit..."
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #ddd",
            minWidth: 300,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Rechercher
        </button>
      </form>

      {/* Filtres catégories */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: selectedCategory === cat.key ? "2px solid #007bff" : "1px solid #ddd",
              backgroundColor: selectedCategory === cat.key ? "#007bff" : "white",
              color: selectedCategory === cat.key ? "white" : "#333",
              cursor: "pointer",
              fontWeight: selectedCategory === cat.key ? 600 : 400,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p style={{ marginTop: 16 }}>Chargement des produits de la boutique...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ 
          padding: 16, 
          backgroundColor: "#fee", 
          borderRadius: 8, 
          color: "#c00",
          textAlign: "center" 
        }}>
          Erreur de chargement: {String(error)}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>
            Aucun produit trouvé dans cette catégorie.
          </p>
          <p style={{ color: "#666" }}>
            Ajoutez ou publiez des produits dans WooCommerce pour les voir apparaître ici.
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <div style={{ marginBottom: 16, textAlign: "center", color: "#666" }}>
            {items.length} produit{items.length > 1 ? "s" : ""} trouvé{items.length > 1 ? "s" : ""}
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 24,
          }}>
            {items.map((prod) => {
              const title = prod.name || "Sans nom";
              const description = prod.short_description || prod.description;
              const sku = prod.sku;
              const status = prod.stock_status;
              const price = prod.price;
              const imageUrl = prod.images?.[0]?.src || "/assets/images/products/default.jpg";

              return (
                <div
                  key={prod.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 16,
                    backgroundColor: "white",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{ marginBottom: 12, overflow: "hidden", borderRadius: 8 }}>
                    <Image
                      src={imageUrl}
                      alt={title}
                      width={250}
                      height={250}
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{title}</div>
                  <div style={{ color: "#666", fontSize: 14, marginBottom: 12, lineHeight: 1.4 }}>
                    {description ? (
                      <div dangerouslySetInnerHTML={{ __html: description.substring(0, 100) + "..." }} />
                    ) : (
                      "Description non renseignée"
                    )}
                  </div>
                  <div style={{ fontSize: 14, marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, color: "#28a745", fontSize: 18 }}>
                      ${price || "—"}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    SKU: {sku || "—"} · Stock: {status || "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

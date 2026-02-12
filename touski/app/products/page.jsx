"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer8 from "@/components/footers/Footer8";
import catalogPlaceholders from "@/data/catalogPlaceholders.json";

const topCategories = [
  {
    label: "Tous",
    key: "all",
    description: "Tous les produits disponibles sur la boutique.",
  },
  {
    label: "Anti-courants d'air",
    key: "anti-courants-air",
    description: "Bas de porte, joints et solutions d'etancheite.",
  },
  {
    label: "Cuisine",
    key: "cuisine",
    description: "Degraissants, nettoyants specialises et accessoires utiles.",
  },
  {
    label: "Salle de bain",
    key: "salle-de-bain",
    description: "Anti-calcaire, joints/moisissures et accessoires.",
  },
];

const subCategoriesByTop = {
  "anti-courants-air": [
    { label: "Tous", key: "all", description: "Tous les produits anti-courants d'air." },
    { label: "Bas de porte", key: "bas-de-porte", description: "Solutions de blocage au niveau du seuil." },
    {
      label: "Joints & bandes d'etancheite",
      key: "joints-bandes-etancheite",
      description: "Limiter les infiltrations autour des ouvertures.",
    },
    {
      label: "Seuils & accessoires",
      key: "seuils-accessoires",
      description: "Complements d'etancheite et finition.",
    },
  ],
  cuisine: [
    { label: "Tous", key: "all", description: "Tous les produits cuisine." },
    {
      label: "Degraissant intensif",
      key: "degraissant-intensif",
      description: "Retirer les graisses tenaces efficacement.",
    },
    {
      label: "Nettoyants specialises",
      key: "nettoyants-specialises",
      description: "Brule, inox, four et plaque.",
    },
    {
      label: "Accessoires",
      key: "cuisine-accessoires",
      description: "Brosses, grattoirs safe et outils pratiques.",
    },
  ],
  "salle-de-bain": [
    { label: "Tous", key: "all", description: "Tous les produits salle de bain." },
    {
      label: "Anti-calcaire",
      key: "anti-calcaire",
      description: "Limiter les depots et traces blanches.",
    },
    {
      label: "Joints & moisissures",
      key: "joints-moisissures",
      description: "Entretien des joints exposes a l'humidite.",
    },
    {
      label: "Accessoires",
      key: "salle-de-bain-accessoires",
      description: "Accessoires utiles pour l'entretien quotidien.",
    },
  ],
};

function getTopCategoryFromSlug(slug) {
  if (!slug || slug === "all") return "all";
  if (subCategoriesByTop[slug]) return slug;

  for (const [topKey, subcats] of Object.entries(subCategoriesByTop)) {
    if (subcats.some((subcat) => subcat.key === slug)) return topKey;
  }

  return "all";
}

function buildFallbackProducts(topCategory, subCategory) {
  const source = catalogPlaceholders.products || [];
  let filtered = source;

  if (topCategory !== "all") {
    filtered = filtered.filter((product) =>
      Array.isArray(product.category_slugs)
        ? product.category_slugs.includes(topCategory)
        : false
    );
  }

  if (subCategory !== "all") {
    filtered = filtered.filter((product) =>
      Array.isArray(product.category_slugs)
        ? product.category_slugs.includes(subCategory)
        : false
    );
  }

  return filtered.map((product, index) => ({
    id: 950000 + index,
    isPlaceholder: true,
    name: product.name,
    price: product.regular_price,
    short_description: product.short_description,
    images: [{ src: product.image, alt: product.name }],
    categories: product.category_slugs?.map((slug) => ({ slug, name: slug })) || [],
  }));
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategorySlug = searchParams.get("category_slug") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFallback, setIsFallback] = useState(false);

  const [selectedTopCategory, setSelectedTopCategory] = useState(
    getTopCategoryFromSlug(urlCategorySlug)
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subCategoriesByTop[getTopCategoryFromSlug(urlCategorySlug)]?.some(
      (subcat) => subcat.key === urlCategorySlug
    )
      ? urlCategorySlug
      : "all"
  );

  useEffect(() => {
    const topFromUrl = getTopCategoryFromSlug(urlCategorySlug);
    setSelectedTopCategory(topFromUrl);
    setSelectedSubCategory(
      subCategoriesByTop[topFromUrl]?.some((subcat) => subcat.key === urlCategorySlug)
        ? urlCategorySlug
        : "all"
    );
  }, [urlCategorySlug]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopCategory, selectedSubCategory]);

  const visibleSubCategories = useMemo(() => {
    if (selectedTopCategory === "all") return [];
    return subCategoriesByTop[selectedTopCategory] || [];
  }, [selectedTopCategory]);
  const activeTopCategory = useMemo(
    () => topCategories.find((category) => category.key === selectedTopCategory),
    [selectedTopCategory]
  );
  const activeSubCategory = useMemo(
    () => visibleSubCategories.find((category) => category.key === selectedSubCategory),
    [visibleSubCategories, selectedSubCategory]
  );

  async function loadProducts() {
    setLoading(true);
    setError(null);
    setIsFallback(false);

    try {
      const params = new URLSearchParams({
        per_page: "100",
        status: "publish",
        stock_status: "instock",
      });

      if (selectedTopCategory === "all") {
        params.set("featured", "true");
      } else if (selectedSubCategory !== "all") {
        params.set("category_slug", selectedSubCategory);
      } else {
        params.set("category_slug", selectedTopCategory);
      }

      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      }

      const response = await fetch(`/api/woocommerce/products?${params.toString()}`);
      if (!response.ok) throw new Error("Erreur de chargement des produits");

      let data = await response.json();
      if (!Array.isArray(data)) data = [];

      // Eviter la grille vide sur l'onglet principal si aucun featured n'est defini
      if (data.length === 0 && selectedTopCategory === "all") {
        const allResponse = await fetch(
          "/api/woocommerce/products?per_page=100&status=publish&stock_status=instock"
        );
        if (allResponse.ok) {
          const allData = await allResponse.json();
          if (Array.isArray(allData)) data = allData;
        }
      }

      if (data.length === 0) {
        setProducts(buildFallbackProducts(selectedTopCategory, selectedSubCategory));
        setIsFallback(true);
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error("Erreur WooCommerce products:", err);
      setError(err?.message || "Erreur inconnue");
      setProducts(buildFallbackProducts(selectedTopCategory, selectedSubCategory));
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    loadProducts();
  }

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <section className="container" style={{ padding: "32px 0" }}>
          <h1 className="text-center mb-3">Boutique TOUSKI</h1>
          <p className="text-center text-secondary mb-4">
            Anti-courants d'air, cuisine et salle de bain: des indispensables maison difficiles a trouver au Canada.
          </p>

          <form
            onSubmit={handleSearch}
            className="mb-4"
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Rechercher un produit..."
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #ddd",
                minWidth: 280,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 24px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#ef6328",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Rechercher
            </button>
          </form>

          <div
            style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}
          >
            {topCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setSelectedTopCategory(category.key);
                  setSelectedSubCategory("all");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border:
                    selectedTopCategory === category.key
                      ? "2px solid #ef6328"
                      : "1px solid #ddd",
                  backgroundColor:
                    selectedTopCategory === category.key ? "#ef6328" : "white",
                  color: selectedTopCategory === category.key ? "white" : "#333",
                  cursor: "pointer",
                  fontWeight: selectedTopCategory === category.key ? 700 : 500,
                  textTransform: "uppercase",
                  fontSize: 13,
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
          {activeTopCategory?.description && (
            <p className="text-center text-secondary mb-3" style={{ fontSize: 14 }}>
              {activeTopCategory.description}
            </p>
          )}

          {visibleSubCategories.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                {visibleSubCategories.map((subcat) => (
                  <button
                    key={subcat.key}
                    onClick={() => setSelectedSubCategory(subcat.key)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      border:
                        selectedSubCategory === subcat.key
                          ? "2px solid #202020"
                          : "1px solid #ddd",
                      backgroundColor:
                        selectedSubCategory === subcat.key ? "#202020" : "white",
                      color: selectedSubCategory === subcat.key ? "white" : "#333",
                      cursor: "pointer",
                      fontWeight: selectedSubCategory === subcat.key ? 700 : 500,
                      fontSize: 12,
                    }}
                  >
                    {subcat.label}
                  </button>
                ))}
              </div>
              {activeSubCategory?.description && (
                <p className="text-center text-secondary mb-4" style={{ fontSize: 13 }}>
                  {activeSubCategory.description}
                </p>
              )}
            </>
          )}

          {isFallback && (
            <div className="alert alert-warning text-center" role="alert">
              Placeholders temporaires affiches: finaliser le catalogue WooCommerce pour publier les produits definitifs.
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {error && !loading && (
            <div
              style={{
                padding: 16,
                backgroundColor: "#fee",
                borderRadius: 8,
                color: "#c00",
                textAlign: "center",
              }}
            >
              Erreur de chargement: {String(error)}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div style={{ textAlign: "center", padding: 40 }}>
              <p style={{ fontSize: 18, marginBottom: 16 }}>
                Aucun produit trouve dans cette categorie.
              </p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <>
              <div style={{ marginBottom: 16, textAlign: "center", color: "#666" }}>
                {products.length} produit{products.length > 1 ? "s" : ""} affiche
                {products.length > 1 ? "s" : ""}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 24,
                }}
              >
                {products.map((product) => {
                  const title = product.name || "Sans nom";
                  const status = product.stock_status;
                  const imageUrl =
                    product.images?.[0]?.src || "/assets/images/products/default.jpg";

                  return (
                    <div
                      key={product.id}
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 12,
                        padding: 16,
                        backgroundColor: "white",
                      }}
                    >
                      <div style={{ marginBottom: 12, overflow: "hidden", borderRadius: 8 }}>
                        {product.isPlaceholder ? (
                          <img
                            src={imageUrl}
                            alt={title}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          />
                        ) : (
                          <Link href={`/product/${product.id}`}>
                            <img
                              src={imageUrl}
                              alt={title}
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            />
                          </Link>
                        )}
                      </div>

                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                        {product.isPlaceholder ? title : <Link href={`/product/${product.id}`}>{title}</Link>}
                      </div>

                      <div style={{ fontSize: 14, marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, color: "#28a745", fontSize: 18 }}>
                          ${product.price || "-"}
                        </span>
                      </div>

                      <div style={{ fontSize: 12, color: "#888" }}>
                        Stock: {status === "instock" ? "En stock" : status || "-"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer8 />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: 40 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

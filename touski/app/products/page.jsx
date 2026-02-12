"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer8 from "@/components/footers/Footer8";
import catalogPlaceholders from "@/data/catalogPlaceholders.json";
import {
  getLocaleFromPathname,
  getLocaleValue,
  withLocale,
} from "@/lib/i18n";

const topCategoryDefs = [
  {
    key: "all",
    labels: { fr: "Tous", en: "All", de: "Alle", es: "Todo" },
    descriptions: {
      fr: "Tous les produits disponibles sur la boutique.",
      en: "All products available in the shop.",
      de: "Alle Produkte im Shop.",
      es: "Todos los productos disponibles en la tienda.",
    },
  },
  {
    key: "anti-courants-air",
    labels: {
      fr: "Anti-courants d'air",
      en: "Draft proofing",
      de: "Zugluftschutz",
      es: "Anti corrientes de aire",
    },
    descriptions: {
      fr: "Bas de porte, joints et solutions d'etancheite.",
      en: "Door sweeps, seals and draft-proofing solutions.",
      de: "Türdichtungen, Dichtungen und Zugluftschutz-Lösungen.",
      es: "Burletes, juntas y soluciones contra corrientes de aire.",
    },
  },
  {
    key: "cuisine",
    labels: { fr: "Cuisine", en: "Kitchen", de: "Küche", es: "Cocina" },
    descriptions: {
      fr: "Degraissants, nettoyants specialises et accessoires utiles.",
      en: "Degreasers, specialty cleaners and useful accessories.",
      de: "Fettlöser, Spezialreiniger und nützliches Zubehör.",
      es: "Desengrasantes, limpiadores especializados y accesorios útiles.",
    },
  },
  {
    key: "salle-de-bain",
    labels: { fr: "Salle de bain", en: "Bathroom", de: "Bad", es: "Baño" },
    descriptions: {
      fr: "Anti-calcaire, joints/moisissures et accessoires.",
      en: "Anti-limescale, grout/mold care and accessories.",
      de: "Kalkschutz, Fugen-/Schimmelpflege und Zubehör.",
      es: "Antisarro, cuidado de juntas/moho y accesorios.",
    },
  },
];

const subCategoryDefsByTop = {
  "anti-courants-air": [
    {
      key: "all",
      labels: { fr: "Tous", en: "All", de: "Alle", es: "Todo" },
      descriptions: {
        fr: "Tous les produits anti-courants d'air.",
        en: "All draft-proofing products.",
        de: "Alle Zugluftschutz-Produkte.",
        es: "Todos los productos anti corrientes de aire.",
      },
    },
    {
      key: "bas-de-porte",
      labels: {
        fr: "Bas de porte",
        en: "Door sweeps",
        de: "Türzugstopper",
        es: "Burletes de puerta",
      },
      descriptions: {
        fr: "Solutions de blocage au niveau du seuil.",
        en: "Blocking solutions at threshold level.",
        de: "Abdichtungslösungen auf Schwellenhöhe.",
        es: "Soluciones para bloquear corrientes al nivel del umbral.",
      },
    },
    {
      key: "joints-bandes-etancheite",
      labels: {
        fr: "Joints & bandes d'etancheite",
        en: "Seals & weather strips",
        de: "Dichtungen & Dichtbänder",
        es: "Juntas y bandas de sellado",
      },
      descriptions: {
        fr: "Limiter les infiltrations autour des ouvertures.",
        en: "Limit leaks around openings.",
        de: "Luftzug um Öffnungen reduzieren.",
        es: "Reducir filtraciones alrededor de aperturas.",
      },
    },
    {
      key: "seuils-accessoires",
      labels: {
        fr: "Seuils & accessoires",
        en: "Thresholds & accessories",
        de: "Schwellen & Zubehör",
        es: "Umbrales y accesorios",
      },
      descriptions: {
        fr: "Complements d'etancheite et finition.",
        en: "Complementary sealing and finishing solutions.",
        de: "Ergänzende Abdichtung und Abschluss.",
        es: "Complementos de sellado y acabado.",
      },
    },
  ],
  cuisine: [
    {
      key: "all",
      labels: { fr: "Tous", en: "All", de: "Alle", es: "Todo" },
      descriptions: {
        fr: "Tous les produits cuisine.",
        en: "All kitchen products.",
        de: "Alle Küchenprodukte.",
        es: "Todos los productos de cocina.",
      },
    },
    {
      key: "degraissant-intensif",
      labels: {
        fr: "Degraissant intensif",
        en: "Heavy-duty degreaser",
        de: "Intensiver Fettlöser",
        es: "Desengrasante intensivo",
      },
      descriptions: {
        fr: "Retirer les graisses tenaces efficacement.",
        en: "Remove stubborn grease effectively.",
        de: "Hartnäckiges Fett wirksam entfernen.",
        es: "Eliminar grasa incrustada de forma eficaz.",
      },
    },
    {
      key: "nettoyants-specialises",
      labels: {
        fr: "Nettoyants specialises",
        en: "Specialty cleaners",
        de: "Spezialreiniger",
        es: "Limpiadores especializados",
      },
      descriptions: {
        fr: "Brule, inox, four et plaque.",
        en: "Burnt residue, stainless steel, oven and cooktop.",
        de: "Eingebranntes, Edelstahl, Ofen und Kochfeld.",
        es: "Quemado, inox, horno y placa.",
      },
    },
    {
      key: "cuisine-accessoires",
      labels: {
        fr: "Accessoires",
        en: "Accessories",
        de: "Zubehör",
        es: "Accesorios",
      },
      descriptions: {
        fr: "Brosses, grattoirs safe et outils pratiques.",
        en: "Brushes, safe scrapers and practical tools.",
        de: "Bürsten, sichere Schaber und praktische Werkzeuge.",
        es: "Cepillos, raspadores seguros y herramientas prácticas.",
      },
    },
  ],
  "salle-de-bain": [
    {
      key: "all",
      labels: { fr: "Tous", en: "All", de: "Alle", es: "Todo" },
      descriptions: {
        fr: "Tous les produits salle de bain.",
        en: "All bathroom products.",
        de: "Alle Badprodukte.",
        es: "Todos los productos de baño.",
      },
    },
    {
      key: "anti-calcaire",
      labels: {
        fr: "Anti-calcaire",
        en: "Anti-limescale",
        de: "Kalkschutz",
        es: "Antisarro",
      },
      descriptions: {
        fr: "Limiter les depots et traces blanches.",
        en: "Reduce deposits and white marks.",
        de: "Ablagerungen und weiße Spuren reduzieren.",
        es: "Reducir depósitos y marcas blancas.",
      },
    },
    {
      key: "joints-moisissures",
      labels: {
        fr: "Joints & moisissures",
        en: "Grout & mold",
        de: "Fugen & Schimmel",
        es: "Juntas y moho",
      },
      descriptions: {
        fr: "Entretien des joints exposes a l'humidite.",
        en: "Care for moisture-exposed grout lines.",
        de: "Pflege feuchtigkeitsanfälliger Fugen.",
        es: "Cuidado de juntas expuestas a humedad.",
      },
    },
    {
      key: "salle-de-bain-accessoires",
      labels: {
        fr: "Accessoires",
        en: "Accessories",
        de: "Zubehör",
        es: "Accesorios",
      },
      descriptions: {
        fr: "Accessoires utiles pour l'entretien quotidien.",
        en: "Useful accessories for daily maintenance.",
        de: "Nützliches Zubehör für die tägliche Pflege.",
        es: "Accesorios útiles para el mantenimiento diario.",
      },
    },
  ],
};

function getTopCategoryFromSlug(slug) {
  if (!slug || slug === "all") return "all";
  if (subCategoryDefsByTop[slug]) return slug;

  for (const [topKey, subcats] of Object.entries(subCategoryDefsByTop)) {
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
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const searchParams = useSearchParams();
  const urlCategorySlug = searchParams.get("category_slug") || "all";
  const productsPath = withLocale("/products", locale);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFallback, setIsFallback] = useState(false);

  const [selectedTopCategory, setSelectedTopCategory] = useState(
    getTopCategoryFromSlug(urlCategorySlug)
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subCategoryDefsByTop[getTopCategoryFromSlug(urlCategorySlug)]?.some(
      (subcat) => subcat.key === urlCategorySlug
    )
      ? urlCategorySlug
      : "all"
  );

  useEffect(() => {
    const topFromUrl = getTopCategoryFromSlug(urlCategorySlug);
    setSelectedTopCategory(topFromUrl);
    setSelectedSubCategory(
      subCategoryDefsByTop[topFromUrl]?.some((subcat) => subcat.key === urlCategorySlug)
        ? urlCategorySlug
        : "all"
    );
  }, [urlCategorySlug]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopCategory, selectedSubCategory]);

  const localizedTopCategories = useMemo(
    () =>
      topCategoryDefs.map((category) => ({
        ...category,
        label: getLocaleValue(category.labels, locale),
        description: getLocaleValue(category.descriptions, locale),
      })),
    [locale]
  );

  const visibleSubCategories = useMemo(() => {
    if (selectedTopCategory === "all") return [];
    return (subCategoryDefsByTop[selectedTopCategory] || []).map((category) => ({
      ...category,
      label: getLocaleValue(category.labels, locale),
      description: getLocaleValue(category.descriptions, locale),
    }));
  }, [selectedTopCategory, locale]);

  const activeTopCategory = useMemo(
    () => localizedTopCategories.find((category) => category.key === selectedTopCategory),
    [localizedTopCategories, selectedTopCategory]
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
      if (!response.ok) {
        throw new Error(
          getLocaleValue(
            {
              fr: "Erreur de chargement des produits",
              en: "Error loading products",
              de: "Fehler beim Laden der Produkte",
              es: "Error al cargar los productos",
            },
            locale
          )
        );
      }

      let data = await response.json();
      if (!Array.isArray(data)) data = [];

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
      setError(
        err?.message ||
          getLocaleValue(
            {
              fr: "Erreur inconnue",
              en: "Unknown error",
              de: "Unbekannter Fehler",
              es: "Error desconocido",
            },
            locale
          )
      );
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
          <h1 className="text-center mb-3">
            {getLocaleValue(
              {
                fr: "Boutique TOUSKI",
                en: "TOUSKI Shop",
                de: "TOUSKI Shop",
                es: "Tienda TOUSKI",
              },
              locale
            )}
          </h1>
          <p className="text-center text-secondary mb-4">
            {getLocaleValue(
              {
                fr: "Anti-courants d'air, cuisine et salle de bain: des indispensables maison difficiles a trouver au Canada.",
                en: "Draft proofing, kitchen and bathroom: hard-to-find home essentials in Canada.",
                de: "Zugluftschutz, Küche und Bad: schwer auffindbare Haushaltshelfer in Kanada.",
                es: "Anti corrientes de aire, cocina y baño: esenciales del hogar difíciles de encontrar en Canadá.",
              },
              locale
            )}
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
              placeholder={getLocaleValue(
                {
                  fr: "Rechercher un produit...",
                  en: "Search for a product...",
                  de: "Produkt suchen...",
                  es: "Buscar un producto...",
                },
                locale
              )}
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
              {getLocaleValue(
                {
                  fr: "Rechercher",
                  en: "Search",
                  de: "Suchen",
                  es: "Buscar",
                },
                locale
              )}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {localizedTopCategories.map((category) => (
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
              {getLocaleValue(
                {
                  fr: "Placeholders temporaires affiches: finaliser le catalogue WooCommerce pour publier les produits definitifs.",
                  en: "Temporary placeholders displayed: finalize WooCommerce catalog to publish final products.",
                  de: "Temporäre Platzhalter werden angezeigt: WooCommerce-Katalog finalisieren, um endgültige Produkte zu veröffentlichen.",
                  es: "Se muestran placeholders temporales: finaliza el catálogo de WooCommerce para publicar productos definitivos.",
                },
                locale
              )}
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
              {getLocaleValue(
                {
                  fr: "Erreur de chargement:",
                  en: "Loading error:",
                  de: "Ladefehler:",
                  es: "Error de carga:",
                },
                locale
              )}{" "}
              {String(error)}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div style={{ textAlign: "center", padding: 40 }}>
              <p style={{ fontSize: 18, marginBottom: 16 }}>
                {getLocaleValue(
                  {
                    fr: "Aucun produit trouve dans cette categorie.",
                    en: "No products found in this category.",
                    de: "Keine Produkte in dieser Kategorie gefunden.",
                    es: "No se encontraron productos en esta categoría.",
                  },
                  locale
                )}
              </p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <>
              <div style={{ marginBottom: 16, textAlign: "center", color: "#666" }}>
                {products.length}{" "}
                {products.length > 1
                  ? getLocaleValue(
                      {
                        fr: "produits affiches",
                        en: "products displayed",
                        de: "Produkte angezeigt",
                        es: "productos mostrados",
                      },
                      locale
                    )
                  : getLocaleValue(
                      {
                        fr: "produit affiche",
                        en: "product displayed",
                        de: "Produkt angezeigt",
                        es: "producto mostrado",
                      },
                      locale
                    )}
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
                  const productLink = withLocale(`/product/${product.id}`, locale);

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
                          <Link href={productLink}>
                            <img
                              src={imageUrl}
                              alt={title}
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            />
                          </Link>
                        )}
                      </div>

                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                        {product.isPlaceholder ? title : <Link href={productLink}>{title}</Link>}
                      </div>

                      <div style={{ fontSize: 14, marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, color: "#28a745", fontSize: 18 }}>
                          ${product.price || "-"}
                        </span>
                      </div>

                      <div style={{ fontSize: 12, color: "#888" }}>
                        {getLocaleValue(
                          { fr: "Stock:", en: "Stock:", de: "Bestand:", es: "Stock:" },
                          locale
                        )}{" "}
                        {status === "instock"
                          ? getLocaleValue(
                              {
                                fr: "En stock",
                                en: "In stock",
                                de: "Auf Lager",
                                es: "En stock",
                              },
                              locale
                            )
                          : status || "-"}
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

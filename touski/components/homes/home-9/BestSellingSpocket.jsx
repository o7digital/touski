"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import catalogPlaceholders from "@/data/catalogPlaceholders.json";

const pillarFilters = [
  {
    key: "all",
    fr: "TOUT",
    en: "ALL",
    frDescription: "Tous les produits de la boutique.",
    enDescription: "All products from the shop.",
  },
  {
    key: "anti-courants-air",
    fr: "ANTI-COURANTS D'AIR",
    en: "DRAFT PROOFING",
    frDescription: "Bas de porte, joints et solutions d'etancheite.",
    enDescription: "Door sweeps, seals and draft-proofing solutions.",
  },
  {
    key: "cuisine",
    fr: "CUISINE",
    en: "KITCHEN",
    frDescription: "Degraissants, nettoyants specialises et accessoires utiles.",
    enDescription: "Degreasers, specialty cleaners and useful accessories.",
  },
  {
    key: "salle-de-bain",
    fr: "SALLE DE BAIN",
    en: "BATHROOM",
    frDescription: "Anti-calcaire, joints/moisissures et accessoires.",
    enDescription: "Anti-limescale, grout/mold care and accessories.",
  },
];

function fallbackByCategory(categoryKey) {
  const source = catalogPlaceholders.products || [];
  const filtered =
    categoryKey === "all"
      ? source
      : source.filter((product) =>
          Array.isArray(product.category_slugs)
            ? product.category_slugs.includes(categoryKey)
            : false
        );

  return filtered.map((product, index) => ({
    id: 900000 + index,
    isPlaceholder: true,
    name: product.name,
    price: product.regular_price,
    images: [{ src: product.image, alt: product.name }],
    categories: [{ name: product.category_slugs?.[0] || "placeholder" }],
  }));
}

export default function BestSellingSpocket() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    setVisibleCount(24);
    loadProducts(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  async function loadProducts(categoryKey) {
    setLoading(true);
    setError("");
    setUsingFallback(false);

    try {
      const params = new URLSearchParams({
        per_page: "100",
        status: "publish",
        stock_status: "instock",
      });

      // Mettre en avant les produits featured sur l'onglet principal
      if (categoryKey === "all") {
        params.set("featured", "true");
      } else {
        params.set("category_slug", categoryKey);
      }

      const res = await fetch(`/api/woocommerce/products?${params.toString()}`);
      if (!res.ok) throw new Error("Erreur de chargement des produits");

      let data = await res.json();
      if (!Array.isArray(data)) data = [];

      // Si aucun featured, recharger tous les produits pour eviter une home vide
      if (data.length === 0 && categoryKey === "all") {
        const allRes = await fetch(
          "/api/woocommerce/products?per_page=100&status=publish&stock_status=instock"
        );
        if (allRes.ok) {
          const allData = await allRes.json();
          if (Array.isArray(allData)) data = allData;
        }
      }

      if (data.length === 0) {
        setProducts(fallbackByCategory(categoryKey));
        setUsingFallback(true);
      } else {
        setProducts(data);
      }
    } catch (e) {
      console.error("Erreur chargement produits:", e);
      setError(e.message || "Erreur inconnue");
      setProducts(fallbackByCategory(categoryKey));
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  const visibleProducts = products.slice(0, visibleCount);
  const canShowMore = products.length > visibleCount;
  const activeFilter = pillarFilters.find((filter) => filter.key === activeCategory);

  return (
    <section className="products-carousel container">
      <h2 className="section-title text-center mb-3 pb-xl-3 mb-xl-4">
        {isEnglish ? "OUR BEST PRODUCTS" : "NOS MEILLEURS PRODUITS"}
      </h2>

      <div
        className="mb-3"
        style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}
      >
        {pillarFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveCategory(filter.key)}
            className={`btn ${
              activeCategory === filter.key ? "btn-primary" : "btn-outline-primary"
            }`}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: activeCategory === filter.key ? 600 : 500,
              textTransform: "uppercase",
            }}
          >
            {isEnglish ? filter.en : filter.fr}
          </button>
        ))}
      </div>
      {activeFilter && (
        <p className="text-center text-secondary mb-4" style={{ fontSize: 14 }}>
          {isEnglish ? activeFilter.enDescription : activeFilter.frDescription}
        </p>
      )}

      {usingFallback && (
        <div className="alert alert-warning text-center mb-4" role="alert">
          {isEnglish
            ? "Temporary placeholders are displayed while WooCommerce products are being completed."
            : "Des placeholders temporaires sont affiches pendant la mise en place du catalogue WooCommerce."}
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!loading && visibleProducts.length === 0 && (
        <div className="text-center py-5">
          <p>{isEnglish ? "No product found." : "Aucun produit trouve."}</p>
        </div>
      )}

      {!loading && visibleProducts.length > 0 && (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-4">
          {visibleProducts.map((product, index) => {
            const imageUrl =
              product.images?.[0]?.src || "/assets/images/products/default.jpg";
            const productTitle = product.name || "Produit";
            const productPrice = product.price || "0";
            const productId = product.id;
            const productLink = product.isPlaceholder ? "/products" : `/product/${productId}`;

            return (
              <div key={`${productId}-${index}`} className="col">
                <div className="product-card h-100 d-flex flex-column">
                  <div className="pc__img-wrapper">
                    <Link href={productLink}>
                      <img
                        loading="lazy"
                        src={imageUrl}
                        alt={productTitle}
                        className="pc__img"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </Link>

                    {!product.isPlaceholder ? (
                      <button
                        className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                        onClick={() => addProductToCart(productId)}
                        title={
                          isAddedToCartProducts(productId)
                            ? "Deja dans le panier"
                            : "Ajouter au panier"
                        }
                      >
                        {isAddedToCartProducts(productId)
                          ? "Deja dans le panier"
                          : "Ajouter au panier"}
                      </button>
                    ) : (
                      <span
                        className="position-absolute bottom-0 start-0 m-2 badge bg-secondary"
                        style={{ fontSize: 11 }}
                      >
                        {isEnglish ? "Soon" : "Bientot"}
                      </span>
                    )}
                  </div>

                  <div className="pc__info position-relative mt-2">
                    <div className="product-card__price d-flex">
                      <span className="money price fw-bold">${productPrice}</span>
                    </div>
                    <h6 className="pc__title mt-1">
                      <Link href={productLink}>{productTitle}</Link>
                    </h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && canShowMore && (
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-outline-dark btn-lg"
            onClick={() => setVisibleCount((prev) => prev + 24)}
          >
            {isEnglish ? "Show more products" : "Voir plus de produits"}
          </button>
        </div>
      )}
    </section>
  );
}

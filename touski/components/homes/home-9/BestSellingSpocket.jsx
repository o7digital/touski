"use client";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useEffect, useState } from "react";
// Pas de carousel ici : on affiche une grille 4 colonnes

export default function BestSellingSpocket() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  // Univers principaux (ligne du haut)
  const universList = [
    { label: "TOUT", key: "all" },
    { label: "MAISON", key: "maison" },
    { label: "JARDIN", key: "jardin" },
    { label: "BRICOLAGE", key: "bricolage" },
    { label: "PETS", key: "pets" },
  ];

  // Sous-catégories par univers (ligne du bas)
  // Pour l’instant on utilise les catégories WooCommerce existantes :
  //   - 16 = HOME
  //   - 17 = CUISINE ELECTRONICS
  // et des mots-clés pour affiner. On pourra ajuster quand tu auras créé
  // plus de catégories dans WooCommerce.
  const subCategories = {
    maison: [
      { label: "Tous", key: "maison-tous", categoryId: 16 },
      { label: "Cuisine", key: "cuisine", categoryId: 17, search: "kitchen" },
      { label: "Garage", key: "garage", categoryId: 16, search: "garage" },
      { label: "Chambres", key: "chambres", categoryId: 16, search: "bedroom bed" },
      { label: "Électricités", key: "electricites", categoryId: 16, search: "lamp light led" },
      { label: "Fournitures", key: "fournitures", categoryId: 16, search: "storage organizer supply" },
      { label: "Détergents", key: "detergents", categoryId: 16, search: "detergent cleaner" },
    ],
    jardin: [
      { label: "Tous", key: "jardin-tous", search: "garden" },
      { label: "Tables", key: "jardin-tables", search: "garden table" },
      { label: "Piscines", key: "piscines", search: "pool" },
      { label: "Jardinage", key: "jardinage", search: "garden tools" },
    ],
    bricolage: [
      { label: "Tous", key: "bricolage-tous", search: "tool" },
      { label: "Outils", key: "outils", search: "tool" },
      { label: "Visserie", key: "visserie", search: "screw nail" },
    ],
    pets: [
      { label: "Tous", key: "pets-tous", search: "pet" },
      { label: "Aliments chats", key: "aliments-chats", search: "cat food" },
      { label: "Aliments chiens", key: "aliments-chiens", search: "dog food" },
      { label: "Niches", key: "niches", search: "dog house" },
    ],
  };

  const [activeUnivers, setActiveUnivers] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUnivers, activeSubCategory]);

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      // Charger produits depuis WooCommerce
      const params = new URLSearchParams({
        per_page: "50",
        status: "publish",
        stock_status: "instock",
      });

      // Si on est sur TOUT : pas de filtre, on affiche tout le store
      if (activeUnivers !== "all") {
        const list = subCategories[activeUnivers] || [];
        const activeFilter =
          list.find((sub) => sub.key === activeSubCategory) || list[0];

        if (activeFilter?.categoryId) {
          params.set("category", String(activeFilter.categoryId));
        }
        if (activeFilter?.search) {
          params.set("search", activeFilter.search);
        }
      }

      const res = await fetch(`/api/woocommerce/products?${params.toString()}`);
      if (!res.ok) throw new Error("Erreur de chargement des produits");
      
      const data = await res.json();
      setProducts(data || []);
    } catch (e) {
      console.error("Erreur chargement produits:", e);
      setError(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="products-carousel container">
      <h2 className="section-title text-center mb-3 pb-xl-3 mb-xl-4">
        NOS MEILLEURS PRODUITS
      </h2>

      {/* Univers (ligne du haut) */}
      <div
        className="mb-2"
        style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}
      >
        {universList.map((u) => (
          <button
            key={u.key}
            onClick={() => {
              setActiveUnivers(u.key);
              if (u.key === "all") {
                setActiveSubCategory("");
              } else {
                const first = subCategories[u.key]?.[0];
                setActiveSubCategory(first ? first.key : "");
              }
            }}
            className={`btn ${
              activeUnivers === u.key ? "btn-primary" : "btn-outline-primary"
            }`}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: activeUnivers === u.key ? 600 : 400,
              textTransform: "uppercase",
            }}
          >
            {u.label}
          </button>
        ))}
      </div>

      {/* Sous-catégories (ligne du bas) */}
      {activeUnivers !== "all" && subCategories[activeUnivers] && (
        <div
          className="mb-3 pb-1"
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}
        >
          {subCategories[activeUnivers].map((sub) => (
            <button
              key={sub.key}
              onClick={() => setActiveSubCategory(sub.key)}
              className={`btn ${
                activeSubCategory === sub.key ? "btn-dark" : "btn-outline-dark"
              }`}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: activeSubCategory === sub.key ? 600 : 400,
              }}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* État de chargement */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {/* Erreur */}
      {error && !loading && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Grille de produits 4 colonnes, ligne par ligne */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-5">
          <p>Aucun produit trouvé dans cette catégorie.</p>
          <p className="text-muted">
            Ajoutez ou publiez des produits dans votre boutique WooCommerce pour les voir apparaître ici.
          </p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product, index) => {
            const imageUrl =
              product.images?.[0]?.src || "/assets/images/products/default.jpg";
            const productTitle = product.name || "Produit sans nom";
            const productPrice = product.price || "0";
            const productId = product.id;

            return (
              <div key={`${productId}-${index}`} className="col">
                <div className="product-card h-100 d-flex flex-column">
                  <div className="pc__img-wrapper">
                    <Link href={`/product/${productId}`}>
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
                    <button
                      className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                      onClick={() => addProductToCart(productId)}
                      title={
                        isAddedToCartProducts(productId)
                          ? "Déjà dans le panier"
                          : "Ajouter au panier"
                      }
                    >
                      {isAddedToCartProducts(productId)
                        ? "Déjà dans le panier"
                        : "Ajouter au panier"}
                    </button>
                  </div>

                  <div className="pc__info position-relative mt-2">
                    <p className="pc__category">
                      {product.categories?.[0]?.name || "Non catégorisé"}
                    </p>
                    <h6 className="pc__title">
                      <Link href={`/product/${productId}`}>{productTitle}</Link>
                    </h6>
                    <div className="product-card__price d-flex">
                      <span className="money price">${productPrice}</span>
                    </div>

                    <button
                      className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                        isAddedtoWishlist(productId) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(productId)}
                      title="Ajouter à la liste de souhaits"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_heart" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-4">
        <Link href="/products" className="btn btn-outline-primary">
          Voir tous les produits
        </Link>
      </div>
    </section>
  );
}

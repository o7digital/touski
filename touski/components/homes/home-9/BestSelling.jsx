"use client";
const filterCategories4 = ["Featured", "Best Seller", "Sales"];
import { useContextElement } from "@/context/Context";
import { products16 } from "@/data/products/fashion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BestSelling() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const [currentCategory, setCurrentCategory] = useState(filterCategories4[0]);
  const [filtered, setFiltered] = useState(products16);
  // CJ state
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [pageSize, setPageSize] = useState(12);
  const [cjItems, setCjItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (currentCategory == "All") {
      setFiltered(products16);
    } else {
      setFiltered([
        ...products16.filter((elm) => elm.filterCategory == currentCategory),
      ]);
    }
  }, [currentCategory]);

  useEffect(() => {
    // Load CJ at mount; show something by default
    loadCJ({ query: "home", size: 12 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCJ({
    query = q,
    size = pageSize,
    category: cat = category,
    min = minPrice,
    max = maxPrice,
    s = sort,
  } = {}) {
    setLoading(true);
    setError("");
    try {
      const url = new URL(`/api/cj/products`, window.location.origin);
      if (query) url.searchParams.set("q", query);
      url.searchParams.set("page", "1");
      url.searchParams.set("pageSize", String(size));
      url.searchParams.set("strict", "1");
      if (cat) url.searchParams.set("category", cat);
      if (min) url.searchParams.set("minPrice", String(min));
      if (max) url.searchParams.set("maxPrice", String(max));
      if (s) url.searchParams.set("sort", s);
      const res = await fetch(url, { cache: "no-store" });
      const j = await res.json();
      if (!res.ok || !j?.ok) throw new Error(j?.error || `HTTP ${res.status}`);
      setCjItems(Array.isArray(j.items) ? j.items : []);
    } catch (e) {
      setError(String(e?.message || e));
      setCjItems([]);
    } finally {
      setLoading(false);
    }
  }

  function money(v) {
    if (v == null || Number.isNaN(Number(v))) return "";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
      }).format(Number(v));
    } catch {
      return `$${Number(v).toFixed(2)}`;
    }
  }

  return (
    <section className="products-carousel container">
      <h2 className="section-title text-center fw-normal text-uppercase mb-1 mb-md-3 pb-xl-3">
        Best Selling Products
      </h2>

      {/* Filtre CJ (dans l’onglet Featured) */}
      {currentCategory === "Featured" && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadCJ({ query: q, size: pageSize, category, min: minPrice, max: maxPrice, s: sort });
        }}
        className="mb-3 pb-3 mb-xl-4"
        style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Recherche (ex: house, home, kitchen)"
          style={{ padding: 8, minWidth: 260, flex: 1 }}
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Catégorie"
          style={{ padding: 8, width: 180 }}
        />
        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Prix min"
          style={{ padding: 8, width: 120 }}
          inputMode="decimal"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Prix max"
          style={{ padding: 8, width: 120 }}
          inputMode="decimal"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: 8 }}>
          <option value="">Tri (défaut)</option>
          <option value="price_asc">Prix ↑</option>
          <option value="price_desc">Prix ↓</option>
        </select>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ padding: 8 }}>
          {[12, 16, 20, 24, 28, 32].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-outline-dark">
          {loading ? "Chargement…" : "Filtrer"}
        </button>
      </form>
      )}

      {currentCategory === "Featured" && error ? (
        <p className="text-danger text-center">Erreur: {error}</p>
      ) : null}

      <ul
        className="nav nav-tabs mb-3 pb-3 mb-xl-4 text-uppercase justify-content-center"
        id="collections-tab"
        role="tablist"
      >
        {filterCategories4.map((elm, i) => (
          <li
            onClick={() => setCurrentCategory(elm)}
            key={i}
            className="nav-item"
            role="presentation"
          >
            <a
              className={`nav-link nav-link_underscore ${
                currentCategory == elm ? "active" : ""
              }`}
            >
              {elm}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content pt-2" id="collections-tab-content">
        <div
          className="tab-pane fade show active"
          id="collections-tab-1"
          role="tabpanel"
          aria-labelledby="collections-tab-1-trigger"
        >
          <div className="row">
            {((currentCategory === "Featured" && cjItems.length) ? cjItems : filtered).map((elm, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    {(currentCategory === "Featured" && cjItems.length) ? (
                      // CJ card image: direct child of pc__img-wrapper to reuse theme ratio
                      <>
                        {Array.isArray(elm.images) && elm.images[0] ? (
                          <img
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            src={elm.images[0]}
                            alt={elm.name || "Produit"}
                            className="pc__img"
                          />
                        ) : null}
                      </>
                    ) : (
                      // Original demo with swiper (mock data)
                      <Swiper
                        modules={[Navigation]}
                        navigation={{
                          prevEl: `${`.pc__img-prev-${i}`} `,
                          nextEl: `${`.pc__img-next-${i}`} `,
                        }}
                        className="swiper-container background-img js-swiper-slider"
                      >
                        {[1, 2, 3].map((elm2, i2) => (
                          <SwiperSlide key={i2} className="swiper-slide">
                            <Link href={`/product1_simple/${elm.id}`}>
                              <Image
                                loading="lazy"
                                src={elm.imgSrc}
                                width="330"
                                height="400"
                                alt="Colorful Jacket"
                                className="pc__img"
                              />
                            </Link>
                          </SwiperSlide>
                        ))}

                        <span className={`cursor-pointer pc__img-prev ${`pc__img-prev-${i}`} `}>
                          <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_prev_sm" />
                          </svg>
                        </span>
                        <span className={`cursor-pointer pc__img-next ${`pc__img-next-${i}`} `}>
                          <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_next_sm" />
                          </svg>
                        </span>
                      </Swiper>
                    )}

                    {!(currentCategory === "Featured" && cjItems.length) && (
                      <button
                        className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                        onClick={() => addProductToCart(elm.id)}
                        title={
                          isAddedToCartProducts(elm.id) ? "Already Added" : "Add to Cart"
                        }
                      >
                        <svg className="d-inline-blockk align-middle mx-2" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href={`${isAddedToCartProducts(elm.id) ? "#icon_cart_added" : "#icon_cart"}`} />
                        </svg>
                        <span className="d-inline-block align-middle">
                          {isAddedToCartProducts(elm.id) ? "Already Added" : "Add To Cart"}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="pc__info position-relative">
                    {cjItems.length ? (
                      <>
                        <p className="pc__category">Fournisseur</p>
                        <h6 className="pc__title mb-2">
                          <a>{elm.name || "Sans nom"}</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">{money(elm.price)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="pc__category">{elm.category}</p>
                        <h6 className="pc__title mb-2">
                          <Link href={`/product1_simple/${elm.id}`}>{elm.title}</Link>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">${elm.price}</span>
                        </div>

                        <button
                          className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                            isAddedtoWishlist(elm.id) ? "active" : ""
                          }`}
                          onClick={() => toggleWishlist(elm.id)}
                          title="Add To Wishlist"
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- /.row --> */}
          <div className="text-center mt-2">
            <Link
              className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
              href="/shop-1"
            >
              See All Products
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- /.tab-content pt-2 --> */}
    </section>
  );
}

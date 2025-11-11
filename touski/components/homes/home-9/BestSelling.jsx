"use client";
const filterCategories4 = ["À la une", "Meilleures ventes", "Soldes"];
import { useContextElement } from "@/context/Context";
import { products16 } from "@/data/products/fashion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BestSelling() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const [currentCategory, setCurrentCategory] = useState(filterCategories4[0]);
  const [filtered, setFiltered] = useState(products16);
  // CJ state
  const [q, setQ] = useState("home");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [pageSize, setPageSize] = useState(180);
  const [cjItems, setCjItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cjCategories, setCjCategories] = useState([]);
  const [cjTotal, setCjTotal] = useState(0);
  const [cjCandidates, setCjCandidates] = useState(0);
  const reqIdRef = useRef(0);
  const abortRef = useRef(null);
  const [hadNonEmpty, setHadNonEmpty] = useState(false);
  const universList = [
    { label: "Maison", key: "home" },
    { label: "Jardin", key: "garden" },
    { label: "Meubles", key: "furniture" },
  ];
  const [universSelected, setUniversSelected] = useState("");
  const [resolvedCategory, setResolvedCategory] = useState(null);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [preset, setPreset] = useState("");
  const [page, setPage] = useState(1);
  const [subSelected, setSubSelected] = useState("");

  // Curated sub-categories per univers (fuzzy mapped to CJ categories)
  const subUnivers = {
    home: [
      { key: "home_textiles", label: "Home Textiles", tokens: ["home textiles","curtain","towel","bedding","pillow","comforter","bedding set","cushion cover"] },
      { key: "kitchen_dining_bar", label: "Kitchen, Dining & Bar", tokens: ["kitchen","dining","bar","cookware","utensil","cutlery","knife"] },
      { key: "home_storage", label: "Home Storage", tokens: ["home storage","storage","organizer","rack","shelf","box","basket","hanger","hook"] },
      { key: "festive_party", label: "Festive & Party", tokens: ["festive","party","party supplies","balloon","decoration"] },
      { key: "arts_crafts_sewing", label: "Arts, Crafts & Sewing", tokens: ["arts","crafts","sewing"] },
      { key: "musical_instruments", label: "Musical Instruments", tokens: ["musical instrument","guitar","piano","drum","violin"] },
    ],
    garden: [
      { key: "garden_tools", label: "Garden Tools", tokens: ["garden tool","pruner","spade","rake","hoe"] },
      { key: "patio_outdoor", label: "Patio / Outdoor", tokens: ["patio","outdoor","furniture outdoor","umbrella"] },
      { key: "solar_lights", label: "Solar Lights", tokens: ["solar light","garden light","lantern"] },
      { key: "planters", label: "Planters", tokens: ["planter","plant pot","flower pot"] },
    ],
    furniture: [
      { key: "sofas", label: "Sofas", tokens: ["sofa","couch","loveseat"] },
      { key: "chairs", label: "Chairs", tokens: ["chair","stool","bench"] },
      { key: "tables_desks", label: "Tables & Desks", tokens: ["table","desk","coffee table","side table"] },
      { key: "storage_furniture", label: "Storage Furniture", tokens: ["wardrobe","cabinet","dresser","drawer","shelf","bookcase","nightstand"] },
    ],
  };
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
    // Preload CJ categories (flattened) and initial products
    (async () => {
      try {
        const r = await fetch(`/api/cj/categories?strict=1`, { cache: 'no-store' });
        if (r.ok) {
          const j = await r.json();
          const items = Array.isArray(j.items) ? j.items : [];
          setCjCategories(items);
        }
      } catch {}
      setPreset('home');
      setUniversSelected('home');
      setPage(1);
      loadCJ({ query: '', size: pageSize, preset: 'home', pageNum: 1 });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCJ({
    query = q,
    size = pageSize,
    category: cat = category,
    categoryId: catId,
    min = minPrice,
    max = maxPrice,
    s = sort,
    preset: presetKey = preset,
    pageNum = page,
    append = false,
  } = {}) {
    // Prepare request guards
    reqIdRef.current += 1;
    const myId = reqIdRef.current;
    // Abort any in-flight request
    try { abortRef.current?.abort(); } catch {}
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError("");
    try {
      // Normalize search terms (FR → EN, synonyms)
      const norm = (str) => String(str || "").trim().toLowerCase();
      const qn0 = norm(query);
      const cn0 = norm(cat);
      let qn = qn0;
      // If no query, try using category as a query term
      if (!qn && cn0) qn = cn0;
      // Map common FR/EN tokens to CJ-friendly search
      const map = {
        maison: "home",
        house: "home",
        domicile: "home",
        salle: "bath",
        "salle de bain": "bath",
        bain: "bath",
        cuisine: "kitchen",
        luminaire: "lighting",
        lumiere: "lighting",
        eclairage: "lighting",
        jardin: "garden",
        meuble: "furniture",
        meubles: "furniture",
        furnishing: "furniture",
        furniture: "furniture",
        fourniture: "furniture",
        fournitures: "furniture",
        detergent: "detergent",
        detergents: "detergent",
      };
      const qnMapped = map[qn] || qn;

      const url = new URL(`/api/cj/products`, window.location.origin);
      if (qnMapped) url.searchParams.set("q", qnMapped);
      url.searchParams.set("page", String(pageNum || 1));
      url.searchParams.set("pageSize", String(size));
      if (presetKey) url.searchParams.set("preset", presetKey);
      // Allow server to try multiple CJ endpoints by default (no strict)
      // Prefer categoryId (explicit override), else resolve from text; fallback to `category` text
      if (catId) {
        url.searchParams.set("categoryId", String(catId));
      } else if (cn0) {
        // If numeric id was typed, use it directly
        const isNumericId = /^\d+$/.test(cat.trim());
        if (isNumericId) {
          url.searchParams.set("categoryId", cat.trim());
        } else {
          // Try to resolve by category name from CJ categories
          const match = (() => {
            if (!Array.isArray(cjCategories) || !cjCategories.length) return null;
            const candidates = cjCategories.filter((c) => {
              const n = String(c?.name || '').toLowerCase();
              const p = (c?.path || []).join(' ').toLowerCase();
              return n.includes(cn0) || p.includes(cn0);
            });
            // Prefer deeper levels (more specific)
            candidates.sort((a,b) => (b.level||0) - (a.level||0));
            return candidates[0] || null;
          })();
          if (match?.id) {
            url.searchParams.set("categoryId", String(match.id));
          } else {
            url.searchParams.set("category", cn0);
          }
        }
      }
      // Force language to English to get richer results
      url.searchParams.set("language", "EN");
      if (min) url.searchParams.set("minPrice", String(min));
      if (max) url.searchParams.set("maxPrice", String(max));
      if (s) url.searchParams.set("sort", s);
      const res = await fetch(url, { cache: "no-store", signal: controller.signal });
      const j = await res.json();
      if (!res.ok || !j?.ok) throw new Error(j?.error || `HTTP ${res.status}`);
      let items = Array.isArray(j.items) ? j.items : [];
      // Do not re-filter on client; server already applies any preset filtering
      if (myId === reqIdRef.current) {
        if (items.length > 0) {
          setCjItems((prev) => (append ? [...prev, ...items] : items));
          setHadNonEmpty(true);
        } else if (!append) {
          // Keep previous items visible when a request returns empty
          // to avoid flicker; message will still indicate 0 if none ever loaded
        }
        setCjTotal(Number(j.total || 0));
        setCjCandidates(Number(j.totalCandidates || 0));
      }
    } catch (e) {
      // Ignore aborted requests; keep current items visible
      if (e?.name === 'AbortError') return;
      setError(String(e?.message || e));
      // Do NOT clear cjItems on error; keep previous results
    } finally {
      if (myId === reqIdRef.current) setLoading(false);
    }
  }

  function resolveByTokens(tokens = []) {
    if (!Array.isArray(cjCategories) || !cjCategories.length) return null;
    const lowerTokens = tokens.map((t) => String(t || "").toLowerCase());
    const scored = cjCategories
      .map((c) => {
        const name = String(c?.name || "").toLowerCase();
        const path = (c?.path || []).join(" ").toLowerCase();
        let score = 0;
        for (const t of lowerTokens) {
          if (!t) continue;
          if (name.includes(t)) score += 3;
          if (path.includes(t)) score += 2;
        }
        score += (c.level || 0) * 0.5;
        return { c, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.length ? scored[0].c : null;
  }

  function resolveUnivers(key) {
    if (!Array.isArray(cjCategories) || !cjCategories.length) return null;
    const tokens = {
      home: ["home","kitchen","bath","lighting","decor","bedding"],
      garden: ["garden","outdoor","patio","plant","lawn"],
      furniture: ["furniture","sofa","chair","table","desk","bed","wardrobe","cabinet","shelf"],
    }[key] || [key];
    const lowerTokens = tokens.map((t) => t.toLowerCase());
    const scored = cjCategories
      .map((c) => {
        const name = String(c?.name || "").toLowerCase();
        const path = (c?.path || []).join(" ").toLowerCase();
        let score = 0;
        for (const t of lowerTokens) {
          if (name.includes(t)) score += 3;
          if (path.includes(t)) score += 2;
        }
        // Prefer deeper levels for specificity
        score += (c.level || 0) * 0.5;
        return { c, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.length ? scored[0].c : null;
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
        Nos meilleurs produits
      </h2>

      {/* Univers selector (mapped to CJ categoryId) */}
      <div className="mb-2" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {universList.map((u) => {
          const active = universSelected === u.key;
          return (
            <button
              key={u.key}
              type="button"
              onClick={() => {
                const cat = resolveUnivers(u.key);
                const id = cat?.id;
                setUniversSelected(u.key);
                setResolvedCategory(cat || null);
                setPreset(u.key);
                setPage(1);
                setSubSelected("");
                setHadNonEmpty(false);
                // Clear free-text query to rely on preset/category
                setQ("");
                setCategory("");
                setCurrentCategory("Featured");
                loadCJ({ query: "", size: pageSize, category: "", categoryId: id, preset: u.key, pageNum: 1, append: false });
              }}
              style={{
                border: active ? "none" : "1px solid #ccc",
                backgroundColor: active ? "rgb(239, 99, 40)" : "#fff",
                color: active ? "#fff" : "#222",
                borderRadius: 8,
                padding: "6px 10px",
                cursor: "pointer",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {u.label}
            </button>
          );
        })}
      </div>
      {/* Sub-univers chips (appear when a univers is selected) */}
      {universSelected && subUnivers[universSelected] && (
        <div className="mb-2" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              // Clear sub-category
              setSubSelected("");
              setSelectedCatId("");
              setResolvedCategory(null);
              setPage(1);
              loadCJ({ query: "", size: 60, category: "", categoryId: undefined, preset: universSelected, pageNum: 1, append: false });
            }}
            style={{
              border: subSelected === "" ? "none" : "1px solid #ccc",
              backgroundColor: subSelected === "" ? "rgb(239, 99, 40)" : "#fff",
              color: subSelected === "" ? "#fff" : "#222",
              borderRadius: 8,
              padding: "4px 10px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Tous
          </button>
          {subUnivers[universSelected].map((s) => {
            const active = subSelected === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  const match = resolveByTokens(s.tokens);
                  const id = match?.id;
                  setSubSelected(s.key);
                  setSelectedCatId(id ? String(id) : "");
                  setResolvedCategory(match || null);
                  setPage(1);
                  setCurrentCategory("Featured");
                  loadCJ({ query: id ? "" : (s.tokens?.[0] || ""), size: 60, category: "", categoryId: id, preset: universSelected, pageNum: 1, append: false });
                }}
                style={{
                  border: active ? "none" : "1px solid #ccc",
                  backgroundColor: active ? "rgb(239, 99, 40)" : "#fff",
                  color: active ? "#fff" : "#222",
                  borderRadius: 8,
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}
      {resolvedCategory ? (
        <div className="text-center mb-3" style={{ fontSize: 13, color: "#666" }}>
          Catégorie CJ: {Array.isArray(resolvedCategory.path) && resolvedCategory.path.length
            ? resolvedCategory.path.join(" > ")
            : (resolvedCategory.name || "")} (#{resolvedCategory.id})
        </div>
      ) : null}

      {/* Etat chargement + compteur de résultats */}
      {currentCategory === filterCategories4[0] && (
        <div className="text-center mb-2" aria-live="polite">
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              Chargement…
            </>
          ) : (
            <small style={{ color: "#666" }}>
              Résultats CJ: {cjItems.length}
              {cjCandidates ? ` / ~${cjCandidates}` : cjTotal ? ` / ~${cjTotal}` : ''}
            </small>
          )}
        </div>
      )}

      {/* Menu déroulant des catégories CJ */}
      <div className="mb-3 pb-1" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <select
          value={selectedCatId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedCatId(id);
            setUniversSelected("");
            // Trouver l'objet catégorie correspondant pour affichage
            const catObj = cjCategories.find((c) => String(c.id) === String(id));
            setResolvedCategory(catObj || null);
            // Nettoyer recherche libre et champ texte catégorie
            setQ("");
            setCategory("");
            setCurrentCategory(filterCategories4[0]);
            setHadNonEmpty(false);
            loadCJ({ query: "", size: pageSize, category: "", categoryId: id || undefined });
          }}
          style={{ padding: 8, minWidth: 280 }}
        >
          <option value="">Toutes les catégories (par défaut)</option>
          {cjCategories
            .slice()
            .sort((a, b) => {
              const pa = (a.path || []).join(" > ") || a.name || "";
              const pb = (b.path || []).join(" > ") || b.name || "";
              return pa.localeCompare(pb);
            })
            .map((c) => {
              const label = (Array.isArray(c.path) && c.path.length ? c.path.join(" > ") : c.name) || String(c.id);
              return (
                <option key={c.id} value={c.id}>
                  {label}
                </option>
              );
            })}
        </select>
        {selectedCatId ? (
          <button
            type="button"
            onClick={() => {
              setSelectedCatId("");
              setResolvedCategory(null);
              loadCJ({ query: q || "home", size: pageSize, category: "", categoryId: undefined });
            }}
            className="btn btn-outline-dark"
          >
            Réinitialiser
          </button>
        ) : null}
      </div>

      {/* Filtre CJ (dans l’onglet Featured) */}
      {currentCategory === filterCategories4[0] && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentCategory(filterCategories4[0]);
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
        <select
          value={pageSize}
          onChange={(e) => {
            const n = Number(e.target.value);
            setPageSize(n);
            // refresh immediately when page size changes
            setCurrentCategory("Featured");
            loadCJ({ query: q, size: n, category, min: minPrice, max: maxPrice, s: sort });
          }}
          style={{ padding: 8 }}
        >
          {[24, 48, 96, 120, 180, 240].map((n) => (
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

      {currentCategory === filterCategories4[0] && error ? (
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
          {currentCategory === filterCategories4[0] && !loading && !error && cjItems.length === 0 && !hadNonEmpty ? (
            <p className="text-center mb-2">Aucun produit CJ pour ces filtres.</p>
          ) : null}
          <div className="row">
            {((currentCategory === filterCategories4[0]) ? cjItems : filtered).map((elm, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
            {(currentCategory === filterCategories4[0]) ? (
                      // CJ card image: direct child of pc__img-wrapper to reuse theme ratio
                      <>
                        {(() => {
                          const imgSrc = (Array.isArray(elm.images) && elm.images[0]) || elm?.raw?.productImage || elm?.raw?.image || elm?.raw?.imgUrl || elm?.raw?.imageUrls?.split?.(",")?.[0];
                          return imgSrc ? (
                          <img
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            src={imgSrc}
                            alt={elm.name || "Produit"}
                            className="pc__img"
                          />
                          ) : null;
                        })()}
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

                    {!(currentCategory === filterCategories4[0]) && (
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
                    {currentCategory === filterCategories4[0] ? (
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
        <button
          type="button"
          className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
          onClick={() => {
            // Load next page when using CJ results (Featured)
            setCurrentCategory("Featured");
            if (preset || selectedCatId || resolvedCategory?.id || q || category) {
              const next = page + 1;
              setPage(next);
              loadCJ({ query: q, size: pageSize, category, categoryId: selectedCatId || resolvedCategory?.id, min: minPrice, max: maxPrice, s: sort, preset, pageNum: next, append: true });
            } else {
              // fallback: increase page size on demo data
              const more = pageSize + 24;
              setPageSize(more);
              loadCJ({ query: q, size: more, category, min: minPrice, max: maxPrice, s: sort });
            }
          }}
        >
          {loading ? 'Chargement…' : 'Voir tous les produits'}
        </button>
      </div>
        </div>
      </div>
      {/* <!-- /.tab-content pt-2 --> */}
    </section>
  );
}

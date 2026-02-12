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

const antiDraftSeoIntroContent = {
  title: {
    fr: "Bas de porte, coupe-froid et joints: guide anti-courants d'air",
    en: "Door sweeps, draft stoppers and seals: draft-proofing guide",
    de: "Tuerdichtungen, Zugluftstopper und Dichtbaender: Ratgeber gegen Zugluft",
    es: "Burletes, cortavientos y juntas: guia anti corrientes de aire",
  },
  intro: {
    fr: "Pour reduire les pertes de chaleur en hiver, il faut traiter chaque zone sensible: dessous de porte, contour de porte, fenetres et seuils. Cette selection TOUSKI regroupe des solutions anti-courants d'air simples a poser pour ameliorer l'isolation thermique, augmenter le confort interieur et limiter la consommation de chauffage au Canada.",
    en: "To reduce heat loss in winter, you need to seal every sensitive area: under doors, door frames, windows and thresholds. This TOUSKI selection brings together easy draft-proofing solutions to improve thermal insulation, increase indoor comfort and help lower heating use in Canada.",
    de: "Um Waermeverluste im Winter zu reduzieren, sollten alle kritischen Bereiche abgedichtet werden: unter der Tuer, am Tuerrahmen, an Fenstern und an Schwellen. Diese TOUSKI-Auswahl vereint einfach zu montierende Zugluftschutz-Loesungen fuer bessere Waermedaemmung, mehr Wohnkomfort und geringeren Heizbedarf in Kanada.",
    es: "Para reducir la perdida de calor en invierno, hay que sellar cada zona sensible: bajo la puerta, marcos, ventanas y umbrales. Esta seleccion de TOUSKI reune soluciones anti corrientes de aire faciles de instalar para mejorar el aislamiento termico, aumentar el confort interior y ayudar a bajar el consumo de calefaccion en Canada.",
  },
  guideCta: {
    fr: "Voir le guide complet anti-courants d'air",
    en: "Read the full draft-proofing guide",
    de: "Zum vollstaendigen Zugluftschutz-Ratgeber",
    es: "Ver la guia completa anti corrientes de aire",
  },
  items: [
    {
      key: "door-bottom-double",
      subCategories: ["bas-de-porte"],
      title: {
        fr: "Bas de porte isolant double boudin",
        en: "Double draft stopper door sweep",
        de: "Doppelter Tuerzugstopper fuer den Tuerspalt",
        es: "Burlete doble aislante para puerta",
      },
      description: {
        fr: "Le bas de porte isolant double boudin bloque l'air froid qui passe sous la porte. C'est souvent la premiere action a faire pour supprimer la sensation de sol froid et garder une temperature plus stable dans les pieces de vie.",
        en: "A double draft stopper blocks cold air coming from the gap under the door. It is often the first high-impact fix to remove cold-floor sensation and keep room temperature more stable.",
        de: "Ein doppelter Tuerzugstopper blockiert kalte Luft im Tuerspalt. Das ist oft die erste und wirksamste Massnahme, um kalte Zugluft am Boden zu stoppen und die Raumtemperatur stabil zu halten.",
        es: "El burlete doble aislante bloquea el aire frio que entra por debajo de la puerta. Suele ser la primera accion de alto impacto para eliminar la sensacion de suelo frio y mantener una temperatura mas estable.",
      },
    },
    {
      key: "silicone-door-seal",
      subCategories: ["joints-bandes-etancheite"],
      title: {
        fr: "Coupe-froid adhesif silicone pour portes",
        en: "Silicone adhesive door weather strip",
        de: "Selbstklebende Silikon-Dichtung fuer Tueren",
        es: "Cortavientos adhesivo de silicona para puertas",
      },
      description: {
        fr: "Le coupe-froid adhesif silicone comble les micro-espaces sur les cotes et le haut de la porte. Il renforce l'etancheite a l'air autour du cadre et limite les infiltrations responsables d'une perte de chaleur continue.",
        en: "Silicone adhesive weather stripping seals micro-gaps on the sides and top of the door. It improves air tightness around the frame and reduces continuous heat loss caused by hidden drafts.",
        de: "Selbstklebende Silikon-Dichtung schliesst kleinste Spalten an den Seiten und oben an der Tuer. Sie verbessert die Luftdichtheit am Rahmen und reduziert dauerhafte Waermeverluste durch verdeckte Zugluft.",
        es: "El cortavientos adhesivo de silicona sella micro espacios en los lados y en la parte superior de la puerta. Mejora la hermeticidad del marco y reduce la perdida continua de calor por corrientes ocultas.",
      },
    },
    {
      key: "window-seal-tape",
      subCategories: ["joints-bandes-etancheite"],
      title: {
        fr: "Joint d'etancheite fenetre 10 m",
        en: "10 m window sealing strip",
        de: "Fensterdichtung 10 m",
        es: "Junta de sellado para ventana 10 m",
      },
      description: {
        fr: "Le joint d'etancheite pour fenetres traite les fuites d'air autour des ouvrants. Sur une longue periode de chauffage, ce type de joint aide a garder une ambiance interieure reguliere et plus confortable.",
        en: "A window sealing strip targets air leaks around window frames and moving parts. Across the heating season, this type of seal helps maintain a steadier and more comfortable indoor climate.",
        de: "Eine Fensterdichtung reduziert Luftlecks rund um Rahmen und bewegliche Fluegel. Ueber die Heizsaison hinweg hilft sie, ein gleichmaessigeres und komfortableres Raumklima zu erhalten.",
        es: "La junta de sellado para ventanas reduce las filtraciones de aire en marcos y hojas moviles. Durante toda la temporada de calefaccion, ayuda a mantener un ambiente interior mas estable y confortable.",
      },
    },
    {
      key: "foam-weather-strip",
      subCategories: ["joints-bandes-etancheite"],
      title: {
        fr: "Bande mousse haute densite",
        en: "High-density foam weather strip",
        de: "Hochdichtes Schaumstoff-Dichtband",
        es: "Banda de espuma de alta densidad",
      },
      description: {
        fr: "La bande mousse haute densite est utile pour rattraper des irregularites de surface et completer un joint principal. Elle limite les passages d'air dans les zones difficiles et optimise la performance globale de l'isolation.",
        en: "High-density foam strip helps compensate for uneven surfaces and complements your main seal. It reduces airflow in difficult areas and improves overall draft-proofing performance.",
        de: "Hochdichtes Schaumstoff-Dichtband gleicht unebene Flaechen aus und ergaenzt die Hauptdichtung. So werden Luftstroeme an schwierigen Stellen reduziert und die Gesamtwirkung verbessert.",
        es: "La banda de espuma de alta densidad sirve para compensar irregularidades y complementar la junta principal. Reduce el paso de aire en zonas dificiles y mejora el rendimiento global del sellado.",
      },
    },
    {
      key: "threshold-brush",
      subCategories: ["seuils-accessoires"],
      title: {
        fr: "Brosse de seuil renforcee",
        en: "Reinforced threshold brush",
        de: "Verstaerkte Schwellenbuerste",
        es: "Cepillo reforzado para umbral",
      },
      description: {
        fr: "La brosse de seuil renforcee cree une barriere supplementaire au niveau de l'entree. Elle est adaptee aux passages frequents et aide a reduire l'entree d'air froid, de poussiere et d'humidite.",
        en: "A reinforced threshold brush creates an extra barrier at the entrance. It is suitable for high-traffic doors and helps reduce incoming cold air, dust and moisture.",
        de: "Eine verstaerkte Schwellenbuerste bildet eine zusaetzliche Barriere im Eingangsbereich. Sie eignet sich fuer haeufig genutzte Tueren und reduziert kalte Luft, Staub und Feuchtigkeit.",
        es: "El cepillo reforzado para umbral crea una barrera extra en la entrada. Es ideal para puertas de uso frecuente y ayuda a reducir la entrada de aire frio, polvo y humedad.",
      },
    },
    {
      key: "full-kit",
      subCategories: ["seuils-accessoires"],
      title: {
        fr: "Kit complet anti-courants d'air 4 ouvertures",
        en: "Complete 4-opening draft-proofing kit",
        de: "Komplettset Zugluftschutz fuer 4 Oeffnungen",
        es: "Kit completo anti corrientes de aire para 4 aberturas",
      },
      description: {
        fr: "Le kit complet anti-courants d'air permet de traiter plusieurs portes et fenetres en une seule intervention. C'est une approche pratique pour standardiser l'etancheite dans un appartement ou une maison et gagner du temps a l'installation.",
        en: "A complete draft-proofing kit lets you seal multiple doors and windows in one project. It is a practical way to standardize air sealing across an apartment or house while saving installation time.",
        de: "Mit einem kompletten Zugluftschutz-Set lassen sich mehrere Tueren und Fenster in einem Schritt abdichten. Das ist ein praktischer Weg, die Luftdichtheit in Wohnung oder Haus einheitlich zu verbessern und Montagezeit zu sparen.",
        es: "Un kit completo anti corrientes de aire permite sellar varias puertas y ventanas en una sola intervencion. Es una forma practica de estandarizar la hermeticidad en casa o apartamento y ahorrar tiempo de instalacion.",
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

function getDefaultSubCategory(topCategory) {
  if (topCategory === "anti-courants-air") return "bas-de-porte";
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
      : getDefaultSubCategory(getTopCategoryFromSlug(urlCategorySlug))
  );

  useEffect(() => {
    const topFromUrl = getTopCategoryFromSlug(urlCategorySlug);
    setSelectedTopCategory(topFromUrl);
    setSelectedSubCategory(
      subCategoryDefsByTop[topFromUrl]?.some((subcat) => subcat.key === urlCategorySlug)
        ? urlCategorySlug
        : getDefaultSubCategory(topFromUrl)
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
  const antiDraftSeoIntro = useMemo(() => {
    if (selectedTopCategory !== "anti-courants-air") return null;

    const visibleItems =
      selectedSubCategory === "all"
        ? antiDraftSeoIntroContent.items
        : antiDraftSeoIntroContent.items.filter((item) =>
            item.subCategories.includes(selectedSubCategory)
          );

    return {
      title: getLocaleValue(antiDraftSeoIntroContent.title, locale),
      intro: getLocaleValue(antiDraftSeoIntroContent.intro, locale),
      guideCta: getLocaleValue(antiDraftSeoIntroContent.guideCta, locale),
      guideHref: withLocale("/anti-courants-air", locale),
      items: visibleItems.map((item) => ({
        key: item.key,
        title: getLocaleValue(item.title, locale),
        description: getLocaleValue(item.description, locale),
      })),
    };
  }, [locale, selectedSubCategory, selectedTopCategory]);

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
                  setSelectedSubCategory(getDefaultSubCategory(category.key));
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

          {antiDraftSeoIntro && antiDraftSeoIntro.items.length > 0 && (
            <section
              style={{
                margin: "12px 0 28px",
                padding: "20px",
                border: "1px solid #ececec",
                borderRadius: 12,
                backgroundColor: "#fcfcfc",
              }}
            >
              <h2 style={{ fontSize: 24, marginBottom: 12 }}>{antiDraftSeoIntro.title}</h2>
              <p
                className="text-secondary"
                style={{ marginBottom: 18, fontSize: 15, lineHeight: 1.7 }}
              >
                {antiDraftSeoIntro.intro}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 14,
                }}
              >
                {antiDraftSeoIntro.items.map((item) => (
                  <article
                    key={item.key}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #efefef",
                      borderRadius: 10,
                      padding: 14,
                    }}
                  >
                    <h3 style={{ fontSize: 16, marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ marginBottom: 0, fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
              <p style={{ marginTop: 14, marginBottom: 0, fontSize: 14 }}>
                <Link href={antiDraftSeoIntro.guideHref}>{antiDraftSeoIntro.guideCta}</Link>
              </p>
            </section>
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

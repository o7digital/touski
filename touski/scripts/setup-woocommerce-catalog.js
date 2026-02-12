#!/usr/bin/env node

/**
 * Initialise le catalogue WooCommerce TOUSKI:
 * - Categories piliers + sous-categories
 * - Descriptions SEO categories
 * - 12 produits placeholder publies
 */

const path = require("path");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const catalog = JSON.parse(
  fs.readFileSync(
    path.resolve(process.cwd(), "data/catalogPlaceholders.json"),
    "utf8"
  )
);

const url = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const allowInsecureTls = process.env.WOO_INSECURE_TLS === "1";

if (!url || !consumerKey || !consumerSecret) {
  console.error(
    "Variables manquantes. Definir NEXT_PUBLIC_WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY et WOOCOMMERCE_CONSUMER_SECRET dans .env.local"
  );
  process.exit(1);
}

const api = new WooCommerceRestApi({
  url,
  consumerKey,
  consumerSecret,
  version: "wc/v3",
  queryStringAuth: true,
  axiosConfig: allowInsecureTls
    ? {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    : undefined,
});

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getCategoryBySlug(slug) {
  const res = await api.get("products/categories", { slug, per_page: 100 });
  return Array.isArray(res.data) ? res.data.find((c) => c.slug === slug) : null;
}

async function upsertCategory(def, categoryIdBySlug) {
  const parentId = def.parent ? categoryIdBySlug.get(def.parent) || 0 : 0;
  const existing = await getCategoryBySlug(def.slug);

  if (existing) {
    const needsUpdate =
      existing.name !== def.name ||
      Number(existing.parent || 0) !== Number(parentId || 0) ||
      (existing.description || "") !== (def.description || "");

    if (needsUpdate) {
      await api.put(`products/categories/${existing.id}`, {
        name: def.name,
        parent: parentId,
        description: def.description,
      });
      console.log(`[UPDATE] Categorie: ${def.name}`);
    } else {
      console.log(`[OK] Categorie deja conforme: ${def.name}`);
    }

    categoryIdBySlug.set(def.slug, existing.id);
    return existing.id;
  }

  const created = await api.post("products/categories", {
    name: def.name,
    slug: def.slug,
    parent: parentId,
    description: def.description,
  });

  categoryIdBySlug.set(def.slug, created.data.id);
  console.log(`[CREATE] Categorie: ${def.name}`);
  return created.data.id;
}

async function getTagBySlug(slug) {
  const res = await api.get("products/tags", { slug, per_page: 100 });
  return Array.isArray(res.data) ? res.data.find((t) => t.slug === slug) : null;
}

async function upsertTag(name) {
  const slug = slugify(name);
  const existing = await getTagBySlug(slug);

  if (existing) return existing.id;

  const created = await api.post("products/tags", { name, slug });
  return created.data.id;
}

function buildWooAttributes(attributes) {
  return (attributes || []).map((attr, index) => ({
    name: attr.name,
    visible: true,
    variation: false,
    position: index,
    options: attr.options,
  }));
}

async function upsertProduct(productDef, categoryIdBySlug) {
  const categoryIds = (productDef.category_slugs || [])
    .map((slug) => categoryIdBySlug.get(slug))
    .filter(Boolean);

  const tagIds = [];
  for (const tagName of productDef.tags || []) {
    // eslint-disable-next-line no-await-in-loop
    const tagId = await upsertTag(tagName);
    if (tagId) tagIds.push(tagId);
  }

  const payload = {
    name: productDef.name,
    slug: productDef.slug,
    sku: productDef.sku,
    type: "simple",
    status: "publish",
    featured: Boolean(productDef.featured),
    regular_price: productDef.regular_price,
    description: productDef.description,
    short_description: productDef.short_description,
    stock_status: "instock",
    categories: categoryIds.map((id) => ({ id })),
    tags: tagIds.map((id) => ({ id })),
    attributes: buildWooAttributes(productDef.attributes),
    images: productDef.image
      ? [
          {
            src: productDef.image,
            alt: productDef.name,
          },
        ]
      : [],
  };

  const existing = await api.get("products", { sku: productDef.sku, per_page: 1, status: "any" });
  const match = Array.isArray(existing.data) ? existing.data[0] : null;

  if (match) {
    await api.put(`products/${match.id}`, payload);
    console.log(`[UPDATE] Produit: ${productDef.name}`);
    return match.id;
  }

  const created = await api.post("products", payload);
  console.log(`[CREATE] Produit: ${productDef.name}`);
  return created.data.id;
}

async function run() {
  try {
    console.log("Initialisation catalogue WooCommerce TOUSKI...");

    const categoryIdBySlug = new Map();

    // 1) Racines
    const roots = catalog.categoryTree.filter((c) => !c.parent);
    for (const cat of roots) {
      // eslint-disable-next-line no-await-in-loop
      await upsertCategory(cat, categoryIdBySlug);
    }

    // 2) Enfants
    const children = catalog.categoryTree.filter((c) => c.parent);
    for (const cat of children) {
      // eslint-disable-next-line no-await-in-loop
      await upsertCategory(cat, categoryIdBySlug);
    }

    // 3) Produits placeholder
    for (const product of catalog.products) {
      // eslint-disable-next-line no-await-in-loop
      await upsertProduct(product, categoryIdBySlug);
    }

    console.log("Catalogue WooCommerce initialise avec succes.");
  } catch (error) {
    console.error("Erreur setup catalogue:", error.response?.data || error.message);
    process.exit(1);
  }
}

run();

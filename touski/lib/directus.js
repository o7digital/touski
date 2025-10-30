// Minimal Directus REST helpers for Next.js (in-app for main branch)

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

if (!DIRECTUS_URL) {
  // eslint-disable-next-line no-console
  console.warn("DIRECTUS_URL is not set. Set NEXT_PUBLIC_DIRECTUS_URL in your env.");
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

export async function getProducts({ filter, fields, limit } = {}, accessToken) {
  const params = new URLSearchParams();
  if (fields) params.set("fields", fields);
  if (typeof limit === "number") params.set("limit", String(limit));
  if (filter) {
    for (const [k, v] of Object.entries(filter)) {
      if (typeof v === "object" && v !== null) {
        for (const [op, val] of Object.entries(v)) {
          params.set(`filter[${k}][${op}]`, String(val));
        }
      } else {
        params.set(`filter[${k}]`, String(v));
      }
    }
  }
  const authHeader = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : DIRECTUS_STATIC_TOKEN
    ? { Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}` }
    : {};

  const candidates = ["products", "Products", "product", "Product"];
  let lastErr = null;
  for (const col of candidates) {
    const res = await fetch(`${DIRECTUS_URL}/items/${col}?${params.toString()}`, {
      headers: authHeader,
      cache: 'no-store',
    });
    if (res.ok) return res.json();
    const err = await safeJson(res);
    lastErr = err?.errors?.[0]?.message || `${res.status} ${res.statusText}`;
    if (res.status !== 404) break; // if not found, try next candidate; else stop on other errors
  }
  throw new Error(lastErr || "Failed to fetch products");
}

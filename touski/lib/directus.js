// Minimal Directus REST helpers for Next.js (in-app for main branch)

function resolveDirectusUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_DIRECTUS_URL,
    process.env.DIRECTUS_URL,
    process.env.NEXT_PUBLIC_DIRECTUS_API_URL,
    process.env.DIRECTUS_API_URL,
  ];
  const found = candidates.find((v) => typeof v === 'string' && v.trim().length > 0);
  return found ? found.replace(/\/$/, '') : undefined;
}

export const DIRECTUS_URL = resolveDirectusUrl();
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

if (!DIRECTUS_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    "Directus URL is not set. Define NEXT_PUBLIC_DIRECTUS_URL or DIRECTUS_URL in your environment."
  );
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

export async function getProducts({ filter, fields, limit } = {}, accessToken) {
  if (!DIRECTUS_URL) {
    throw new Error('Directus URL manquante: définis NEXT_PUBLIC_DIRECTUS_URL (ou DIRECTUS_URL) sur Vercel.');
  }
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

// Minimal Directus REST helpers for Next.js

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;

if (!DIRECTUS_URL) {
  // Avoid throwing at import time in Next; consumers can handle undefined.
  // eslint-disable-next-line no-console
  console.warn("DIRECTUS_URL is not set. Set NEXT_PUBLIC_DIRECTUS_URL in your env.");
}

export async function directusLogin(email, password) {
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.errors?.[0]?.message || "Login failed");
  }
  return res.json(); // { access_token, refresh_token, expires }
}

export async function directusRefresh(refreshToken) {
  const res = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken })
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.errors?.[0]?.message || "Refresh failed");
  }
  return res.json();
}

export async function directusMe(accessToken) {
  const res = await fetch(`${DIRECTUS_URL}/users/me?fields=*,role.*`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) return null;
  return res.json(); // { data: { ...user } }
}

export async function getPropriedades({ filter, fields, limit } = {}, accessToken) {
  const params = new URLSearchParams();
  if (fields) params.set("fields", fields);
  if (typeof limit === "number") params.set("limit", String(limit));
  if (filter) {
    // Accepts object like { status: { _eq: 'published' } }
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
  const res = await fetch(`${DIRECTUS_URL}/items/propriedades?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.errors?.[0]?.message || "Failed to fetch propriedades");
  }
  return res.json(); // { data: [...] }
}

export async function getCollectionItems(collection, { filter, fields, limit } = {}, accessToken) {
  if (!collection) throw new Error("Collection name is required");
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
  const res = await fetch(`${DIRECTUS_URL}/items/${encodeURIComponent(collection)}?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.errors?.[0]?.message || `Failed to fetch collection: ${collection}`);
  }
  return res.json(); // { data: [...] }
}

export async function getProducts({ filter, fields, limit } = {}, accessToken) {
  return getCollectionItems("products", { filter, fields, limit }, accessToken);
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

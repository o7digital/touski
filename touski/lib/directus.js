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
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || process.env.NEXT_PUBLIC_DIRECTUS_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || process.env.NEXT_PUBLIC_DIRECTUS_PASSWORD;

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

function cleanToken(t) {
  if (!t) return undefined;
  const s = String(t).trim().replace(/^['"]|['"]$/g, "");
  // Reject if contains non-ASCII (likely “…”)
  if (/[^\x00-\x7F]/.test(s)) return undefined;
  return s;
}

async function getAuthHeader(accessToken) {
  const cleanedAccess = cleanToken(accessToken);
  if (cleanedAccess) return { Authorization: `Bearer ${cleanedAccess}` };
  const cleanedStatic = cleanToken(DIRECTUS_STATIC_TOKEN);
  if (cleanedStatic) return { Authorization: `Bearer ${cleanedStatic}` };
  // Fallback: login with email/password if provided
  if (DIRECTUS_EMAIL && DIRECTUS_PASSWORD && DIRECTUS_URL) {
    try {
      const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD }),
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        const tok = json?.data?.access_token || json?.access_token;
        const cleaned = cleanToken(tok);
        if (cleaned) return { Authorization: `Bearer ${cleaned}` };
      }
    } catch (_) {
      // ignore
    }
  }
  return {};
}

function buildParams({ filter, fields, limit } = {}) {
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
  return params;
}

async function fetchCollection(collectionCandidates, options = {}, accessToken) {
  if (!DIRECTUS_URL) {
    throw new Error(
      "Directus URL manquante: définis NEXT_PUBLIC_DIRECTUS_URL (ou DIRECTUS_URL) sur Vercel."
    );
  }
  const params = buildParams(options);
  const authHeader = await getAuthHeader(accessToken);

  let lastErr = null;
  for (const col of collectionCandidates) {
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

export async function getProducts(opts = {}, accessToken) {
  return fetchCollection(["products", "Products", "product", "Product"], opts, accessToken);
}

export async function getPropriedades(opts = {}, accessToken) {
  return fetchCollection(
    ["propriedades", "Propriedades", "properties", "Properties", "property", "Property"],
    opts,
    accessToken
  );
}

export async function directusLogin(email, password) {
  if (!DIRECTUS_URL) {
    throw new Error(
      "Directus URL manquante: définis NEXT_PUBLIC_DIRECTUS_URL (ou DIRECTUS_URL) sur Vercel."
    );
  }
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const json = await safeJson(res);
  const data = json?.data || json;
  if (!res.ok || !data?.access_token) {
    const message = data?.errors?.[0]?.message || `Login failed (${res.status})`;
    throw new Error(message);
  }
  const access_token = cleanToken(data.access_token);
  const refresh_token = cleanToken(data.refresh_token);
  const expires = data.expires || data.expires_at;
  return { access_token, refresh_token, expires };
}

export async function directusMe(accessToken) {
  if (!DIRECTUS_URL) return { data: null };
  const headers = await getAuthHeader(accessToken);
  const res = await fetch(`${DIRECTUS_URL}/users/me`, {
    headers,
    cache: "no-store",
  });
  const json = await safeJson(res);
  if (!res.ok) {
    return { data: null, error: json?.errors?.[0]?.message || `${res.status} ${res.statusText}` };
  }
  return json;
}

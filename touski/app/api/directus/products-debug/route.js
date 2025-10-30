// Simple debug endpoint to inspect Directus connectivity in deploys
// GET /api/directus/products-debug?collection=products&limit=5&fields=*

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

export async function GET(req) {
  const DIRECTUS_URL = resolveDirectusUrl();
  const RAW_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;
  const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || process.env.NEXT_PUBLIC_DIRECTUS_EMAIL;
  const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || process.env.NEXT_PUBLIC_DIRECTUS_PASSWORD;

  const { searchParams } = new URL(req.url);
  const collection = searchParams.get('collection') || 'products';
  const limit = searchParams.get('limit') || '5';
  const fields = searchParams.get('fields') || '*';

  if (!DIRECTUS_URL) {
    return Response.json(
      {
        ok: false,
        error: 'Directus URL non configurée (NEXT_PUBLIC_DIRECTUS_URL ou DIRECTUS_URL).',
        envChecked: [
          'NEXT_PUBLIC_DIRECTUS_URL',
          'DIRECTUS_URL',
          'NEXT_PUBLIC_DIRECTUS_API_URL',
          'DIRECTUS_API_URL',
        ],
      },
      { status: 500 }
    );
  }

  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('fields', fields);

  const url = `${DIRECTUS_URL}/items/${collection}?${params.toString()}`;
  let token = RAW_TOKEN ? String(RAW_TOKEN).trim().replace(/^['"]|['"]$/g, '') : undefined;
  const hasNonAscii = token ? /[^\x00-\x7F]/.test(token) : false;
  if (hasNonAscii) token = undefined; // ignore invalid token
  let headers = token ? { Authorization: `Bearer ${token}` } : {};
  let usedAuthHeader = Boolean(token);
  let authMode = usedAuthHeader ? 'static_token' : 'none';

  // Fallback to login if no token and credentials provided
  if (!usedAuthHeader && DIRECTUS_EMAIL && DIRECTUS_PASSWORD) {
    try {
      const login = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD }),
        cache: 'no-store',
      });
      if (login.ok) {
        const j = await login.json();
        const at = j?.data?.access_token || j?.access_token;
        if (at && !/[^\x00-\x7F]/.test(at)) {
          headers = { Authorization: `Bearer ${at}` };
          usedAuthHeader = true;
          authMode = 'login';
        }
      }
    } catch (_) {}
  }

  try {
    const res = await fetch(url, { headers, cache: 'no-store' });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch {}
    const tokenMeta = {
      present: Boolean(RAW_TOKEN),
      length: RAW_TOKEN ? String(RAW_TOKEN).length : 0,
      preview: RAW_TOKEN ? String(RAW_TOKEN).slice(0, 12) : null,
      hasEllipsis: RAW_TOKEN ? /…/.test(String(RAW_TOKEN)) : false,
      hasNonAscii,
      hasQuotes: RAW_TOKEN ? /^['"].*['"]$/.test(String(RAW_TOKEN)) : false,
    };
    return Response.json({
      ok: res.ok,
      status: res.status,
      url,
      usedAuthHeader,
      authMode,
      tokenMeta,
      credsMeta: {
        hasEmail: Boolean(DIRECTUS_EMAIL),
        hasPassword: Boolean(DIRECTUS_PASSWORD),
      },
      data: json?.data ?? null,
      raw: json ?? text,
    }, { status: res.ok ? 200 : res.status });
  } catch (e) {
    const tokenMeta = {
      present: Boolean(RAW_TOKEN),
      length: RAW_TOKEN ? String(RAW_TOKEN).length : 0,
      preview: RAW_TOKEN ? String(RAW_TOKEN).slice(0, 12) : null,
      hasEllipsis: RAW_TOKEN ? /…/.test(String(RAW_TOKEN)) : false,
      hasNonAscii: RAW_TOKEN ? /[^\x00-\x7F]/.test(String(RAW_TOKEN)) : false,
      hasQuotes: RAW_TOKEN ? /^['"].*['"]$/.test(String(RAW_TOKEN)) : false,
    };
    return Response.json({ ok: false, error: String(e?.message || e), url, usedAuthHeader, authMode, tokenMeta, credsMeta: { hasEmail: Boolean(DIRECTUS_EMAIL), hasPassword: Boolean(DIRECTUS_PASSWORD) } }, { status: 500 });
  }
}

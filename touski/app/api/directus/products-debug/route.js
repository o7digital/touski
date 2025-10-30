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
  const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

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
  const headers = DIRECTUS_STATIC_TOKEN ? { Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}` } : {};

  try {
    const res = await fetch(url, { headers, cache: 'no-store' });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch {}
    return Response.json(
      {
        ok: res.ok,
        status: res.status,
        url,
        usedAuthHeader: Boolean(DIRECTUS_STATIC_TOKEN),
        data: json?.data ?? null,
        raw: json ?? text,
      },
      { status: res.ok ? 200 : res.status }
    );
  } catch (e) {
    return Response.json(
      { ok: false, error: String(e?.message || e), url, usedAuthHeader: Boolean(DIRECTUS_STATIC_TOKEN) },
      { status: 500 }
    );
  }
}


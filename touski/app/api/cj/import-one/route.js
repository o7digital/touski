// Import a single CJ product into Directus 'products' by sku (upsert)
// Query: sku=...

function cfg() {
  return {
    directusUrl: (process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || '').replace(/\/$/, ''),
    token: process.env.DIRECTUS_STATIC_TOKEN,
  };
}

async function directusRequest(path, options = {}) {
  const { directusUrl, token } = cfg();
  if (!directusUrl) throw new Error('Directus URL missing');
  if (!token) throw new Error('DIRECTUS_STATIC_TOKEN missing');
  const res = await fetch(`${directusUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    let j = null; try { j = await res.json(); } catch {}
    const msg = j?.errors?.[0]?.message || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return res.json();
}

async function fetchCJBySKU(origin, sku) {
  // Basic: reuse /api/cj/products?q=sku and pick first matching sku
  const url = new URL(`${origin}/api/cj/products`);
  url.searchParams.set('q', sku);
  url.searchParams.set('pageSize', '50');
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`CJ list failed: ${res.status}`);
  const j = await res.json();
  const found = (j?.items || []).find((it) => String(it.sku).toLowerCase() === String(sku).toLowerCase()) || (j?.items || [])[0];
  return found || null;
}

function toDirectusProduct(item) {
  if (!item) return null;
  return {
    sku: item.sku,
    name: item.name,
    Description: item.description || '',
    price: item.price ?? null,
    cost_price: item.cost_price ?? null,
    status: 'draft',
    weight: item.weight ?? null,
  };
}

async function upsertProductBySKU(payload) {
  // find by sku
  const params = new URLSearchParams();
  params.set('filter[sku][_eq]', String(payload.sku));
  params.set('limit', '1');
  const found = await directusRequest(`/items/products?${params.toString()}`);
  const existing = found?.data?.[0];
  if (existing?.id) {
    const updated = await directusRequest(`/items/products/${existing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return { mode: 'update', id: existing.id, result: updated };
  } else {
    const created = await directusRequest(`/items/products`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const id = created?.data?.id || created?.id;
    return { mode: 'create', id, result: created };
  }
}

export async function POST(req) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const sku = searchParams.get('sku');
    if (!sku) return Response.json({ ok: false, error: 'Missing sku' }, { status: 400 });
    const cjItem = await fetchCJBySKU(origin, sku);
    if (!cjItem) return Response.json({ ok: false, error: 'Product not found on CJ' }, { status: 404 });
    const payload = toDirectusProduct(cjItem);
    const result = await upsertProductBySKU(payload);
    return Response.json({ ok: true, payload, ...result });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

export async function GET(req) { return POST(req); }


export const runtime = 'nodejs';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

async function directusRequest(path, options = {}) {
  const url = `${DIRECTUS_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers, cache: 'no-store' });
  if (!res.ok) {
    let body = null;
    try { body = await res.json(); } catch {}
    const msg = body?.errors?.[0]?.message || `${res.status} ${res.statusText}`;
    throw new Error(`Directus error on ${path}: ${msg}`);
  }
  return res.json();
}

async function findProductBySKU(sku) {
  const params = new URLSearchParams();
  params.set('filter[sku][_eq]', String(sku));
  params.set('limit', '1');
  const data = await directusRequest(`/items/products?${params.toString()}`);
  return data?.data?.[0] || null;
}

async function createProduct(payload) {
  return directusRequest(`/items/products`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function updateProduct(id, payload) {
  return directusRequest(`/items/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// Supplier fetch stub – replace with real API mapping
async function fetchSupplierProducts() {
  const base = process.env.SUPPLIER_API_BASE;
  const key = process.env.SUPPLIER_API_KEY;
  if (!base || !key) {
    return { items: [] };
  }
  const res = await fetch(`${base}/products`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Supplier fetch failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  // Expecting data like { items: [...] } – adapt mapping below.
  return data;
}

function mapSupplierToDirectus(item) {
  // Map supplier fields to Directus products
  return {
    sku: item.sku || item.SKU,
    name: item.name || item.Name,
    description: item.description || item.Description,
    price: item.price ?? item.Price,
    cost_price: item.cost_price ?? item.costPrice ?? item['Cost Price'],
    weight: item.weight ?? item.Weight,
    status: item.status ?? item.Status ?? 'draft',
  };
}

async function syncOnce() {
  if (!DIRECTUS_URL) throw new Error('Directus URL is not configured');
  if (!DIRECTUS_TOKEN) throw new Error('DIRECTUS_STATIC_TOKEN is required for server-to-server import');

  const supplier = await fetchSupplierProducts();
  const items = supplier?.items || [];
  const results = { created: 0, updated: 0, skipped: 0 };
  for (const raw of items) {
    const payload = mapSupplierToDirectus(raw);
    if (!payload?.sku) {
      results.skipped++;
      continue;
    }
    const existing = await findProductBySKU(payload.sku);
    if (existing?.id) {
      await updateProduct(existing.id, payload);
      results.updated++;
    } else {
      await createProduct(payload);
      results.created++;
    }
  }
  return { count: items.length, ...results };
}

export async function GET() {
  try {
    const res = await syncOnce();
    return new Response(JSON.stringify({ ok: true, ...res }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST() {
  return GET();
}


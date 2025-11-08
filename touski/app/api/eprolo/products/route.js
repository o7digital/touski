// List EPROLO products via configurable API, normalize fields
// Query params: q, page, pageSize, debug
import { QuerySchema, validateProducts } from "@/lib/schemas/cj";

function cfg() {
  const base = (process.env.EPROLO_BASE_URL || 'https://openapi.eprolo.com').replace(/\/$/, '');
  const searchUrl = process.env.EPROLO_SEARCH_URL || base; // many EPROLO deployments respond on root
  const mock = process.env.EPROLO_MOCK === '1' || process.env.EPROLO_MOCK === 'true';
  const apiKey = process.env.EPROLO_API_KEY || '';
  const email = process.env.EPROLO_EMAIL || '';
  let extra = {};
  try { if (process.env.EPROLO_EXTRA) extra = JSON.parse(process.env.EPROLO_EXTRA); } catch {}
  return { base, searchUrl, mock, apiKey, email, extra };
}

function normalize(item) {
  const toNum = (v) => (v === undefined || v === null || v === '' ? undefined : Number(v));
  const takeFirstNumber = (s) => {
    if (s == null) return undefined;
    const m = String(s).match(/[0-9]+(?:\.[0-9]+)?/);
    return m ? Number(m[0]) : undefined;
  };
  const imageCandidates = [];
  if (Array.isArray(item.images)) imageCandidates.push(...item.images);
  if (Array.isArray(item.imageList)) imageCandidates.push(...item.imageList);
  if (item.imageUrls) imageCandidates.push(...String(item.imageUrls).split(','));
  if (item.productImage) imageCandidates.push(String(item.productImage));
  if (item.image) imageCandidates.push(String(item.image));
  if (item.imgUrl) imageCandidates.push(String(item.imgUrl));
  const images = imageCandidates.filter(Boolean);

  const name = item.title || item.productTitle || item.productName || item.name;
  const price = toNum(item.price) ?? takeFirstNumber(item.sellPrice) ?? toNum(item.salePrice) ?? toNum(item.retailPrice);
  const weight = takeFirstNumber(item.productWeight) ?? toNum(item.weight) ?? toNum(item.grossWeight);

  return {
    sku: item.sku || item.productSku || item.goodsSku || item.productId || item.id,
    name: name || 'Unnamed',
    description: item.description || item.productDescription || item.desc || item.remark,
    price,
    compare_price: toNum(item.listPrice || item.originalPrice),
    cost_price: toNum(item.cost_price || item.costPrice || item.purchasePrice),
    weight,
    images,
    raw: item,
  };
}

function extractList(json) {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  const c = json?.data || json?.result || {};
  const candidates = [
    json?.items, json?.list, json?.records,
    c?.items, c?.list, c?.records, c?.data,
  ];
  for (const x of candidates) {
    if (Array.isArray(x)) return x;
  }
  return [];
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!parsed.success) {
      return Response.json({ ok: false, error: 'Invalid query', issues: parsed.error.issues }, { status: 400 });
    }
    const q = parsed.data.q || '';
    const page = parsed.data.page || 1;
    const pageSize = parsed.data.pageSize || 24;
    const debug = searchParams.get('debug') === '1';
    const { searchUrl, mock, apiKey, email, extra } = cfg();

    if (mock) {
      const items = Array.from({ length: pageSize }).map((_, i) => normalize({
        id: `EPMOCK-${page}-${i}-${q || 'all'}`,
        title: `EPROLO Mock ${q ? `“${q}”` : 'Item'} #${i+1}`,
        price: (i + 1) * 2 + 0.99,
        image: 'https://picsum.photos/seed/eprolo' + (i+page) + '/400/400',
      }));
      const { valid, invalid } = validateProducts(items);
      return Response.json({ ok: true, items: valid, invalidCount: invalid, page, pageSize, mock: true }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
    }

    const tried = [];
    // Build a matrix of attempts (headers vs query vs body)
    const candidates = [];
    const headerSets = [
      { 'apiKey': apiKey },
      { 'apiKey': apiKey, 'email': email },
      { 'apiKey': apiKey, 'userEmail': email },
      { 'X-API-KEY': apiKey },
      { 'Authorization': `Bearer ${apiKey}` },
    ];
    const bodyBase = { keyword: q, page, pageSize, ...extra };
    // Prefer POST JSON with different header variants
    for (const hs of headerSets) {
      candidates.push({ method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...hs }, body: JSON.stringify({ apiKey, email, ...bodyBase }) });
    }
    // Fallback GET with query parameters
    candidates.push({ method: 'GET', headers: { Accept: 'application/json' }, query: { apiKey, keyword: q, page, pageSize, ...extra } });
    candidates.push({ method: 'GET', headers: { Accept: 'application/json', apiKey }, query: { keyword: q, page, pageSize, ...extra } });

    for (const a of candidates) {
      let res;
      try {
        const url = new URL(searchUrl);
        if (a.method === 'GET') {
          const qp = a.query || {};
          for (const [k,v] of Object.entries(qp)) if (v != null && v !== '') url.searchParams.set(k, String(v));
        }
        res = await fetch(url, { method: a.method, headers: a.headers, body: a.body, cache: 'no-store' });
        const text = await res.text();
        let j = null; try { j = JSON.parse(text); } catch {}
        if (!res.ok) {
          tried.push({ url: String(url), status: res.status, error: j?.msg || j?.message || text?.slice(0,120) });
          continue;
        }
        const list = extractList(j);
        if (!Array.isArray(list) || list.length === 0) {
          tried.push({ url: String(url), info: 'empty-list' });
          continue;
        }
        const normalized = list.map(normalize);
        const { valid, invalid } = validateProducts(normalized);
        return Response.json({ ok: true, items: valid, invalidCount: invalid, page, pageSize, source: String(url) }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
      } catch (e) {
        tried.push({ attempt: a.method, error: String(e?.message || e) });
      }
    }

    const err = { ok: false, error: 'EPROLO fetch failed', tried, hint: 'Set EPROLO_API_KEY and, if needed, EPROLO_SEARCH_URL. Use EPROLO_MOCK=1 for demo.' };
    return Response.json(err, { status: 502, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  }
}

// List EPROLO products via configurable API, normalize fields
// Query params: q, page, pageSize, debug
import { QuerySchema, validateProducts } from "@/lib/schemas/cj";

function cfg() {
  const base = (process.env.EPROLO_BASE_URL || 'https://openapi.eprolo.com').replace(/\/$/, '');
  const searchUrl = (process.env.EPROLO_SEARCH_URL || base).replace(/\/$/, ''); // configurable entrypoint
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

function toList(input, fallback = []) {
  if (!input) return fallback;
  if (Array.isArray(input)) return input;
  try {
    const j = JSON.parse(input);
    if (Array.isArray(j)) return j;
  } catch {}
  return String(input)
    .split(/[,|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function homeFilter(items, mode = 'strict') {
  const allow = toList(process.env.EPROLO_HOME_ALLOW || process.env.CJ_HOME_ALLOW, [
    'home','house','kitchen','cook','utensil','bath','toilet','wash','soap','detergent',
    'lighting','lamp','light','bulb','lantern','furniture','sofa','chair','table','desk',
    'storage','organizer','shelf','rack','box','basket','hanger','hook',
    'garden','outdoor','patio','plant','tool','bedding','pillow','blanket','duvet','sheet',
    'curtain','rug','mat','towel','clean','cleaner','mop','broom','brush','trash','bin','can'
  ]).map((s) => s.toLowerCase());
  const block = toList(process.env.EPROLO_HOME_BLOCK || process.env.CJ_HOME_BLOCK, [
    'clothing','clothes','apparel','t-shirt','shirt','jeans','pants','trousers','sweater','hoodie','jacket','coat','suit','dress','skirt','shorts',
    'women','men','girl','boy',
    'bag','backpack','wallet','purse',
    'hat','cap','beanie','scarf','glove','sock','shoe','sneaker','boot','slipper',
    'jewelry','ring','earring','necklace','bracelet','watch','makeup','cosmetic','beauty'
  ]).map((s) => s.toLowerCase());

  const containsAny = (text, words) => {
    const t = String(text || '').toLowerCase();
    return words.some((w) => t.includes(w));
  };

  if (mode === 'block_only') {
    return items.filter((it) => {
      const fields = [it?.raw?.categoryName, it?.name, it?.description];
      return !fields.some((f) => containsAny(f, block));
    });
  }

  // strict: keep only items matching allow and not matching block
  const kept = [];
  for (const it of items) {
    const fields = [it?.raw?.categoryName, it?.name, it?.description];
    if (fields.some((f) => containsAny(f, block))) continue;
    if (fields.some((f) => containsAny(f, allow))) kept.push(it);
  }
  return kept;
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
    const preset = parsed.data.preset || undefined;
    const nofilter = parsed.data.nofilter === '1';
    const minPrice = typeof parsed.data.minPrice === 'number' ? parsed.data.minPrice : undefined;
    const maxPrice = typeof parsed.data.maxPrice === 'number' ? parsed.data.maxPrice : undefined;
    const sort = parsed.data.sort || '';
    const category = parsed.data.category || '';
    const debug = searchParams.get('debug') === '1';
    const { base, searchUrl, mock, apiKey, email, extra } = cfg();

    if (!mock && (!apiKey || apiKey.trim() === '')) {
      return Response.json(
        { ok: false, error: 'EPROLO_API_KEY missing on server env', hint: 'Set EPROLO_API_KEY in Vercel project settings and redeploy.' },
        { status: 400, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
      );
    }

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
    // Build a matrix of attempts (multiple URL candidates × headers × payload form)
    const candidates = [];
    const urlCandidates = Array.from(new Set([
      searchUrl,
      `${base}`,
      `${base}/product/list`,
      `${base}/api/product/list`,
      `${base}/api2.0/v1/product/list`,
      `${base}/api/products`,
      `${base}/openapi/product/list`,
      `${base}/openapi/goods/list`,
      `${base}/product/search`,
    ]));
    const headerSets = [
      { 'apiKey': apiKey },
      { 'apiKey': apiKey, 'email': email },
      { 'apiKey': apiKey, 'userEmail': email },
      { 'X-API-KEY': apiKey },
      { 'Authorization': `Bearer ${apiKey}` },
    ];
    const bodyBase = { keyword: q, page, pageSize, minPrice, maxPrice, sort, category, ...extra };
    // Prefer POST JSON with different header variants
    for (const hs of headerSets) {
      candidates.push({ method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...hs }, body: JSON.stringify({ apiKey, email, ...bodyBase }) });
    }
    // Fallback GET with query parameters
    candidates.push({ method: 'GET', headers: { Accept: 'application/json' }, query: { apiKey, keyword: q, page, pageSize, minPrice, maxPrice, sort, category, ...extra } });
    candidates.push({ method: 'GET', headers: { Accept: 'application/json', apiKey }, query: { keyword: q, page, pageSize, minPrice, maxPrice, sort, category, ...extra } });

    for (const urlCandidate of urlCandidates) for (const a of candidates) {
      let res;
      try {
        const url = new URL(urlCandidate);
        if (a.method === 'GET') {
          const qp = a.query || {};
          for (const [k,v] of Object.entries(qp)) if (v != null && v !== '') url.searchParams.set(k, String(v));
        }
        const hdrDebug = Object.fromEntries(Object.entries(a.headers || {}).map(([k,v]) => [k, String(v).includes(apiKey) ? `${String(v).slice(0,6)}…redacted` : v]));
        res = await fetch(url, { method: a.method, headers: a.headers, body: a.body, cache: 'no-store' });
        const text = await res.text();
        let j = null; try { j = JSON.parse(text); } catch {}
        if (!res.ok) {
          tried.push({ url: String(url), method: a.method, status: res.status, headers: hdrDebug, code: j?.code, msg: j?.msg, error: j?.message || text?.slice(0,200) });
          continue;
        }
        const list = extractList(j);
        if (!Array.isArray(list) || list.length === 0) {
          tried.push({ url: String(url), method: a.method, headers: hdrDebug, code: j?.code, msg: j?.msg, info: 'empty-list' });
          continue;
        }
        let items = list.map(normalize);
        // Optional preset filtering (e.g., home)
        if (preset === 'home' && !nofilter) {
          const strict = homeFilter(items, 'strict');
          items = strict.length >= Math.min(pageSize, 8) ? strict : homeFilter(items, 'block_only');
        }
        // Apply local filters if provided
        if (typeof minPrice === 'number') items = items.filter((it) => typeof it.price === 'number' ? it.price >= minPrice : true);
        if (typeof maxPrice === 'number') items = items.filter((it) => typeof it.price === 'number' ? it.price <= maxPrice : true);
        if (category) {
          const needle = String(category).toLowerCase();
          items = items.filter((it) => {
            const fields = [it?.raw?.categoryName, it?.raw?.category, it?.name, it?.description];
            return fields.some((f) => String(f || '').toLowerCase().includes(needle));
          });
        }
        // Sorting
        if (sort === 'price_asc') items = items.sort((a,b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        if (sort === 'price_desc') items = items.sort((a,b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        // Ensure page size (in case vendor returns more)
        items = items.slice(0, pageSize);
        const { valid, invalid } = validateProducts(items);
        return Response.json({ ok: true, items: valid, invalidCount: invalid, page, pageSize, sort, preset, source: String(url) }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
      } catch (e) {
        tried.push({ url: urlCandidate, attempt: a.method, error: String(e?.message || e) });
      }
    }

    const err = { ok: false, error: 'EPROLO fetch failed', tried, hint: 'Set EPROLO_API_KEY and, if needed, EPROLO_SEARCH_URL. Use EPROLO_MOCK=1 for demo.' };
    return Response.json(err, { status: 502, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  }
}

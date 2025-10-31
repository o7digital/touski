// List CJ products via configurable API, normalize fields
// Query params: q, page, pageSize

function cfg() {
  const base = process.env.CJ_BASE_URL || 'https://openapi.cjdropshipping.com';
  const productsPath = process.env.CJ_PRODUCTS_PATH || '/product/list';
  const tokenHeader = process.env.CJ_TOKEN_HEADER || 'CJ-Access-Token'; // or 'Authorization'
  const qParam = process.env.CJ_Q_PARAM || 'keyword';
  const pageParam = process.env.CJ_PAGE_PARAM || 'pageNum';
  const sizeParam = process.env.CJ_SIZE_PARAM || 'pageSize';
  const categoryParam = process.env.CJ_CATEGORY_PARAM || 'category';
  const minPriceParam = process.env.CJ_MIN_PRICE_PARAM || 'minPrice';
  const maxPriceParam = process.env.CJ_MAX_PRICE_PARAM || 'maxPrice';
  const sortParam = process.env.CJ_SORT_PARAM || 'sort';
  const tokenPrefix = process.env.CJ_TOKEN_PREFIX || '';
  const usePost = process.env.CJ_USE_POST === '1' || process.env.CJ_USE_POST === 'true';
  const mock = process.env.CJ_MOCK === '1' || process.env.CJ_MOCK === 'true';
  return { base: base.replace(/\/$/, ''), productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, mock };
}

async function getToken() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/cj/token`).catch(() => null);
  if (r && r.ok) { const j = await r.json(); return j.token; }
  // Fallback: call same host without base
  const r2 = await fetch(`/api/cj/token`).catch(() => null);
  if (r2 && r2.ok) { const j = await r2.json(); return j.token; }
  return null;
}

function normalize(item) {
  const toNum = (v) => (v === undefined || v === null || v === '' ? undefined : Number(v));
  return {
    sku: item.sku || item.SKU || item.skuId || item.goodsSku || item.id,
    name: item.name || item.productName || item.title,
    description: item.description || item.productDescription || item.desc,
    price: toNum(item.price || item.sellPrice || item.salePrice || item.retailPrice),
    compare_price: toNum(item.listPrice || item.originalPrice),
    cost_price: toNum(item.cost_price || item.costPrice || item.purchasePrice),
    weight: toNum(item.weight || item.grossWeight),
    images: Array.isArray(item.images)
      ? item.images
      : item.imageUrls
      ? String(item.imageUrls).split(',')
      : item.image || item.imgUrl
      ? [item.image || item.imgUrl]
      : [],
    raw: item,
  };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || '';
    const { base, productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, mock } = cfg();

    if (mock) {
      const items = Array.from({ length: pageSize }).map((_, i) => ({
        sku: `CJ-MOCK-${page}-${i + 1}`,
        name: q ? `Mock ${q} ${(i + 1)}` : `Mock ${(i + 1)}`,
        description: 'Produit mock CJ',
        price: 12.9,
        cost_price: 7.5,
        images: [],
      }));
      return Response.json({ ok: true, items, mock: true, page, pageSize });
    }

    const tokenRes = await fetch(`${req.nextUrl.origin}/api/cj/token`);
    if (!tokenRes.ok) {
      const j = await tokenRes.json().catch(() => ({}));
      return Response.json({ ok: false, error: `Token error: ${j.error || tokenRes.statusText}` }, { status: 500 });
    }
    const { token } = await tokenRes.json();
    const url = new URL(`${base}${productsPath}`);
    const headers = { [tokenHeader]: tokenPrefix ? `${tokenPrefix} ${token}` : token, Accept: 'application/json' };

    let res;
    if (usePost) {
      const body = {};
      if (q) body[qParam] = q;
      body[pageParam] = String(page);
      body[sizeParam] = String(pageSize);
      if (category) body[categoryParam] = category;
      if (minPrice) body[minPriceParam] = String(minPrice);
      if (maxPrice) body[maxPriceParam] = String(maxPrice);
      if (sort) body[sortParam] = sort;
      res = await fetch(url, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store' });
    } else {
      if (q) url.searchParams.set(qParam, q);
      url.searchParams.set(pageParam, String(page));
      url.searchParams.set(sizeParam, String(pageSize));
      if (category) url.searchParams.set(categoryParam, category);
      if (minPrice) url.searchParams.set(minPriceParam, String(minPrice));
      if (maxPrice) url.searchParams.set(maxPriceParam, String(maxPrice));
      if (sort) url.searchParams.set(sortParam, sort);
      res = await fetch(url, { headers, cache: 'no-store' });
    }
    const text = await res.text();
    let json = null; try { json = JSON.parse(text); } catch {}
    if (!res.ok) {
      const msg = json?.message || json?.error || `${res.status} ${res.statusText}`;
      return Response.json({ ok: false, error: msg, url: String(url), raw: json || text }, { status: res.status });
    }
    // Try common shapes
    const list = json?.data?.list || json?.data?.items || json?.items || json?.list || [];
    const items = list.map(normalize);
    return Response.json({ ok: true, items, total: json?.data?.total || json?.total, page, pageSize, url: String(url) });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

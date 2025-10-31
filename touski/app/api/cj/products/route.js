// List CJ products via configurable API, normalize fields
// Query params: q, page, pageSize, category, minPrice, maxPrice, sort, debug

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
  // Extra params, JSON string: e.g. '{"country":"FR","language":"FR"}'
  let extra = {};
  try {
    if (process.env.CJ_EXTRA) extra = JSON.parse(process.env.CJ_EXTRA);
  } catch (_) {}
  return { base: base.replace(/\/$/, ''), productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, mock, extra };
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
    const debug = searchParams.get('debug') === '1';
    const { base, productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, mock, extra } = cfg();

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
    // Build a list of attempts (env first, then fallbacks)
    const attempts = [];
    const pushAttempt = (b, p, hdr, pref, qp, pp, sp, catp, minp, maxp, sortp, post, xtra, tokenInQuery = false, tokenQueryName = 'accessToken') => {
      attempts.push({ base: b, path: p, tokenHeader: hdr, tokenPrefix: pref, qParam: qp, pageParam: pp, sizeParam: sp, categoryParam: catp, minPriceParam: minp, maxPriceParam: maxp, sortParam: sortp, usePost: post, extra: xtra, tokenInQuery, tokenQueryName });
    };

    // 1) Env-configured attempt
    pushAttempt(base, productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, extra);
    // 2) Common fallbacks (developers vs openapi, header styles, GET/POST, qParam variants)
    pushAttempt('https://openapi.cjdropshipping.com', '/product/list', 'CJ-Access-Token', '', 'keyword', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
    pushAttempt('https://developers.cjdropshipping.com', '/api/product/list', 'CJ-Access-Token', '', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
    pushAttempt('https://developers.cjdropshipping.com', '/api2.0/v1/product/list', 'CJ-Access-Token', '', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
    pushAttempt('https://openapi.cjdropshipping.com', '/product/list', 'Authorization', 'Bearer', 'keyword', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
    pushAttempt('https://developers.cjdropshipping.com', '/api/product/list', 'Authorization', 'Bearer', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
    pushAttempt('https://developers.cjdropshipping.com', '/api2.0/v1/product/list', 'Authorization', 'Bearer', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
    pushAttempt('https://openapi.cjdropshipping.com', '/product/list', 'CJ-Access-Token', '', 'keyword', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', false, {});
    // Some endpoints accept token as query parameter
    pushAttempt('https://developers.cjdropshipping.com', '/api2.0/v1/product/list', null, '', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {}, true, 'accessToken');

    const tried = [];
    const controller = new AbortController();
    const timeoutMs = 15000;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      for (const a of attempts) {
        const url = new URL(`${a.base.replace(/\/$/, '')}${a.path}`);
        const headers = {
          Accept: 'application/json',
          'User-Agent': 'TouskiCJ/1.0 (+https://touski.app)'
        };
        if (a.tokenHeader) headers[a.tokenHeader] = a.tokenPrefix ? `${a.tokenPrefix} ${token}` : token;
        let method = 'GET';
        let sentBody = null;
        let res;
        if (a.usePost) {
          const body = { ...(a.extra || {}) };
          if (q) body[a.qParam] = q;
          body[a.pageParam] = String(page);
          body[a.sizeParam] = String(pageSize);
          if (category) body[a.categoryParam] = category;
          if (minPrice) body[a.minPriceParam] = String(minPrice);
          if (maxPrice) body[a.maxPriceParam] = String(maxPrice);
          if (sort) body[a.sortParam] = sort;
          if (a.tokenInQuery) body[a.tokenQueryName] = token;
          sentBody = body;
          method = 'POST';
          try {
            res = await fetch(url, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store', signal: controller.signal });
          } catch (e) {
            tried.push({ url: String(url), method, error: String(e?.message || e) });
            continue;
          }
        } else {
          if (q) url.searchParams.set(a.qParam, q);
          url.searchParams.set(a.pageParam, String(page));
          url.searchParams.set(a.sizeParam, String(pageSize));
          if (category) url.searchParams.set(a.categoryParam, category);
          if (minPrice) url.searchParams.set(a.minPriceParam, String(minPrice));
          if (maxPrice) url.searchParams.set(a.maxPriceParam, String(maxPrice));
          if (sort) url.searchParams.set(a.sortParam, sort);
          for (const [k, v] of Object.entries(a.extra || {})) url.searchParams.set(k, String(v));
          if (a.tokenInQuery) url.searchParams.set(a.tokenQueryName, token);
          try {
            res = await fetch(url, { headers, cache: 'no-store', signal: controller.signal });
          } catch (e) {
            tried.push({ url: String(url), method, error: String(e?.message || e) });
            continue;
          }
        }
        const text = await res.text();
        let json = null; try { json = JSON.parse(text); } catch {}
        if (!res.ok) {
          const msg = json?.message || json?.error || `${res.status} ${res.statusText}`;
          tried.push({ url: String(url), method, status: res.status, error: msg, raw: debug ? (json || text) : undefined });
          continue;
        }
        const list = json?.data?.list || json?.data?.items || json?.items || json?.list || [];
        const items = Array.isArray(list) ? list.map(normalize) : [];
        if (items.length > 0 || attempts.indexOf(a) === attempts.length - 1) {
          clearTimeout(timer);
          return Response.json({ ok: true, items, total: json?.data?.total || json?.total, page, pageSize, url: String(url), method, attempts: debug ? tried : undefined });
        }
        // items empty — try next combo
        tried.push({ url: String(url), method, status: res.status, info: 'empty-list', raw: debug ? (json || text) : undefined });
      }
    } finally {
      clearTimeout(timer);
    }
    return Response.json({ ok: false, error: 'All attempts failed', attempts: tried }, { status: 502 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

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
  const takeFirstNumber = (s) => {
    if (s == null) return undefined;
    const m = String(s).match(/[0-9]+(?:\.[0-9]+)?/);
    return m ? Number(m[0]) : undefined;
  };
  const parseMaybeJsonArrayString = (s) => {
    if (!s || typeof s !== 'string') return s;
    const trimmed = s.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const arr = JSON.parse(trimmed);
        if (Array.isArray(arr) && arr.length) return String(arr[0]);
      } catch (_) {}
    }
    return s;
  };

  const nameRaw = item.name || item.productNameEn || item.productName || item.title;
  const name = parseMaybeJsonArrayString(nameRaw);

  const price =
    toNum(item.price) ??
    takeFirstNumber(item.sellPrice) ??
    toNum(item.salePrice) ??
    toNum(item.retailPrice);

  const weight = takeFirstNumber(item.productWeight) ?? toNum(item.weight) ?? toNum(item.grossWeight);

  const imageCandidates = [];
  if (Array.isArray(item.images)) imageCandidates.push(...item.images);
  if (item.imageUrls) imageCandidates.push(...String(item.imageUrls).split(','));
  if (item.productImage) imageCandidates.push(String(item.productImage));
  if (item.image) imageCandidates.push(String(item.image));
  if (item.imgUrl) imageCandidates.push(String(item.imgUrl));
  const images = imageCandidates.filter(Boolean);

  return {
    sku: item.sku || item.productSku || item.SKU || item.skuId || item.goodsSku || item.id,
    name,
    description: item.description || item.productDescription || item.desc || item.remark,
    price,
    compare_price: toNum(item.listPrice || item.originalPrice),
    cost_price: toNum(item.cost_price || item.costPrice || item.purchasePrice),
    weight,
    images,
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
    const { base, productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, mock } = cfg();
    // Merge dynamic extras from query (language/lang)
    let extra = {};
    try {
      if (process.env.CJ_EXTRA) extra = JSON.parse(process.env.CJ_EXTRA);
    } catch {}
    const lang = searchParams.get('language') || searchParams.get('lang');
    if (lang) extra.language = lang;
    // Normalize search for common FR/EN terms
    const qLower = q.toLowerCase();
    const qMap = { maison: 'home', house: 'home', domicile: 'home', cuisine: 'kitchen', bain: 'bath', 'salle de bain': 'bath' };
    const qNorm = qMap[qLower] || q;
    const preset = searchParams.get('preset') || '';
    const aggregated = searchParams.get('aggregated') === '1';
    const strictEnv = process.env.CJ_STRICT === '1' || process.env.CJ_STRICT === 'true' || searchParams.get('strict') === '1';

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

    // Preset aggregator (e.g., preset=home) – merges multiple keyword queries
    if (preset && !aggregated) {
      const map = {
        home: [
          'home','kitchen','bath','lighting','lamp','furniture','sofa','chair','table','storage','organizer','garden','outdoor','clean','detergent','bedding'
        ],
      };
      const terms = map[preset] || [];
      const unique = new Map();
      for (const term of terms) {
        const u = new URL(`${req.nextUrl.origin}${req.nextUrl.pathname}`);
        u.searchParams.set('aggregated','1');
        u.searchParams.set('strict','1');
        u.searchParams.set('page','1');
        u.searchParams.set('pageSize', String(pageSize));
        u.searchParams.set('q', term);
        if (lang) u.searchParams.set('language', lang);
        if (minPrice) u.searchParams.set('minPrice', String(minPrice));
        if (maxPrice) u.searchParams.set('maxPrice', String(maxPrice));
        if (sort) u.searchParams.set('sort', sort);
        try {
          const r = await fetch(u, { cache: 'no-store' });
          if (!r.ok) continue;
          const j = await r.json();
          const list = Array.isArray(j.items) ? j.items : [];
          for (const it of list) {
            const key = String(it?.sku || it?.raw?.productSku || Math.random());
            if (!unique.has(key)) unique.set(key, it);
          }
          if (unique.size >= pageSize) break;
        } catch {}
      }
      const items = Array.from(unique.values()).slice(0, pageSize);
      return Response.json({ ok: true, items, page, pageSize, preset }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
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

    // 1) Always try the env-configured attempt first
    pushAttempt(base, productsPath, tokenHeader, tokenPrefix, qParam, pageParam, sizeParam, categoryParam, minPriceParam, maxPriceParam, sortParam, usePost, extra);
    // 2) Optionally try fallbacks (disabled when CJ_STRICT=1 or ?strict=1 to avoid rate-limit)
    if (!strictEnv) {
      pushAttempt('https://openapi.cjdropshipping.com', '/product/list', 'CJ-Access-Token', '', 'keyword', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
      pushAttempt('https://developers.cjdropshipping.com', '/api/product/list', 'CJ-Access-Token', '', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
      pushAttempt('https://developers.cjdropshipping.com', '/api2.0/v1/product/list', 'CJ-Access-Token', '', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
      pushAttempt('https://openapi.cjdropshipping.com', '/product/list', 'Authorization', 'Bearer', 'keyword', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
      pushAttempt('https://developers.cjdropshipping.com', '/api/product/list', 'Authorization', 'Bearer', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
      pushAttempt('https://developers.cjdropshipping.com', '/api2.0/v1/product/list', 'Authorization', 'Bearer', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {});
      pushAttempt('https://openapi.cjdropshipping.com', '/product/list', 'CJ-Access-Token', '', 'keyword', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', false, {});
      // Some endpoints accept token as query parameter
      pushAttempt('https://developers.cjdropshipping.com', '/api2.0/v1/product/list', null, '', 'keyWord', 'pageNum', 'pageSize', 'category', 'minPrice', 'maxPrice', 'sort', true, {}, true, 'accessToken');
    }

    const tried = [];
    const controller = new AbortController();
    const timeoutMs = 15000;
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
        let retried = false;
        if (a.usePost) {
          const body = { ...(a.extra || {}) };
          if (qNorm) body[a.qParam] = qNorm;
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
            if (res.status === 429 && !retried) {
              const ra = Number(res.headers.get('retry-after'));
              await sleep(!Number.isNaN(ra) && ra > 0 ? ra * 1000 : 1200);
              retried = true;
              res = await fetch(url, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store', signal: controller.signal });
            }
          } catch (e) {
            tried.push({ url: String(url), method, error: String(e?.message || e) });
            continue;
          }
          // If POST not supported by endpoint, transparently fallback to GET once
          let text = await res.text();
          let json = null; try { json = JSON.parse(text); } catch {}
          if ((res.status === 405 || json?.code === 16900202 || /not supported/i.test(String(json?.message || ''))) && !retried) {
            // build GET URL with same params
            const getUrl = new URL(String(url));
            if (qNorm) getUrl.searchParams.set(a.qParam, qNorm);
            getUrl.searchParams.set(a.pageParam, String(page));
            getUrl.searchParams.set(a.sizeParam, String(pageSize));
            if (category) getUrl.searchParams.set(a.categoryParam, category);
            if (minPrice) getUrl.searchParams.set(a.minPriceParam, String(minPrice));
            if (maxPrice) getUrl.searchParams.set(a.maxPriceParam, String(maxPrice));
            if (sort) getUrl.searchParams.set(a.sortParam, sort);
            for (const [k, v] of Object.entries(a.extra || {})) getUrl.searchParams.set(k, String(v));
            if (a.tokenInQuery) getUrl.searchParams.set(a.tokenQueryName, token);
            method = 'GET';
            retried = true;
            try {
              res = await fetch(getUrl, { headers, cache: 'no-store', signal: controller.signal });
            } catch (e) {
              tried.push({ url: String(getUrl), method, error: String(e?.message || e) });
              continue;
            }
          } else {
            // restore response body for standard handling below
            // re-create a Response-like by setting text/json variables
            // We will reuse parsed json 'json' and 'text' variables below
          }
          // Continue to common response handling using 'res'
          // We set text/json after potential GET fallback
          if (!json) { // re-parse if needed
            const t2 = await res.text();
            try { json = JSON.parse(t2); text = t2; } catch { text = t2; }
          }
          // handle below without duplicating code
          // Inject into a temporary slot so the shared code can run
          // We'll use a local block after this if/else to avoid double-reading
          // To keep code simple, we assign to a symbol and skip default parsing later
          res._parsed = { text, json };
        } else {
          if (qNorm) url.searchParams.set(a.qParam, qNorm);
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
            if (res.status === 429 && !retried) {
              const ra = Number(res.headers.get('retry-after'));
              await sleep(!Number.isNaN(ra) && ra > 0 ? ra * 1000 : 1200);
              retried = true;
              res = await fetch(url, { headers, cache: 'no-store', signal: controller.signal });
            }
          } catch (e) {
            tried.push({ url: String(url), method, error: String(e?.message || e) });
            continue;
          }
        }
        // Use parsed result if produced by POST->GET fallback
        let text = res._parsed?.text;
        let json = res._parsed?.json;
        if (!text) {
          text = await res.text();
          try { json = JSON.parse(text); } catch {}
        }
        if (!res.ok) {
          const msg = json?.message || json?.error || `${res.status} ${res.statusText}`;
          tried.push({ url: String(url), method, status: res.status, error: msg, raw: debug ? (json || text) : undefined });
          continue;
        }
        const candidates = [
          json?.data?.list,
          json?.data?.items,
          json?.items,
          json?.list,
          json?.data?.records,
          json?.records,
          json?.data?.data,
        ];
        const list = candidates.find((v) => Array.isArray(v)) || [];
        const items = list.map(normalize);
        if (items.length > 0 || strictEnv) {
          clearTimeout(timer);
          return Response.json(
            { ok: true, items, total: json?.data?.total || json?.total, page, pageSize, url: String(url), method, attempts: debug ? tried : undefined },
            { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
          );
        }
        // items empty — try next combo
        tried.push({ url: String(url), method, status: res.status, info: 'empty-list', raw: debug ? (json || text) : undefined });
      }
    } finally {
      clearTimeout(timer);
    }
    return Response.json(
      { ok: false, error: 'All attempts failed', attempts: tried },
      { status: 502, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
    );
  } catch (e) {
    return Response.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
    );
  }
}

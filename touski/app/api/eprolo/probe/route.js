// Probe EPROLO endpoints to discover the correct path/shape (secrets redacted)
export async function GET(req) {
  try {
    const v = process.env.EPROLO_ENABLED;
    if (v === '0' || v === 'false' || v === 'False') {
      return Response.json({ ok: false, error: 'EPROLO integration paused' }, { status: 503 });
    }
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || 'house';
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 12);
    const base = (process.env.EPROLO_BASE_URL || 'https://openapi.eprolo.com').replace(/\/$/, '');
    const searchUrl = (process.env.EPROLO_SEARCH_URL || base).replace(/\/$/, '');
    const apiKey = process.env.EPROLO_API_KEY || '';
    const email = process.env.EPROLO_EMAIL || '';
    const tried = [];
    const endpointOverride = searchParams.get('endpoint');
    const effectiveSearchUrl = endpointOverride ? String(endpointOverride).replace(/\/$/, '') : searchUrl;
    const urlCandidates = Array.from(new Set([
      effectiveSearchUrl,
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
    const bodyBase = { keyword: q, page, pageSize };
    const candidates = [];
    for (const hs of headerSets) {
      candidates.push({ method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...hs }, body: JSON.stringify({ apiKey, email, ...bodyBase }) });
    }
    candidates.push({ method: 'GET', headers: { Accept: 'application/json' }, query: { apiKey, keyword: q, page, pageSize } });
    candidates.push({ method: 'GET', headers: { Accept: 'application/json', apiKey }, query: { keyword: q, page, pageSize } });

    for (const urlCandidate of urlCandidates) {
      for (const a of candidates) {
        try {
          const url = new URL(urlCandidate);
          if (a.method === 'GET') {
            const qp = a.query || {};
            for (const [k,v] of Object.entries(qp)) if (v != null && v !== '') url.searchParams.set(k, String(v));
          }
          const hdrDebug = Object.fromEntries(Object.entries(a.headers || {}).map(([k,v]) => [k, String(v || '').includes(apiKey) ? `${String(v).slice(0,6)}…redacted` : v]));
          const r = await fetch(url, { method: a.method, headers: a.headers, body: a.body, cache: 'no-store' });
          const t = await r.text();
          let j = null; try { j = JSON.parse(t); } catch {}
          tried.push({
            url: String(url), method: a.method, status: r.status, headers: hdrDebug,
            code: j?.code, msg: j?.msg, keys: j ? Object.keys(j) : [], dataType: typeof j?.data,
            sample: t.slice(0, 200),
          });
        } catch (e) {
          tried.push({ url: urlCandidate, method: a.method, error: String(e?.message || e) });
        }
      }
    }
    return Response.json({ ok: true, base, searchUrl, tried }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

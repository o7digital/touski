// Quick diagnostics for EPROLO setup (redacts secrets)
export async function GET() {
  try {
    const base = (process.env.EPROLO_BASE_URL || 'https://openapi.eprolo.com').replace(/\/$/, '');
    const searchUrl = (process.env.EPROLO_SEARCH_URL || base).replace(/\/$/, '');
    const apiKey = process.env.EPROLO_API_KEY || '';
    const email = process.env.EPROLO_EMAIL || '';
    const mock = process.env.EPROLO_MOCK || '';
    const extra = process.env.EPROLO_EXTRA || '';
    const info = {
      base,
      searchUrl,
      apiKey: apiKey ? `${apiKey.slice(0,6)}…redacted` : '',
      email,
      mock,
      extra,
    };
    // Try a minimal GET with apiKey header
    const tried = [];
    for (const url of [searchUrl, base]) {
      try {
        const r = await fetch(url, { headers: { 'apiKey': apiKey, 'Accept': 'application/json' }, cache: 'no-store' });
        const t = await r.text();
        let j = null; try { j = JSON.parse(t); } catch {}
        tried.push({ url, status: r.status, code: j?.code, msg: j?.msg, bodySample: t.slice(0,200) });
      } catch (e) {
        tried.push({ url, error: String(e?.message || e) });
      }
    }
    return Response.json({ ok: true, info, tried }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}


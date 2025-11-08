// CJ categories proxy with robust parsing and fallbacks
// Returns a flattened list: { id, name, level, path: [first, second, third] }

function cfg() {
  const base = process.env.CJ_BASE_URL || 'https://openapi.cjdropshipping.com';
  return { base: base.replace(/\/$/, '') };
}

function flattenCategories(json) {
  // Supports shapes like { data: [ { categoryFirstName, categoryFirstList: [ { categorySecondName, categorySecondList: [ { categoryId, categoryName } ] } ] } ] }
  // and alternatives where keys are slightly different
  const out = [];
  const firsts = json?.data || json?.list || [];
  for (const f of firsts || []) {
    const fName = f.categoryFirstName || f.firstName || f.name || f.categoryName || '';
    const seconds = f.categoryFirstList || f.firstList || f.children || f.categorySecondList || [];
    if (!seconds || seconds.length === 0) {
      // Some APIs might return flat list already
      const id = f.categoryId || f.id;
      const name = f.categoryName || f.name || fName;
      if (id && name) out.push({ id, name, level: 1, path: [name] });
      continue;
    }
    for (const s of seconds) {
      const sName = s.categorySecondName || s.secondName || s.name || s.categoryName || '';
      const thirds = s.categorySecondList || s.children || s.categoryThirdList || s.list || [];
      if (!thirds || thirds.length === 0) {
        const id = s.categoryId || s.id;
        const name = s.categoryName || sName;
        if (id && name) out.push({ id, name, level: 2, path: [fName, name] });
        continue;
      }
      for (const t of thirds) {
        const id = t.categoryId || t.id;
        const name = t.categoryName || t.name;
        if (id && name) out.push({ id, name, level: 3, path: [fName, sName, name] });
      }
    }
  }
  return out;
}

function isPaused() {
  const v = process.env.CJ_ENABLED;
  if (v == null) return false; // default enabled if not set
  return v === '0' || v === 'false' || v === 'False';
}

export async function GET(req) {
  if (isPaused()) {
    return Response.json(
      { ok: false, error: 'CJ integration paused' },
      { status: 503, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
    );
  }
  try {
    const { base } = cfg();
    const { searchParams } = new URL(req.url);
    const strict = searchParams.get('strict') === '1';
    const tried = [];
    const attempts = [
      { base: 'https://developers.cjdropshipping.com', path: '/api2.0/v1/product/getCategory', method: 'GET' },
      { base: 'https://developers.cjdropshipping.com', path: '/api/product/getCategory', method: 'GET' },
      { base, path: '/product/getCategory', method: 'GET' },
      { base: 'https://developers.cjdropshipping.com', path: '/api2.0/v1/category/list', method: 'GET' },
      { base, path: '/category/list', method: 'GET' },
    ];
    for (const a of attempts) {
      const url = `${a.base.replace(/\/$/, '')}${a.path}`;
      let res;
      try {
        res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      } catch (e) {
        tried.push({ url, error: String(e?.message || e) });
        continue;
      }
      const text = await res.text();
      let j = null; try { j = JSON.parse(text); } catch {}
      if (!res.ok) {
        tried.push({ url, status: res.status, error: j?.message || j?.error || text?.slice(0,120) });
        continue;
      }
      const list = flattenCategories(j);
      if (list.length > 0 || strict) {
        return Response.json({ ok: true, items: list, url, attempts: tried }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
      }
      tried.push({ url, info: 'empty-list' });
    }
    return Response.json({ ok: false, error: 'No categories', attempts: tried }, { status: 502 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

// Debug route to inspect preset aggregation and filtering
// Usage: /api/cj/preset-debug?preset=home&pageSize=24&language=EN

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

function homeFilter(items) {
  const allow = toList(process.env.CJ_HOME_ALLOW, [
    'home','house','kitchen','cook','utensil','bath','toilet','wash','soap','detergent',
    'lighting','lamp','light','bulb','lantern','furniture','sofa','chair','table','desk',
    'storage','organizer','shelf','rack','box','basket','hanger','hook',
    'garden','outdoor','patio','plant','tool','bedding','pillow','blanket','duvet','sheet',
    'curtain','rug','mat','towel','clean','cleaner','mop','broom','brush','trash','bin','can'
  ]).map((s) => s.toLowerCase());
  const block = toList(process.env.CJ_HOME_BLOCK, [
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
  const explain = (it) => {
    const fields = [it?.raw?.categoryName, it?.name, it?.description];
    const blocks = block.filter((b) => fields.some((f) => containsAny(f, [b])));
    const allows = allow.filter((a) => fields.some((f) => containsAny(f, [a])));
    return { blocks, allows };
  };

  const kept = [];
  const dropped = [];
  for (const it of items) {
    const fields = [it?.raw?.categoryName, it?.name, it?.description];
    if (fields.some((f) => containsAny(f, block))) {
      dropped.push({ sku: it?.sku, name: it?.name, reason: explain(it) });
      continue;
    }
    if (fields.some((f) => containsAny(f, allow))) {
      kept.push({ item: it, reason: explain(it) });
    } else {
      dropped.push({ sku: it?.sku, name: it?.name, reason: explain(it) });
    }
  }
  return { kept, dropped };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const preset = searchParams.get('preset') || 'home';
    const pageSize = Number(searchParams.get('pageSize') || 24);
    const language = searchParams.get('language') || 'EN';
    if (preset !== 'home') {
      return Response.json({ ok: false, error: 'Only preset=home supported for now' }, { status: 400 });
    }
    const terms = toList(searchParams.get('terms'), [
      'home','kitchen','bath','lighting','lamp','furniture','sofa','chair','table','storage','organizer','garden','outdoor','clean','detergent','bedding'
    ]);
    const unique = new Map();
    const perTerm = [];
    for (const term of terms) {
      const url = new URL(`${req.nextUrl.origin}/api/cj/products`);
      url.searchParams.set('q', term);
      url.searchParams.set('page', '1');
      url.searchParams.set('pageSize', String(pageSize));
      url.searchParams.set('strict', '1');
      url.searchParams.set('language', language);
      url.searchParams.set('aggregated', '1');
      url.searchParams.set('nofilter', '1');
      const r = await fetch(url, { cache: 'no-store' });
      const j = r.ok ? await r.json() : { items: [] };
      const list = Array.isArray(j.items) ? j.items : [];
      const { kept, dropped } = homeFilter(list);
      perTerm.push({ term, pre: list.length, post: kept.length });
      for (const it of kept.map((k) => k.item)) {
        const key = String(it?.sku || it?.raw?.productSku || Math.random());
        if (!unique.has(key)) unique.set(key, it);
      }
    }
    const items = Array.from(unique.values()).slice(0, pageSize);
    return Response.json({ ok: true, preset, language, terms, perTerm, total: { preUnique: perTerm.reduce((a,b)=>a+b.pre,0), postUnique: items.length }, items });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}


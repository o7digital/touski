// Create a simple order in Directus (demo)
// POST body: { customer: { name, email }, items: [{ sku, qty, price }], note }

function cfg() {
  return {
    url: (process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || '').replace(/\/$/, ''),
    token: process.env.DIRECTUS_STATIC_TOKEN,
  };
}

export async function POST(req) {
  try {
    const { url, token } = cfg();
    if (!url) return Response.json({ ok: false, error: 'Directus URL missing' }, { status: 500 });
    if (!token) return Response.json({ ok: false, error: 'DIRECTUS_STATIC_TOKEN missing' }, { status: 500 });
    const payload = await req.json();
    const order = {
      status: 'new',
      date_created: new Date().toISOString(),
      customer_name: payload?.customer?.name || 'Client Demo',
      customer_email: payload?.customer?.email || 'demo@example.com',
      items: payload?.items || [],
      note: payload?.note || null,
    };

    const res = await fetch(`${url}/items/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(order),
      cache: 'no-store',
    });

    const text = await res.text();
    let json = null; try { json = JSON.parse(text); } catch {}
    if (!res.ok) {
      const msg = json?.errors?.[0]?.message || `${res.status} ${res.statusText}`;
      return Response.json({ ok: false, error: msg, raw: json || text }, { status: res.status });
    }
    return Response.json({ ok: true, data: json?.data || json });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}


import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function fetchCJ({ q = "", page = 1, pageSize = 12 } = {}) {
  const h = headers();
  const proto = h.get('x-forwarded-proto') || 'https';
  const host = h.get('x-forwarded-host') || h.get('host');
  const origin = `${proto}://${host}`;
  const url = new URL(`${origin}/api/cj/products`);
  if (q) url.searchParams.set('q', q);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    return { ok: false, items: [], error: `HTTP ${res.status}` };
  }
  return res.json();
}

async function importOne(sku) {
  const res = await fetch(`/api/cj/import-one?sku=${encodeURIComponent(sku)}`, { method: 'POST' });
  return res.json();
}

export default async function CjCatalogPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page || 1);
  const pageSize = Number(searchParams?.pageSize || 12);
  const data = await fetchCJ({ q, page, pageSize });
  const items = data?.items || [];

  return (
    <main style={{ padding: 24 }}>
      <h1>Catalogue CJ (démo)</h1>
      <form method="get" style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <input name="q" defaultValue={q} placeholder="Rechercher (ex: maison)" style={{ padding: 8, flex: 1 }} />
        <button type="submit">Rechercher</button>
      </form>
      {!data?.ok && (
        <p style={{ color: '#c00' }}>Erreur: {String(data?.error || 'inconnue')} (utilisez CJ_MOCK=1 pour données fictives)</p>
      )}
      {items.length === 0 ? (
        <p>Aucun produit CJ trouvé.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((it, i) => (
            <li key={`${it.sku}-${i}`} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{it.name || 'Sans nom'}</div>
              <div className="text-secondary" style={{ fontSize: 14 }}>
                SKU: {it.sku} · Prix: {it.price ?? '—'} · Coût: {it.cost_price ?? '—'}
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <form action={`/api/cj/import-one?sku=${encodeURIComponent(it.sku)}`} method="post">
                  <button type="submit">Importer dans Directus</button>
                </form>
                <Link href={`/products`}>Voir Produits Directus</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

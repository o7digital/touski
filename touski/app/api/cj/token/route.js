// CJ Dropshipping token fetcher (configurable). Falls back to mock when env missing.
// Env expected:
// - CJ_TOKEN_URL (default: `${CJ_BASE_URL}/auth/token`)
// - CJ_BASE_URL (default: https://openapi.cjdropshipping.com)
// - CJ_CLIENT_ID, CJ_CLIENT_SECRET
// - CJ_MOCK=1 to return a mock token without network

let CACHE = { token: null, expireAt: 0 };

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function resolveConfig() {
  const base = process.env.CJ_BASE_URL || 'https://openapi.cjdropshipping.com';
  const tokenUrl = process.env.CJ_TOKEN_URL || `${base.replace(/\/$/, '')}/auth/token`;
  return {
    base,
    tokenUrl,
    clientId: process.env.CJ_CLIENT_ID,
    clientSecret: process.env.CJ_CLIENT_SECRET,
    staticToken: process.env.CJ_STATIC_TOKEN,
    mock: process.env.CJ_MOCK === '1' || process.env.CJ_MOCK === 'true',
  };
}

async function fetchTokenReal(cfg) {
  const body = { client_id: cfg.clientId, client_secret: cfg.clientSecret, grant_type: 'client_credentials' };
  const res = await fetch(cfg.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) {
    let j = null; try { j = await res.json(); } catch {}
    const msg = j?.error_description || j?.message || `${res.status} ${res.statusText}`;
    throw new Error(`CJ token error: ${msg}`);
  }
  const j = await res.json();
  // Try common shapes
  const access = j.access_token || j.token || j.data?.access_token;
  const expiresIn = Number(j.expires_in || j.data?.expires_in || 3600);
  if (!access) throw new Error('CJ token response missing access_token');
  return { token: access, expiresIn };
}

export async function GET() {
  try {
    const cfg = resolveConfig();
    // Prefer a static token if provided
    if (cfg.staticToken) {
      const token = String(cfg.staticToken).trim();
      CACHE = { token, expireAt: nowSec() + 3600 };
      return Response.json({ ok: true, token, static: true, expireAt: CACHE.expireAt });
    }
    if (CACHE.token && CACHE.expireAt > nowSec() + 30) {
      return Response.json({ ok: true, token: CACHE.token, cached: true, expireAt: CACHE.expireAt });
    }
    if (cfg.mock || !cfg.clientId || !cfg.clientSecret) {
      const fake = `cj_mock_${Math.random().toString(36).slice(2, 10)}`;
      CACHE = { token: fake, expireAt: nowSec() + 600 };
      return Response.json({ ok: true, token: fake, mock: true, expireAt: CACHE.expireAt });
    }
    const { token, expiresIn } = await fetchTokenReal(cfg);
    CACHE = { token, expireAt: nowSec() + (expiresIn || 3600) };
    return Response.json({ ok: true, token, expireAt: CACHE.expireAt });
  } catch (e) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

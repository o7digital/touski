// CJ Dropshipping token fetcher (configurable). Falls back to mock when env missing.
// Env supported (choose ONE auth mode):
// - Email + API Key (recommended by CJ developers API):
//   CJ_EMAIL, CJ_API_KEY, CJ_TOKEN_URL (default: https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken)
// - Client Credentials (generic OAuth-like): CJ_CLIENT_ID, CJ_CLIENT_SECRET, CJ_TOKEN_URL
// - Static token: CJ_STATIC_TOKEN
// Extras:
// - CJ_BASE_URL (default: https://openapi.cjdropshipping.com)
// - CJ_MOCK=1 to return a mock token without network

let CACHE = { token: null, expireAt: 0 };

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function sanitizeToken(raw) {
  if (!raw) return undefined;
  let s = String(raw);
  // Strip HTML tags possibly pasted from UI
  s = s.replace(/<[^>]*>/g, "");
  // Strip quotes and trim
  s = s.trim().replace(/^['"]|['"]$/g, "");
  // Remove non-ASCII safety
  s = s.replace(/[^\x00-\x7F]/g, "");
  return s;
}

function resolveConfig() {
  const base = process.env.CJ_BASE_URL || 'https://openapi.cjdropshipping.com';
  const defaultDevTokenUrl = 'https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken';
  const tokenUrl = process.env.CJ_TOKEN_URL || defaultDevTokenUrl;
  return {
    base,
    tokenUrl,
    // CJ Developers credentials
    email: process.env.CJ_EMAIL,
    apiKey: process.env.CJ_API_KEY,
    // Generic client credentials (fallback)
    clientId: process.env.CJ_CLIENT_ID,
    clientSecret: process.env.CJ_CLIENT_SECRET,
    // Static token
    staticToken: process.env.CJ_STATIC_TOKEN,
    mock: process.env.CJ_MOCK === '1' || process.env.CJ_MOCK === 'true',
  };
}

async function fetchTokenWithEmailApiKey(cfg) {
  const res = await fetch(cfg.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: cfg.email, apiKey: cfg.apiKey }),
    cache: 'no-store',
  });
  const text = await res.text();
  let j = null; try { j = JSON.parse(text); } catch {}
  if (!res.ok) {
    const msg = j?.message || `${res.status} ${res.statusText}`;
    throw new Error(`CJ token error: ${msg}`);
  }
  // CJ developers response shape
  const access = j?.data?.accessToken || j?.accessToken;
  // default to 1h if expiry parse fails
  const expiresIn = 3600;
  if (!access) throw new Error('CJ token response missing accessToken');
  return { token: access, expiresIn };
}

async function fetchTokenWithClientCreds(cfg) {
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
      const token = sanitizeToken(cfg.staticToken);
      CACHE = { token, expireAt: nowSec() + 3600 };
      return Response.json(
        { ok: true, token, static: true, expireAt: CACHE.expireAt },
        { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
      );
    }
    if (CACHE.token && CACHE.expireAt > nowSec() + 30) {
      return Response.json({ ok: true, token: CACHE.token, cached: true, expireAt: CACHE.expireAt });
    }
    // Try CJ developers email + apiKey
    if (cfg.email && cfg.apiKey) {
      const { token, expiresIn } = await fetchTokenWithEmailApiKey(cfg);
      const clean = sanitizeToken(token);
      CACHE = { token: clean, expireAt: nowSec() + (expiresIn || 3600) };
      return Response.json(
        { ok: true, token: clean, expireAt: CACHE.expireAt, mode: 'email_apiKey' },
        { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
      );
    }
    // Try generic client credentials
    if (cfg.clientId && cfg.clientSecret) {
      const { token, expiresIn } = await fetchTokenWithClientCreds(cfg);
      const clean = sanitizeToken(token);
      CACHE = { token: clean, expireAt: nowSec() + (expiresIn || 3600) };
      return Response.json(
        { ok: true, token: clean, expireAt: CACHE.expireAt, mode: 'client_credentials' },
        { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
      );
    }
    // Mock as a last resort
    if (cfg.mock) {
      const fake = `cj_mock_${Math.random().toString(36).slice(2, 10)}`;
      CACHE = { token: fake, expireAt: nowSec() + 600 };
      return Response.json({ ok: true, token: fake, mock: true, expireAt: CACHE.expireAt });
    }
    return Response.json(
      { ok: false, error: 'No CJ auth configured (set CJ_STATIC_TOKEN or CJ_EMAIL/CJ_API_KEY or CJ_CLIENT_ID/CJ_CLIENT_SECRET)' },
      { status: 400, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
    );
  } catch (e) {
    return Response.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
    );
  }
}

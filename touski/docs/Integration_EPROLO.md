EPROLO — Intégration (dev)

Variables d’environnement (mettre dans `touski/.env.local` — ne pas commiter vos secrets):

- `CJ_ENABLED=0` pour mettre CJ en pause sans supprimer le code.
- `EPROLO_API_KEY` clé API fournie par EPROLO.
- `EPROLO_EMAIL` email du compte (certaines configurations l’exigent en header).
- `EPROLO_SEARCH_URL` optionnel. Par défaut: `https://openapi.eprolo.com`.
- `EPROLO_EXTRA` optionnel (JSON). Ex: `{ "language": "EN" }`.
- `EPROLO_MOCK=1` optionnel pour tester l’UI sans réseau.

Endpoints ajoutés:

- `GET /api/eprolo/products?q=house&page=1&pageSize=24[&preset=home][&nofilter=1]`
  - Retourne `{ ok, items[], page, pageSize }` avec normalisation (sku, name, price, images[], raw).
  - Fallback mock activable via `EPROLO_MOCK=1`.
  - `preset=home` applique un filtre maison (allow/block). Utilise `EPROLO_HOME_ALLOW` / `EPROLO_HOME_BLOCK` ou, par défaut, les mêmes mots‑clés que CJ. `nofilter=1` désactive le filtre.

Page démo:

- `/eprolo-catalog` — Recherche simple et liste des produits EPROLO.

Notes:

- Le code tente d’appeler `EPROLO_SEARCH_URL` en `POST` JSON (plusieurs variantes d’en‑têtes: `apiKey`, `email`/`userEmail`, `X-API-KEY`, `Authorization: Bearer ...`) puis en `GET` avec `apiKey` en query. Si votre compte requiert une autre forme (signature, timestamp, chemin spécifique), ajustez `EPROLO_SEARCH_URL` et/ou `EPROLO_EXTRA` en conséquence.
- CJ est conservé dans le repo mais renvoie `503 CJ integration paused` tant que `CJ_ENABLED=0`.

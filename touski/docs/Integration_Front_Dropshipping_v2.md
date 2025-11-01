# Intégration Front + Dropshipping v2

Objectif: documenter l’intégration front (Next.js) avec le catalogue fournisseur CJ sans import massif, l’agrégation côté serveur, les variables d’environnement, les endpoints de debug, et la section Home 9 « Best Selling » avec filtre « Univers ».

## 1) Contexte & principes

- Affichage live du catalogue CJ côté front, sans importer des milliers de produits.
- Import/écriture dans Directus uniquement au moment clé (ex: création de commande), pas avant.
- Filtrage « univers Maison » piloté par le backend (agrégateur) pour réduire le bruit (éviter vêtements/bijoux/etc.).
- Zéro dépendance au champ `category` textuel de CJ; on privilégie `categoryId` quand disponible, sinon mots‑clés et filtrage serveur.

## 2) Architecture (dépôt `touski/`)

- UI Next.js (app router): `touski/app/...`
  - Home 9: `touski/app/(homes)/home-9/page.jsx`
  - Shop CJ (liste complète): `touski/app/(shoplist)/shop-1/page.jsx`
- Aides & composants:
  - Composant grille CJ: `touski/components/cj/CjGrid.jsx`
  - Best Selling (Home 9) avec « Univers »: `touski/components/homes/home-9/BestSelling.jsx`
- API (routes Next):
  - Catalogue CJ (agrégateur): `touski/app/api/cj/products/route.js`
  - Token CJ: `touski/app/api/cj/token/route.js`
  - Catégories CJ: `touski/app/api/cj/categories/route.js`
  - Debug preset: `touski/app/api/cj/preset-debug/route.js`
  - (Option) Import 1 produit → Directus: `touski/app/api/cj/import-one/route.js` (désactivable côté UI)
- Directus (si utilisé): helpers sous `touski/lib/directus.js`.

## 3) Variables d’environnement

- Auth CJ (developers):
  - `CJ_STATIC_TOKEN` (recommandé: token developers propre)
  - ou `CJ_EMAIL`, `CJ_API_KEY` (+ `CJ_TOKEN_URL` défaut developers) pour régénérer un token côté serveur
- Catalogue CJ (base + params génériques):
  - `CJ_BASE_URL` (défaut: `https://openapi.cjdropshipping.com`)
  - `CJ_PRODUCTS_PATH` (ex: `/api2.0/v1/product/list` pour developers)
  - `CJ_TOKEN_HEADER` (ex: `CJ-Access-Token`, alternatif: `Authorization` + `CJ_TOKEN_PREFIX=Bearer`)
  - `CJ_Q_PARAM` (ex: `keyWord`), `CJ_PAGE_PARAM=pageNum`, `CJ_SIZE_PARAM=pageSize`
  - `CJ_USE_POST` (`0|1`) — fallback GET si POST non supporté
- Affinage « maison » (serveur):
  - `CJ_HOME_ALLOW` JSON (liste de mots‑clés permis)
  - `CJ_HOME_BLOCK` JSON (liste de mots‑clés à exclure — ex: apparel/jewelry)
  - `CJ_EXTRA` JSON merge pour appels (ex: `{"language":"EN"}`)

Exemple minimal (Vercel):

```
CJ_STATIC_TOKEN=... (token developers)
CJ_BASE_URL=https://developers.cjdropshipping.com
CJ_PRODUCTS_PATH=/api2.0/v1/product/list
CJ_TOKEN_HEADER=CJ-Access-Token
CJ_Q_PARAM=keyWord
CJ_HOME_ALLOW=["home","kitchen","bath","lighting","furniture","storage","garden","bedding","clean"]
CJ_HOME_BLOCK=["clothing","jeans","dress","jewelry","bag","shoes","wallet"]
```

## 4) Endpoints API (serveur)

- `GET /api/cj/products`
  - Reçoit: `preset` (home|kitchen|bath|lighting|furniture|storage|garden), `q`, `page`, `pageSize`, `minPrice`, `maxPrice`, `sort`, `language`.
  - Logique:
    1) Tente par catégories CJ (via `/api/cj/categories`) → requêtes avec `categoryId`.
    2) Complète par mots‑clés (selon preset).
    3) Déduplique par SKU, filtre maison (allow/block). Si trop peu d’items, fallback « block‑only » pour éviter le vide.
  - Retour: `{ ok, items, invalidCount?, page, pageSize, preset, totalCandidates? }`.

- `GET /api/cj/categories`
  - Proxy/fallbacks pour récupérer l’arborescence 3 niveaux et renvoyer un flat list `{ id, name, level, path[] }`.

- `GET /api/cj/preset-debug`
  - Agrège plusieurs termes pour un `preset`, applique le filtre maison, indique pré/post‑filtrage.

- `GET /api/cj/token`
  - Renvoie un token (priorité au `CJ_STATIC_TOKEN`), sinon login developers (email/apiKey).

## 5) UI — Home 9 « Best Selling »

- Fichier: `touski/components/homes/home-9/BestSelling.jsx`
- Ajouts:
  - Select « Univers » (Maison/Cuisine/Salle de bain/Luminaires/Meubles/Rangement/Jardin)
  - Appel `GET /api/cj/products?preset=<univers>&pageSize=...&language=EN`
  - Cartes 330×400 (class `pc__img`), images chargées en `<img>` pour éviter les contraintes du proxy Next Image.

## 6) Page liste complète

- `touski/app/(shoplist)/shop-1/page.jsx`
  - Paramètre `source=cj` → consomme `/api/cj/products` avec filtres de recherche simples.
  - Composant grille: `touski/components/cj/CjGrid.jsx`.

## 7) Déploiement & images

- `touski/next.config.mjs` contient les domaines images CJ (`oss-cf.cjdropshipping.com`, `cf.cjdropshipping.com`).
- Rebuild requis après modification du `next.config.mjs`.

## 8) Limitations CJ & contournements

- `category` textuel peu fiable; préférer `categoryId` si l’API l’accepte, sinon preset + mots‑clés.
- `keyWord` vs `keyword`: instabilité observée; param configurable via ENV.
- POST non supporté sur certains endpoints: fallback GET automatique.
- Taux/Limites: appliquer backoff sur 429 (ex: 1–2s) et limiter la QPS.

## 9) Debug & vérifications

- Catégories: `GET /api/cj/categories?strict=1`
- Agrégateur: `GET /api/cj/products?preset=home&pageSize=24&language=EN`
- Debug preset: `GET /api/cj/preset-debug?preset=home&pageSize=24`

## 9 bis) Validation & types (Zod)

- Dépendance: `zod` (installée).
- Schémas: `touski/lib/schemas/cj.js`
  - `ProductSchema` (forme produit normalisée: `sku`, `name`, `price`, `images[]`, …)
  - `QuerySchema` (params sûrs: `q`, `page`, `pageSize`, `minPrice`, `maxPrice`, `sort`, `language`, `preset`, `categoryId`, …)
  - `validateProducts(items)` filtre les éléments invalides et expose `invalidCount`.
- Application: `touski/app/api/cj/products/route.js`
  - Valide les query params; réponses 400 avec `issues` si invalide.
  - Valide/formate la liste finale; `invalidCount` présent pour diagnostic.

Tests rapides
```
curl -sS "https://<host>/api/cj/products?preset=home&pageSize=24&language=EN" | jq '.invalidCount,.items[0]'
curl -sS "https://<host>/api/cj/products?pageSize=0" | jq '.issues'   # doit renvoyer 400 en local
```

## 10) Sécurité

- Ne jamais commiter de token/API key; saisir en ENV (Vercel).
- `referrerPolicy="no-referrer"` sur `<img>` côté front pour limiter les 403 éventuels.

## 11) Roadmap (suggestions)

- Ajouter presets additionnels (Décoration, Entretien) si besoin.
- Exposer un mapping stable catégorie → `categoryId` pour chaque univers après réponse officielle CJ.
- Ajouter cache (60–120s) côté serveur sur `/api/cj/products` pour lisser les temps de réponse.

## 13) Changelog (extraits)

- 2025‑11‑01
  - Ajout Zod (validation runtime) et schémas sous `touski/lib/schemas/cj.js`.
  - `/api/cj/products` valide les query params et la forme des produits; ajoute `invalidCount` dans la réponse.
  - Correction build Next (suppression d’un `\` résiduel dans le fichier de schéma).

## 12) cURL utiles

```
# Token developers
curl -sS -X POST 'https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken' \
  -H 'Content-Type: application/json' \
  --data-raw '{"email":"<EMAIL>","apiKey":"<API_KEY>"}'

# Liste produits (mot‑clé)
curl -sS 'https://developers.cjdropshipping.com/api2.0/v1/product/list?keyWord=home&pageNum=1&pageSize=24&language=EN' \
  -H 'CJ-Access-Token: <TOKEN>'

# Via notre agrégateur (univers Maison)
curl -sS 'https://<HOST>/api/cj/products?preset=home&pageSize=24&language=EN'
```

— Fin —

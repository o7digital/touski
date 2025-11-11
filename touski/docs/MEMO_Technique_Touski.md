# Mémoire technique — Touski

But: garder une trace claire pour remettre en route rapidement le front Next.js, l’intégration Directus, et l’import fournisseur (CJ) en cas de pépin.

## Architecture

- Monorepo simple, app Next.js sous `touski/`
  - Pages: `touski/app/...`
  - Helpers Directus: `touski/lib/directus.js`
  - Debug Directus: `touski/app/api/directus/products-debug/route.js`
  - Page test catalogue Directus: `touski/app/(shoplist)/shop-1/page.jsx`

## Variables d’environnement (Vercel)

- Production = branche `main`
- Preview = autres branches (ex: `dev`)

Définir exactement (dans Production ET Preview):

- NEXT_PUBLIC_DIRECTUS_URL = URL base Directus (sans `/admin`, ni slash final)
- DIRECTUS_EMAIL, DIRECTUS_PASSWORD ou (fallback accepté) NEXT_PUBLIC_DIRECTUS_EMAIL, NEXT_PUBLIC_DIRECTUS_PASSWORD
- (Optionnel) DIRECTUS_STATIC_TOKEN — à éviter si token non permanent. Le code fait un login serveur si token invalide/absent.

Re-déployer après tout changement d’ENV.

## Intégration Directus (fetch côté serveur)

- Helper: `touski/lib/directus.js`
  - Résolution d’URL: tente NEXT_PUBLIC_DIRECTUS_URL, DIRECTUS_URL, NEXT_PUBLIC_DIRECTUS_API_URL, DIRECTUS_API_URL
  - Auth: ordre de préférence
    1) accessToken fourni (rare)
    2) DIRECTUS_STATIC_TOKEN (si présent et valide)
    3) Login auto via (DIRECTUS_EMAIL|PASSWORD) ou leurs variantes NEXT_PUBLIC_*
  - getProducts: gère variantes de collection (`products`, `Products`, etc.) et renvoie `{ data: [...] }`

## Debug en déployé

- Endpoint: `GET /api/directus/products-debug?limit=5`
  - Renvoie: `url` appelée, `status`, `ok`, `authMode` (static_token|login), `usedAuthHeader`, `tokenMeta`, `credsMeta`, `data|raw`.
  - Utilisation: vérifier rapidement URL/ENV/permissions sur Vercel.

## Page de test front

- `GET /shop-1`: affiche un bloc “Produits Directus” (name, Description, sku, price, cost_price, status) + la grille mock existante.

## Procédure de reprise rapide

1) Vérifier les ENV (Production/Preview identiques) et re-déployer
2) `GET /api/directus/products-debug?limit=1` → ok: true attendu
3) `GET /shop-1` → doit afficher les produits Directus
4) Si échec auth: s’assurer que EMAIL/PASSWORD Vercel sont corrects (login auto). Supprimer un token statique expiré.

## Nettoyage disque (local)

- `git gc --aggressive --prune=now`
- Supprimer caches: `.next/`, `node_modules/` si besoin (réinstall), `find . -name '.DS_Store' -delete`

## Intégration fournisseur CJ (plan validé)

Objectif: montrer le catalogue CJ côté front rapidement, sans importer en masse.

1) Listing proxy (MVP)
   - Route: `/api/cj/products` (server) — proxy CJ avec pagination (`page`, `pageSize`, `q`)
   - Normalisation champs (insensible à la casse): `sku`, `name`, `description`, `price`, `compare_price`, `cost_price`, `weight`, `images`
   - Variables Vercel à prévoir: `CJ_BASE_URL`, `CJ_CLIENT_ID`, `CJ_CLIENT_SECRET` (ou équivalents de leur doc)

### Mise à jour 2025‑11 — Agrégateur par « preset »
- Presets supportés: `home`, `garden`, `furniture`.
- Sélection de catégories CJ par racine « Home, Garden & Furniture » + mots‑clés.
- Paramètre CJ par défaut: `categoryId` (au lieu de `category`).
- Pagination agrégée (page/pageSize) sur un pool élargi.
- Filtrage texte assoupli: mode `block_only` pour ne pas écarter des produits valides.
- Variables ENV de tuning (défauts actuels entre parenthèses):
  - `CJ_PAGES_PER_CAT` (8) — nb de pages récupérées par catégorie sélectionnée
  - `CJ_PRESET_MULT` (10) — multiplicateur de taille du pool cible
  - `CJ_PICK_LIMIT` (80) — nbre max de catégories prises en compte

UI Home 9
- « Univers » (Maison/Jardin/Meubles) → `preset` + résolution fuzzy `categoryId`.
- Chips de sous‑catégories (résolution fuzzy → `categoryId`).
- Menu déroulant « Catégories CJ » alimenté par `/api/cj/categories` (`strict=1`).
- Charge incrémentale (append) via « Voir tous les produits » (page++).
- Sélecteur de taille exposant 24/48/96/120/180/240; défaut 180.

2) Page front catalogue CJ
   - `touski/app/cj-catalog/page.jsx` — consomme `/api/cj/products`, affiche cartes + pagination

3) Lazy import au checkout
   - Route: `/api/cj/import-one?sku=...` — upsert dans Directus (`products`) par `sku` (PATCH si existe, sinon POST)
   - Création d’une commande (si modèle) avec snapshot des prix
   - Champ `status`: `published` ou `draft` selon règle

4) Option import batch limité
   - Route `/api/cj/sync?dry=1&limit=50` (dry-run), `POST` pour appliquer
   - Protégé par `IMPORT_SECRET`

5) Images
   - MVP: URLs CJ directes
   - Étape suivante: upload vers Directus `/files` + relation dans `products`

## Checklists

Env Vercel (par env Production/Preview)
- [ ] NEXT_PUBLIC_DIRECTUS_URL
- [ ] DIRECTUS_EMAIL / DIRECTUS_PASSWORD (ou NEXT_PUBLIC_*)
- [ ] (Option) IMPORT_SECRET, CJ_* pour futur CJ

Tests rapides
- [ ] /api/directus/products-debug?limit=1 → ok
- [ ] /shop-1 → produit “savon” visible

## Cheatsheet Terminal (Directus)

Login
```
TOKEN=$(jq -n --arg email "$DIRECTUS_EMAIL" --arg password "$DIRECTUS_PASSWORD" '{email:$email, password:$password}' \
  | curl -fsS "$DIRECTUS_URL/auth/login" -H 'Content-Type: application/json' --data-binary @- \
  | jq -r '.data.access_token // .access_token')
```

Lister 5 produits
```
curl -fsS "$DIRECTUS_URL/items/products?limit=5&fields=id,name,Description,sku,price,cost_price,status" \
  -H "Authorization: Bearer $TOKEN" | jq .
```

Note token: éviter tout collage tronqué avec “…”; utiliser `printf '%s' "$TOKEN" | pbcopy`.

## Notes divers

- Les champs mixtes Maj/Min (ex: `Description`) sont gérés côté affichage.
- Le helper Directus nettoie les tokens non ASCII et tente l’auth auto si besoin.

## Voir aussi

- Nouvelle note d’intégration (Front + Dropshipping v2): `touski/docs/Integration_Front_Dropshipping_v2.md`
- Validation runtime (Zod) intégrée côté API CJ (`/api/cj/products`).
- Changelog: `touski/docs/CHANGELOG_2025-11-11.md`

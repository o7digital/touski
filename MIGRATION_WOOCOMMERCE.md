# Migration WooCommerce - Mémoire Technique

**Date:** 12 Novembre 2025  
**Objectif:** Remplacer Directus par WooCommerce comme backend e-commerce, garder Next.js frontend

---

## Contexte du Projet

### Problème Initial
- Frontend: Next.js (déployé sur Vercel)
- Backend: Directus (Railway) - trop complexe pour l'e-commerce
- Problèmes:
  - APIs dropshipping (CJ, Eprolo) lentes et instables
  - Gestion manuelle des marges/prix
  - Tout à coder from scratch (panier, checkout, paiements)
  - Bobby (business owner) veut vendre vite

### Solution Choisie
- **Frontend:** Next.js (INCHANGÉ - tout le design/template reste)
- **Backend:** WooCommerce (headless) sur Siteground
- **Architecture:** Headless commerce (Next.js consomme API REST WooCommerce)

---

## Configuration WooCommerce (FAIT ✅)

### Hébergement
- **Provider:** Siteground
- **URL WordPress:** `http://oliviers42.sg-host.com`
- **Admin:** `http://oliviers42.sg-host.com/wp-admin`

### Credentials WordPress
- **User:** `olivier.steineur@icloud.com`
- **Password:** [fourni par utilisateur]

### Configuration WooCommerce
- **Pays:** Canada
- **Devise:** CAD (Dollar Canadien)
- **Permalinks:** Post name (CRITIQUE pour API REST)

### Clés API WooCommerce (REST API)
```
Consumer Key: ck_da99c51b760c5b9715fb41d175b146dd0b2cfcad
Consumer Secret: cs_f740a79fb0c06fcb5474b8d01c47c8dd585d967d
Permissions: Read/Write
```

**⚠️ À stocker dans `.env.local` (local) et Vercel env vars (prod) - NE PAS commit**

---

## Architecture Technique

### Stack
```
┌─────────────────────────────────────┐
│   Next.js Frontend (Vercel)         │
│   - Pages produits (inchangées)     │
│   - Components (inchangés)          │
│   - lib/woocommerce.js (NOUVEAU)    │
└─────────────┬───────────────────────┘
              │ API REST
              │ (HTTP/JSON)
              ▼
┌─────────────────────────────────────┐
│   WooCommerce (Siteground)          │
│   - Produits                        │
│   - Panier/Checkout                 │
│   - Commandes                       │
│   - Paiements (Stripe/PayPal)       │
└─────────────┬───────────────────────┘
              │ Scripts sync
              ▼
┌─────────────────────────────────────┐
│   Dropshippers (CJ, Eprolo...)      │
│   - Sync quotidien produits         │
│   - Envoi commandes automatique     │
└─────────────────────────────────────┘
```

### Endpoints WooCommerce API
Base URL: `http://oliviers42.sg-host.com/wp-json/wc/v3`

**Produits:**
- `GET /products` - Liste produits
- `GET /products/{id}` - Détail produit
- `POST /products` - Créer produit (sync)
- `PUT /products/{id}` - Mettre à jour produit

**Catégories:**
- `GET /products/categories`

**Panier (via WooCommerce Store API):**
- `POST /wc/store/v1/cart/add-item`
- `GET /wc/store/v1/cart`

**Commandes:**
- `POST /orders` - Créer commande
- `GET /orders/{id}` - Détail commande

**Documentation:** https://woocommerce.github.io/woocommerce-rest-api-docs/

---

## Plan d'Implémentation

### Phase 1: Connexion API (EN COURS)
**Fichiers à créer:**

#### 1. `touski/.env.local` (NE PAS COMMIT)
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=http://oliviers42.sg-host.com
WOOCOMMERCE_CONSUMER_KEY=ck_da99c51b760c5b9715fb41d175b146dd0b2cfcad
WOOCOMMERCE_CONSUMER_SECRET=cs_f740a79fb0c06fcb5474b8d01c47c8dd585d967d
```

#### 2. `touski/lib/woocommerce.js`
```javascript
// Helper pour API WooCommerce
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

// Récupérer tous les produits
export async function getProducts(params = {}) {
  try {
    const response = await api.get("products", {
      per_page: 20,
      ...params
    });
    return response.data.map(mapWooProductToLocal);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Récupérer un produit par ID
export async function getProduct(id) {
  try {
    const response = await api.get(`products/${id}`);
    return mapWooProductToLocal(response.data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Mapper format WooCommerce → format actuel du site
function mapWooProductToLocal(wooProduct) {
  return {
    id: wooProduct.id,
    title: wooProduct.name,
    price: parseFloat(wooProduct.price),
    regular_price: parseFloat(wooProduct.regular_price),
    sale_price: wooProduct.sale_price ? parseFloat(wooProduct.sale_price) : null,
    description: wooProduct.description,
    short_description: wooProduct.short_description,
    images: wooProduct.images.map(img => ({
      id: img.id,
      src: img.src,
      alt: img.alt
    })),
    categories: wooProduct.categories.map(cat => cat.name),
    stock_status: wooProduct.stock_status,
    in_stock: wooProduct.stock_status === 'instock',
    sku: wooProduct.sku,
    slug: wooProduct.slug,
    // Ajouter d'autres champs selon besoin
  };
}

export { api };
```

#### 3. Installation dépendance
```bash
cd touski
npm install @woocommerce/woocommerce-rest-api
```

---

### Phase 2: Adapter Pages Produits

#### Exemple: Modifier une page produit
**Fichier:** `touski/app/(shopSingle)/product1_simple/page.jsx`

**AVANT (Directus):**
```javascript
import { getProductFromDirectus } from '@/lib/directus';

export default async function ProductPage({ params }) {
  const product = await getProductFromDirectus(params.id);
  // ... reste du code
}
```

**APRÈS (WooCommerce):**
```javascript
import { getProduct } from '@/lib/woocommerce';

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  // ... reste du code IDENTIQUE (JSX, composants, styles)
}
```

**Pages à adapter:**
- `app/(shoplist)/shop-*/page.jsx` - Listes produits
- `app/(shopSingle)/product*/page.jsx` - Pages produits individuelles
- `components/shoplist/*` - Composants listes
- `components/singleProduct/*` - Composants produit

---

### Phase 3: Panier & Checkout

#### Option 1: Utiliser WooCommerce Checkout (SIMPLE)
- Rediriger vers `http://oliviers42.sg-host.com/checkout` pour checkout
- Avantages: Paiements/taxes gérés automatiquement
- Inconvénient: Utilisateur quitte le site Next.js

#### Option 2: Headless Checkout (COMPLEXE mais meilleure UX)
- Utiliser WooCommerce Store API
- Créer panier et commande via API
- Intégrer Stripe Elements dans Next.js
- Garder utilisateur sur le site

**Recommandation initiale:** Option 1 pour lancer vite, Option 2 plus tard

---

### Phase 4: Dropshipping & Marges

#### Champs Custom WooCommerce
À ajouter via plugin "Advanced Custom Fields" ou code:

**Sur Produits:**
- `_cost_price` - Prix d'achat fournisseur
- `_supplier_id` - ID fournisseur (CJ, Eprolo, etc.)
- `_margin_percent` - Marge % (override)
- `_margin_fixed` - Marge fixe (override)
- `_auto_calculate_price` - Boolean (recalculer prix auto)

**Sur Custom Post Type "Suppliers":**
- `name` - Nom fournisseur
- `default_margin_percent` - Marge % par défaut
- `default_margin_fixed` - Marge fixe par défaut
- `api_credentials` - Credentials API (encrypted)

#### Calcul Prix de Vente
```javascript
function calculateSellPrice(costPrice, marginPercent, marginFixed) {
  return Math.round((costPrice * (1 + marginPercent / 100) + marginFixed) * 100) / 100;
}
```

#### Script Sync CJ → WooCommerce
**Fichier:** `scripts/sync-cj-to-woocommerce.js`

**Adapter depuis:** `scripts/sync-cj-to-directus.js`

**Changements:**
- Remplacer appels Directus par WooCommerce API
- Utiliser `POST /products` pour créer
- Utiliser `PUT /products/{id}` pour mettre à jour
- Stocker `supplier_id` et `cost_price` en meta fields

**Exemple:**
```javascript
import { api } from '../touski/lib/woocommerce.js';

async function syncCJProducts(category, limit) {
  // 1. Fetch produits depuis CJ API
  const cjProducts = await fetchCJProducts(category, limit);
  
  // 2. Pour chaque produit CJ
  for (const cjProduct of cjProducts) {
    const costPrice = cjProduct.variants[0].price;
    const sellPrice = calculateSellPrice(costPrice, 35, 2); // 35% + 2 CAD
    
    // 3. Créer/update dans WooCommerce
    const wooProduct = {
      name: cjProduct.productNameEn,
      type: 'simple',
      regular_price: sellPrice.toString(),
      description: cjProduct.description,
      images: cjProduct.productImages.map(img => ({ src: img })),
      meta_data: [
        { key: '_cost_price', value: costPrice.toString() },
        { key: '_supplier_id', value: 'cj' },
        { key: '_auto_calculate_price', value: 'yes' }
      ]
    };
    
    await api.post('products', wooProduct);
  }
}
```

---

## Migration des Données

### Si produits existent dans Directus

#### 1. Export Directus
```bash
# Script à créer: scripts/export-directus-products.js
node scripts/export-directus-products.js > products-backup.json
```

#### 2. Import vers WooCommerce
```bash
# Script à créer: scripts/import-to-woocommerce.js
node scripts/import-to-woocommerce.js products-backup.json
```

### Mapping Directus → WooCommerce
```
Directus              →  WooCommerce
-------------------      ------------------
id                   →  sku (garder référence)
title                →  name
price                →  regular_price
description          →  description
images (URLs)        →  images[{src}]
category             →  categories[{id}]
stock                →  stock_quantity
```

---

## Environnement Variables

### `.env.local` (développement local)
```env
# WooCommerce
NEXT_PUBLIC_WOOCOMMERCE_URL=http://oliviers42.sg-host.com
WOOCOMMERCE_CONSUMER_KEY=ck_da99c51b760c5b9715fb41d175b146dd0b2cfcad
WOOCOMMERCE_CONSUMER_SECRET=cs_f740a79fb0c06fcb5474b8d01c47c8dd585d967d

# CJ Dropshipping (si utilisé)
CJ_STATIC_TOKEN=your_cj_token_here
CJ_BASE_URL=https://developers.cjdropshipping.com

# Directus (optionnel - si coexistence temporaire)
NEXT_PUBLIC_DIRECTUS_URL=https://touski-admin-directus-production.up.railway.app
DIRECTUS_EMAIL=your_email
DIRECTUS_PASSWORD=your_password
```

### Vercel Environment Variables (production)
Ajouter les mêmes variables dans: Vercel Dashboard → Settings → Environment Variables

---

## Tests & Validation

### Checklist Phase 1
- [ ] `lib/woocommerce.js` créé et testé
- [ ] `.env.local` configuré (credentials OK)
- [ ] `npm install @woocommerce/woocommerce-rest-api` exécuté
- [ ] Test API: `getProducts()` retourne produits
- [ ] Test API: `getProduct(id)` retourne détail

### Checklist Phase 2
- [ ] 1 page produit adaptée et fonctionnelle
- [ ] Navigation produits marche
- [ ] Images s'affichent
- [ ] Prix affichés correctement
- [ ] Toutes pages shop adaptées

### Checklist Phase 3
- [ ] Panier fonctionne (ajout/retrait)
- [ ] Checkout accessible
- [ ] Paiement test réussi
- [ ] Commande créée dans WooCommerce

### Checklist Phase 4
- [ ] Champs custom ajoutés (marges/supplier)
- [ ] Script sync CJ fonctionnel
- [ ] Calcul prix automatique marche
- [ ] Commandes routées vers fournisseur

---

## Commandes Utiles

### Développement
```bash
# Démarrer Next.js local
cd touski
npm run dev

# Tester connexion WooCommerce
node -e "const {getProducts} = require('./lib/woocommerce.js'); getProducts().then(console.log)"

# Sync produits CJ (une fois script créé)
node scripts/sync-cj-to-woocommerce.js home 10
```

### Déploiement
```bash
# Build Next.js
npm run build

# Deploy Vercel (auto via Git push)
git add .
git commit -m "feat: Migration WooCommerce"
git push origin main
```

---

## Problèmes Connus & Solutions

### API WooCommerce CORS
**Problème:** Erreur CORS si appel client-side  
**Solution:** Faire appels API côté serveur (Server Components Next.js ou API Routes)

### Images externes
**Problème:** WooCommerce héberge pas images dropshipping  
**Solution:** Stocker juste URLs externes (CJ CDN, etc.) - acceptable

### Stock sync
**Problème:** Stock change côté fournisseur  
**Solution:** Sync quotidien + vérification temps réel au checkout

### Performance
**Problème:** WooCommerce peut être lent  
**Solution:** 
- Cache Next.js (ISR)
- Redis si nécessaire
- CDN pour images

---

## Timeline Prévu

**Mardi 12 Nov (Aujourd'hui):**
- ✅ Config WooCommerce + clés API
- 🔄 Créer `lib/woocommerce.js`
- 🔄 Adapter 1 page produit exemple
- ⏳ Checkpoint: validation fonctionnement

**Mercredi 13 Nov:**
- Adapter toutes pages shop/produits
- Adapter panier + checkout basique
- Checkpoint: Bobby teste navigation

**Jeudi 14 Nov:**
- Config dropshipping (champs custom)
- Script sync CJ → WooCommerce
- Tester commande E2E

**Vendredi 15 Nov:**
- Corrections bugs
- Optimisations
- Tests finaux Bobby

**Samedi 16 Nov (buffer):**
- Ajustements finaux
- **→ LANCEMENT possible**

---

## Contacts & Ressources

### Équipe
- **Développeur:** GitHub Copilot / AI Assistant
- **Business Owner:** Bobby (rivardbobby@gmail.com)
- **Admin Technique:** olivier.steineur@icloud.com

### Liens Importants
- **Frontend:** https://touski.vercel.app (ou domaine custom)
- **WooCommerce Admin:** http://oliviers42.sg-host.com/wp-admin
- **Directus (legacy):** https://touski-admin-directus-production.up.railway.app
- **Repo GitHub:** https://github.com/o7digital/touski

### Documentation
- WooCommerce REST API: https://woocommerce.github.io/woocommerce-rest-api-docs/
- Next.js: https://nextjs.org/docs
- CJ Dropshipping API: https://developers.cjdropshipping.com/api2

---

## Notes Importantes

⚠️ **NE JAMAIS COMMIT:**
- `.env.local`
- Credentials en clair
- Clés API

✅ **TOUJOURS:**
- Utiliser variables d'environnement
- Tester en local avant deploy
- Garder backup Directus pendant transition
- Documenter changements

---

**Dernière mise à jour:** 12 Novembre 2025, 14:37 UTC  
**Statut:** Phase 1 en cours (config WooCommerce complétée ✅)

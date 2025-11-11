# 📋 Résumé Détaillé - Reste à Faire (Touski)

**Date:** 10 novembre 2025  
**Statut actuel:** Frontend home-9 en cours de finalisation avec Copilot + Codex

---

## ✅ Ce qui a été fait récemment

### Design & UX (Session actuelle)
- ✅ Header dynamique (hide on scroll, show on scroll up/idle)
- ✅ Logo flottant (overflow 2.5cm vers le bas)
- ✅ Menu agrandi (font-size 1.1rem, font-weight 600)
- ✅ Menu traduit en français (Accueil, Boutique, Blog, Touski, Contacter)
- ✅ Hero avec transparence 30% sur rectangles oranges
- ✅ Collections avec transparence 30% sur labels (RGBA)
- ✅ Nombres de produits en orange dans Collections
- ✅ Audit complet du frontend (22 homes, 16 products, API inventory)

### Technique
- ✅ Fix package.json (Zod installation, formatting)
- ✅ Git workflow stable (3 commits poussés sur main)

---

## 🔥 PRIORITÉ 1 - Frontend (À faire maintenant)

### 1. 🔌 Intégration CJ Dropshipping
**Fichiers concernés:**
- `/app/api/cj/products/route.js`
- `/app/api/cj/categories/route.js`
- `/components/homes/home-9/BestSelling.jsx` (Codex travaille dessus)
- `/app/cj-catalog/page.jsx`

**Actions:**
1. Tester `/api/cj/products` avec preset-debug
2. Vérifier filtres univers (home, kitchen, bath, lighting, detergent)
3. Valider mapping des catégories FR→EN (fournitures→furniture, etc.)
4. Tester pagination et loadMore
5. Vérifier validation Zod sur les responses
6. **Corriger les filtres qui plantent** (en cours avec Codex)

**ENV nécessaires:**
```
CJ_API_KEY=ton_api_key
CJ_API_URL=https://developers.cjdropshipping.com
```

### 2. 🔌 Intégration Directus
**Fichiers concernés:**
- `/lib/directus.js`
- `/app/api/directus/products-debug/route.js`
- `/app/(shoplist)/shop-1/page.jsx`

**Actions:**
1. Vérifier connexion Directus via ENV
2. Tester récupération des produits
3. Vérifier affichage dans shop-1
4. Tester authentification admin

**ENV nécessaires:**
```
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_EMAIL=admin@example.com
DIRECTUS_PASSWORD=d1r3ctu5
```

**Démarrer Directus:**
```bash
cd touski-directus-admin
./start.sh
```

### 3. 🎨 Finaliser Pages Principales
**Home Page:**
- Décider quelle home utiliser (recommandation: **home-9** car déjà customisée)
- Rediriger `/` vers `/home-9`
- Supprimer/archiver les homes non utilisées

**Shop Listing:**
- Choisir entre shop-1 à shop-12
- Connecter aux vrais produits (CJ + Directus)
- Tester filtres, tri, pagination

**Product Single:**
- Choisir entre product1_simple à product14_v9
- Connecter aux données réelles
- Tester variants, images, add to cart

**Pages à vérifier:**
- `/shop_cart` - Panier
- `/shop_checkout` - Checkout
- `/shop_order_complete` - Confirmation
- `/shop_order_tracking` - Suivi commande

### 4. 🛒 Système Panier & Checkout
**Fichiers concernés:**
- `/app/(shop-cart-checkout)/shop_cart/page.jsx`
- `/app/(shop-cart-checkout)/shop_checkout/page.jsx`
- `/context/Context.jsx` (state management)

**Actions:**
1. Finaliser logique panier (add/remove/update quantity)
2. Intégrer lazy import CJ au checkout (`/api/cj/import-one`)
3. Connecter formulaire checkout
4. Créer commande dans Directus
5. Envoyer commande au fournisseur (CJ API)
6. Tester workflow complet: browse → add to cart → checkout → confirmation

**API à créer:**
```
POST /api/orders/create
POST /api/cj/import-one (déjà existe, à tester)
POST /api/directus/orders
```

### 5. 👤 Dashboard Utilisateur
**Pages à finaliser:**
- `/account_dashboard` - Vue d'ensemble
- `/account_orders` - Historique commandes
- `/account_wishlist` - Liste de souhaits
- `/account_edit` - Profil utilisateur
- `/account_edit_address` - Adresses

**Actions:**
1. Implémenter authentification (NextAuth.js ou custom)
2. Connecter avec Directus users/customers
3. Afficher vraies données utilisateur
4. Tester création/modification profil

### 6. 📱 Responsive & UX
**Devices à tester:**
- Mobile (320px - 480px)
- Tablet (768px - 1024px)
- Desktop (1200px+)

**Points critiques:**
- Header sticky mobile
- Menu hamburger
- Images responsive (next.config.mjs déjà configuré)
- Formulaires checkout mobile
- Grids produits (Collections, BestSelling)

### 7. 🧪 Tests & Debug
**Endpoints à tester:**
```
GET /api/cj/products
GET /api/cj/categories
GET /api/directus/products-debug
POST /api/cj/import-one
```

**Checklist:**
- [ ] Pas de console.error en dev
- [ ] Validation Zod sur toutes les API responses
- [ ] Gestion erreurs réseau (try/catch, loading states)
- [ ] Messages d'erreur user-friendly
- [ ] Logs serveur propres

---

## 🚀 PRIORITÉ 2 - Backend Directus (Après frontend)

### 8. 🗄️ Schéma Directus Finalisé
**Fichier:** `touski-directus-admin/schema.json`

**Collections à vérifier:**
- `products` - Produits (CJ + custom)
- `providers` - Fournisseurs (CJ, EPROLO)
- `orders` - Commandes clients
- `order_items` - Lignes de commande
- `customers` - Clients
- `categories` - Catégories produits
- `addresses` - Adresses livraison

**Champs manquants potentiels:**
- `orders.provider_order_id` (ID commande chez fournisseur)
- `orders.tracking_number`
- `products.cj_product_id`
- `products.sync_status` (pending, synced, error)

**Actions:**
1. Éditer `schema.json`
2. Re-run `./start.sh` pour appliquer
3. Vérifier relations entre collections
4. Tester CRUD via Directus admin

### 9. 🔗 API Fournisseurs (CJ + EPROLO)
**Docs à consulter:**
- `/docs/Integration_Front_Dropshipping_v2.md`
- `/docs/Integration_EPROLO.md`

**Scripts à créer:**
```
/scripts/sync-cj-products.js
/scripts/sync-eprolo-products.js
/scripts/cron-sync.js
```

**Actions:**
1. Implémenter sync automatique produits CJ → Directus
2. Implémenter sync EPROLO (si utilisé)
3. Gérer stock, prix, disponibilité
4. Mettre à jour images produits
5. Configurer cron job (toutes les 6h ?)

**Cron setup (exemple):**
```javascript
// /scripts/cron-sync.js
import cron from 'node-cron';

// Tous les jours à 2h du matin
cron.schedule('0 2 * * *', async () => {
  console.log('🔄 Sync produits CJ...');
  await syncCJProducts();
});
```

### 10. 📦 Gestion Commandes
**Workflow à implémenter:**

```
Client checkout
    ↓
Créer order dans Directus
    ↓
Envoyer commande à CJ API
    ↓
Stocker CJ order_id
    ↓
Webhook CJ → Update status
    ↓
Email client (tracking)
```

**Endpoints à créer:**
```
POST /api/orders/create
POST /api/orders/submit-to-supplier
POST /api/webhooks/cj-order-status
GET /api/orders/:id/tracking
```

**Actions:**
1. Créer flow complet de commande
2. Tester transmission CJ
3. Gérer webhooks statut commande
4. Implémenter notifications email
5. Tester cas d'erreur (product unavailable, payment failed, etc.)

### 11. 🔐 Permissions & Sécurité
**Directus Roles:**
- `Administrator` - Full access
- `Customer` - Read own orders/profile
- `Guest` - Read products only

**Actions:**
1. Configurer permissions par collection
2. Sécuriser API routes (middleware auth)
3. Valider ENV variables non exposées
4. Ajouter rate limiting
5. HTTPS en production

**Middleware à créer:**
```javascript
// /middleware/auth.js
export function requireAuth(req) {
  const token = req.headers.authorization;
  if (!token) throw new Error('Unauthorized');
  // Verify token...
}
```

### 12. 📊 Logs & Monitoring
**Outils à configurer:**
- Winston (logging)
- Sentry (error tracking)
- Directus activity logs

**Logs à implémenter:**
```javascript
logger.info('CJ sync started', { timestamp, productsCount });
logger.error('CJ API error', { error, endpoint });
logger.warn('Product out of stock', { productId });
```

**Alertes à créer:**
- Échec sync produits
- Erreur transmission commande
- API CJ down
- Directus connection lost

---

## 🚀 PRIORITÉ 3 - Déploiement

### 13. Déploiement Frontend (Vercel)
**Actions:**
1. Vérifier `vercel.json` config
2. Configurer ENV variables (Production + Preview)
3. Tester build production `npm run build`
4. Déployer et tester

**ENV Vercel à configurer:**
```
NEXT_PUBLIC_DIRECTUS_URL=https://directus.touski.com
CJ_API_KEY=prod_key
DIRECTUS_EMAIL=admin@touski.com
DIRECTUS_PASSWORD=***
```

### 14. Déploiement Backend (Railway/Docker)
**Fichiers à vérifier:**
- `touski-directus-admin/Dockerfile`
- `touski-directus-admin/railway.json`
- `touski-directus-admin/railway.toml`

**Actions:**
1. Tester Docker build local
2. Configurer Railway project
3. Déployer Directus
4. Tester connexion depuis frontend prod

**Commandes Docker:**
```bash
cd touski-directus-admin
docker build -t touski-directus .
docker run -p 8055:8055 touski-directus
```

---

## 📂 Structure Fichiers Importants

```
touski/
├── app/
│   ├── (homes)/home-9/          ← Page principale (déjà customisée)
│   ├── api/
│   │   ├── cj/                  ← API CJ à tester/finaliser
│   │   └── directus/            ← API Directus à connecter
│   ├── (shoplist)/shop-1/       ← Listing produits à connecter
│   └── (shop-cart-checkout)/    ← Panier/checkout à finaliser
│
├── components/
│   ├── headers/Header9.jsx      ← Header customisé ✅
│   ├── homes/home-9/
│   │   ├── Hero.jsx             ← Hero avec transparence ✅
│   │   ├── Collections.jsx      ← Collections avec transparence ✅
│   │   └── BestSelling.jsx      ← Filtres CJ à fixer (Codex)
│   └── shopCartandCheckout/     ← Composants panier à finaliser
│
├── lib/
│   ├── directus.js              ← Client Directus
│   └── schemas/                 ← Validation Zod
│
├── touski-directus-admin/
│   ├── schema.json              ← Schéma à vérifier/compléter
│   ├── start.sh                 ← Script démarrage
│   └── Dockerfile               ← Config Docker
│
└── docs/
    ├── Integration_Front_Dropshipping_v2.md
    └── Integration_EPROLO.md
```

---

## 🎯 Prochaine Session - Plan d'Attaque

### Option A: Continuer Frontend (Recommandé)
1. **Attendre fix filtres CJ de Codex**
2. Tester intégration CJ complète
3. Connecter Directus
4. Finaliser panier/checkout

### Option B: Passer au Backend
1. Lancer Directus local
2. Vérifier/compléter schema.json
3. Créer scripts sync fournisseurs
4. Tester workflow commande

### Option C: Tests & Polish
1. Tester responsive mobile/tablet
2. Corriger bugs affichage
3. Optimiser performances
4. Préparer déploiement

---

## 📊 Progression Globale

**Frontend:** 40% ✅  
- Pages: 30% (home-9 OK, shops/checkout à connecter)
- Intégrations API: 20% (structure OK, tests à faire)
- Design/UX: 70% (home-9 finalisé, autres pages à vérifier)

**Backend:** 15% ✅  
- Schéma Directus: 50% (base OK, à compléter)
- API Fournisseurs: 10% (endpoints créés, sync à implémenter)
- Gestion Commandes: 0% (à créer)

**Déploiement:** 0% ⏸️  
- Config OK, tests à faire

---

## 🔑 Commandes Utiles

```bash
# Frontend Dev
npm run dev                              # http://localhost:3000

# Backend Directus
cd touski-directus-admin && ./start.sh   # http://localhost:8055

# Git
git add . && git commit -m "message"
git push origin main

# Tests API
curl http://localhost:3000/api/cj/products?preset=home
curl http://localhost:3000/api/directus/products-debug

# Build Production
npm run build
npm start
```

---

## 💡 Notes Importantes

- **Codex travaille sur:** Filtres CJ dans BestSelling.jsx
- **Coordination:** Éviter conflits sur `/components/cj/*` et `BestSelling.jsx`
- **ENV manquantes:** Créer `.env.local` avec CJ_API_KEY et Directus config
- **Directus non démarré:** Lancer `./start.sh` avant tests Directus
- **Images:** Config Next.js OK, vérifier chemins assets en prod

---

**Prêt pour la prochaine session!** 🚀

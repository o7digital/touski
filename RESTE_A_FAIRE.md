# 📋 Reste à Faire - Projet Touski (11 Nov 2025)

## ✅ Déjà Fait

### Header & UX (Copilot)
- ✅ Menu dynamique avec effet de scroll (cache/réapparaît)
- ✅ Logo qui déborde sur le Hero (effet flottant)
- ✅ Header optimisé (hauteur réduite, menu agrandi)
- ✅ Audit complet du frontend (voir `AUDIT_FRONTEND.md`)
- ✅ Fix package.json (formatage JSON)
- ✅ **Métadonnées SEO** : "TOUSKI est nécessaire pour son chez Soi. Site Officiel"
- ✅ Langue du site en français

### Système de Marges Multi-Fournisseurs (11 Nov 2025)
- ✅ Champs marges ajoutés à Directus (`providers` et `products`)
- ✅ Script `/scripts/add-margin-fields.js` - Ajout auto champs
- ✅ Script `/scripts/sync-cj-to-directus.js` - Sync CJ avec calcul marges
- ✅ API `/api/admin/margins` - Gestion des marges
- ✅ Guide complet `/docs/GUIDE_Multi_Fournisseurs_Marges.md`
- ✅ Documentation complète `/RESUME_SESSION.md`

### Filtres CJ (Codex - en cours)
- 🔧 En cours de finalisation

---

## 🔴 PRIORITÉ HAUTE - À Faire Cette Semaine

### 1. Finaliser Intégration CJ (Backend + Front)
**Responsable suggéré** : Codex (en cours)

**Endpoints API à tester** :
- [ ] `GET /api/cj/products?preset=home&pageSize=24&language=EN`
- [ ] `GET /api/cj/categories?strict=1`
- [ ] `GET /api/cj/preset-debug?preset=kitchen`
- [ ] `POST /api/cj/import-one?sku=XXX` (lazy import au checkout)

**Variables ENV Vercel requises** :
```env
CJ_STATIC_TOKEN=...
CJ_BASE_URL=https://developers.cjdropshipping.com
CJ_PRODUCTS_PATH=/api2.0/v1/product/list
CJ_TOKEN_HEADER=CJ-Access-Token
CJ_Q_PARAM=keyWord
CJ_HOME_ALLOW=["home","kitchen","bath","lighting","furniture","storage","garden"]
CJ_HOME_BLOCK=["clothing","jewelry","shoes","bag","wallet"]
```

**Pages Front à vérifier** :
- [ ] `/cj-catalog` - Catalogue CJ complet
- [ ] `/shop-1?source=cj` - Listing avec filtres
- [ ] `/(homes)/home-9` - Section "Best Selling" avec filtres univers

**Problème connu** :
- Filtres univers (Maison, Cuisine, etc.) plantent côté front
- Validation Zod OK mais à tester en conditions réelles

---

### 2. Vérifier Intégration Directus

**Endpoints à tester** :
- [ ] `GET /api/directus/products-debug?limit=5`
- [ ] `GET /products` (affichage des produits Directus)
- [ ] `GET /shop-1?source=directus` (listing Directus)

**Variables ENV Vercel** :
```env
NEXT_PUBLIC_DIRECTUS_URL=https://...
DIRECTUS_EMAIL=...
DIRECTUS_PASSWORD=...
```

**Helper à vérifier** :
- `/lib/directus.js` - Connexion auto, gestion tokens

---

### 3. Workflow Panier → Checkout → Commande

**Pages à finaliser** :
- [ ] `/shop_cart` - Panier (quantités, suppression)
- [ ] `/shop_checkout` - Formulaire checkout
- [ ] `/shop_order_complete` - Confirmation
- [ ] `/shop_order_tracking` - Suivi commande

**Logique à implémenter** :
- [ ] Gestion state panier (Context.jsx)
- [ ] Validation formulaire checkout
- [ ] **Lazy import CJ** : appeler `/api/cj/import-one` au moment de la commande
- [ ] Sauvegarde commande dans Directus
- [ ] Envoi email confirmation (optionnel)

**Composants à vérifier** :
- `/components/shopCartandCheckout/Cart.jsx`
- `/components/shopCartandCheckout/Checkout.jsx`

---

### 4. Choisir les Layouts Définitifs

**Actuellement** :
- Home : `home-9` (choisi)
- Shop listing : `shop-1` (multi-sources OK)
- Product single : **À CHOISIR** parmi 16 variantes

**Action** :
- [ ] Décider quelle variante de produit single utiliser (product1_simple à product16_v11)
- [ ] Tester routing dynamique `[id]`
- [ ] Connecter avec données CJ/Directus
- [ ] Tester ajout au panier depuis la page produit

---

## 🟠 PRIORITÉ MOYENNE - Semaine Prochaine

### 5. Dashboard Utilisateur

**Pages à finaliser** :
- [ ] `/account_dashboard` - Vue d'ensemble
- [ ] `/account_orders` - Historique commandes
- [ ] `/account_wishlist` - Liste de souhaits
- [ ] `/account_edit` - Édition profil
- [ ] `/account_edit_address` - Adresses

**À implémenter** :
- [ ] Système d'authentification (login/logout)
- [ ] Middleware de protection des routes (`/middleware.js` existe déjà)
- [ ] Persistance des données utilisateur
- [ ] Connexion avec Directus pour orders/wishlist

---

### 6. Pages "Other"

**À vérifier/finaliser** :
- [ ] `/contact` - Formulaire fonctionnel ?
- [ ] `/login_register` - Connecté à l'auth ?
- [ ] `/store_location` - Google Maps ?
- [ ] `/about`, `/faq`, `/terms` - Contenu à jour ?

---

### 7. Blogs

**Structure existante** :
- 3 variantes de listing (`blog_list1`, `blog_list2`, `blog_list3`)
- 1 page single (`blog_single`)

**Action** :
- [ ] Choisir layout blog définitif
- [ ] Connecter avec collection Directus `posts` ou `blogs`
- [ ] Tester pagination/filtres

---

### 8. Tests Responsive & Performance

**À tester sur** :
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

**Points critiques** :
- [ ] Navigation mobile (header responsive ?)
- [ ] Grilles produits sur mobile
- [ ] Formulaire checkout sur mobile
- [ ] Images optimisées (lazy loading, Next Image)
- [ ] Performance Lighthouse (target : > 90)

---

## 🟢 PRIORITÉ BASSE - Plus Tard

### 9. SEO & Analytics
- [ ] Vérifier `metadata` sur toutes les pages
- [ ] Ajouter `sitemap.xml`
- [ ] Ajouter `robots.txt`
- [ ] Open Graph images
- [ ] Google Analytics / Plausible
- [ ] Sentry pour monitoring erreurs

### 10. Images & CDN
**Config actuelle** (`next.config.mjs`) :
```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'oss-cf.cjdropshipping.com' },
    { protocol: 'https', hostname: 'cf.cjdropshipping.com' },
  ],
}
```

**À ajouter si nécessaire** :
- [ ] Domaine Directus pour images uploadées
- [ ] Domaine EPROLO si utilisé

---

## 🔧 Backend Directus - Phase Suivante

### 11. Schéma Directus Finalisé
**Fichier** : `/touski-directus-admin/schema.json`

**Collections à vérifier** :
- [ ] `products` (champs complets ?)
- [ ] `providers` (CJ, EPROLO)
- [ ] `orders` (structure commande)
- [ ] `customers` (utilisateurs)
- [ ] `categories` (catégories produits)

**Action** : Lancer `touski-directus-admin/start.sh` pour appliquer le schéma

---

### 12. API Fournisseurs Automatisées
- [ ] Scripts de synchronisation CJ → Directus
- [ ] Scripts de synchronisation EPROLO → Directus
- [ ] Cron job ou webhooks pour sync automatique
- [ ] Logs des imports (succès/échecs)

---

### 13. Gestion Commandes Backend
- [ ] Logique création commande dans Directus
- [ ] Transmission automatique aux fournisseurs (CJ/EPROLO)
- [ ] Webhooks pour statuts commandes
- [ ] Notifications email (client + admin)

---

### 14. Permissions & Sécurité
- [ ] Rôles Directus (admin, client, guest)
- [ ] Permissions sur collections
- [ ] Sécuriser endpoints API
- [ ] Vérifier que tokens/secrets ne sont pas exposés
- [ ] CORS configuré correctement

---

### 15. Logs & Monitoring
- [ ] Logs imports fournisseurs
- [ ] Logs erreurs API
- [ ] Logs commandes
- [ ] Alertes échecs synchronisation
- [ ] Dashboard monitoring (Directus Insights ?)

---

## 🚀 Déploiement

### 16. Frontend Vercel
**Branches** :
- `main` → Production
- Autres → Preview

**À vérifier** :
- [ ] ENV variables identiques Production/Preview
- [ ] Build réussi sans erreurs
- [ ] Routes API fonctionnelles en prod
- [ ] Images chargées correctement
- [ ] Performance (Lighthouse)

**Variables ENV critiques** :
- Directus (URL, EMAIL, PASSWORD)
- CJ (TOKEN, BASE_URL, etc.)
- Secrets (IMPORT_SECRET si besoin)

---

### 17. Backend Directus Railway/Docker
**Fichiers** :
- `touski-directus-admin/Dockerfile`
- `touski-directus-admin/railway.json`
- `touski-directus-admin/railway.toml`

**À vérifier** :
- [ ] Dockerfile à jour (Node 22, port 8055)
- [ ] Railway config OK
- [ ] DB connectée (Postgres/MySQL)
- [ ] Connexion depuis frontend en prod
- [ ] Backup automatique DB

---

## 📊 Récapitulatif par Personne Suggérée

### Codex (Backend/API)
1. ✅ Finir filtres CJ
2. Tester tous les endpoints `/api/cj/*`
3. Vérifier `/api/directus/*`
4. Implémenter lazy import au checkout
5. Scripts de synchronisation fournisseurs

### Copilot (Frontend/UX)
1. ✅ Header optimisé (fait)
2. Finaliser panier/checkout UI
3. Choisir layouts définitifs
4. Tests responsive
5. Dashboard utilisateur

### Les Deux (Full Stack)
1. Workflow complet achat (front + back)
2. Authentification utilisateur
3. Gestion commandes end-to-end
4. Déploiement Production

---

## 🔗 Références

**Docs techniques** :
- `/AUDIT_FRONTEND.md` - État actuel du front
- `/touski/docs/Integration_Front_Dropshipping_v2.md` - Intégration CJ complète
- `/touski/docs/MEMO_Technique_Touski.md` - Directus
- `/touski/components/headers/HEADER_BEHAVIOR.md` - Comportement menu

**Commandes utiles** :
```bash
# Frontend
cd touski && npm run dev

# Backend Directus
cd touski-directus-admin && ./start.sh

# Tests API
curl http://localhost:3000/api/cj/products?preset=home&pageSize=24
curl http://localhost:3000/api/directus/products-debug?limit=5
```

---

**Dernière mise à jour** : 10 novembre 2025  
**Statut global** : 30% Frontend, 60% Backend structure, 0% Déploiement

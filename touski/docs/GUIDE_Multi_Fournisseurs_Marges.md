# 📘 Guide: Gestion Multi-Fournisseurs avec Marges

## 🎯 Architecture Créée

### Collections Directus

#### 1. **providers** (Fournisseurs)
Gère tous vos dropshippers (CJ, EPROLO, AliExpress, etc.)

**Champs:**
- `code`: Identifiant unique (cj, eprolo, ali)
- `name`: Nom affiché
- `api_url`: URL de l'API fournisseur
- `api_key`: Clé API (hashée)
- `default_margin_percent`: Marge en % par défaut (ex: 35%)
- `default_margin_fixed`: Marge fixe en € (ex: 2€)
- `is_active`: Actif/inactif
- `sync_enabled`: Activer sync auto
- `last_sync`: Dernière synchronisation

**Exemple:**
```json
{
  "code": "cj",
  "name": "CJ Dropshipping",
  "default_margin_percent": 35.00,
  "default_margin_fixed": 2.00
}
```

#### 2. **products** (Produits)
Catalogue complet multi-fournisseurs avec calcul de marges

**Champs importants:**
- `sku`: SKU unique fournisseur
- `provider_id`: Lien vers le fournisseur
- `cost_price`: Prix d'achat fournisseur (€)
- `margin_percent`: Marge en % (override fournisseur si défini)
- `margin_fixed`: Marge fixe en € (override)
- `sell_price`: **Prix de vente calculé automatiquement**
- `image_urls`: Array d'URLs images (pas de fichiers stockés!)
- `is_featured`: Produit mis en avant
- `auto_sync`: Sync auto prix/stock

**Formule prix de vente:**
```
sell_price = cost_price + (cost_price × margin_percent / 100) + margin_fixed
```

**Exemple:**
```json
{
  "sku": "CJ12345",
  "cost_price": 15.00,
  "margin_percent": 35.00,  // 35%
  "margin_fixed": 2.00,     // +2€
  "sell_price": 22.25       // 15 + (15 × 0.35) + 2 = 22.25€
}
```

#### 3. **categories**
Catégories de produits (support sous-catégories)

#### 4. **sync_logs**
Historique des synchronisations (succès/erreurs)

---

## 🚀 Utilisation

### Étape 1: Appliquer le nouveau schéma

```bash
cd touski-directus-admin

# Sauvegarder l'ancien schéma
mv schema.json schema-old.json

# Utiliser le nouveau schéma
cp schema-multi-providers.json schema.json

# Redémarrer Directus avec le nouveau schéma
./start.sh
```

### Étape 2: Configurer les ENV

Dans `.env.local` (développement) et Vercel (production):

```env
# Directus
NEXT_PUBLIC_DIRECTUS_URL=https://votre-directus.railway.app
DIRECTUS_EMAIL=admin@example.com
DIRECTUS_PASSWORD=votre_password

# CJ Dropshipping
CJ_BASE_URL=https://developers.cjdropshipping.com
CJ_STATIC_TOKEN=votre_token_cj

# Autres fournisseurs (optionnel)
EPROLO_API_KEY=...
ALIEXPRESS_API_KEY=...
```

### Étape 3: Premier Import CJ

```bash
cd touski

# Installer dépendances si besoin
npm install @directus/sdk

# Lancer le script de sync
node scripts/sync-cj-to-directus.js home 50

# Arguments:
# - home: preset (home, kitchen, bath, etc.)
# - 50: nombre de produits à importer
```

**Résultat:**
- Fournisseur CJ créé automatiquement (marge 35% + 2€)
- 50 produits importés avec prix calculés
- Log de sync créé

### Étape 4: Gérer les Marges dans Directus

#### Via l'interface Directus:

1. **Marges globales par fournisseur:**
   - Aller dans `providers`
   - Modifier `default_margin_percent` et `default_margin_fixed`
   - Tous les nouveaux produits utiliseront ces marges

2. **Marges spécifiques par produit:**
   - Aller dans `products`
   - Modifier `margin_percent` et `margin_fixed` d'un produit
   - Le `sell_price` sera recalculé au prochain sync

#### Via l'API:

```bash
# Mettre à jour la marge d'un produit spécifique
curl -X POST https://votre-site.vercel.app/api/admin/margins \
  -H "Content-Type: application/json" \
  -d '{
    "action": "update_product",
    "product_id": "uuid-du-produit",
    "margin_percent": 40,
    "margin_fixed": 3
  }'

# Mettre à jour les marges par défaut d'un fournisseur
curl -X POST https://votre-site.vercel.app/api/admin/margins \
  -d '{
    "action": "update_provider",
    "provider_id": "uuid-fournisseur",
    "margin_percent": 30,
    "margin_fixed": 1.5
  }'

# Recalculer tous les prix de vente
curl -X POST https://votre-site.vercel.app/api/admin/margins \
  -d '{"action": "recalculate_all"}'
```

### Étape 5: Ajouter d'Autres Fournisseurs

#### Exemple: Ajouter EPROLO

1. **Dans Directus, créer le fournisseur:**
```json
{
  "code": "eprolo",
  "name": "EPROLO",
  "api_url": "https://api.eprolo.com",
  "default_margin_percent": 40.00,
  "default_margin_fixed": 1.50,
  "is_active": true,
  "sync_enabled": true
}
```

2. **Créer script de sync EPROLO:**
```javascript
// scripts/sync-eprolo-to-directus.js
// Copier la structure de sync-cj-to-directus.js
// Adapter pour l'API EPROLO
```

3. **Les produits EPROLO auront automatiquement leurs marges!**

---

## 📊 Exemples de Scénarios

### Scénario 1: Marges Différentes par Fournisseur

```
CJ Dropshipping:
  - Marge: 35% + 2€
  - Produit: Lampe à 15€
  - Prix vente: 22.25€ ✅

EPROLO:
  - Marge: 40% + 1.50€
  - Produit: Lampe à 15€
  - Prix vente: 22.50€ ✅
```

### Scénario 2: Produit Premium avec Marge Custom

```
Produit CJ standard:
  - Marge fournisseur: 35% + 2€
  - Coût: 50€
  - Prix: 69.50€

Produit CJ premium (override):
  - Marge custom: 50% + 5€
  - Coût: 50€
  - Prix: 80€ ✅
```

### Scénario 3: Promotion

```
Produit normal:
  - Coût: 20€
  - Marge: 35% + 2€
  - sell_price: 29€
  - compare_at_price: null

En promo:
  - Coût: 20€
  - Marge: 20% + 1€ (réduite temporairement)
  - sell_price: 25€
  - compare_at_price: 29€ ✅ (prix barré)
```

---

## 🔄 Synchronisation Automatique

### Option 1: Vercel Cron (Simple)

Créer `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/sync-products",
    "schedule": "0 2 * * *"
  }]
}
```

Créer `app/api/cron/sync-products/route.js`:
```javascript
import { syncCJToDirectus } from '@/scripts/sync-cj-to-directus';

export async function GET(req) {
  // Vérifier secret
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await syncCJToDirectus({ preset: 'home', pageSize: 100 });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Option 2: GitHub Actions

Créer `.github/workflows/sync-products.yml`:
```yaml
name: Sync Products Daily
on:
  schedule:
    - cron: '0 2 * * *'  # 2h du matin
  workflow_dispatch:     # Manuel aussi

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: node scripts/sync-cj-to-directus.js home 100
        env:
          NEXT_PUBLIC_DIRECTUS_URL: ${{ secrets.DIRECTUS_URL }}
          DIRECTUS_EMAIL: ${{ secrets.DIRECTUS_EMAIL }}
          DIRECTUS_PASSWORD: ${{ secrets.DIRECTUS_PASSWORD }}
          CJ_STATIC_TOKEN: ${{ secrets.CJ_TOKEN }}
```

---

## 📈 Monitoring

### Vérifier les Syncs

Dans Directus, aller dans `sync_logs`:
- Voir tous les syncs
- Filtrer par fournisseur
- Voir les erreurs

### Statistiques des Marges

```bash
# Obtenir un aperçu des marges
curl https://votre-site.vercel.app/api/admin/margins

# Par fournisseur
curl https://votre-site.vercel.app/api/admin/margins?provider_id=uuid-cj
```

Réponse:
```json
{
  "success": true,
  "stats": {
    "totalProducts": 100,
    "totalCost": 1500.00,
    "totalSell": 2200.00,
    "totalProfit": 700.00,
    "avgMarginPercent": 46.67
  },
  "products": [...]
}
```

---

## 🎯 Prochaines Étapes

1. ✅ Schéma créé
2. ✅ Script sync CJ créé
3. ✅ API marges créée
4. ⏳ Setup Redis cache (optionnel mais recommandé)
5. ⏳ Cron job automatique
6. ⏳ Dashboard admin pour gérer marges visuellement

---

## 💡 Conseils

### Optimisation Marges

**Marges recommandées:**
- Produits < 20€: 40-50% + 2€
- Produits 20-50€: 35-40% + 1-2€
- Produits > 50€: 30-35% + 0-1€

**Ajustements:**
- Surveiller la concurrence
- A/B tester différentes marges
- Promotions ponctuelles

### Gestion Multi-Fournisseurs

**Stratégie:**
1. CJ pour la majorité (stock fiable, prix compétitifs)
2. EPROLO pour produits niches
3. AliExpress pour produits uniques

**Avantage:**
- Comparer les prix entre fournisseurs
- Choisir le meilleur rapport qualité/prix/délai
- Backup si un fournisseur en rupture

---

**Besoin d'aide?** Consulte les scripts dans `/scripts` et les routes API dans `/app/api/admin`

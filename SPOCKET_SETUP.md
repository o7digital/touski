# 🎯 Configuration Spocket pour Touski

## ✅ Configuration actuelle

**Fournisseurs actifs:**
- ✅ **Spocket** - ACTIF (produits Maison de qualité)
- ❌ **CJ Dropshipping** - EN PAUSE (qualité insuffisante)
- ❌ **Eprolo** - EN PAUSE

## 📦 Catégories Produits Maison

Le site affiche maintenant les produits importés depuis Spocket dans ces catégories:

1. **Maison** - Produits généraux pour la maison
2. **Cuisine** - Ustensiles, vaisselle, électroménager
3. **Meubles** - Mobilier intérieur
4. **Jardin** - Outils et accessoires de jardin
5. **Salle de Bain** - Accessoires et rangement
6. **Garage** - Outils et organisation
7. **Bricolage** - Outillage et fournitures
8. **Détergents** - Produits d'entretien

## 🚀 Import de produits Spocket

### Étape 1: Accéder à Spocket dans WooCommerce
1. Connectez-vous à votre admin WordPress: http://oliviers42.sg-host.com/wp-admin
2. Menu WooCommerce → Spocket (ou directement via le lien de connexion réussi)

### Étape 2: Importer des produits
1. Parcourez le catalogue Spocket
2. **Filtre recommandé:** Sélectionnez "Home & Garden" ou "Home & Living"
3. Cliquez sur "Import" pour chaque produit souhaité
4. Définissez votre prix de vente (Spocket recommande +35% minimum)

### Étape 3: Catégoriser les produits
Dans WooCommerce → Products:
- Assignez chaque produit à une catégorie appropriée (Maison, Cuisine, etc.)
- Vérifiez que le statut est "Publié"
- Vérifiez que le stock est "En stock"

## 🎨 Pages du site

### Page d'accueil - Home 9
**URL:** https://touski-4odm.vercel.app/

Affiche la section "NOS MEILLEURS PRODUITS" avec:
- Filtres par catégorie (Tous, Maison, Cuisine, etc.)
- Carousel de produits Spocket
- Chargement automatique depuis WooCommerce

### Page Produits
**URL:** https://touski-4odm.vercel.app/products

Liste complète des produits avec:
- Barre de recherche
- Filtres par catégorie
- Grille responsive de produits
- Images et prix affichés

## 🔧 Configuration technique

### Variables d'environnement (.env.local)
```env
# WooCommerce (produits Spocket synchronisés)
NEXT_PUBLIC_WOOCOMMERCE_URL=http://oliviers42.sg-host.com
WOOCOMMERCE_CONSUMER_KEY=ck_da99c51b760c5b9715fb41d175b146dd0b2cfcad
WOOCOMMERCE_CONSUMER_SECRET=cs_f740a79fb0c06fcb5474b8d01c47c8dd585d967d

# Fournisseurs actifs
ENABLE_SPOCKET=true
ENABLE_CJ=false
ENABLE_EPROLO=false
```

### API Routes créées
- `/api/woocommerce/products` - Liste des produits avec filtres
- Supprime les dépendances à CJ Dropshipping

### Composants modifiés
- `BestSellingSpocket.jsx` - Nouveau composant pour Home 9
- `app/products/page.jsx` - Page produits refaite pour Spocket
- `app/(homes)/home-9/page.jsx` - Utilise BestSellingSpocket

## 💰 Gestion des marges

**Recommandation:** Marge minimale de 35% sur les produits Spocket

Les fournisseurs US/EU de Spocket ont:
- Meilleure qualité que CJ
- Livraison plus rapide (2-5 jours vs 15-30 jours)
- Meilleur service client
- Prix légèrement plus élevés → justifie une bonne marge

## 📝 Prochaines étapes

1. **Importer 10-20 produits test** depuis Spocket
2. **Catégoriser** chaque produit dans WooCommerce
3. **Tester l'affichage** sur https://touski-4odm.vercel.app/
4. **Ajuster les prix** avec marge appropriée
5. **Importer massivement** une fois satisfait

## 🎯 Avantages Spocket vs CJ

| Critère | Spocket | CJ Dropshipping |
|---------|---------|-----------------|
| Qualité produits | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Livraison | 2-5 jours (US/EU) | 15-30 jours (Chine) |
| Service client | Excellent | Moyen |
| Prix | Moyen | Bas |
| Marges possibles | 30-50% | 50-100% |
| **Recommandé pour Touski** | ✅ **OUI** | ❌ **NON** |

## 🔗 Liens utiles

- **Admin WooCommerce:** http://oliviers42.sg-host.com/wp-admin
- **Site frontend:** https://touski-4odm.vercel.app/
- **Page produits:** https://touski-4odm.vercel.app/products
- **Spocket dans WP:** http://oliviers42.sg-host.com/wp-admin/admin.php?page=spocket

---

**Dernière mise à jour:** 13 novembre 2025
**Configuration:** Spocket ACTIF, CJ EN PAUSE

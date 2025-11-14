# Migration WooCommerce - Status

## ✅ FAIT (Mardi 12 Nov - 22h)

### Backend WooCommerce
- ✅ WordPress + WooCommerce installé sur Siteground
- ✅ URL: http://oliviers42.sg-host.com
- ✅ Permalinks activés
- ✅ Clés API générées et fonctionnelles
- ✅ 5 produits test créés

### Frontend Next.js
- ✅ `lib/woocommerce.js` créé (API helper complet)
- ✅ `.env.local` configuré avec credentials
- ✅ Package `@woocommerce/woocommerce-rest-api` installé
- ✅ Connexion testée et validée
- ✅ Page `/products` adaptée et fonctionnelle
- ✅ Page `/shop-1` adaptée (source=woocommerce par défaut)

### Scripts & Tools
- ✅ `test-woo-connection.js` - Test connexion API
- ✅ `create-test-products.js` - Création produits test
- ✅ Documentation complète: `MIGRATION_WOOCOMMERCE.md`

## 🔄 EN COURS

- Adaptation des autres pages shop/produits
- Tests navigation complète

## ⏳ À FAIRE

### Mercredi 13 Nov
- [ ] Adapter composants produits (components/shoplist/*, components/singleProduct/*)
- [ ] Adapter pages produits individuelles
- [ ] Tester panier (actuellement utilise Context Next.js)
- [ ] Adapter checkout pour WooCommerce

### Jeudi 14 Nov
- [ ] Config dropshipping (champs custom marges/supplier)
- [ ] Script sync CJ → WooCommerce
- [ ] Tests commande E2E

### Vendredi 15 Nov
- [ ] Corrections bugs
- [ ] Optimisations performance
- [ ] Validation Bobby

## 🚀 TESTER MAINTENANT

```bash
# 1. Démarrer Next.js (déjà running)
cd touski
npm run dev

# 2. Ouvrir dans le navigateur:
http://localhost:3000/products
http://localhost:3000/shop-1?source=woocommerce

# 3. Créer plus de produits test si besoin:
node create-test-products.js
```

## 📝 NOTES

- Serveur Next.js tourne sur http://localhost:3000
- WooCommerce admin: http://oliviers42.sg-host.com/wp-admin
- Produits WooCommerce: IDs 63, 64, 65, 66, 67
- Credentials stockés dans `.env.local` (ne pas commit)

## 🎯 PROCHAINES ÉTAPES - JEUDI 14 NOV 2025

### **PRIORITÉ 1 : Commande & Expédition** 
- [ ] Workflow panier → checkout → confirmation
- [ ] Gestion expédition automatique (Spocket/WooCommerce)
- [ ] Emails de confirmation client + admin
- [ ] Tests commande E2E

### **PRIORITÉ 2 : Optimisations SEO (30 min)**
- [ ] Ajouter `sitemap.xml` automatique
- [ ] Ajouter `robots.txt`
- [ ] Implémenter Schema.org pour produits (rich snippets Google)
- [ ] Guide configuration Google Search Console
- [ ] Guide création Google Business Profile (SEO local Mauricie)

### **Note importante : Prix affichés**
- Actuellement : Prix bruts depuis WooCommerce (possiblement prix fournisseur)
- À vérifier : Les prix dans WooCommerce incluent-ils déjà votre marge ?
- Si non : Implémenter calcul automatique de marge côté frontend

---

## 📊 OPTIMISATIONS FAITES (13 Nov)

### UX & Design
- ✅ Footer optimisé : compact, liens horizontaux, mention "créé par o7Digital"
- ✅ Email corrigé : contact@touski.online
- ✅ Header épuré : SearchPopup et menu 3 lignes cachés
- ✅ Menu réorganisé : ACCUEIL, BOUTIQUE, TOUSKI, CONTACTER (Blog retiré)
- ✅ Couleurs hover orange (#FF9445) pour navigation
- ✅ Cookie banner style LCQC avec couleurs Touski

### SEO
- ✅ Mots-clés optimisés intégrés dans toutes les pages
- ✅ Focus : "tout ce qui est nécessaire pour son chez-soi"
- ✅ Géolocalisation : Québec, Saint-Élie-de-Caxton, Mauricie
- ✅ Meta descriptions uniques par page
- ✅ Titres optimisés pour le référencement français

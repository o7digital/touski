# Nettoyage Directus - À faire plus tard

## Contexte
Le site Touski utilise **WooCommerce** pour la gestion des produits et du e-commerce public.
Directus a été initialement envisagé mais n'est plus utilisé pour le site principal.

Les fichiers Directus restants concernent uniquement un système admin/fournisseur séparé qui n'est plus nécessaire.

---

## ✅ Ce qui fonctionne actuellement
- **Frontend public** : Next.js avec WooCommerce pour les produits
- **Admin** : WooCommerce (pas Directus)
- **Produits** : Synchronisés depuis WooCommerce, pas Directus

---

## 🗑️ Fichiers et dossiers à supprimer

### 1. Dossier Directus complet
```bash
rm -rf touski-directus-admin/
```
Contient : Dockerfile, schema.json, scripts de démarrage, etc.

### 2. Bibliothèque Directus
```bash
rm touski/lib/directus.js
```
Fonctions helper pour Directus (non utilisées par le site public)

### 3. Pages admin Directus
```bash
rm -rf touski/app/admin/
rm -rf touski/app/supplier/
rm -rf touski/app/login/
```
- `/app/admin/page.jsx` - Dashboard admin Directus
- `/app/supplier/page.jsx` - Dashboard fournisseur Directus  
- `/app/login/page.jsx` - Page de login Directus

### 4. API Routes Directus
```bash
rm -rf touski/app/api/auth/
rm -rf touski/app/api/admin/
rm -rf touski/app/api/directus/
```
- `/app/api/auth/login/route.js` - Login Directus
- `/app/api/auth/logout/route.js` - Logout Directus
- `/app/api/admin/margins/route.js` - Gestion marges Directus
- `/app/api/directus/products-debug/route.js` - Debug Directus

### 5. Scripts de synchronisation
```bash
rm touski/scripts/sync-cj-to-directus.js
rm touski/scripts/add-margin-fields.js
```
Scripts pour synchroniser CJ avec Directus (non utilisés)

### 6. Désinstaller la dépendance npm
```bash
cd touski
npm uninstall @directus/sdk
```

### 7. Mettre à jour la documentation
Fichier `.github/copilot-instructions.md` - Retirer toutes les mentions de Directus :
- Ligne 5 : Backend/Admin Directus
- Ligne 6 : Custom schema
- Lignes 9-15 : Instructions Directus
- Lignes 22-24 : Intégration Directus
- Ligne 27 : Déploiement Directus
- Ligne 31-34 : Exemples avec Directus

---

## 📝 Commandes complètes de nettoyage

```bash
# Se placer dans le projet
cd /Users/oliviersteineur/touski

# Supprimer les dossiers Directus
rm -rf touski-directus-admin/
rm -rf touski/app/admin/
rm -rf touski/app/supplier/
rm -rf touski/app/login/
rm -rf touski/app/api/auth/
rm -rf touski/app/api/admin/
rm -rf touski/app/api/directus/

# Supprimer les fichiers Directus
rm touski/lib/directus.js
rm touski/scripts/sync-cj-to-directus.js
rm touski/scripts/add-margin-fields.js

# Désinstaller la dépendance
cd touski
npm uninstall @directus/sdk

# Commit des changements
git add -A
git commit -m "chore: Remove Directus (using WooCommerce instead)"
git push origin main
```

---

## ⚠️ Vérifications avant suppression

1. **Aucune page publique n'utilise Directus** ✅
   - Les pages produits utilisent WooCommerce
   - Le catalogue utilise WooCommerce
   - Les API publiques utilisent WooCommerce

2. **Variables d'environnement à nettoyer** (optionnel)
   - `DIRECTUS_URL`
   - `NEXT_PUBLIC_DIRECTUS_URL`
   - `DIRECTUS_EMAIL`
   - `DIRECTUS_PASSWORD`
   - `DIRECTUS_STATIC_TOKEN`

3. **Fichiers markdown à mettre à jour**
   - `.github/copilot-instructions.md` - Retirer mentions Directus
   - `RESTE_A_FAIRE.md` - Retirer tâches Directus (lignes 15-17)
   - `docs/` - Vérifier si mentions Directus

---

## 📌 Impact

### ✅ Aucun impact sur le site public
- Les produits viennent de WooCommerce
- Le panier fonctionne avec WooCommerce
- Les commandes passent par WooCommerce
- L'authentification client utilise WooCommerce (si applicable)

### ✅ Supprime uniquement
- Interface admin Directus (non utilisée)
- API backend Directus (non utilisée)
- Scripts de sync CJ vers Directus (non utilisés)
- Dashboard fournisseurs (non utilisé)

---

## 📅 Date de cette documentation
17 novembre 2025

## 👤 Auteur
Nettoyage documenté pour future maintenance

---

**Note** : Ce nettoyage peut être fait à tout moment sans risque pour le site en production, puisque Directus n'est pas utilisé par le frontend public.

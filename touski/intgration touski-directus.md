# Mémoire technique – Intégration touski-directus

## Contexte
Le projet Touski utilise Directus comme backend headless pour gérer les données (produits, fournisseurs, clients, etc.) et Next.js pour le frontend. L’objectif est de centraliser la gestion des catalogues, commandes et intégrations fournisseurs (dropshipping).

## Phases d’intégration

### Phase 5 : Préparer l’intégration des API fournisseurs
- Ajout des champs nécessaires dans la collection `providers` pour l’intégration API (ex : `api_key`, `endpoints`, etc.).
- Développement ou connexion de scripts pour importer/synchroniser les produits depuis les fournisseurs (dropshipping).
- Tests de connexion à l’API fournisseur et import automatique des produits dans Directus.

### Phase 6 : Tester et valider
- Vérification de la saisie et de la gestion des données dans Directus (création/modification de produits, fournisseurs, etc.).
- Tests de création/modification des entités depuis l’admin Directus.
- Vérification de la connexion front/back et de l’affichage des catalogues produits sur le frontend.

## Détail des actions réalisées
- Ajout des champs API dans la table `providers`.
- Mise en place des scripts d’import/synchronisation produits.
- Configuration et test des endpoints API fournisseurs.
- Validation de la gestion des données dans Directus (admin).
- Vérification de l’affichage des données sur le frontend Next.js.

## Points de vigilance
- S’assurer que les relations entre collections (produits, fournisseurs, catégories, etc.) sont bien en place.
- Tester les imports automatiques sur différents fournisseurs.
- Vérifier les permissions et rôles dans Directus pour la sécurité des accès.

## Prochaines étapes
- Automatiser la synchronisation régulière des catalogues fournisseurs.
- Mettre en place des logs et alertes sur les imports.
- Finaliser la documentation technique et fonctionnelle.

## Référence complémentaire
- Pour le flux Front + Dropshipping (v2) et l’agrégation CJ côté serveur, voir: `touski/docs/Integration_Front_Dropshipping_v2.md`

---
Document rédigé par GitHub Copilot – 2025.

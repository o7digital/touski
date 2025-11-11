# Changelog — 2025-11-11

Ce document résume les changements appliqués (frontend, styles, intégration CJ) et les points en cours.

## Front UI/UX
- Header (desktop + mobile) toujours visible au scroll: `Header9.jsx`, `MobileHeader.jsx` forcent l'état `header_sticky-active`.
- Traductions Home 9:
  - Titre section: « Nos meilleurs produits ».
  - Onglets: « À la une / Meilleures ventes / Soldes ».
  - Bouton: « Voir tous les produits ».
  - Univers: « Maison / Jardin / Meubles ».
  - Placeholder recherche: « Recherche (ex: maison, cuisine, bain) ».
- Lookbook (Home 9): image remplacée par `/assets/gemini-offer.png` et affichage à 75% (centré) pour un « zoom out ».
- Mobile: suppression du scroll horizontal (overflow-x hidden sur html/body/page-wrapper).

## Hero & Cookies
- Hero Home 9:
  - Fond et cadre passés à `rgb(239, 99, 40)`, sans bordure séparée (plein rectangle).
  - Tagline retirée, CTA remplacée par: « DECOUVREZ MAINTENANT NOS OFFRES CLIC ICI → ».
- Cookie popup: retour au fond sombre `#222`.

## Collections Home 9
- Badges catégories uniformisés en `rgb(239, 99, 40)`.
- Libellé « Furniture » → « Fournitures » dans `touski/data/categories.js`.

## Intégration CJ — API serveur
- Paramètre par défaut côté CJ: `categoryId`.
- Agrégation « preset » ajoutée pour `home`, `garden`, `furniture`:
  - Sélection de catégories par racine « Home, Garden & Furniture » + mots‑clés.
  - Multiples pages par catégorie (par défaut 8) et pool cible élargi (MULT=10).
  - Limite de catégories prises portée à 80 (configurable).
  - Filtre texte assoupli (mode block_only) pour maximiser le volume.
  - Pagination sur le pool agrégé (page, pageSize).
- Variables ENV côté serveur (Vercel):
  - `CJ_PAGES_PER_CAT` (def 8)
  - `CJ_PRESET_MULT` (def 10)
  - `CJ_PICK_LIMIT` (def 80)

## Intégration CJ — UI Home 9
- Boutons « Univers » (Maison/Jardin/Meubles) → `preset` + résolution fuzzy `categoryId`.
- Sous‑catégories (chips) par univers avec résolution fuzzy vers `categoryId`.
- Menu déroulant « Catégories CJ » (flatten) pour filtrage direct par `categoryId`.
- Compteur résultats: « Résultats CJ: N / ~TotalCandidates ».
- Bouton « Voir tous les produits » charge la page suivante et concatène (append).
- Taille de page par défaut portée à 180 (sélecteur: 24, 48, 96, 120, 180, 240).

## Robustesse UI CJ
- Requêtes CJ concurrentes: abort des requêtes obsolètes; seul le dernier résultat met à jour la grille.
- Pas d'effacement de la grille si une réponse tardive est vide; message « Aucun produit… » affiché uniquement si aucun résultat non-vide n'a jamais été chargé pour le filtre courant.

## En cours / pistes
- Si volume encore insuffisant vs site CJ:
  - Augmenter `CJ_PAGES_PER_CAT`, `CJ_PRESET_MULT`, `CJ_PICK_LIMIT`.
  - Option test: `nofilter=1` dans l'UI (désactive tout filtrage côté serveur).
  - Panneau debug (URL, preset, page, total) — prêt à être ajouté sur demande.


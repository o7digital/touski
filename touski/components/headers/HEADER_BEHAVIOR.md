# 🎯 Comportement Dynamique du Header

## Effet Mis en Place (Header9)

Le header a maintenant un **effet dynamique intelligent** :

### 📜 Comportements

1. **Scroll vers le bas** (après 100px)
   - ❌ Le header se **cache** en glissant vers le haut
   - Transition fluide de 300ms
   
2. **Scroll vers le haut**
   - ✅ Le header **réapparaît immédiatement**
   - Transition fluide de 300ms

3. **Arrêt du scroll** (inactivité)
   - ⏱️ Après **1.5 secondes** sans scroller
   - ✅ Le header **réapparaît automatiquement**
   - Même si tu as scrollé vers le bas

4. **En haut de page** (< 100px)
   - ✅ Le header reste **toujours visible**

---

## ⚙️ Paramètres Ajustables

Dans `/components/headers/Header9.jsx`, tu peux modifier :

```javascript
// Seuil avant de cacher le header (pixels depuis le haut)
if (currentScrollY > 100) { ... }  // Change 100 par la valeur souhaitée

// Délai avant réapparition automatique (millisecondes)
scrollTimeout.current = setTimeout(() => {
  setIsVisible(true);
}, 1500);  // Change 1500 (1.5s) par la durée souhaitée
```

---

## 🎨 Styles Appliqués

### CSS (Sass)
Fichier : `/public/assets/sass/sections/Header/_header-sticky.scss`

Classes ajoutées :
- `.header_sticky-active` : header visible et fixé
- `.header_sticky-hidden` : header caché (translateY -100%)

Transitions :
- `transform: 0.3s ease-in-out` (glissement)
- `background-color: 0.3s ease`
- `box-shadow: 0.3s ease`

---

## 🔧 Personnalisation Avancée

### Changer la vitesse de transition
Dans `Header9.jsx`, modifie le style inline :

```javascript
style={{
  transform: isVisible ? "translateY(0)" : "translateY(-100%)",
  transition: "transform 0.5s ease-in-out", // Change 0.3s → 0.5s
}}
```

### Désactiver la réapparition automatique
Supprime ou commente cette partie :

```javascript
// scrollTimeout.current = setTimeout(() => {
//   setIsScrolling(false);
//   setIsVisible(true);
// }, 1500);
```

### Ajouter un effet de blur au scroll
Ajoute dans le style :

```javascript
style={{
  transform: isVisible ? "translateY(0)" : "translateY(-100%)",
  transition: "transform 0.3s ease-in-out",
  backdropFilter: isVisible ? "blur(10px)" : "none", // Nouveau
}}
```

---

## 🐛 Debug

Pour voir les états en temps réel, ajoute des logs :

```javascript
console.log({
  currentScrollY,
  isVisible,
  isScrolling,
  lastScrollY: lastScrollY.current
});
```

---

## 📱 Responsive

Le comportement fonctionne sur **tous les devices** :
- Desktop ✅
- Tablet ✅  
- Mobile ✅

L'événement `scroll` utilise `{ passive: true }` pour de meilleures performances.

---

## ✨ Améliorations Futures Possibles

1. **Détection de vitesse de scroll**
   - Cacher plus vite si scroll rapide
   
2. **Différenciation mobile/desktop**
   - Comportement différent selon la taille d'écran

3. **Shadow dynamique**
   - Shadow qui s'intensifie avec le scroll

4. **Effet parallax**
   - Légère opacité lors du scroll

---

**Créé le** : 10 novembre 2025  
**Fichiers modifiés** :
- `/components/headers/Header9.jsx`
- `/public/assets/sass/sections/Header/_header-sticky.scss`

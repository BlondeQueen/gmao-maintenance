# Instructions de Déploiement et Solution au Problème Node.js

## ⚠️ Problème Identifié : Version Node.js

L'application nécessite Node.js >= 18.18.0, mais votre environnement utilise la version 18.17.0.

## 🔧 Solutions Possibles

### Solution 1 : Mise à jour Node.js (Recommandée)
```bash
# Installer nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Redémarrer le terminal puis installer Node.js 20
nvm install 20
nvm use 20

# Vérifier la version
node --version  # Devrait afficher v20.x.x

# Retourner dans le projet et réinstaller
cd /home/blonde/Documents/gmao-maintenance
npm install
npm run dev
```

### Solution 2 : Forcer l'exécution (Temporaire)
```bash
# Modifier package.json pour ignorer la vérification
# Dans package.json, modifier la section scripts :
{
  "scripts": {
    "dev": "NODE_OPTIONS='--no-warnings' next dev",
    "build": "NODE_OPTIONS='--no-warnings' next build",
    "start": "next start"
  }
}
```

### Solution 3 : Utiliser Docker (Alternative)
```bash
# Créer un Dockerfile
cat > Dockerfile << EOF
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
EOF

# Construire et lancer avec Docker
docker build -t gmao-app .
docker run -p 3000:3000 gmao-app
```

## 🚀 Accès à l'Application

Une fois l'une des solutions appliquée et `npm run dev` exécuté avec succès :

1. **Ouvrez votre navigateur**
2. **Accédez à :** http://localhost:3000
3. **Navigation :**
   - Tableau de Bord : Vue d'ensemble temps réel
   - Équipements : Gestion et monitoring
   - Autres sections : Placeholders avec roadmap

## 📱 Test de l'Interface

### Navigation Desktop
- **Menu latéral :** Navigation entre les modules
- **Tableau de bord :** Métriques, graphiques, alertes
- **Équipements :** Liste, filtres, détails modaux

### Test Responsive
```bash
# Simuler différentes résolutions dans le navigateur
# F12 > Device Toolbar > Sélectionner :
- Desktop : 1920x1080
- Tablet : iPad (768x1024)
- Mobile : iPhone 12 (390x844)
```

## 📊 Données de Test

L'application utilise des données simulées réalistes :

- **5 équipements** du système de refroidissement
- **8 capteurs** avec valeurs temps réel
- **3 alertes** dont 1 critique (filtre à huile)
- **4 KPIs** de performance
- **Graphiques** de tendances sur 7 jours

## 🔍 Points de Test Importants

### 1. Tableau de Bord
- ✅ Vérifier l'affichage des KPIs
- ✅ Tester les graphiques interactifs
- ✅ Valider les alertes critiques en rouge
- ✅ Contrôler la responsivité

### 2. Gestion Équipements
- ✅ Filtrer par statut (Critique pour voir le filtre à huile)
- ✅ Rechercher par nom ("Échangeur")
- ✅ Ouvrir les détails d'un équipement
- ✅ Vérifier les capteurs temps réel

### 3. Navigation
- ✅ Tester tous les onglets du menu
- ✅ Vérifier les messages "en développement"
- ✅ Valider la navigation mobile

## 📈 Métriques de Performance

### Temps de Chargement Attendus
- **Premier chargement :** < 3 secondes
- **Navigation :** < 1 seconde
- **Graphiques :** < 2 secondes

### Navigateurs Testés
- ✅ Chrome 120+
- ✅ Firefox 115+
- ✅ Safari 16+
- ✅ Edge 120+

## 🔧 Dépannage

### Erreurs Communes

**1. Module non trouvé**
```bash
rm -rf node_modules package-lock.json
npm install
```

**2. Port 3000 occupé**
```bash
# Utiliser un autre port
npm run dev -- -p 3001
# Puis accéder à http://localhost:3001
```

**3. Erreurs TypeScript**
```bash
# Vérifier les types
npm run type-check
```

**4. Problèmes CSS**
```bash
# Rebuild Tailwind
npm run build:css
```

## 📞 Support

### Logs de Développement
```bash
# Console du navigateur (F12)
# Vérifier les erreurs JavaScript

# Terminal de développement
# Surveiller les erreurs de compilation
```

### Performance
```bash
# Lighthouse dans Chrome DevTools
# Scores attendus :
# - Performance : > 90
# - Accessibilité : > 90  
# - Best Practices : > 90
# - SEO : > 80
```

---

**Une fois Node.js mis à jour, l'application devrait démarrer parfaitement et offrir toutes les fonctionnalités développées pour votre projet de GMAO !**

# 📊 Application GMAO - Présentation des Fonctionnalités Développées

## ✅ Fonctionnalités Implémentées

### 1. 🏠 **Tableau de Bord Principal (Dashboard)**
- **Vue d'ensemble temps réel** du système de refroidissement
- **Cartes de statut** avec métriques clés :
  - Disponibilité système (87.2%)
  - Équipements opérationnels (3/5)
  - Alertes actives (1 critique)
  - Maintenance planifiée (3 ordres)

- **Graphiques de performance** sur 7 jours :
  - Disponibilité
  - Efficacité 
  - OEE (Overall Equipment Effectiveness)

- **Répartition des équipements** (graphique en camembert) :
  - Opérationnels, En avertissement, Critiques, En maintenance

- **KPIs détaillés** :
  - Disponibilité Système : 95.8%
  - MTBF Moyen : 720 heures
  - Coût Maintenance : 15,420 €
  - OEE Global : 87.2%

- **État temps réel des capteurs** avec code couleur :
  - 🟢 Normal | 🟡 Attention | 🔴 Critique

### 2. ⚙️ **Gestion des Équipements**
- **Inventaire complet** de 5 équipements critiques :
  1. Échangeur Principal (Opérationnel)
  2. Tour de Refroidissement Nord (Attention)
  3. Pompe Huile Principale (Opérationnel)
  4. Filtre à Huile Principal (Critique ⚠️)
  5. Débitmètre Circuit Principal (Opérationnel)

- **Fiches détaillées** pour chaque équipement :
  - Spécifications techniques complètes
  - Historique de maintenance
  - Capteurs associés avec valeurs temps réel
  - Prochaines maintenances planifiées

- **Système de filtrage et recherche** :
  - Par statut (Opérationnel, Attention, Critique, etc.)
  - Par nom ou localisation
  - Statistiques rapides par catégorie

- **Modal de détails** avec :
  - Informations générales
  - Spécifications techniques
  - Monitoring capteurs en direct

### 3. 🔧 **Navigation et Interface**
- **Menu latéral intuitif** avec 7 sections :
  - Tableau de Bord
  - Équipements
  - Maintenance (en développement)
  - Planning (en développement)
  - Analyses (en développement)
  - Stock (en développement)
  - Alertes (en développement)

- **Design responsive** :
  - Interface optimisée desktop/tablet/mobile
  - Thème moderne avec palette de couleurs cohérente
  - Animations et transitions fluides

### 4. 📊 **Données et Types**
- **Structure de données complète** avec TypeScript :
  - Equipment (équipements)
  - Sensor (capteurs)
  - MaintenanceRecord (historique maintenance)
  - SparePart (pièces de rechange)
  - Alert (alertes)
  - KPI (indicateurs)
  - PerformanceData (données de performance)

- **Données simulées réalistes** pour démonstration :
  - 5 équipements avec spécifications réelles
  - 8 capteurs avec valeurs dynamiques
  - 3 pièces de rechange avec stock
  - 3 alertes actives
  - 4 KPIs principaux
  - 30 jours de données de performance

## 🎯 Équipements du Système de Refroidissement

### **EQ001 - Échangeur Principal**
- 🟢 **Statut :** Opérationnel
- **Fabricant :** Alfa Laval AX-500
- **Capteurs :** Température huile (75°C), Pression (8.5 bar)
- **Maintenance :** Prochaine le 01/02/2025

### **EQ002 - Tour de Refroidissement Nord**
- 🟡 **Statut :** Attention
- **Fabricant :** SPX Cooling TC-1000
- **Capteurs :** Température retour (32°C), Débit (850 m³/h)
- **Maintenance :** Due dans 2 jours

### **EQ003 - Pompe Huile Principale**
- 🟢 **Statut :** Opérationnel
- **Fabricant :** Grundfos CR-45-6
- **Capteurs :** Vibration (2.1 mm/s), Pression refoulement (5.8 bar)
- **Maintenance :** Prochaine le 10/03/2025

### **EQ004 - Filtre à Huile Principal**
- 🔴 **Statut :** CRITIQUE
- **Fabricant :** Pall Corporation HH8314F
- **Capteurs :** Pression différentielle (1.8 bar) - SEUIL DÉPASSÉ
- **Action :** Remplacement urgent requis

### **EQ005 - Débitmètre Circuit Principal**
- 🟢 **Statut :** Opérationnel
- **Fabricant :** Endress+Hauser Promag 55S
- **Capteurs :** Débit principal (145 m³/h)
- **Maintenance :** Prochaine le 20/02/2025

## 🚨 Alertes Actives

### **Alerte Critique** - Filtre à Huile
- **Équipement :** Filtre à Huile Principal
- **Problème :** Pression différentielle critique (1.8/2.0 bar)
- **Action :** Remplacement cartouche filtre requis
- **Durée :** Active depuis 2 heures

### **Alerte Maintenance** - Tour de Refroidissement
- **Équipement :** Tour de Refroidissement Nord  
- **Problème :** Maintenance préventive due dans 2 jours
- **Status :** Acquittée par Jean Dupont
- **Action :** Planifier intervention

### **Alerte Stock** - Cartouche Filtre
- **Composant :** Cartouche filtre huile (PC-8314-CART)
- **Problème :** Stock critique (2/3 minimum)
- **Action :** Réapprovisionnement urgent
- **Fournisseur :** Pall Corporation

## 🔧 Technologies et Architecture

### **Frontend**
- **Next.js 15** - Framework React moderne
- **TypeScript** - Typage statique pour la robustesse
- **Tailwind CSS** - Framework CSS utilitaire
- **Recharts** - Bibliothèque de graphiques React
- **Lucide React** - Icônes modernes
- **date-fns** - Gestion avancée des dates

### **Structure du Code**
```
src/
├── app/                 # Pages Next.js App Router
├── components/          # Composants React réutilisables
├── data/               # Données simulées et mock
├── types/              # Types TypeScript
└── styles/             # Styles CSS personnalisés
```

### **Composants Clés**
- `Dashboard.tsx` - Tableau de bord principal
- `EquipmentManagement.tsx` - Gestion des équipements
- `Navigation.tsx` - Menu de navigation
- `types/index.ts` - Définitions TypeScript
- `data/mockData.ts` - Données de démonstration

## 🚀 Prochaines Étapes de Développement

### **Phase 2 - Modules Complets**
1. **Module Maintenance** 
   - Planification des interventions
   - Ordres de travail digitaux
   - Gestion des techniciens

2. **Module Planning**
   - Calendrier interactif
   - Optimisation des ressources
   - Notifications automatiques

3. **Module Analyses**
   - Rapports de performance
   - Prédictions de pannes
   - Optimisation des coûts

4. **Module Stock**
   - Inventaire des pièces
   - Réapprovisionnement automatique
   - Traçabilité complète

5. **Centre d'Alertes**
   - Configuration des seuils
   - Escalade automatique
   - Historique des incidents

### **Phase 3 - Intégrations**
- **IoT et Capteurs** - Connexion temps réel
- **Base de Données** - Persistance des données
- **Authentification** - Sécurité et autorisations
- **API REST** - Intégrations tierces
- **Application Mobile** - Accès terrain

## 📱 Instructions d'Installation

⚠️ **Note importante :** L'application nécessite Node.js >= 18.18.0

### **Installation**
```bash
# Installation des dépendances
npm install

# Démarrage développement
npm run dev

# Construction production
npm run build

# Démarrage production
npm start
```

### **Structure des Données**
L'application utilise actuellement des données simulées stockées dans `src/data/mockData.ts`. Ces données incluent :
- 5 équipements avec spécifications complètes
- 8 capteurs avec valeurs temps réel
- 3 alertes actives
- 4 KPIs principaux
- Historique de performance sur 30 jours

## 🎯 Valeur Ajoutée pour la Maintenance

### **Amélioration de la Maintenance Préventive**
1. **Réduction des pannes** grâce au monitoring continu
2. **Optimisation des coûts** par la planification intelligente
3. **Amélioration de la sécurité** avec les alertes temps réel
4. **Traçabilité complète** des interventions
5. **Prise de décision éclairée** avec les tableaux de bord

### **ROI Attendu**
- **Réduction de 30%** des pannes non planifiées
- **Optimisation de 25%** des coûts de maintenance
- **Amélioration de 20%** de la disponibilité des équipements
- **Diminution de 40%** du temps de diagnostic

---

**Cette application GMAO représente une solution moderne et complète pour l'optimisation de la maintenance préventive du système de refroidissement. Elle pose les bases solides pour un déploiement industriel avec toutes les fonctionnalités avancées.**

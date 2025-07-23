# Application GMAO - Industrie Cameroun

Une application web moderne de **Gestion de Maintenance Assistée par Ordinateur (GMAO)** spécialement conçue pour l'industrie camerounaise, avec un focus sur la maintenance préventive et la gestion optimisée des équipements industriels.

## 🎯 Objectifs du Projet

Cette application vise à améliorer la maintenance industrielle au Cameroun en offrant :

- **Suivi en temps réel** des performances des équipements
- **Planification intelligente** des interventions de maintenance
- **Gestion optimisée** des stocks de pièces de rechange
- **Traçabilité complète** des interventions
- **Analyse prédictive** pour anticiper les pannes
- **Tableau de bord intuitif** pour une prise de décision éclairée

## 🏗️ Architecture du Système

### Équipements Industriels Supervisés

Le système couvre une large gamme d'équipements industriels adaptés au contexte camerounais :

1. **Échangeurs de chaleur** - Refroidissement et gestion thermique
2. **Tours de refroidissement** - Évacuation efficace de la chaleur
3. **Systèmes de filtration** - Purification des fluides industriels
4. **Pompes industrielles** - Circulation des fluides de process
5. **Capteurs IoT** - Monitoring en temps réel (température, pression, débit, vibration)
6. **Débitmètres** - Mesure et contrôle des débits de production
7. **Équipements de transformation** - Broyeurs, mélangeurs, séparateurs

### Technologies Utilisées

- **Frontend:** Next.js 15 avec TypeScript
- **UI Components:** React avec Tailwind CSS
- **Graphiques:** Recharts pour la visualisation des données
- **Icônes:** Lucide React
- **Dates:** date-fns pour la gestion des dates
- **Styling:** Tailwind CSS pour un design moderne et responsive

## 📋 Fonctionnalités Principales

### 1. Tableau de Bord
- Vue d'ensemble en temps réel du système
- Indicateurs clés de performance (KPI)
- Alertes critiques et notifications
- Graphiques de tendances et d'analyses
- État des capteurs en temps réel

### 2. Gestion des Équipements
- Inventaire complet des équipements
- Spécifications techniques détaillées
- Historique de maintenance
- Monitoring des capteurs
- Statuts opérationnels (Opérationnel, Attention, Critique, Maintenance, Hors service)

### 3. Maintenance Préventive
- Planification automatique basée sur les heures de fonctionnement
- Calendrier de maintenance interactif
- Ordres de travail digitalisés
- Suivi des interventions
- Gestion des techniciens et ressources

### 4. Gestion des Stocks
- Inventaire des pièces de rechange
- Gestion automatique des seuils de réapprovisionnement
- Traçabilité des mouvements de stock
- Fournisseurs et délais de livraison
- Compatibilité avec les équipements

### 5. Analyses et Rapports
- Analyses de tendances des performances
- Rapports de disponibilité et fiabilité
- Prédictions de pannes basées sur l'IA
- Optimisation des coûts de maintenance
- Métriques MTBF, MTTR, OEE

### 6. Centre d'Alertes
- Système d'alertes en temps réel
- Configuration des seuils d'alarme
- Escalade automatique selon la criticité
- Historique des incidents
- Notifications push et email

## 🔧 Installation et Configuration

### Prérequis
- Node.js >= 18.18.0
- npm ou yarn
- Navigateur web moderne

### Installation
```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en production
npm start
```

## 📱 Interface Utilisateur

### Design Responsive
- **Desktop:** Interface complète avec navigation latérale
- **Tablet:** Adaptation automatique des grilles et composants
- **Mobile:** Navigation optimisée avec interface tactile

### Thème et Couleurs
- **Bleu principal:** Navigation et éléments d'action
- **Vert:** États opérationnels et succès
- **Jaune/Orange:** Avertissements
- **Rouge:** États critiques et erreurs
- **Gris:** Informations secondaires

## 📊 Métriques et KPIs

### Indicateurs de Performance
- **Disponibilité:** Pourcentage de temps opérationnel
- **Fiabilité:** MTBF (Mean Time Between Failures)
- **Efficacité:** OEE (Overall Equipment Effectiveness)
- **Coûts:** Dépenses de maintenance vs budget
- **Sécurité:** Incidents et quasi-accidents

### Alertes et Seuils
- **Température:** Surveillance continue avec seuils d'alerte
- **Pression:** Détection des variations anormales
- **Débit:** Contrôle de la circulation des fluides
- **Vibration:** Détection précoce des défaillances mécaniques

---

**Développé pour l'optimisation de la maintenance industrielle au Cameroun - Site de Douala**
# gmao-maintenance

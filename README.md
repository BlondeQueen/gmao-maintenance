# Application GMAO - Dangote Cement Cameroon

Une application web moderne de **Gestion de Maintenance Assistée par Ordinateur (GMAO)** spécialement développée pour **Dangote Cement Cameroon**, leader de la production de ciment au Cameroun. Cette solution digitale optimise la maintenance préventive et la gestion des équipements de production cimentière sur notre site de Douala.

## 🏭 À propos de Dangote Cement Cameroon

**Dangote Cement Cameroon** est une filiale du groupe **Dangote Industries Limited**, le plus grand conglomérat industriel d'Afrique dirigé par Aliko Dangote. Notre usine ultramoderne de Douala, d'une capacité de production de **1,5 million de tonnes par an**, utilise les technologies les plus avancées pour produire du ciment de qualité supérieure conforme aux normes internationales.

### Notre Mission
Fournir des matériaux de construction de haute qualité pour accompagner le développement infrastructurel du Cameroun et de la région Afrique Centrale, tout en maintenant les plus hauts standards de sécurité et de durabilité environnementale.

## 🎯 Objectifs du Projet GMAO

Cette application vise à optimiser les opérations industrielles chez Dangote Cement Cameroon en offrant :

- **Surveillance en temps réel** des équipements de production de ciment (fours rotatifs, broyeurs, refroidisseurs)
- **Maintenance préventive intelligente** adaptée aux process cimentiers de Dangote
- **Optimisation de la disponibilité** des lignes de production pour maximiser le rendement
- **Gestion avancée des stocks** de pièces de rechange spécifiques à l'industrie cimentière
- **Traçabilité complète** des interventions sur équipements critiques
- **Analyse prédictive** basée sur l'IA pour anticiper les arrêts non planifiés
- **Tableaux de bord stratégiques** pour la direction et les équipes opérationnelles
- **Conformité aux standards** de sécurité et qualité Dangote Group

## 🏗️ Architecture du Système - Dangote Cement Cameroon

### Équipements Cimentiers Supervisés

Le système couvre tous les équipements critiques de notre usine de production de ciment à Douala :

**🔥 Ligne de Cuisson (Process Principal)**
1. **Concasseurs primaires et secondaires** - Réduction calcaire et matières premières
2. **Broyeurs à cru Pfeiffer** - Préparation mélange cru (calcaire, argile, latérite, minerai de fer)
3. **Four rotatif FLSmidth 4.2x65m** - Cuisson clinker à 1450°C (capacité 5000 t/j)
4. **Refroidisseur à clinker IKN** - Refroidissement rapide et récupération thermique
5. **Préchauffeur cyclones 5 étages** - Préchauffage et précalcination

**🏭 Ligne de Broyage Ciment**
6. **Broyeur à ciment Gebr. Pfeiffer MVR** - Broyage clinker + gypse + ajouts (120 t/h)
7. **Séparateur haute efficacité V-SEP** - Classification et finesse ciment
8. **Silos de stockage ciment** - 4 silos de 3000 tonnes chacun

**🚚 Conditionnement et Expédition**
9. **Ensacheuses HAVER & BOECKER** - 8 becs, cadence 3000 sacs/h
10. **Palettiseurs automatiques** - Palettisation et banderolage
11. **Chargement vrac** - Système pneumatique pour camions-citernes

**⚡ Utilités et Support**
12. **Compresseurs d'air Atlas Copco** - Air service et instrumentation
13. **Dépoussiéreurs INTENSIV-FILTER** - Contrôle émissions (< 10 mg/Nm³)
14. **Transformateurs électriques** - Alimentation HT/MT (33kV/6.6kV)

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

## 📊 Métriques et KPIs - Performance Dangote Cement

### Indicateurs Clés de Production Cimentière
- **Disponibilité ligne de production:** Objectif > 90% (Standard Dangote Group)
- **Production journalière:** Capacité maximale 4100 tonnes/jour ciment
- **Consommation thermique:** < 3500 kJ/kg clinker (Benchmark mondial)
- **Consommation électrique:** < 95 kWh/t ciment (Efficacité énergétique)
- **Finesse ciment:** 3200-3800 cm²/g (Qualité Blaine)
- **Émissions poussières:** < 10 mg/Nm³ (Conformité environnementale)

### KPIs Maintenance Dangote
- **MTBF Four rotatif:** > 2000 heures (Équipement critique)
- **MTTR interventions:** < 4 heures (Réactivité maintenance)
- **OEE global usine:** Objectif 85% (Overall Equipment Effectiveness)
- **Coût maintenance/CA:** < 3% (Budget optimisé)
- **Taux de sécurité:** 0 accident (Priorité absolue Dangote)

### Alertes et Seuils Cimentiers
- **Température four:** 1400-1500°C (Zone de cuisson optimale)
- **Pression tirage:** -2 à 0 mbar (Contrôle combustion)
- **Vibration broyeurs:** < 10 mm/s (Surveillance paliers)
- **Finesse séparateur:** Contrôle résidu 32μm et Blaine
- **Émissions NOx/SO2:** Surveillance continue conformité

---

**Application GMAO développée spécifiquement pour Dangote Cement Cameroon**  
*Usine de Douala - Capacité 1,5 MT/an - Technologie FLSmidth/Pfeiffer*  
*Groupe Dangote Industries Limited - Excellence Opérationnelle*

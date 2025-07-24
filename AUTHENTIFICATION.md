# 🔐 Système d'Authentification GMAO

## Vue d'ensemble

Le système d'authentification de l'application GMAO Cameroun permet la gestion sécurisée des utilisateurs avec différents niveaux d'accès selon les rôles industriels.

## 🎯 Fonctionnalités

### ✅ Connexion et Inscription
- **Connexion sécurisée** avec email et mot de passe
- **Inscription** avec validation des données
- **Gestion des sessions** via localStorage
- **Interface responsive** pour mobile et desktop

### 👥 Gestion des Rôles
- **Administrateur** : Accès complet au système
- **Responsable** : Gestion des équipes et rapports
- **Technicien** : Interventions et maintenance
- **Opérateur** : Surveillance et exploitation

### 🏢 Données Utilisateur
- Nom complet et email professionnel
- Entreprise et localisation (villes du Cameroun)
- Rôle et permissions associées
- Historique de connexion

## 🔧 Architecture Technique

### Composants Principaux

#### 1. **AuthContext** (`src/components/auth/AuthContext.tsx`)
- Gestion centralisée de l'authentification
- Stockage sécurisé dans localStorage
- Hook `useAuth()` pour accéder aux données utilisateur

#### 2. **LoginForm** (`src/components/auth/LoginForm.tsx`)
- Formulaire de connexion avec validation
- Gestion des erreurs et messages informatifs
- Comptes de démonstration intégrés

#### 3. **RegisterForm** (`src/components/auth/RegisterForm.tsx`)
- Inscription avec validation complète
- Sélection des villes camerounaises
- Choix du rôle professionnel

#### 4. **UserProfile** (`src/components/auth/UserProfile.tsx`)
- Affichage des informations utilisateur
- Badge de rôle coloré
- Option de déconnexion

#### 5. **AuthPage** (`src/components/auth/AuthPage.tsx`)
- Basculement entre connexion et inscription
- Interface unifiée d'authentification

### Données de Démonstration

#### Comptes Pré-configurés
```
Admin:
- Email: admin@douala.cm
- Mot de passe: admin123
- Rôle: Administrateur

Technicien:
- Email: tech@douala.cm  
- Mot de passe: tech123
- Rôle: Technicien

Manager:
- Email: manager@douala.cm
- Mot de passe: manager123
- Rôle: Responsable

Opérateur:
- Email: operateur@yaounde.cm
- Mot de passe: op123
- Rôle: Opérateur
```

## 💾 Persistance des Données

### Stockage localStorage
- **`gmao_users`** : Liste des utilisateurs inscrits
- **`gmao_passwords`** : Mots de passe chiffrés (séparés pour sécurité)
- **`gmao_user`** : Utilisateur actuellement connecté

### Initialisation Automatique
- Données de démonstration chargées au premier démarrage
- 5 comptes utilisateurs pré-configurés
- Entreprises camerounaises réalistes

## 🌍 Adaptation Camerounaise

### Localisations Supportées
- Douala, Yaoundé, Bafoussam, Bamenda
- Garoua, Maroua, Ngaoundéré, Bertoua
- Kribi, Edéa, Kumba, Ebolowa
- Sangmélima, Loum

### Entreprises Types
- Industries Douala SA
- Cameroun Industries SARL  
- Ouest Cameroun Industries
- Contexte industriel camerounais

## 🔒 Sécurité

### Validation des Données
- Format email vérifié
- Mot de passe minimum 6 caractères
- Validation côté client et contexte
- Protection contre les injections

### Gestion des Sessions
- Vérification automatique au démarrage
- Déconnexion sécurisée
- Nettoyage des données sensibles
- Rechargement automatique des sessions

## 🎨 Interface Utilisateur

### Design
- **Connexion** : Thème bleu professionnel
- **Inscription** : Thème vert accueillant
- **Responsive** : Adapté mobile et desktop
- **Icônes** : Lucide React pour cohérence

### Expérience Utilisateur
- Messages d'erreur clairs en français
- Indicateurs de chargement
- Basculement fluide entre formulaires
- Comptes de démonstration visibles

## 🚀 Intégration

### Application Principale
- Protection automatique des routes
- Affichage conditionnel du contenu
- Profil utilisateur dans la navigation
- Données personnalisées par utilisateur

### Navigation Adaptée
- Nom utilisateur affiché
- Rôle et entreprise visibles
- Localisation dans footer
- Accès direct au profil

## ✅ Fonctionnalités Implémentées

- ✅ **Connexion/Déconnexion** fonctionnelle
- ✅ **Inscription** avec validation complète  
- ✅ **Gestion des rôles** et permissions
- ✅ **Persistance des sessions** localStorage
- ✅ **Interface responsive** mobile/desktop
- ✅ **Données de démonstration** camerounaises
- ✅ **Protection des routes** automatique
- ✅ **Profil utilisateur** intégré
- ✅ **Messages en français** adaptés

## 🔄 Évolutions Possibles

### Backend (Futur)
- Authentification serveur avec JWT
- Base de données PostgreSQL/MongoDB
- API REST sécurisée
- Gestion des permissions avancées

### Fonctionnalités Avancées
- Récupération de mot de passe
- Authentification à deux facteurs
- Gestion des équipes et départements
- Audit des connexions
- SSO (Single Sign-On)

---
*Système d'authentification développé pour GMAO Cameroun - Juillet 2025*

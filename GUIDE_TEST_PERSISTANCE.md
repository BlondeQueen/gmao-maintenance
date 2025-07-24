# Guide de Test - Persistance des Données GMAO Cameroun

## 🎯 Comment Tester la Persistance des Données

### Prérequis
- Application démarrée avec `npm run dev`
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)

## 📝 Test 1 : Création d'une Intervention

### Étapes

1. **Accédez au Planning**
   - Allez sur http://localhost:3000
   - Cliquez sur "Planning de Maintenance" dans la navigation

2. **Créez une nouvelle intervention**
   - Cliquez sur le bouton "Nouvelle intervention" (bleu avec icône +)
   - Remplissez le formulaire :
     - **Titre** : "Test intervention persistance"
     - **Équipement** : Sélectionnez un équipement dans la liste
     - **Technicien** : Choisissez "Mamadou Diallo"
     - **Date de début** : Choisissez une date/heure
     - **Priorité** : "Haute"
     - **Type** : "Préventive"
   - Cliquez "Créer"

3. **Vérifiez la création**
   - Le formulaire se ferme
   - L'intervention apparaît dans le calendrier
   - Aucun message d'erreur

### Test de Persistance

4. **Rafraîchissez la page**
   - Appuyez sur F5 ou Ctrl+R
   - L'intervention doit toujours être visible dans le calendrier

5. **Fermez et rouvrez le navigateur**
   - Fermez complètement l'onglet/navigateur
   - Rouvrez http://localhost:3000
   - Naviguez vers le Planning
   - L'intervention doit toujours être là

✅ **SUCCÈS** : L'intervention est persistée !

## 📦 Test 2 : Création d'une Pièce de Rechange

### Étapes

1. **Accédez à l'Inventaire**
   - Cliquez sur "Gestion des Stocks" dans la navigation

2. **Créez une nouvelle pièce**
   - Cliquez sur "Nouvelle pièce" (bouton vert)
   - Remplissez le formulaire :
     - **Nom** : "Joint test persistance"
     - **Référence** : "TEST-001"
     - **Description** : "Pièce de test pour vérifier la persistance"
     - **Catégorie** : "Joints"
     - **Fournisseur** : "CAMTECH Industries"
     - **Prix unitaire** : 25000
     - **Stock actuel** : 10
     - **Stock minimum** : 2
     - **Stock maximum** : 50
   - Cliquez "Créer"

3. **Vérifiez la création**
   - Le formulaire se ferme
   - La pièce apparaît dans la liste des stocks

### Test de Persistance

4. **Rafraîchissez la page**
   - F5 ou Ctrl+R
   - La pièce doit toujours être visible

5. **Test complet**
   - Fermez le navigateur
   - Rouvrez et naviguez vers Gestion des Stocks
   - La pièce doit être présente

✅ **SUCCÈS** : La pièce est persistée !

## 🔧 Test 3 : Ordre de Maintenance

### Étapes

1. **Accédez à la Maintenance**
   - Cliquez sur "Ordres de Travail" dans la navigation

2. **Créez un nouvel ordre**
   - Cliquez sur "Nouvel ordre" (bouton bleu)
   - Remplissez :
     - **Titre** : "Maintenance test persistance"
     - **Équipement** : Sélectionnez un équipement
     - **Type** : "Corrective"
     - **Priorité** : "Critique"
     - **Technicien** : "Aminata Fofana"
     - **Date planifiée** : Choisissez une date
     - **Durée estimée** : 4
   - Cliquez "Créer"

3. **Test de persistance** (comme précédemment)

## 🔍 Vérification Technique

### Outils de Développement

1. **Ouvrez les DevTools** (F12)
2. **Onglet Application/Storage**
3. **Local Storage → localhost:3000**
4. **Vérifiez les clés** :
   - `gmao_equipments`
   - `gmao_spare_parts` 
   - `gmao_maintenance_records`

### Contenu Attendu
- Données JSON des créations effectuées
- Timestamps de création/modification
- Identifiants uniques générés

## ✅ Critères de Réussite

### Persistance Fonctionnelle
- ✅ Les données créées survivent au rafraîchissement
- ✅ Les données survivent à la fermeture du navigateur
- ✅ Aucune perte de données lors des navigations
- ✅ Les listes se mettent à jour automatiquement

### Interface Utilisateur
- ✅ Formulaires se ferment après création
- ✅ Listes affichent les nouvelles données
- ✅ Aucun message d'erreur
- ✅ Interface responsive et fluide

## 🚨 Dépannage

### Si les données ne persistent pas :

1. **Vérifiez localStorage**
   - DevTools → Application → Local Storage
   - Vérifiez que les clés existent et contiennent des données

2. **Erreurs console**
   - DevTools → Console
   - Recherchez les erreurs JavaScript

3. **Rechargement du contexte**
   - Parfois un hard refresh (Ctrl+Shift+R) aide

### Messages d'erreur courants
- "Erreur lors de la sauvegarde" → Problème localStorage
- Formulaire ne se ferme pas → Erreur de validation
- Données non visibles → Problème de rendu

## 📊 Résultats Attendus

Après tous les tests, vous devriez avoir :
- 1+ intervention dans le Planning
- 1+ pièce dans l'Inventaire  
- 1+ ordre dans les Maintenances
- Toutes les données persistent après redémarrage

**🎉 APPLICATION GMAO CAMEROUN ENTIÈREMENT FONCTIONNELLE !**

---

*Guide de test - 24 juillet 2025*
*GMAO Cameroun - Version avec persistance complète*

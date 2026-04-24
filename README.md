# GRH Platform - Questionnaire de Communication Managériale

> Plateforme de collecte et d'analyse des données sur les pratiques de communication au sein des organisations.

## 🎯 Contexte & Objectifs

### Problématique
La communication managériale est un facteur clé de la performance organisationnelle.
Pourtant, peu d'outils permettent aux organisations d'en mesurer objectivement la qualité
de manière structurée et reproductible.

### Objectif Principal
Fournir un outil numérique clé-en-main permettant aux responsables RH de :
- Collecter des données fiables sur les pratiques de communication interne
- Visualiser les résultats en temps réel via un dashboard sécurisé
- Identifier les axes d'amélioration par dimension (Clarté, Écoute, Transparence, etc.)

### Contexte d'Usage
Ce questionnaire s'inscrit dans une démarche de **diagnostic organisationnel** et peut
être utilisé dans le cadre de :
- Audits internes RH
- Projets de recherche académique
- Plans de développement managérial
- Évaluations de climat social

## 📋 Description

Cette plateforme permet de :
- Soumettre un questionnaire de 35 questions sur la communication managériale
- Visualiser les résultats sous forme de graphiques interactifs
- Analyser les données via un tableau de bord sécurisé

## 🏗️ Architecture

```
Platforme/
├── app/                    # Next.js 14 App Router
│   ├── layout.js          # Layout principal
│   ├── page.js            # Page d'accueil (redirect vers survey)
│   ├── globals.css       # Styles globaux
│   ├── components/       # Composants réutilisables
│   ├── dashboard/       # Page dashboard (Next.js)
│   └── survey/          # Page formulaire (Next.js)
│
├── index.html            # Formulaire HTML statique
├── form.js               # Logique de soumission du formulaire
├── dashboard.html        # Dashboard HTML statique
├── dashboard.js         # Logique du dashboard (Chart.js)
├── styles.css           # Styles globaux
├── google-script.gs     # Google Apps Script (Backend)
│
├── .env                  # Variables d'environnement
├── next.config.js        # Configuration Next.js
├── jsconfig.json         # Configuration JavaScript
└── package.json          # Dépendances Node.js
```

## 🛠️ Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 14.2.3 | Framework React |
| React | 18.3.1 | UI Framework |
| Chart.js | 4.4.1 | Graphiques |
| react-chartjs-2 | 5.2.0 | Intégration Chart.js |
| Google Apps Script | - | Backend Google Sheets |

## 📊 Structure du Questionnaire

### Données Démographiques (Q1-Q5)
- **Q1** : Filière/Département
- **Q2** : Niveau d'études
- **Q3** : Ancienneté
- **Q4** : Niveau hiérarchique
- **Q5** : Tranche d'âge

### Questions d'Échelle (Q6-Q33) - Échelle Likert 1-4
| Dimension | Questions | Description |
|-----------|-----------|-------------|
| Clarté | Q6-Q11 | Objectifs, priorités, instructions, délais |
| Écoute | Q12-Q17 | Attention, feedback, dialogue |
| Transparence | Q18-Q23 | Information, décisions, processus |
| Cohérence | Q24-Q29 | Messages, actions, comportement |
| Accessibilité | Q30-Q33 | Disponibilité, proximité |

### Questions Ouvertes (Q34-Q35)
- **Q34** : Points forts de la communication
- **Q35** : Améliorations proposées

## ⚙️ Configuration

### Variables d'Environnement (.env)

```env
# URL du Google Apps Script (formulaire)
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/...

# URL du Google Sheet (dashboard) - export CSV
CSV_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv

# Mot de passe pour accéder au dashboard
PASSWORD=GESI2026
```

### Configuration Google Sheets

1. **Créer un Google Sheet** avec les en-têtes :
   ```
   Date/Heure, Q1_Filiere, Q2_Niveau_Etudes, Q3_Anciennete, Q4_Niveau_Hierarchique, Q5_Age, Q6-Q35, Q34_Points_Forts, Q35_Ameliorations
   ```

2. **Déployer Google Apps Script** :
   - Extensions > Apps Script
   - Coller le contenu de `google-script.gs`
   - Déployer > Nouveau déploiement > Application web
   - Accès : "Tout le monde" (Anyone)

3. **Publier le Sheet en CSV** :
   - File > Share > Publish to web
   - Format : Comma-separated values (.csv)
   - Copier l'URL générée

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Mode développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

## 🌐 URLs

| Environnement | URL |
|---------------|-----|
| Développement | http://localhost:3000 |
| Production | (à configurer) |

### Pages

| Page | URL | Description |
|------|-----|-------------|
| Formulaire | `/survey` | Questionnaire à 35 questions |
| Dashboard | `/dashboard` | Tableaux et graphiques (mot de passe requis) |

## 🔐 Sécurité

- **Dashboard protégé** par mot de passe : `GESI2026`
- Session stockée dans `sessionStorage`
- Accès Google Apps Script configuré sur "Tout le monde"

## 📈 Fonctionnalités Dashboard

### KPIs
- Nombre total de réponses
- Score moyen global
- Taux de participation

### Graphiques
- **Pie** : Répartition par Filière
- **Bar** : Répartition par Niveau d'études
- **Doughnut** : Répartition par Ancienneté
- **Pie** : Répartition par Niveau hiérarchique
- **Radar** : Scores Clarté de la Communication (Q6-Q11)
- **Line** : Scores moyens par dimension

## 🔧 Dépannage

### Problèmes Courants

1. **"Module not found"** - Exécuter `npm install`
2. **Données non chargées** - Vérifier que le Google Sheet est publié en CSV
3. **Erreur CORS** - Vérifier que le Google Apps Script est déployé avec accès "Tout le monde"

### Vérification

```bash
# Tester la connexion Google Sheet
curl -s -L "VOTRE_CSV_URL"

# Tester le Google Apps Script
curl -s -L "VOTRE_GOOGLE_SCRIPT_URL"
```

## 📝 Auteurs

- [Votre Nom]

## 📄 Licence

MIT License
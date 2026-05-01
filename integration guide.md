// ═══════════════════════════════════════════════════════════════════════════
// GUIDE D'INTÉGRATION — Rapport Word dans le Dashboard GRH
// ═══════════════════════════════════════════════════════════════════════════

// ─── ÉTAPE 1 : Installation ─────────────────────────────────────────────────
//
//   npm install docx file-saver
//
// ─── ÉTAPE 2 : Copier les fichiers ──────────────────────────────────────────
//
//   generateReport.js      →  app/utils/generateReport.js
//   DownloadReportButton.jsx → app/components/DownloadReportButton.jsx
//
// ─── ÉTAPE 3 : Ajouter des IDs sur vos canvas Chart.js ─────────────────────
//
// Dans votre dashboard, chaque graphe Chart.js doit avoir un id unique.
// Exemple avec react-chartjs-2 :
//
//   <Pie id="pieFiliere" data={filièreData} />
//   <Bar id="barNiveau" data={niveauData} />
//   <Doughnut id="doughnutAnciennete" data={ancienneteData} />
//   <Radar id="radarClarte" data={clarteData} />
//   <Line id="lineScores" data={scoresData} />
//
// ─── ÉTAPE 4 : Intégrer dans votre page dashboard ───────────────────────────

// Exemple complet de votre page dashboard/page.jsx :

"use client";
import { useEffect, useState } from "react";
import { Pie, Bar, Doughnut, Radar, Line } from "react-chartjs-2";
import DownloadReportButton from "@/app/components/DownloadReportButton";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  // ... votre logique de chargement des données CSV/Google Sheets ...

  // ─── 1. Définir vos KPIs (ce qui s'affiche dans le tableau en haut du rapport)
  const kpis = [
    { label: "Nb. de Réponses",    value: "142",  sub: "répondants" },
    { label: "Score Moyen Global", value: "3.1",  sub: "/ 4.0" },
    { label: "Taux de Participation", value: "71%", sub: "de l'effectif" },
    { label: "Dimension Critique", value: "Transparence", sub: "score le plus bas" },
  ];

  // ─── 2. Déclarer vos graphes (titre affiché dans le rapport + id du canvas)
  const charts = [
    { title: "Répartition par Filière / Département", canvasId: "pieFiliere" },
    { title: "Répartition par Niveau d'Études",       canvasId: "barNiveau" },
    { title: "Répartition par Ancienneté",             canvasId: "doughnutAnciennete" },
    { title: "Radar — Clarté de la Communication (Q6-Q11)", canvasId: "radarClarte" },
    { title: "Scores Moyens par Dimension",            canvasId: "lineScores" },
  ];

  return (
    <div className="p-6">

      {/* ─── En-tête avec bouton de téléchargement ─── */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard — Communication Managériale
        </h1>
        <DownloadReportButton
          kpis={kpis}
          charts={charts}
          orgName="Votre Organisation"   {/* ← Remplacer par le vrai nom */}
        />
      </div>

      {/* ─── Vos graphes existants (ajouter les id !) ─── */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Répartition par Filière</h2>
          <Pie id="pieFiliere" data={/* votre data */} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Répartition par Niveau</h2>
          <Bar id="barNiveau" data={/* votre data */} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Ancienneté</h2>
          <Doughnut id="doughnutAnciennete" data={/* votre data */} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Radar Clarté</h2>
          <Radar id="radarClarte" data={/* votre data */} />
        </div>

        <div className="col-span-2 bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Scores par Dimension</h2>
          <Line id="lineScores" data={/* votre data */} />
        </div>
      </div>

    </div>
  );
}

// ─── RÉSULTAT FINAL ─────────────────────────────────────────────────────────
//
// Le fichier Word généré contiendra :
//
//  ┌─────────────────────────────────────────┐
//  │          PAGE DE GARDE                  │
//  │  RAPPORT D'ANALYSE                      │
//  │  Communication Managériale              │
//  │  [Nom Organisation] — [Date]            │
//  └─────────────────────────────────────────┘
//  ┌─────────────────────────────────────────┐
//  │  1. KPIs (tableau coloré)               │
//  │  ┌──────┬──────┬──────┬──────┐          │
//  │  │ 142  │ 3.1  │ 71%  │ ...  │          │
//  │  └──────┴──────┴──────┴──────┘          │
//  ├─────────────────────────────────────────┤
//  │  2. Graphiques                          │
//  │  📊 Répartition par Filière             │
//  │  [IMAGE DU PIE CHART]                   │
//  │  ┌─────────────────────────────────┐    │
//  │  │ Interprétation / Discussion :   │    │
//  │  │                                 │    │
//  │  │  (6 lignes vides)               │    │
//  │  │                                 │    │
//  │  └─────────────────────────────────┘    │
//  │                                         │
//  │  📊 Répartition par Niveau...           │
//  │  [IMAGE DU BAR CHART]                   │
//  │  ┌─────────────────────────────────┐    │
//  │  │  (6 lignes vides)               │    │
//  │  └─────────────────────────────────┘    │
//  │  ... (répété pour chaque graphe)        │
//  ├─────────────────────────────────────────┤
//  │  3. Synthèse & Recommandations          │
//  │  ┌─────────────────────────────────┐    │
//  │  │  (8 lignes vides)               │    │
//  │  └─────────────────────────────────┘    │
//  └─────────────────────────────────────────┘
//
// ─── DÉPANNAGE ───────────────────────────────────────────────────────────────
//
// ❌ "Canvas introuvable" → Vérifier que l'id dans charts[] = l'id sur <Pie id="...">
// ❌ "saveAs is not defined" → npm install file-saver
// ❌ Image vide dans le Word → Le canvas doit être visible dans le DOM au moment du clic
// ❌ Erreur CORS sur les images → Les graphes Chart.js sont des canvas locaux → pas de problème CORS
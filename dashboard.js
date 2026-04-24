/**
 * dashboard.js - Tableau de bord des réponses
 * Gère l'authentification, la récupération des données CSV
 * et l'affichage des graphiques avec Chart.js
 */

// =====================================================
// CONFIGURATION - À modifier avec votre URL Google Sheet
// =====================================================
// URL publique du Google Sheet exporté en CSV
// Format : https://docs.google.com/spreadsheets/d/VOTRE_ID_SHEET/export?format=csv
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDwdCHON3Z5Edx2JB4J7mcB4TZZnBo_HppBini88L4qVVKAjlutMIGCYf-SPlgBXjxk1RJGbg6KLoX/pub?output=csv';

// Mot de passe pour accéder au dashboard
const PASSWORD = 'GESI2026';

// =====================================================
// Éléments du DOM
// =====================================================
const loginContainer = document.getElementById('loginContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('passwordInput');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const loadingState = document.getElementById('loadingState');
const chartsGrid = document.getElementById('chartsGrid');

// Éléments KPI
const totalResponsesEl = document.getElementById('totalResponses');
const averageScoreEl = document.getElementById('averageScore');
const participationRateEl = document.getElementById('participationRate');

// =====================================================
// Variables globales pour les graphiques
// =====================================================
let charts = {}; // Stocke les instances de graphiques pour pouvoir les détruire

// =====================================================
// GESTION DE L'AUTHENTIFICATION
// =====================================================

/**
 * Vérifie si l'utilisateur est déjà connecté (sessionStorage)
 */
function checkAuth() {
  const isAuthenticated = sessionStorage.getItem('dashboardAuth');
  if (isAuthenticated === 'true') {
    showDashboard();
  }
}

/**
 * Gère la soumission du formulaire de login
 */
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const password = passwordInput.value;

  if (password === PASSWORD) {
    // Mot de passe correct
    sessionStorage.setItem('dashboardAuth', 'true');
    loginError.style.display = 'none';
    passwordInput.value = '';
    showDashboard();
  } else {
    // Mot de passe incorrect
    loginError.style.display = 'block';
    passwordInput.value = '';
    passwordInput.focus();
  }
});

/**
 * Gère la déconnexion
 */
logoutBtn.addEventListener('click', function() {
  sessionStorage.removeItem('dashboardAuth');

  // Détruit les graphiques existants
  destroyAllCharts();

  // Affiche l'écran de login, cache le dashboard
  loginContainer.style.display = 'flex';
  dashboardContainer.style.display = 'none';
});

/**
 * Affiche le dashboard et charge les données
 */
function showDashboard() {
  loginContainer.style.display = 'none';
  dashboardContainer.style.display = 'block';

  // Charge les données depuis Google Sheets
  loadDashboardData();
}

// =====================================================
// CHARGEMENT ET PARSING DES DONNÉES
// =====================================================

/**
 * Charge les données CSV et initialise le dashboard
 */
async function loadDashboardData() {
  try {
    const response = await fetch(CSV_URL);

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données');
    }

    const csvText = await response.text();
    const data = parseCSV(csvText);

    // Met à jour les KPI
    updateKPIs(data);

    // Crée les graphiques
    createAllCharts(data);

    // Affiche la grille des graphiques
    loadingState.style.display = 'none';
    chartsGrid.style.display = 'grid';

  } catch (error) {
    console.error('Erreur:', error);
    loadingState.innerHTML = `
      <p style="color: var(--rust);">
        Erreur lors du chargement des données.<br>
        Vérifiez que l'URL CSV est correcte et que le Google Sheet est public.
      </p>
    `;
  }
}

/**
 * Parse manuellement un fichier CSV
 * @param {string} csvText - Contenu brut du CSV
 * @returns {Array} Tableau d'objets représentant les lignes
 */
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  const headers = parseCSVLine(lines[0]);

  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length < headers.length) continue;

    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] || '';
    }

    data.push(row);
  }

  return data;
}

/**
 * Parse une ligne CSV en gérant les guillemets et virgules
 * @param {string} line - Ligne CSV à parser
 * @returns {Array} Tableau des valeurs
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

// =====================================================
// MISE À JOUR DES KPI
// =====================================================

/**
 * Calcule et affiche les indicateurs clés
 * @param {Array} data - Données parsées
 */
function updateKPIs(data) {
  // Nombre total de réponses (exclut la ligne d'en-têtes)
  const total = data.length;
  totalResponsesEl.textContent = total;

  // Calcule le score moyen global (q6-q33, échelle 1-4)
  let scoreSum = 0;
  let scoreCount = 0;

  for (let i = 6; i <= 33; i++) {
    const key = 'q' + i;
    for (const row of data) {
      const value = parseFloat(row[key]);
      if (!isNaN(value) && value >= 1 && value <= 4) {
        scoreSum += value;
        scoreCount++;
      }
    }
  }

  const average = scoreCount > 0 ? (scoreSum / scoreCount).toFixed(2) : 'N/A';
  averageScoreEl.textContent = average;

  // Taux de participation (simulé - à adapter selon votre contexte)
  // Ici on affiche juste le nombre de réponses complètes
  const completeResponses = data.filter(row => row['q1'] && row['q35']).length;
  participationRateEl.textContent = completeResponses;
}

// =====================================================
// CRÉATION DES GRAPHIQUES
// =====================================================

/**
 * Détruit tous les graphiques existants
 */
function destroyAllCharts() {
  Object.values(charts).forEach(chart => {
    if (chart) chart.destroy();
  });
  charts = {};
}

/**
 * Crée tous les graphiques du dashboard
 * @param {Array} data - Données parsées
 */
function createAllCharts(data) {
  destroyAllCharts();

  createFilieresChart(data);
  createNiveauEtudesChart(data);
  createAncienneteChart(data);
  createHierarchiqueChart(data);
  createClarteChart(data);
  createDimensionsChart(data);
}

/**
 * Graphique 1 : Répartition des filières (Pie Chart)
 */
function createFilieresChart(data) {
  const filieres = {};

  data.forEach(row => {
    const filiere = row['q1'] || 'Non spécifié';
    filieres[filiere] = (filieres[filiere] || 0) + 1;
  });

  const ctx = document.getElementById('filiereChart').getContext('2d');

  charts.filieres = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(filieres),
      datasets: [{
        data: Object.values(filieres),
        backgroundColor: [
          '#c9a84c', // gold
          '#4a6741', // sage
          '#8b3a3a', // rust
          '#1a1a2e', // ink
          '#d4a574', // tan
          '#6b8e7a', // muted sage
          '#a8704c', // muted rust
          '#7a8b9e'  // muted blue
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            }
          }
        }
      }
    }
  });
}

/**
 * Graphique 2 : Niveau d'études (Bar Chart)
 */
function createNiveauEtudesChart(data) {
  const niveaux = {};
  const order = ['Bac', 'Bac+2', 'Bac+3', 'Bac+5', 'Bac+8'];

  data.forEach(row => {
    const niveau = row['q2'] || 'Non spécifié';
    niveaux[niveau] = (niveaux[niveau] || 0) + 1;
  });

  // Trie selon l'ordre défini
  const sortedLabels = order.filter(n => niveaux[n]).concat(
    Object.keys(niveaux).filter(n => !order.includes(n))
  );

  const ctx = document.getElementById('niveauEtudesChart').getContext('2d');

  charts.niveauEtudes = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedLabels,
      datasets: [{
        label: 'Nombre de répondants',
        data: sortedLabels.map(n => niveaux[n] || 0),
        backgroundColor: '#c9a84c',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              family: "'DM Sans', sans-serif"
            }
          }
        },
        x: {
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 10
            }
          }
        }
      }
    }
  });
}

/**
 * Graphique 3 : Ancienneté (Doughnut Chart)
 */
function createAncienneteChart(data) {
  const anciennetes = {};

  data.forEach(row => {
    const anciennete = row['q3'] || 'Non spécifié';
    anciennetes[anciennete] = (anciennetes[anciennete] || 0) + 1;
  });

  const ctx = document.getElementById('ancienneteChart').getContext('2d');

  charts.anciennete = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(anciennetes),
      datasets: [{
        data: Object.values(anciennetes),
        backgroundColor: [
          '#c9a84c',
          '#4a6741',
          '#8b3a3a',
          '#1a1a2e',
          '#d4a574'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            }
          }
        }
      }
    }
  });
}

/**
 * Graphique 4 : Niveau hiérarchique (Pie Chart)
 */
function createHierarchiqueChart(data) {
  const hierarchiques = {};

  data.forEach(row => {
    const niveau = row['q4'] || 'Non spécifié';
    hierarchiques[niveau] = (hierarchiques[niveau] || 0) + 1;
  });

  const ctx = document.getElementById('hierarchiqueChart').getContext('2d');

  charts.hierarchique = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(hierarchiques),
      datasets: [{
        data: Object.values(hierarchiques),
        backgroundColor: [
          '#4a6741',
          '#c9a84c',
          '#8b3a3a',
          '#1a1a2e',
          '#d4a574'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              family: "'DM Sans', sans-serif",
              size: 10
            }
          }
        }
      }
    }
  });
}

/**
 * Graphique 5 : Clarté de la communication (Radar Chart)
 * Moyenne des scores pour Q6 à Q11
 */
function createClarteChart(data) {
  const questions = {
    'q6': 'Objectifs clairs',
    'q7': 'Priorités comprises',
    'q8': 'Instructions précises',
    'q9': 'Délais communiqués',
    'q10': 'Contribution comprise',
    'q11': 'Changements expliqués'
  };

  const averages = {};

  Object.keys(questions).forEach(qKey => {
    let sum = 0;
    let count = 0;

    data.forEach(row => {
      const value = parseFloat(row[qKey]);
      if (!isNaN(value) && value >= 1 && value <= 4) {
        sum += value;
        count++;
      }
    });

    averages[qKey] = count > 0 ? (sum / count).toFixed(2) : 0;
  });

  const ctx = document.getElementById('clarteChart').getContext('2d');

  charts.clarte = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: Object.values(questions),
      datasets: [{
        label: 'Score moyen (1-4)',
        data: Object.values(averages),
        backgroundColor: 'rgba(201, 168, 76, 0.2)',
        borderColor: '#c9a84c',
        pointBackgroundColor: '#c9a84c',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 4,
          ticks: {
            stepSize: 1,
            font: {
              family: "'DM Sans', sans-serif",
              size: 10
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

/**
 * Graphique 6 : Scores moyens par dimension (Line Chart)
 * Compare les moyennes des 5 sections Likert
 */
function createDimensionsChart(data) {
  const dimensions = {
    'Clarté': { start: 6, end: 11 },
    'Fréquence': { start: 12, end: 16 },
    'Écoute': { start: 17, end: 21 },
    'Canaux': { start: 22, end: 27 },
    'Impact': { start: 28, end: 33 }
  };

  const averages = {};

  Object.keys(dimensions).forEach(dim => {
    let sum = 0;
    let count = 0;

    for (let i = dimensions[dim].start; i <= dimensions[dim].end; i++) {
      const qKey = 'q' + i;
      data.forEach(row => {
        const value = parseFloat(row[qKey]);
        if (!isNaN(value) && value >= 1 && value <= 4) {
          sum += value;
          count++;
        }
      });
    }

    averages[dim] = count > 0 ? (sum / count).toFixed(2) : 0;
  });

  const ctx = document.getElementById('dimensionsChart').getContext('2d');

  charts.dimensions = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(dimensions),
      datasets: [{
        label: 'Score moyen',
        data: Object.values(averages),
        backgroundColor: 'rgba(74, 103, 65, 0.2)',
        borderColor: '#4a6741',
        borderWidth: 3,
        pointBackgroundColor: '#4a6741',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            stepSize: 0.5,
            font: {
              family: "'DM Sans', sans-serif"
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            }
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Score: ' + context.parsed.y + ' / 4';
            }
          }
        }
      }
    }
  });
}

// =====================================================
// INITIALISATION
// =====================================================

// Vérifie l'authentification au chargement de la page
checkAuth();

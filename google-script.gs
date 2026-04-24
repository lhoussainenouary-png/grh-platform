/**
 * google-script.gs - Google Apps Script
 * Ce code doit être déployé dans un Google Apps Script lié à un Google Sheet
 *
 * Instructions d'installation :
 * 1. Créez un nouveau Google Sheet
 * 2. Allez dans Extensions > Apps Script
 * 3. Copiez-collez ce code
 * 4. Déployez en tant que application web (Déployer > Nouveau déploiement > Application web)
 * 5. Configurez l'accès : "Tout le monde" (Anyone)
 * 6. Copiez l'URL de déploiement et collez-la dans form.js (GOOGLE_SCRIPT_URL)
 */

/**
 * Gère les requêtes POST depuis le formulaire HTML
 * @param {Object} e - Événement contenant les paramètres du formulaire
 * @returns {Object} Réponse JSON avec statut et message
 */
function doPost(e) {
  // Récupère la feuille de calcul active
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Vérifie si la première ligne contient les en-têtes, sinon les ajoute
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Date/Heure',
      'Q1_Filiere',
      'Q2_Niveau_Etudes',
      'Q3_Anciennete',
      'Q4_Niveau_Hierarchique',
      'Q5_Age',
      'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11',
      'Q12', 'Q13', 'Q14', 'Q15', 'Q16',
      'Q17', 'Q18', 'Q19', 'Q20', 'Q21',
      'Q22', 'Q23', 'Q24', 'Q25', 'Q26', 'Q27',
      'Q28', 'Q29', 'Q30', 'Q31', 'Q32', 'Q33',
      'Q34_Points_Forts',
      'Q35_Ameliorations'
    ];
    sheet.appendRow(headers);
  }

  // Récupère la date et heure actuelles
  var timestamp = new Date();

  // Construit la ligne de données
  var rowData = [
    timestamp,
    e.parameter.q1 || '',
    e.parameter.q2 || '',
    e.parameter.q3 || '',
    e.parameter.q4 || '',
    e.parameter.q5 || '',
    e.parameter.q6 || '',
    e.parameter.q7 || '',
    e.parameter.q8 || '',
    e.parameter.q9 || '',
    e.parameter.q10 || '',
    e.parameter.q11 || '',
    e.parameter.q12 || '',
    e.parameter.q13 || '',
    e.parameter.q14 || '',
    e.parameter.q15 || '',
    e.parameter.q16 || '',
    e.parameter.q17 || '',
    e.parameter.q18 || '',
    e.parameter.q19 || '',
    e.parameter.q20 || '',
    e.parameter.q21 || '',
    e.parameter.q22 || '',
    e.parameter.q23 || '',
    e.parameter.q24 || '',
    e.parameter.q25 || '',
    e.parameter.q26 || '',
    e.parameter.q27 || '',
    e.parameter.q28 || '',
    e.parameter.q29 || '',
    e.parameter.q30 || '',
    e.parameter.q31 || '',
    e.parameter.q32 || '',
    e.parameter.q33 || '',
    e.parameter.q34 || '',
    e.parameter.q35 || ''
  ];

  // Ajoute la ligne à la feuille
  sheet.appendRow(rowData);

  // Prépare la réponse JSON
  var response = {
    status: 'success',
    message: 'Données enregistrées avec succès'
  };

  // Retourne la réponse avec les en-têtes CORS appropriés
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fonction utilitaire pour récupérer les données sous forme CSV
 * Utile pour le dashboard
 * @returns {Object} Contenu CSV
 */
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  // Convertit les données en CSV
  var csv = data.map(function(row) {
    return row.map(function(cell) {
      // Échappe les virgules et guillemets dans les cellules
      var cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        cellStr = '"' + cellStr.replace(/"/g, '""') + '"';
      }
      return cellStr;
    }).join(',');
  }).join('\n');

  return ContentService
    .createTextOutput(csv)
    .setMimeType(ContentService.MimeType.CSV);
}

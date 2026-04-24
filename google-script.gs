/**
 * google-script.gs — Google Apps Script (v2 questionnaire, Q1–Q27)
 * Les en-têtes de colonnes reprennent le libellé des questions (lisible dans la feuille).
 * Garder cette liste alignée avec lib/surveySheetHeaders.js (copier-coller si vous modifiez les questions).
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    var headers = [
      'Date/Heure',
      'Sélectionnez votre département :',
      'Quel est votre niveau de formation le plus élevé ?',
      'Depuis combien de temps travaillez-vous dans cette organisation ?',
      'Quel est votre niveau dans l\'organisation ?',
      'Quelle est votre tranche d\'âge ?',
      'Mon manager formule des objectifs de travail clairs et compréhensibles.',
      'Les instructions transmises par mon manager sont précises et sans ambiguïté.',
      'Mon manager communique les priorités et les délais de manière explicite.',
      'En cas d\'incompréhension, mon manager reformule et clarifie sans difficulté.',
      'Mon manager écoute attentivement lorsque je lui fais part d\'un problème.',
      'Mon manager prend en compte mes suggestions dans ses décisions.',
      'Mon manager encourage le dialogue et les échanges ouverts au sein de l\'équipe.',
      'Mon manager me donne un feedback constructif sur mon travail régulièrement.',
      'Mon manager partage les informations importantes concernant l\'organisation en temps utile.',
      'Mon manager explique les raisons derrière les décisions prises.',
      'Mon manager communique ouvertement sur les difficultés et les enjeux de l\'équipe.',
      'Mon manager informe l\'équipe des changements organisationnels avant leur mise en œuvre.',
      'Le comportement de mon manager est cohérent avec ses paroles.',
      'Mon manager applique les mêmes règles pour tous les membres de l\'équipe.',
      'Les engagements pris par mon manager sont respectés.',
      'La communication de mon manager ne change pas selon les interlocuteurs de manière injustifiée.',
      'Mon manager est facilement joignable lorsque j\'en ai besoin.',
      'Mon manager crée un environnement dans lequel je me sens à l\'aise pour m\'exprimer.',
      'Mon manager prend le temps nécessaire pour discuter avec moi des sujets importants.',
      'Je n\'hésite pas à contacter mon manager en cas de problème professionnel.',
      'Selon vous, quels sont les points forts de la communication managériale au sein de votre organisation ?',
      'Quelles améliorations concrètes suggérez-vous pour améliorer la communication de votre manager ?'
    ];
    sheet.appendRow(headers);
  }

  var timestamp = new Date();

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
    e.parameter.q27 || ''
  ];

  sheet.appendRow(rowData);

  var response = {
    status: 'success',
    message: 'Données enregistrées avec succès'
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var csv = data.map(function(row) {
    return row.map(function(cell) {
      var cellStr = String(cell);
      if (cellStr.indexOf(',') !== -1 || cellStr.indexOf('"') !== -1 || cellStr.indexOf('\n') !== -1) {
        cellStr = '"' + cellStr.replace(/"/g, '""') + '"';
      }
      return cellStr;
    }).join(',');
  }).join('\n');

  return ContentService
    .createTextOutput(csv)
    .setMimeType(ContentService.MimeType.CSV);
}

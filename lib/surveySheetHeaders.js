/**
 * En-têtes de colonnes Google Sheet = libellés des questions (lisibles dans le tableur).
 * À garder aligné avec app/survey/page.js et google-script.gs (ligne headers de doPost).
 */

export const SHEET_TIMESTAMP_HEADER = 'Date/Heure'

/** Ordre des colonnes de données : Q1 … Q27 (sans la colonne date). */
export const QUESTION_HEADERS_IN_ORDER = [
  'Sélectionnez votre département :',
  'Quel est votre niveau de formation le plus élevé ?',
  'Depuis combien de temps travaillez-vous dans cette organisation ?',
  "Quel est votre niveau dans l'organisation ?",
  "Quelle est votre tranche d'âge ?",
  'Mon manager formule des objectifs de travail clairs et compréhensibles.',
  'Les instructions transmises par mon manager sont précises et sans ambiguïté.',
  'Mon manager communique les priorités et les délais de manière explicite.',
  "En cas d'incompréhension, mon manager reformule et clarifie sans difficulté.",
  "Mon manager écoute attentivement lorsque je lui fais part d'un problème.",
  'Mon manager prend en compte mes suggestions dans ses décisions.',
  "Mon manager encourage le dialogue et les échanges ouverts au sein de l'équipe.",
  'Mon manager me donne un feedback constructif sur mon travail régulièrement.',
  "Mon manager partage les informations importantes concernant l'organisation en temps utile.",
  'Mon manager explique les raisons derrière les décisions prises.',
  "Mon manager communique ouvertement sur les difficultés et les enjeux de l'équipe.",
  "Mon manager informe l'équipe des changements organisationnels avant leur mise en œuvre.",
  'Le comportement de mon manager est cohérent avec ses paroles.',
  "Mon manager applique les mêmes règles pour tous les membres de l'équipe.",
  'Les engagements pris par mon manager sont respectés.',
  'La communication de mon manager ne change pas selon les interlocuteurs de manière injustifiée.',
  "Mon manager est facilement joignable lorsque j'en ai besoin.",
  "Mon manager crée un environnement dans lequel je me sens à l'aise pour m'exprimer.",
  'Mon manager prend le temps nécessaire pour discuter avec moi des sujets importants.',
  "Je n'hésite pas à contacter mon manager en cas de problème professionnel.",
  'Selon vous, quels sont les points forts de la communication managériale au sein de votre organisation ?',
  'Quelles améliorations concrètes suggérez-vous pour améliorer la communication de votre manager ?'
]

/** Libellés courts pour les axes des graphiques (Q6–Q25). */
export const LIKERT_CHART_LABELS = Array.from({ length: 20 }, (_, i) => `Q${i + 6}`)

export const DEMO_HEADERS = QUESTION_HEADERS_IN_ORDER.slice(0, 5)

export const LIKERT_KEYS = QUESTION_HEADERS_IN_ORDER.slice(5, 25)

export const HEADER_Q26_POINTS_FORTS = QUESTION_HEADERS_IN_ORDER[25]
export const HEADER_Q27_AMELIORATIONS = QUESTION_HEADERS_IN_ORDER[26]

/** Première ligne complète du tableur (Date + 27 questions). */
export const SHEET_HEADERS_ROW = [SHEET_TIMESTAMP_HEADER, ...QUESTION_HEADERS_IN_ORDER]

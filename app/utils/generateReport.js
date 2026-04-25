// Génère un fichier .docx avec les graphes du dashboard + cases d'interprétation
// Dépendances : npm install docx file-saver

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, HeadingLevel, AlignmentType, BorderStyle, WidthType,
  ShadingType, PageBreak, Header, Footer, PageNumber
} from 'docx'
import { saveAs } from 'file-saver'

// ─── Helpers ────────────────────────────────────────────────────────────────

const BORDER = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER }
const BLUE = '2563EB'
const LIGHT_BLUE = 'EFF6FF'
const GRAY_BG = 'F8FAFC'

// DocX / A4 page width in EMU — légèrement au-delà des marges pour graphs full-width
// page=11906 DXA, margins=1200 DXA → content=9506 DXA → 86534400 EMU (≈ 7.2 in)
const CONTENT_EMU_W = 8653440 * 10 // 86534400 EMU (dépasse les marges de 120 DXA de chaque côté)

/**
 * Convertit un canvas Chart.js en ArrayBuffer PNG à ses dimensions affichées × 1.2.
 * On crée un canvas mémoire agrandi pour que les graphs soient plus lisibles dans Word.
 * @param {HTMLCanvasElement} canvas
 * @returns {Promise<{buffer: ArrayBuffer, naturalWidth: number, naturalHeight: number}>}
 */
async function canvasToBuffer(canvas) {
  const displayed = canvas.getBoundingClientRect()
  const scaleFactor = 1.2
  const displayedW = Math.round(displayed.width * scaleFactor)
  const displayedH = Math.round(displayed.height * scaleFactor)

  // Canvas mémoire à taille agrandie × 1.2 (graphs plus grands et lisibles dans Word)
  const offscreen = document.createElement('canvas')
  offscreen.width = displayedW
  offscreen.height = displayedH
  offscreen.getContext('2d').drawImage(canvas, 0, 0, displayedW, displayedH)

  const imgBuffer = await new Promise((resolve, reject) => {
    offscreen.toBlob((blob) => {
      if (!blob) return reject(new Error('Canvas toBlob failed'))
      blob.arrayBuffer().then(resolve).catch(reject)
    }, 'image/png', 1.0)
  })

  return { buffer: imgBuffer, naturalWidth: offscreen.width, naturalHeight: offscreen.height }
}

/**
 * Crée un paragraphe de titre de section avec ligne de séparation
 */
function sectionTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } },
    children: [
      new TextRun({ text, bold: true, size: 28, color: BLUE, font: 'Arial' }),
    ],
  })
}

/**
 * Crée un bloc graphique : titre + image full-width + case d'interprétation (6 lignes vides)
 * L'image remplit toute la largeur (respecte le ratio du canvas).
 */
async function chartBlock(title, canvas) {
  const { buffer: imgBuffer, naturalWidth, naturalHeight } = await canvasToBuffer(canvas)

  // Scale pour que la largeur = CONTENT_EMU_W, la hauteur suit le ratio (pas de déformation)
  const scaledWidth = CONTENT_EMU_W
  const scaledHeight = Math.round((naturalHeight / naturalWidth) * CONTENT_EMU_W)

  const interpretationLines = Array.from({ length: 6 }, (_, i) =>
    new Paragraph({
      spacing: { before: 0, after: 0, line: 360 },
      children: [
        new TextRun({
          text: i === 0 ? 'Interprétation / Discussion : ' : '',
          bold: i === 0,
          size: 20,
          color: '64748B',
          font: 'Arial',
          italics: i === 0,
        }),
      ],
    })
  )

  return [
    // Titre du graphe
    new Paragraph({
      spacing: { before: 360, after: 160 },
      children: [
        new TextRun({ text: `📊  ${title}`, bold: true, size: 24, font: 'Arial', color: '1E293B' }),
      ],
    }),

    // Image full-width (pas de marge supplémentaire → remplit la largeur de contenu)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
      children: [
        new ImageRun({
          data: imgBuffer,
          transformation: { width: scaledWidth / 914400, height: scaledHeight / 914400 },
          type: 'png',
        }),
      ],
    }),

    // Case d'interprétation (bordure grise)
    new Table({
      width: { size: 9026, type: WidthType.DXA },
      columnWidths: [9026],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: BORDERS,
              shading: { fill: GRAY_BG, type: ShadingType.CLEAR },
              margins: { top: 160, bottom: 160, left: 200, right: 200 },
              width: { size: 9026, type: WidthType.DXA },
              children: interpretationLines,
            }),
          ],
        }),
      ],
    }),

    // Espace après le bloc
    new Paragraph({ spacing: { before: 300 }, children: [] }),
  ]
}

/**
 * Crée le tableau des KPIs en haut du rapport
 */
function kpiTable(kpis) {
  const cols = kpis.length
  const colWidth = Math.floor(9026 / cols)

  const headerCells = kpis.map((kpi) =>
    new TableCell({
      borders: BORDERS,
      shading: { fill: BLUE, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 160, right: 160 },
      width: { size: colWidth, type: WidthType.DXA },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: kpi.label, bold: true, size: 20, color: 'FFFFFF', font: 'Arial' })],
        }),
      ],
    })
  )

  const valueCells = kpis.map((kpi) =>
    new TableCell({
      borders: BORDERS,
      shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 160, left: 160, right: 160 },
      width: { size: colWidth, type: WidthType.DXA },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: kpi.value, bold: true, size: 36, color: BLUE, font: 'Arial' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: kpi.sub || '', size: 18, color: '64748B', font: 'Arial' })],
        }),
      ],
    })
  )

  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: kpis.map(() => colWidth),
    rows: [
      new TableRow({ children: headerCells }),
      new TableRow({ children: valueCells }),
    ],
  })
}

// ─── Fonction principale exportée ───────────────────────────────────────────

/**
 * Génère et télécharge le rapport Word
 *
 * @param {Object} params
 * @param {Object[]} params.kpis         - [{ label, value, sub }]
 * @param {Object[]} params.charts       - [{ title, canvasId }]
 * @param {string}   params.orgName      - Nom de l'organisation
 * @param {string}   params.reportDate   - Date du rapport
 */
export async function generateDashboardReport({ kpis, charts, orgName, reportDate }) {
  // 1 — Capturer tous les canvas Chart.js
  const chartBlocks = []
  for (const chart of charts) {
    const canvas = document.getElementById(chart.canvasId)
    if (!canvas) {
      console.warn(`Canvas introuvable : ${chart.canvasId}`)
      continue
    }
    const blocks = await chartBlock(chart.title, canvas)
    chartBlocks.push(...blocks)
  }

  // 2 — Page de garde
  const coverPage = [
    new Paragraph({ spacing: { before: 1800 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "RAPPORT D'ANALYSE", bold: true, size: 48, color: BLUE, font: 'Arial' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
      children: [
        new TextRun({ text: 'Communication Managériale', size: 36, color: '475569', font: 'Arial' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } },
      children: [],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
      children: [
        new TextRun({ text: orgName || 'Organisation', size: 28, bold: true, font: 'Arial', color: '1E293B' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160 },
      children: [
        new TextRun({ text: `Date du rapport : ${reportDate || new Date().toLocaleDateString('fr-MA')}`, size: 22, color: '64748B', font: 'Arial' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 80 },
      children: [
        new TextRun({ text: 'Généré par la plateforme GRH —', size: 18, color: '94A3B8', font: 'Arial', italics: true }),
        new TextRun({ text: '\nCe projet est réalisé par :', size: 16, color: '94A3B8', font: 'Arial', italics: true }),
        new TextRun({ text: '\nNOUARY Lhoussaine · EL BOUKHLIKI Mouhsine · ES-Sofi Meryam · AL HOUZ Faiza', size: 16, color: '64748B', font: 'Arial' }),
        new TextRun({ text: '\nEncadré par :', size: 16, color: '94A3B8', font: 'Arial', italics: true }),
        new TextRun({ text: '\nPr. L. ALLA', size: 16, color: '64748B', font: 'Arial', bold: true }),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ]

  // 3 — Section KPIs
  const kpiSection = [
    sectionTitle('1. Indicateurs Clés de Performance (KPIs)'),
    new Paragraph({ spacing: { before: 200, after: 300 }, children: [] }),
    kpiTable(kpis),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
  ]

  // 4 — Section graphiques
  const chartsSection = [
    sectionTitle('2. Visualisations & Analyse par Dimension'),
    new Paragraph({ spacing: { before: 200 }, children: [] }),
    ...chartBlocks,
  ]

  // 5 — Section synthèse finale
  const syntheseLines = Array.from({ length: 8 }, (_, i) =>
    new Paragraph({
      spacing: { before: 0, after: 0, line: 360 },
      children: [
        new TextRun({
          text: i === 0 ? 'Synthèse globale et recommandations : ' : '',
          bold: i === 0, italics: i === 0, size: 20, color: '64748B', font: 'Arial',
        }),
      ],
    })
  )

  const syntheseSection = [
    sectionTitle('3. Synthèse & Recommandations'),
    new Paragraph({ spacing: { before: 200, after: 0 }, children: [] }),
    new Table({
      width: { size: 9026, type: WidthType.DXA },
      columnWidths: [9026],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: BORDERS,
              shading: { fill: GRAY_BG, type: ShadingType.CLEAR },
              margins: { top: 200, bottom: 200, left: 240, right: 240 },
              width: { size: 9026, type: WidthType.DXA },
              children: syntheseLines,
            }),
          ],
        }),
      ],
    }),
  ]

  // 6 — Assemblage du document
  const doc = new Document({
    styles: {
      default: { document: { run: { font: 'Arial', size: 22 } } },
      paragraphStyles: [
        {
          id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 28, bold: true, font: 'Arial', color: BLUE },
          paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 1 },
        },
      ],
    },
    sections: [
      // Page de garde (sans en-tête/pied)
      {
        properties: {
          page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
        },
        children: coverPage,
      },
      // Corps du rapport (avec en-tête et pied de page)
      {
        properties: {
          page: { size: { width: 11906, height: 16838 }, margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 } },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE, space: 1 } },
                children: [
                  new TextRun({ text: `Rapport — ${orgName || 'Organisation'} — Communication Managériale`, size: 18, color: '94A3B8', font: 'Arial' }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0', space: 1 } },
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Page ', size: 18, color: '94A3B8', font: 'Arial' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: BLUE, font: 'Arial' }),
                ],
              }),
            ],
          }),
        },
        children: [
          ...kpiSection,
          ...chartsSection,
          ...syntheseSection,
        ],
      },
    ],
  })

  // 7 — Téléchargement
  const buffer = await Packer.toBlob(doc)
  const fileName = `Rapport_GRH_${(orgName || 'Organisation').replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.docx`
  saveAs(buffer, fileName)
}
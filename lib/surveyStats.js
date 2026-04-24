/** @typedef {Record<string, string>} SurveyRow */

import { QUESTION_HEADERS_IN_ORDER } from './surveySheetHeaders'

export { DEMO_HEADERS, LIKERT_KEYS } from './surveySheetHeaders'

const L = QUESTION_HEADERS_IN_ORDER

/** Clés = libellés complets des questions (colonnes Sheet). */
export const DIMENSIONS = {
  clarte: L.slice(5, 9),
  ecoute: L.slice(9, 13),
  transparence: L.slice(13, 17),
  coherence: L.slice(17, 21),
  accessibilite: L.slice(21, 25)
}

/** Mayfield-style weights (plan) */
export const IQC_WEIGHTS = {
  clarte: 0.28,
  ecoute: 0.26,
  transparence: 0.22,
  coherence: 0.14,
  accessibilite: 0.1
}

export const DIMENSION_ORDER = ['clarte', 'ecoute', 'transparence', 'coherence', 'accessibilite']

export function parseLikert(row, key) {
  const v = parseInt(row[key], 10)
  if (Number.isNaN(v) || v < 1 || v > 4) return null
  return v
}

export function rowDimensionMeans(row) {
  /** @type {Record<string, number|null>} */
  const out = {}
  for (const dim of DIMENSION_ORDER) {
    const keys = DIMENSIONS[dim]
    const vals = keys.map((k) => parseLikert(row, k)).filter((x) => x != null)
    if (vals.length === keys.length) {
      out[dim] = vals.reduce((a, b) => a + b, 0) / keys.length
    } else {
      out[dim] = null
    }
  }
  return out
}

export function rowIQC(row) {
  const means = rowDimensionMeans(row)
  let sum = 0
  let w = 0
  for (const dim of DIMENSION_ORDER) {
    const m = means[dim]
    if (m == null) return null
    const weight = IQC_WEIGHTS[dim]
    sum += m * weight
    w += weight
  }
  return w > 0 ? sum / w : null
}

function sampleVariance(values) {
  const n = values.length
  if (n < 2) return 0
  const mean = values.reduce((a, b) => a + b, 0) / n
  return values.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1)
}

/**
 * Cronbach's alpha for one dimension (4 items), given rows with numeric 1–4 per key.
 * @param {SurveyRow[]} rows
 * @param {string[]} keys
 * @returns {number|null}
 */
export function cronbachAlpha(rows, keys) {
  const k = keys.length
  if (k < 2) return null

  const matrix = []
  for (const row of rows) {
    const vals = keys.map((key) => parseLikert(row, key))
    if (vals.every((v) => v != null)) {
      matrix.push(vals)
    }
  }

  const n = matrix.length
  if (n < 3) return null

  const itemVariances = keys.map((_, j) => {
    const col = matrix.map((row) => row[j])
    return sampleVariance(col)
  })
  const sumItemVar = itemVariances.reduce((a, b) => a + b, 0)

  const totals = matrix.map((row) => row.reduce((a, b) => a + b, 0))
  const varTotal = sampleVariance(totals)
  if (varTotal === 0) return null

  return (k / (k - 1)) * (1 - sumItemVar / varTotal)
}

export function cronbachPerDimension(rows) {
  /** @type {Record<string, number|null>} */
  const out = {}
  for (const dim of DIMENSION_ORDER) {
    out[dim] = cronbachAlpha(rows, DIMENSIONS[dim])
  }
  return out
}

export function meanLikertGlobal(rows) {
  let sum = 0
  let count = 0
  for (const row of rows) {
    for (const key of LIKERT_KEYS) {
      const v = parseLikert(row, key)
      if (v != null) {
        sum += v
        count++
      }
    }
  }
  return count > 0 ? sum / count : null
}

export function meanIQC(rows) {
  const vals = rows.map(rowIQC).filter((x) => x != null)
  if (!vals.length) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

export function dimensionSampleMeans(rows) {
  /** @type {Record<string, number|null>} */
  const agg = {}
  for (const dim of DIMENSION_ORDER) {
    const keys = DIMENSIONS[dim]
    let sum = 0
    let n = 0
    for (const row of rows) {
      const vals = keys.map((k) => parseLikert(row, k)).filter((x) => x != null)
      if (vals.length === keys.length) {
        sum += vals.reduce((a, b) => a + b, 0) / keys.length
        n++
      }
    }
    agg[dim] = n > 0 ? sum / n : null
  }
  return agg
}

export function kaiserLevel(n) {
  if (n >= 200) return { id: 'high', label: 'Données fiables', detail: 'n ≥ 200 (règle indicative 10 répondants par item pour analyses factorielles poussées).' }
  if (n >= 30) return { id: 'medium', label: 'Tendances indicatives', detail: '30 ≤ n < 200 : utile pour le pilotage interne, prudence pour généralisations statistiques.' }
  return { id: 'low', label: 'Données insuffisantes', detail: 'n < 30 : interpréter avec prudence, viser un élargissement de l’échantillon.' }
}

/**
 * Count values per category; merge keys with count <= threshold into maskedLabel.
 * @param {SurveyRow[]} rows
 * @param {string} header
 * @param {number} [threshold=5]
 */
export function countsWithAnonymity(rows, header, threshold = 5) {
  const raw = {}
  for (const row of rows) {
    const v = (row[header] || '').trim()
    if (!v) continue
    raw[v] = (raw[v] || 0) + 1
  }
  const masked = {}
  let maskedCount = 0
  for (const [label, c] of Object.entries(raw)) {
    if (c <= threshold) {
      maskedCount += c
    } else {
      masked[label] = c
    }
  }
  const maskedLabel = 'Masqué (≤5 répondants)'
  if (maskedCount > 0) {
    masked[maskedLabel] = (masked[maskedLabel] || 0) + maskedCount
  }
  return masked
}

export function interpretCronbach(alpha) {
  if (alpha == null) return 'Non calculable (effectif ou complétude insuffisants).'
  if (alpha >= 0.9) return 'Excellent (α ≥ 0,90).'
  if (alpha >= 0.8) return 'Bon (α ≥ 0,80).'
  if (alpha >= 0.7) return 'Acceptable pour la recherche (α ≥ 0,70).'
  return 'En dessous du seuil usuel (0,70) : revoir les items ou l’échantillon.'
}

export const DIMENSION_LABELS_FR = {
  clarte: 'Clarté',
  ecoute: 'Écoute active',
  transparence: 'Transparence',
  coherence: 'Cohérence',
  accessibilite: 'Accessibilité'
}

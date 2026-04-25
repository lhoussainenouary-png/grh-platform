/**
 * Parse CSV text with RFC 4180-style quoted fields (commas and newlines inside quotes).
 * @param {string} text
 * @returns {string[][]}
 */
export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"'
        i++
      } else if (c === '"') {
        inQuotes = false
      } else {
        field += c
      }
      continue
    }

    if (c === '"') {
      inQuotes = true
      continue
    }
    if (c === ',') {
      row.push(field)
      field = ''
      continue
    }
    if (c === '\r') continue
    if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      continue
    }
    field += c
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((cell) => String(cell).trim() !== ''))
}

/**
 * @param {string[][]} rows
 * @returns {{ headers: string[], data: Record<string, string>[] }}
 */
export function rowsToObjects(rows) {
  if (!rows.length) return { headers: [], data: [] }
  const headers = rows[0].map((h) => String(h).trim().replace(/^\ufeff/, ''))
  const data = rows.slice(1).map((values) => {
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = values[i] != null ? String(values[i]).trim() : ''
    })
    return obj
  })
  return { headers, data }
}

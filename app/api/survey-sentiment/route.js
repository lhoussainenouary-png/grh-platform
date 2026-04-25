import { NextResponse } from 'next/server'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MAX_INPUT_CHARS = 12000
const MAX_SNIPPETS = 60

/**
 * POST body: { snippets: string[] } — textes courts (ex. Q26/Q27), français.
 */
export async function POST(request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY non configurée sur le serveur.' },
      { status: 503 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide.' }, { status: 400 })
  }

  const snippets = Array.isArray(body.snippets)
    ? body.snippets.map((s) => String(s).trim()).filter(Boolean)
    : []

  if (snippets.length === 0) {
    return NextResponse.json({ error: 'Aucun texte à analyser.' }, { status: 400 })
  }

  const limited = snippets.slice(0, MAX_SNIPPETS)
  let combined = limited.map((t, i) => `[${i + 1}] ${t}`).join('\n\n')
  if (combined.length > MAX_INPUT_CHARS) {
    combined = combined.slice(0, MAX_INPUT_CHARS) + '\n\n[…tronqué]'
  }

  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'

  const systemPrompt =
    'Tu es un analyste RH. Tu reçois des extraits de réponses anonymes en français à des questions ouvertes sur la communication managériale. ' +
    'Réponds uniquement avec un JSON valide, sans markdown, avec les clés suivantes : ' +
    '{"summary": string (3-5 phrases en français), "toneCounts": {"positive": number, "neutral": number, "negative": number} (entiers, somme = nombre de segments interprétés), "themes": string[] (3 à 8 thèmes courts), "caveats": string (une phrase sur les limites de cette analyse automatique)}. ' +
    'Estime toneCounts en te basant sur le ton dominant de chaque segment numéroté.'

  const userPrompt = `Extraits à analyser :\n\n${combined}`

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'https://localhost',
        'X-Title': 'GRH Platform - Sentiment questionnaire'
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('OpenRouter error:', res.status, errText)
      return NextResponse.json(
        { error: `OpenRouter a répondu ${res.status}.` },
        { status: 502 }
      )
    }

    const data = await res.json()
    const raw = data?.choices?.[0]?.message?.content
    if (!raw || typeof raw !== 'string') {
      return NextResponse.json({ error: 'Réponse modèle vide.' }, { status: 502 })
    }

    let parsed
    try {
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return NextResponse.json(
        { error: 'Impossible de parser le JSON renvoyé par le modèle.', raw },
        { status: 502 }
      )
    }

    return NextResponse.json({
      model,
      segmentsUsed: limited.length,
      result: parsed
    })
  } catch (e) {
    console.error('OpenRouter fetch error:', e)
    const errorMessage = e instanceof Error ? e.message : String(e)
    return NextResponse.json(
      { error: "Erreur réseau ou serveur lors de l'appel OpenRouter.", details: errorMessage },
      { status: 500 }
    )
  }
}

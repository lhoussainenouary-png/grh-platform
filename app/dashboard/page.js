'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js'
import { Pie, Bar, Doughnut, Radar, Line } from 'react-chartjs-2'
import DownloadReportButton from '@/app/components/DownloadReportButton'
import { parseCsv, rowsToObjects } from '@/lib/csvParse'
import {
  LIKERT_KEYS,
  DEMO_HEADERS,
  DIMENSION_ORDER,
  DIMENSION_LABELS_FR,
  meanLikertGlobal,
  meanIQC,
  dimensionSampleMeans,
  cronbachPerDimension,
  kaiserLevel,
  countsWithAnonymity,
  interpretCronbach,
  parseLikert,
  rowIQC
} from '@/lib/surveyStats'
import {
  LIKERT_CHART_LABELS,
  HEADER_Q26_POINTS_FORTS,
  HEADER_Q27_AMELIORATIONS
} from '@/lib/surveySheetHeaders'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
)

const CSV_URL =
  process.env.NEXT_PUBLIC_CSV_URL ||
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDwdCHON3Z5Edx2JB4J7mcB4TZZnBo_HppBini88L4qVVKAjlutMIGCYf-SPlgBXjxk1RJGbg6KLoX/pub?output=csv'

const PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'GESI2026'

const chartColors = ['#1a1a2e', '#c9a84c', '#4a6741', '#8b3a3a', '#6b5b95', '#2d6a4f', '#bc6c25', '#457b9d']

function chartFromCounts(countsObj) {
  const labels = Object.keys(countsObj)
  const data = Object.values(countsObj)
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: chartColors.slice(0, Math.max(labels.length, 1)),
        borderWidth: 0
      }
    ]
  }
}

function perQuestionMeans(rows) {
  return LIKERT_KEYS.map((key) => {
    let s = 0
    let n = 0
    for (const row of rows) {
      const v = parseLikert(row, key)
      if (v != null) {
        s += v
        n++
      }
    }
    return n > 0 ? s / n : null
  })
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [sentimentLoading, setSentimentLoading] = useState(false)
  const [sentimentError, setSentimentError] = useState(null)
  const [sentimentResult, setSentimentResult] = useState(null)

  useEffect(() => {
    const auth = sessionStorage.getItem('dashboardAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === PASSWORD) {
      sessionStorage.setItem('dashboardAuth', 'true')
      setIsAuthenticated(true)
      setError(false)
      loadData()
    } else {
      setError(true)
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('dashboardAuth')
    setIsAuthenticated(false)
    setData(null)
    setSentimentResult(null)
  }

  const loadData = async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const response = await fetch(CSV_URL)
      const text = await response.text()
      const rows = parseCsv(text)
      const { data: responses } = rowsToObjects(rows)
      setData(responses)
    } catch (err) {
      console.error('Erreur:', err)
      setLoadError('Impossible de charger le CSV. Vérifiez NEXT_PUBLIC_CSV_URL et la publication du classeur.')
    } finally {
      setLoading(false)
    }
  }

  const n = data?.length || 0
  const kaiser = useMemo(() => kaiserLevel(n), [n])
  const likertMean = useMemo(() => (data ? meanLikertGlobal(data) : null), [data])
  const iqcMean = useMemo(() => (data ? meanIQC(data) : null), [data])
  const dimMeans = useMemo(() => (data ? dimensionSampleMeans(data) : null), [data])
  const cronbach = useMemo(() => (data ? cronbachPerDimension(data) : null), [data])
  const qMeans = useMemo(() => (data ? perQuestionMeans(data) : []), [data])

  // Find the lowest-scoring dimension
  const lowestDim = useMemo(() => {
    if (!dimMeans) return null
    let lowest = null
    let lowestVal = Infinity
    for (const d of DIMENSION_ORDER) {
      if (dimMeans[d] != null && dimMeans[d] < lowestVal) {
        lowestVal = dimMeans[d]
        lowest = d
      }
    }
    return lowest
  }, [dimMeans])

  const kpis = [
    { label: 'Nb. de Réponses', value: String(n), sub: 'répondants' },
    { label: 'Score Moyen Global', value: likertMean != null ? likertMean.toFixed(2) : '—', sub: '/ 4.0' },
    {
      label: 'IQC Moyen',
      value: iqcMean != null ? iqcMean.toFixed(2) : '—',
      sub: 'indice pondéré'
    },
    {
      label: 'Dimension Critique',
      value: lowestDim ? DIMENSION_LABELS_FR[lowestDim] : '—',
      sub: lowestDim && dimMeans ? `(score : ${dimMeans[lowestDim].toFixed(2)})` : ''
    },
  ]

  const charts = [
    { title: 'Répartition par département', canvasId: 'pieDepartement' },
    { title: 'Répartition par niveau de formation', canvasId: 'barFormation' },
    { title: 'Répartition par ancienneté', canvasId: 'doughnutAnciennete' },
    { title: 'Répartition par niveau hiérarchique', canvasId: 'pieHierarchie' },
    { title: 'Répartition par tranche d\'âge', canvasId: 'barAge' },
    { title: 'Profil des cinq dimensions (radar)', canvasId: 'radarDimensions' },
    { title: 'Moyenne par item (Q6 à Q25)', canvasId: 'linePerQuestion' },
    { title: 'Distribution de l\'IQC pondéré', canvasId: 'barIQC' },
  ]

  const alphaOkCount = useMemo(() => {
    if (!cronbach) return 0
    return DIMENSION_ORDER.filter((d) => cronbach[d] != null && cronbach[d] >= 0.7).length
  }, [cronbach])

  const radarData = useMemo(() => {
    if (!dimMeans) return { labels: [], datasets: [] }
    const labels = DIMENSION_ORDER.map((d) => DIMENSION_LABELS_FR[d])
    const vals = DIMENSION_ORDER.map((d) => (dimMeans[d] != null ? Number(dimMeans[d].toFixed(3)) : 0))
    return {
      labels,
      datasets: [
        {
          label: 'Score moyen (1–4)',
          data: vals,
          backgroundColor: 'rgba(201, 168, 76, 0.25)',
          borderColor: '#c9a84c',
          borderWidth: 2,
          pointBackgroundColor: '#1a1a2e'
        }
      ]
    }
  }, [dimMeans])

  const linePerQuestionData = useMemo(() => {
    return {
      labels: LIKERT_CHART_LABELS,
      datasets: [
        {
          label: 'Moyenne par item (Q6–Q25)',
          data: qMeans.map((v) => (v != null ? Number(v.toFixed(3)) : null)),
          borderColor: '#4a6741',
          backgroundColor: 'rgba(74, 103, 65, 0.15)',
          fill: true,
          tension: 0.25,
          spanGaps: true
        }
      ]
    }
  }, [qMeans])

  const iqcHistogram = useMemo(() => {
    if (!data) return { labels: [], datasets: [] }
    const bins = [
      { label: '1,0–1,5', min: 1, max: 1.5 },
      { label: '1,5–2,0', min: 1.5, max: 2 },
      { label: '2,0–2,5', min: 2, max: 2.5 },
      { label: '2,5–3,0', min: 2.5, max: 3 },
      { label: '3,0–3,5', min: 3, max: 3.5 },
      { label: '3,5–4,0', min: 3.5, max: 4.01 }
    ]
    const counts = bins.map(() => 0)
    for (const row of data) {
      const v = rowIQC(row)
      if (v == null) continue
      for (let i = 0; i < bins.length; i++) {
        if (v >= bins[i].min && v < bins[i].max) {
          counts[i]++
          break
        }
      }
    }
    return {
      labels: bins.map((b) => b.label),
      datasets: [
        {
          label: "Nombre de répondants",
          data: counts,
          backgroundColor: 'rgba(26, 26, 46, 0.75)'
        }
      ]
    }
  }, [data])

  const runSentiment = useCallback(async () => {
    if (!data || !data.length) return
    setSentimentLoading(true)
    setSentimentError(null)
    setSentimentResult(null)
    const snippets = []
    for (const row of data) {
      const a = (row[HEADER_Q26_POINTS_FORTS] || '').trim()
      const b = (row[HEADER_Q27_AMELIORATIONS] || '').trim()
      if (a) snippets.push(`Points forts : ${a}`)
      if (b) snippets.push(`Améliorations : ${b}`)
    }
    const tail = snippets.slice(-50)
    if (!tail.length) {
      setSentimentError('Aucune réponse ouverte renseignée.')
      setSentimentLoading(false)
      return
    }
    try {
      const res = await fetch('/api/survey-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snippets: tail })
      })
      const json = await res.json()
      if (!res.ok) {
        setSentimentError(json.error || 'Erreur API')
        return
      }
      setSentimentResult(json)
    } catch (e) {
      setSentimentError('Échec de la requête vers le serveur.')
    } finally {
      setSentimentLoading(false)
    }
  }, [data])

  if (!isAuthenticated) {
    return (
      <div className="loginContainer">
        <div className="loginBox">
          <h2>Tableau de bord</h2>
          <p className="subtitle">Questionnaire de communication managériale (v2)</p>

          <form className="loginForm" onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
            <button type="submit" className="submitBtn">
              Se connecter
            </button>
            {error && <p className="errorMessage show">Mot de passe incorrect.</p>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboardContainer show">
      <header className="dashboardHeader">
        <h1>Tableau de bord</h1>
        <div className="dashboardHeaderActions">
          <DownloadReportButton
            kpis={kpis}
            charts={charts}
            orgName="Communication Managériale"
          />
          <button type="button" className="btnLogout" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      {loading ? (
        <div className="dashboardLoading">
          <div className="spinner" />
          <p>Chargement des données...</p>
        </div>
      ) : loadError ? (
        <div className="dashboardLoading">
          <p>{loadError}</p>
          <button type="button" className="submitBtn" style={{ marginTop: '1rem' }} onClick={loadData}>
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className={`kaiserBanner kaiserBanner--${kaiser.id}`}>
            <strong>Fiabilité de l’échantillon (règle de Kaiser, ordre de grandeur)</strong>
            <span>{kaiser.label}</span>
            <p className="kaiserBannerDetail">{kaiser.detail}</p>
          </div>

          <div className="kpiGrid">
            <div className="kpiCard kpiCardLift">
              <h3>Réponses enregistrées</h3>
              <div className="value">{n}</div>
              <p className="kpiHint">Nombre de lignes valides dans le fichier publié.</p>
            </div>
            <div className="kpiCard kpiCardLift">
              <h3>Score Likert moyen (Q6–Q25)</h3>
              <div className="value">{likertMean != null ? likertMean.toFixed(2) : '—'}</div>
              <p className="kpiHint">Moyenne de tous les items sur l’échelle 1–4 (Jamais → Toujours).</p>
            </div>
            <div className="kpiCard kpiCardLift">
              <h3>IQC moyen (pondéré)</h3>
              <div className="value">{iqcMean != null ? iqcMean.toFixed(2) : '—'}</div>
              <p className="kpiHint">
                Indice de qualité communicationnelle : poids Clarté 28 %, Écoute 26 %, Transparence 22 %, Cohérence 14
                %, Accessibilité 10 %.
              </p>
            </div>
            <div className="kpiCard kpiCardLift">
              <h3>Dimensions avec α ≥ 0,70</h3>
              <div className="value">
                {alphaOkCount}/{DIMENSION_ORDER.length}
              </div>
              <p className="kpiHint">Nombre de dimensions dont l’alpha de Cronbach atteint le seuil « acceptable ».</p>
            </div>
          </div>

          <section className="sciencePanel">
            <h2 className="sciencePanelTitle">Fiabilité interne (Cronbach)</h2>
            <p className="sciencePanelIntro">
              L’alpha mesure la cohérence des quatre items d’une même dimension. Sous 0,70, les questions ne mesurent
              peut‑être pas un même construit — utile pour une relecture méthodologique.
            </p>
            <div className="cronbachGrid">
              {DIMENSION_ORDER.map((dim) => {
                const a = cronbach?.[dim]
                return (
                  <div key={dim} className="cronbachCard">
                    <h4>{DIMENSION_LABELS_FR[dim]}</h4>
                    <div className="cronbachAlpha">{a != null ? a.toFixed(3) : '—'}</div>
                    <p className="cronbachInterp">{interpretCronbach(a)}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="sciencePanel sentimentPanel">
            <h2 className="sciencePanelTitle">Analyse qualitative (OpenRouter)</h2>
            <p className="sciencePanelIntro">
              Synthèse automatique des champs ouverts (points forts / améliorations). Les derniers segments textuels
              disponibles sont envoyés au modèle via une route API sécurisée (clé serveur uniquement). Coût et
              confidentialité : à utiliser en connaissance de cause.
            </p>
            <button type="button" className="submitBtn sentimentBtn" onClick={runSentiment} disabled={sentimentLoading}>
              {sentimentLoading ? 'Analyse en cours…' : 'Lancer l’analyse des réponses ouvertes'}
            </button>
            {sentimentError && <p className="surveyStepError">{sentimentError}</p>}
            {sentimentResult?.result && (
              <div className="sentimentOutput">
                <p>
                  <strong>Modèle :</strong> {sentimentResult.model} — <strong>Segments :</strong>{' '}
                  {sentimentResult.segmentsUsed}
                </p>
                {sentimentResult.result.summary && <p className="sentimentSummary">{sentimentResult.result.summary}</p>}
                {sentimentResult.result.toneCounts && (
                  <ul className="toneList">
                    <li>Positif : {sentimentResult.result.toneCounts.positive ?? '—'}</li>
                    <li>Neutre : {sentimentResult.result.toneCounts.neutral ?? '—'}</li>
                    <li>Négatif : {sentimentResult.result.toneCounts.negative ?? '—'}</li>
                  </ul>
                )}
                {Array.isArray(sentimentResult.result.themes) && sentimentResult.result.themes.length > 0 && (
                  <p>
                    <strong>Thèmes :</strong> {sentimentResult.result.themes.join(' · ')}
                  </p>
                )}
                {sentimentResult.result.caveats && (
                  <p className="sentimentCaveat">
                    <em>{sentimentResult.result.caveats}</em>
                  </p>
                )}
              </div>
            )}
          </section>

          <div className="chartsGrid">
            <div className="chartCard chartCardLift">
              <h3>Répartition par département</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Repérer si certains services sont surreprésentés. Les petits effectifs
                sont regroupés sous « Masqué » pour limiter le risque de réidentification (règle ≤5 répondants par
                modalité).
              </p>
              <Pie id="pieDepartement" data={chartFromCounts(countsWithAnonymity(data || [], DEMO_HEADERS[0]))} />
            </div>

            <div className="chartCard chartCardLift">
              <h3>Niveau de formation</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Vérifier si la perception de la communication managériale varie selon
                le capital formation — utile pour cibler des actions pédagogiques.
              </p>
              <Bar id="barFormation" data={chartFromCounts(countsWithAnonymity(data || [], DEMO_HEADERS[1]))} options={{ indexAxis: 'y' }} />
            </div>

            <div className="chartCard chartCardLift">
              <h3>Ancienneté dans l’organisation</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Les nouveaux arrivants peuvent juger la communication différemment des
                tenured ; utile pour plans d’intégration.
              </p>
              <Doughnut id="doughnutAnciennete" data={chartFromCounts(countsWithAnonymity(data || [], DEMO_HEADERS[2]))} />
            </div>

            <div className="chartCard chartCardLift">
              <h3>Niveau hiérarchique</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Comparer les attentes entre opérationnels et encadrement ; attention à
                l’anonymat sur les strates peu peuplées.
              </p>
              <Pie id="pieHierarchie" data={chartFromCounts(countsWithAnonymity(data || [], DEMO_HEADERS[3]))} />
            </div>

            <div className="chartCard chartCardLift">
              <h3>Tranche d’âge</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Contextualiser les résultats (générations, habitudes de feedback) sans
                tirer de conclusions causales trop hâtives.
              </p>
              <Bar id="barAge" data={chartFromCounts(countsWithAnonymity(data || [], DEMO_HEADERS[4]))} />
            </div>

            <div className="chartCard chartCardLift">
              <h3>Profil des cinq dimensions (radar)</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Vue synthétique des forces et faiblesses relatives : où investir en
                premier (dimension la plus basse) par rapport à la moyenne de l’échantillon.
              </p>
              <Radar id="radarDimensions" data={radarData} options={{ scales: { r: { min: 1, max: 4, ticks: { stepSize: 0.5 } } } }} />
            </div>

            <div className="chartCard chartCardLift fullWidth">
              <h3>Moyenne par item (Q6 à Q25)</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Repérer les questions isolées qui tirent une dimension vers le bas —
                utile pour reformuler des items ou approfondir en entretiens qualitatifs.
              </p>
              <Line
                id="linePerQuestion"
                data={linePerQuestionData}
                options={{
                  scales: {
                    y: { min: 1, max: 4, title: { display: true, text: 'Moyenne (1–4)' } },
                    x: { ticks: { maxRotation: 90, minRotation: 45 } }
                  }
                }}
              />
            </div>

            <div className="chartCard chartCardLift fullWidth">
              <h3>Distribution de l’IQC pondéré</h3>
              <p className="chartInsight">
                <strong>À quoi ça sert ?</strong> Voir si les scores se concentrent au milieu ou s’étalent : une masse à
                gauche signale une communication managériale vécue comme faible par une large partie des répondants.
              </p>
              <Bar id="barIQC" data={iqcHistogram} options={{ scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

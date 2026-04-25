'use client'
import { useState } from 'react'
import { generateDashboardReport } from '@/app/utils/generateReport'

/**
 * @param {Object} props
 * @param {Array}  props.kpis     - Données KPI : [{ label: 'Nb. Réponses', value: '142', sub: 'répondants' }]
 * @param {Array}  props.charts   - Liste des graphes : [{ title: 'Répartition par Filière', canvasId: 'pieChart' }]
 * @param {string} props.orgName  - Nom de l'organisation (affiché dans le rapport)
 */
export default function DownloadReportButton({ kpis, charts, orgName }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    setDone(false)
    try {
      await generateDashboardReport({
        kpis,
        charts,
        orgName,
        reportDate: new Date().toLocaleDateString('fr-MA', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      })
      setDone(true)
      setTimeout(() => setDone(false), 3500)
    } catch (err) {
      console.error('Erreur génération rapport :', err)
      alert("Erreur lors de la génération du rapport. Vérifiez la console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading || done}
      className={`dl-btn${loading ? ' dl-btn--loading' : ''}`}
      title="Générer et télécharger le rapport Word"
    >
      <span className="dl-btn__icon">
        {done ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : loading ? (
          <svg className="dl-btn__spinner" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="28 56" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <polyline points="9 15 12 18 15 15" />
          </svg>
        )}
      </span>

      <span className="dl-btn__label">
        {done
          ? 'Rapport téléchargé !'
          : loading
            ? 'Génération…'
            : 'Rapport Word'}
      </span>

      {!loading && !done && (
        <span className="dl-btn__badge">.docx</span>
      )}
    </button>
  )
}
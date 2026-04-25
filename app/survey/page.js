'use client'

import { useState, useMemo } from 'react'
import SurveyMascot from './SurveyMascot'

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || ''

const likertOptions = [
  { value: '1', text: 'Jamais' },
  { value: '2', text: 'Rarement' },
  { value: '3', text: 'Souvent' },
  { value: '4', text: 'Toujours' }
]

const OPEN_MAX = 500

/** @type {{ id: string, title: string, description: string, questions: any[] }[]} */
const steps = [
  {
    id: 'profil',
    title: 'Partie 1 — Données démographiques',
    description: 'Cinq questions filtre (anonymat : les résultats agrégés au dashboard respectent les règles de confidentialité).',
    questions: [
      {
        id: 'q1',
        label: 'Sélectionnez votre département :',
        type: 'select',
        options: [
          '',
          'Ressources Humaines',
          'Finance & Comptabilité',
          'Production / Opérations',
          'Commercial & Marketing',
          'Informatique & Systèmes',
          'Direction Générale',
          'Autre'
        ]
      },
      {
        id: 'q2',
        label: 'Quel est votre niveau de formation le plus élevé ?',
        type: 'select',
        options: [
          '',
          'Baccalauréat ou équivalent',
          'Bac+2 / Technicien spécialisé',
          'Bac+3 / Licence',
          'Bac+5 / Master ou Ingénieur',
          'Doctorat ou plus'
        ]
      },
      {
        id: 'q3',
        label: 'Depuis combien de temps travaillez-vous dans cette organisation ?',
        type: 'select',
        options: ['', 'Moins de 2 ans', 'Entre 2 et 7 ans', 'Plus de 7 ans']
      },
      {
        id: 'q4',
        label: 'Quel est votre niveau dans l\'organisation ?',
        type: 'select',
        options: [
          '',
          'Employé / Technicien',
          'Agent de maîtrise / Superviseur',
          'Cadre moyen / Manager',
          'Cadre supérieur / Direction'
        ]
      },
      {
        id: 'q5',
        label: 'Quelle est votre tranche d\'âge ?',
        type: 'select',
        options: ['', 'Moins de 30 ans', '30 – 44 ans', '45 ans et plus']
      }
    ]
  },
  {
    id: 'clarte',
    title: 'Dimension 1 — Clarté de la communication',
    description: 'Précision, compréhensibilité et structuration des messages du manager.',
    questions: [
      { id: 'q6', label: 'Mon manager formule des objectifs de travail clairs et compréhensibles.' },
      { id: 'q7', label: 'Les instructions transmises par mon manager sont précises et sans ambiguïté.' },
      { id: 'q8', label: 'Mon manager communique les priorités et les délais de manière explicite.' },
      { id: 'q9', label: 'En cas d\'incompréhension, mon manager reformule et clarifie sans difficulté.' }
    ]
  },
  {
    id: 'ecoute',
    title: 'Dimension 2 — Écoute active',
    description: 'Capacité du manager à recevoir, traiter et valoriser les retours de ses équipes.',
    questions: [
      { id: 'q10', label: 'Mon manager écoute attentivement lorsque je lui fais part d\'un problème.' },
      { id: 'q11', label: 'Mon manager prend en compte mes suggestions dans ses décisions.' },
      { id: 'q12', label: 'Mon manager encourage le dialogue et les échanges ouverts au sein de l\'équipe.' },
      { id: 'q13', label: 'Mon manager me donne un feedback constructif sur mon travail régulièrement.' }
    ]
  },
  {
    id: 'transparence',
    title: 'Dimension 3 — Transparence',
    description: 'Ouverture informationnelle et communication autour des décisions.',
    questions: [
      { id: 'q14', label: 'Mon manager partage les informations importantes concernant l\'organisation en temps utile.' },
      { id: 'q15', label: 'Mon manager explique les raisons derrière les décisions prises.' },
      { id: 'q16', label: 'Mon manager communique ouvertement sur les difficultés et les enjeux de l\'équipe.' },
      { id: 'q17', label: 'Mon manager informe l\'équipe des changements organisationnels avant leur mise en œuvre.' }
    ]
  },
  {
    id: 'coherence',
    title: 'Dimension 4 — Cohérence',
    description: 'Alignement entre le discours du manager et ses actes concrets.',
    questions: [
      { id: 'q18', label: 'Le comportement de mon manager est cohérent avec ses paroles.' },
      { id: 'q19', label: 'Mon manager applique les mêmes règles pour tous les membres de l\'équipe.' },
      { id: 'q20', label: 'Les engagements pris par mon manager sont respectés.' },
      { id: 'q21', label: 'La communication de mon manager ne change pas selon les interlocuteurs de manière injustifiée.' }
    ]
  },
  {
    id: 'accessibilite',
    title: 'Dimension 5 — Accessibilité',
    description: 'Disponibilité physique et psychologique du manager pour son équipe.',
    questions: [
      { id: 'q22', label: 'Mon manager est facilement joignable lorsque j\'en ai besoin.' },
      { id: 'q23', label: 'Mon manager crée un environnement dans lequel je me sens à l\'aise pour m\'exprimer.' },
      { id: 'q24', label: 'Mon manager prend le temps nécessaire pour discuter avec moi des sujets importants.' },
      { id: 'q25', label: 'Je n\'hésite pas à contacter mon manager en cas de problème professionnel.' }
    ]
  },
  {
    id: 'ouvert',
    title: 'Partie 3 — Questions ouvertes (optionnel)',
    description: 'Réponses libres, 500 caractères maximum par champ. Vous pouvez laisser vide.',
    questions: [
      {
        id: 'q26',
        label: 'Selon vous, quels sont les points forts de la communication managériale au sein de votre organisation ?',
        type: 'textarea',
        optional: true
      },
      {
        id: 'q27',
        label: 'Quelles améliorations concrètes suggérez-vous pour améliorer la communication de votre manager ?',
        type: 'textarea',
        optional: true
      }
    ]
  }
]

function getIdsForStep(stepIndex) {
  return steps[stepIndex].questions.map((q) => q.id)
}

function validateStep(stepIndex, formData) {
  const ids = getIdsForStep(stepIndex)
  for (const id of ids) {
    const q = steps[stepIndex].questions.find((x) => x.id === id)
    if (q.type === 'textarea' && q.optional) continue
    const v = formData[id]
    if (v == null || String(v).trim() === '') return false
  }
  return true
}

export default function SurveyPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [stepError, setStepError] = useState(false)

  const totalSteps = steps.length
  const current = steps[step]

  const handleChange = (questionId, value) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }))
    setStepError(false)
  }

  const goNext = () => {
    if (!validateStep(step, formData)) {
      setStepError(true)
      return
    }
    setStepError(false)
    if (step < totalSteps - 1) setStep((s) => s + 1)
  }

  const goPrev = () => {
    setStepError(false)
    if (step > 0) setStep((s) => s - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(step, formData)) {
      setStepError(true)
      return
    }
    if (!GOOGLE_SCRIPT_URL) {
      alert('Configuration manquante : définissez NEXT_PUBLIC_GOOGLE_SCRIPT_URL dans .env.local')
      return
    }
    setIsLoading(true)
    const payload = { ...formData }
    if (payload.q26 == null) payload.q26 = ''
    if (payload.q27 == null) payload.q27 = ''

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString()
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const progressPct = useMemo(() => ((step + 1) / totalSteps) * 100, [step, totalSteps])

  if (isSubmitted) {
    return (
      <div className="container">
        <div className="successMessage show">
          <h2>Merci pour vos réponses !</h2>
          <p>Votre participation a été enregistrée avec succès.</p>
          <p>Vos réponses nous aideront à améliorer la communication managériale.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container surveyWizard">
      <header className="header">
        <h1>Questionnaire — Communication managériale</h1>
        <p className="subtitle">Version 2.0 — Échelle Likert à 4 points (sans point neutre)</p>
        <p className="description">
          Instrument de mesure pour la recherche en GRH. Vos réponses sont traitées de façon confidentielle.
          Durée estimée : 8 à 12 minutes. Utilisez « Suivant » pour avancer section par section.
        </p>
      </header>

      <div className="surveyProgressWrap" aria-hidden="true">
        <div className="surveyProgressBar" style={{ width: `${progressPct}%` }} />
      </div>
      <p className="surveyStepMeta">
        Étape {step + 1} / {totalSteps}
      </p>

      <div className="surveyHero">
        <div key={step} className="surveyMascotWrap">
          <SurveyMascot step={step} />
        </div>
        <div className="sectionHeader surveySectionHeaderInline">
          <h2>{current.title}</h2>
          <p>{current.description}</p>
        </div>
      </div>

      <form id="surveyForm" onSubmit={(e) => e.preventDefault()}>
        <div className="section surveyStepSection">
          {current.id !== 'profil' && current.id !== 'ouvert' && (
            <div className="likertLegend likertLegendStandalone">
              <span><strong>1</strong> = Jamais</span>
              <span><strong>4</strong> = Toujours</span>
            </div>
          )}

          {current.questions.map((question) => (
            <div key={question.id} className="questionCard">
              <label className="questionLabel" htmlFor={question.id}>
                <span className="questionNumber">{question.id.replace('q', '').toUpperCase()}.</span>
                {question.label}
              </label>

              {question.type === 'select' ? (
                <select
                  name={question.id}
                  id={question.id}
                  required
                  value={formData[question.id] || ''}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                >
                  {question.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt || '— Sélectionnez une option —'}
                    </option>
                  ))}
                </select>
              ) : question.type === 'textarea' ? (
                <>
                  <textarea
                    className="surveyTextarea"
                    name={question.id}
                    id={question.id}
                    rows={4}
                    maxLength={OPEN_MAX}
                    value={formData[question.id] || ''}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                    placeholder="Optionnel — vous pouvez laisser ce champ vide."
                  />
                  <p className="surveyCharCount">
                    {(formData[question.id] || '').length} / {OPEN_MAX}
                  </p>
                </>
              ) : (
                <div className="likertScale">
                  {likertOptions.map((opt) => (
                    <div key={opt.value} className="likertOption">
                      <input
                        type="radio"
                        name={question.id}
                        id={`${question.id}-${opt.value}`}
                        value={opt.value}
                        required
                        checked={formData[question.id] === opt.value}
                        onChange={() => handleChange(question.id, opt.value)}
                      />
                      <label htmlFor={`${question.id}-${opt.value}`}>
                        <span className="value">{opt.value}</span>
                        <span className="text">{opt.text}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {stepError && (
          <p className="surveyStepError" role="alert">
            Veuillez compléter tous les champs obligatoires de cette étape avant de continuer.
          </p>
        )}

        <div className="surveyNav">
          <button type="button" className="surveyNavBtn surveyNavBtnSecondary" onClick={goPrev} disabled={step === 0}>
            Précédent
          </button>
          {step < totalSteps - 1 ? (
            <button type="button" className="surveyNavBtn" onClick={goNext}>
              Suivant
            </button>
          ) : (
            <button type="button" className="surveyNavBtn submitBtn surveyNavSubmit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? <span className="loading" /> : null}
              {isLoading ? 'Envoi en cours...' : 'Envoyer mes réponses'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

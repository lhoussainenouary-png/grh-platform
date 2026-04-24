'use client'

import { useState } from 'react'

// Configuration Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby9rE7S8RKqsdbIN0oTGWEzvQ4ouKIqjZ0t7ic_nJwUZXMAzMBLacpaSFzg0yYyv7FJ5g/exec'

// Questions data
const sections = [
  {
    id: 'profil',
    title: 'Section I - Profil du répondant',
    description: 'Informations générales vous concernant',
    questions: [
      { id: 'q1', label: 'Quelle est votre filière/department ?', type: 'select', options: ['', 'Ressources Humaines', 'Finance & Comptabilité', 'Marketing & Communication', 'Informatique & SI', 'Operations & Production', 'Commercial & Vente', 'Direction Générale', 'Autre'] },
      { id: 'q2', label: 'Quel est votre niveau d\'études ?', type: 'select', options: ['', 'Bac', 'Bac+2 (BTS, DUT, DEUG)', 'Bac+3 (Licence, Bachelor)', 'Bac+5 (Master, Diplôme d\'ingénieur)', 'Bac+8 ou plus (Doctorat)'] },
      { id: 'q3', label: 'Quelle est votre ancienneté dans l\'entreprise ?', type: 'select', options: ['', 'Moins de 1 an', '1 à 3 ans', '3 à 5 ans', '5 à 10 ans', 'Plus de 10 ans'] },
      { id: 'q4', label: 'Quel est votre niveau hiérarchique actuel ?', type: 'select', options: ['', 'Employé / Collaborateur', 'Technicien / Agent de maîtrise', 'Cadre moyen / Manager de proximité', 'Cadre dirigeant', 'Direction générale'] },
      { id: 'q5', label: 'Quel est votre âge ?', type: 'select', options: ['', 'Moins de 25 ans', '25 à 34 ans', '35 à 44 ans', '45 à 54 ans', '55 ans et plus'] },
    ]
  },
  {
    id: 'clarte',
    title: 'Section II - Clarté de la communication',
    description: 'Évaluez la clarté des informations transmises par votre management',
    questions: [
      { id: 'q6', label: 'Les objectifs de mon équipe me sont clairement communiqués' },
      { id: 'q7', label: 'Je comprends bien les priorités de mon travail' },
      { id: 'q8', label: 'Les instructions données par mon manager sont précises et compréhensibles' },
      { id: 'q9', label: 'Les informations importantes me parviennent à temps' },
      { id: 'q10', label: 'Je dispose des informations nécessaires pour accomplir mes missions' },
      { id: 'q11', label: 'Les décisions prises par la direction sont bien expliquées' },
    ]
  },
  {
    id: 'ecoute',
    title: 'Section III - Écoute et dialogue',
    description: 'Évaluez la qualité de l\'écoute de votre hiérarchie',
    questions: [
      { id: 'q12', label: 'Mon manager prend le temps de m\'écouter' },
      { id: 'q13', label: 'Je peux exprimer mes idées et suggestions librement' },
      { id: 'q14', label: 'Mes retours sont pris en compte dans les décisions' },
      { id: 'q15', label: 'Il existe des moments d\'échange réguliers avec mon manager' },
      { id: 'q16', label: 'Mon manager est disponible pour répondre à mes questions' },
      { id: 'q17', label: 'Les réunions d\'équipe permettent de vraies discussions' },
    ]
  },
  {
    id: 'feedback',
    title: 'Section IV - Feedback et reconnaissance',
    description: 'Évaluez le feedback et la reconnaissance reçus',
    questions: [
      { id: 'q18', label: 'Je reçois régulièrement un feedback sur mon travail' },
      { id: 'q19', label: 'Mes réalisations sont reconnues par ma hiérarchie' },
      { id: 'q20', label: 'Je suis informé(e) de mes points forts et axes d\'amélioration' },
      { id: 'q21', label: 'Les erreurs sont traitées de manière constructive' },
      { id: 'q22', label: 'Mes efforts sont appréciés à leur juste valeur' },
      { id: 'q23', label: 'Il y a une reconnaissance des bonnes pratiques dans mon service' },
    ]
  },
  {
    id: 'accessibilite',
    title: 'Section V - Accessibilité et disponibilité',
    description: 'Évaluez l\'accessibilité de votre hiérarchie',
    questions: [
      { id: 'q24', label: 'Mon manager est facilement accessible' },
      { id: 'q25', label: 'Je peux facilement solliciter mon manager en cas de besoin' },
      { id: 'q26', label: 'Les canaux de communication (email, téléphone, visio) sont efficaces' },
      { id: 'q27', label: 'Les délais de réponse à mes demandes sont satisfaisants' },
      { id: 'q28', label: 'Mon manager fait preuve de transparence dans ses communications' },
    ]
  },
  {
    id: 'coherence',
    title: 'Section VI - Cohérence et exemplarité',
    description: 'Évaluez la cohérence du management',
    questions: [
      { id: 'q29', label: 'Ce que dit mon manager correspond à ce qu\'il fait' },
      { id: 'q30', label: 'Mon manager montre l\'exemple dans les valeurs qu\'il promeut' },
      { id: 'q31', label: 'Les messages de la direction sont cohérents avec la réalité du terrain' },
      { id: 'q32', label: 'Mon manager applique les mêmes règles à tous' },
      { id: 'q33', label: 'Il y a une bonne cohérence entre les différents niveaux hiérarchiques' },
    ]
  },
  {
    id: 'satisfaction',
    title: 'Section VII - Satisfaction globale',
    description: 'Évaluez votre satisfaction générale',
    questions: [
      { id: 'q34', label: 'De manière générale, je suis satisfait(e) de la communication avec mon manager' },
      { id: 'q35', label: 'Je recommanderais mon environnement de travail pour sa communication' },
    ]
  }
]

const likertOptions = [
  { value: '1', text: 'Pas du tout' },
  { value: '2', text: 'Plutôt non' },
  { value: '3', text: 'Plutôt oui' },
  { value: '4', text: 'Tout à fait' }
]

export default function SurveyPage() {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (questionId, value) => {
    setFormData(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="container">
      <header className="header">
        <h1>Questionnaire de Communication Managériale</h1>
        <p className="subtitle">Enquête sur les pratiques de communication au sein de votre organisation</p>
        <p className="description">
          Ce questionnaire a pour objectif d'évaluer la qualité de la communication managériale
          dans votre environnement de travail. Vos réponses sont anonymes et nous aideront à
          identifier les axes d'amélioration. Durée estimée : 10-15 minutes.
        </p>
      </header>

      <form id="surveyForm" onSubmit={handleSubmit}>
        {sections.map((section) => (
          <div key={section.id} className="section">
            <div className="sectionHeader">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>

            {section.questions.some(q => q.type === 'select') && (
              <div className="likertLegend">
                <span>1 = Pas du tout d'accord</span>
                <span>4 = Tout à fait d'accord</span>
              </div>
            )}

            {section.questions.map((question) => (
              <div key={question.id} className="questionCard">
                <label className="questionLabel">
                  <span className="questionNumber">{question.id.replace('q', '')}.</span>
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
                      <option key={idx} value={opt}>{opt || '-- Sélectionnez une option --'}</option>
                    ))}
                  </select>
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
        ))}

        <button type="submit" className="submitBtn" disabled={isLoading}>
          {isLoading ? <span className="loading"></span> : null}
          {isLoading ? 'Envoi en cours...' : 'Envoyer mes réponses'}
        </button>
      </form>
    </div>
  )
}
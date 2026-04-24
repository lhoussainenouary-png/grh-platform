'use client'

import { useState, useEffect, useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js'
import { Pie, Bar, Doughnut, Radar, Line } from 'react-chartjs-2'

// Enregistrer les composants Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Filler)

// Configuration - URL Google Sheet exporté en CSV
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDwdCHON3Z5Edx2JB4J7mcB4TZZnBo_HppBini88L4qVVKAjlutMIGCYf-SPlgBXjxk1RJGbg6KLoX/pub?output=csv'
const PASSWORD = 'GESI2026'

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  // Vérifier la session
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
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetch(CSV_URL)
      const text = await response.text()
      const rows = text.split('\n').filter(row => row.trim())
      const headers = rows[0].split(',').map(h => h.trim())
      
      const responses = rows.slice(1).map(row => {
        const values = row.split(',')
        const obj = {}
        headers.forEach((h, i) => {
          obj[h] = values[i]?.trim() || ''
        })
        return obj
      })

      setData(responses)
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  // Calculer les statistiques
  const getStats = () => {
    if (!data || data.length === 0) return { total: 0, avg: 0, participation: 0 }
    
    const total = data.length
    let scoreSum = 0
    let count = 0
    
    data.forEach(row => {
      for (let i = 6; i <= 33; i++) {
        const val = parseInt(row[`Q${i}`])
        if (!isNaN(val)) {
          scoreSum += val
          count++
        }
      }
    })
    
    const avg = count > 0 ? (scoreSum / count).toFixed(2) : 0
    return { total, avg, participation: Math.min(100, total * 10) }
  }

  // Obtenir les données pour les graphiques
  const getChartData = (questionId, label) => {
    if (!data) return { labels: [], datasets: [] }
    
    const counts = {}
    data.forEach(row => {
      const val = row[questionId]
      if (val) counts[val] = (counts[val] || 0) + 1
    })
    
    return {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: ['#1a1a2e', '#c9a84c', '#4a6741', '#8b3a3a', '#f5f0e8', '#2d2d44', '#666'],
        borderWidth: 0
      }]
    }
  }

  const stats = getStats()

  if (!isAuthenticated) {
    return (
      <div className="loginContainer">
        <div className="loginBox">
          <h2>Tableau de Bord</h2>
          <p className="subtitle">Questionnaire de Communication Managériale</p>
          
          <form className="loginForm" onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
            <button type="submit" className="submitBtn">Se connecter</button>
            {error && <p className="errorMessage show">Mot de passe incorrect.</p>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboardContainer show">
      <header className="dashboardHeader">
        <h1>Tableau de Bord</h1>
        <button className="btnLogout" onClick={handleLogout}>Déconnexion</button>
      </header>

      {loading ? (
        <div className="dashboardLoading">
          <div className="spinner"></div>
          <p>Chargement des données...</p>
        </div>
      ) : (
        <>
          <div className="kpiGrid">
            <div className="kpiCard">
              <h3>Nombre total de réponses</h3>
              <div className="value">{stats.total}</div>
            </div>
            <div className="kpiCard">
              <h3>Score moyen global</h3>
              <div className="value">{stats.avg}</div>
            </div>
            <div className="kpiCard">
              <h3>Taux de participation</h3>
              <div className="value">{stats.participation}%</div>
            </div>
          </div>

          <div className="chartsGrid">
            <div className="chartCard">
              <h3>Répartition par Filière/Department</h3>
              <Pie data={getChartData('Q1_Filiere', 'Filière')} />
            </div>
            
            <div className="chartCard">
              <h3>Répartition par Niveau d'Études</h3>
              <Bar data={getChartData('Q2_Niveau_Etudes', 'Niveau')} />
            </div>
            
            <div className="chartCard">
              <h3>Répartition par Ancienneté</h3>
              <Doughnut data={getChartData('Q3_Anciennete', 'Ancienneté')} />
            </div>
            
            <div className="chartCard">
              <h3>Répartition par Niveau Hiérarchique</h3>
              <Pie data={getChartData('Q4_Niveau_Hierarchique', 'Hiérarchie')} />
            </div>
            
            <div className="chartCard">
              <h3>Clarté de la Communication (Q6-Q11)</h3>
              <Radar data={getChartData('Q6', 'Clarté')} />
            </div>
            
            <div className="chartCard fullWidth">
              <h3>Scores Moyens par Dimension</h3>
              <Line data={getChartData('Q6', 'Dimensions')} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
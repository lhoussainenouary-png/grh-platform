'use client'
import Link from 'next/link'

export default function Context() {
  return (
    <main className="page">
      <nav className="topNav">
        <div className="navContainer">
          <div className="navBrand">
            <Link href="/" className="navLogoLink">
              <span className="navLogo">⬡</span>
              <span>GRH Platform</span>
            </Link>
          </div>
          <div className="navLinks">
            <Link href="/" className="navLink">Accueil</Link>
            <Link href="/survey" className="navBtn">Questionnaire</Link>
            <Link href="/dashboard" className="navBtn navBtnPrimary">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="pageContainer">
        <div className="pageHeader">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <span>Contexte & Objectifs</span>
          </div>
          <h1>🎯 Contexte & Objectifs</h1>
          <p className="pageIntro">
            Découvrez pourquoi cette plateforme existe, quel problème elle résout,
            et comment elle peut transformer votre démarche de diagnostic organisationnel.
          </p>
        </div>

        <div className="contentGrid">
          <div className="mainContent">
            {/* Problématique */}
            <section className="contentSection">
              <h2>📌 Problématique</h2>
              <div className="problemCard">
                <p className="problemQuote">
                  &ldquo;La communication managériale est un facteur clé de la performance organisationnelle.
                  Pourtant, peu d&apos;organisations disposent d&apos;outils leur permettant d&apos;en mesurer
                  objectivement la qualité de manière structurée et reproductible.&rdquo;
                </p>
              </div>
              <p>
                Dans un environnement professionnel en constante évolution, la qualité de la
                communication entre managers et équipes constitue un levier déterminant de
                <strong> l&apos;engagement</strong>, de la <strong>productivité</strong> et du
                <strong> bien-être au travail</strong>.
              </p>
              <p>
                Les problématiques fréquentes observées dans les organisations :
              </p>
              <ul className="iconList">
                <li>🚫 <strong>Manque de clarté</strong> dans la transmission des objectifs et directives</li>
                <li>🚫 <strong>Déficit d&apos;écoute</strong> et de reconnaissance des retours d&apos;équipes</li>
                <li>🚫 <strong>Défaut de transparence</strong> sur les décisions et leur justification</li>
                <li>🚫 <strong>Incohérence</strong> entre les discours et les actions managériales</li>
                <li>🚫 <strong>Faible accessibilité</strong> des responsables auprès de leurs équipes</li>
              </ul>
            </section>

            {/* Objectif Principal */}
            <section className="contentSection">
              <h2>🎯 Objectif Principal</h2>
              <p>
                Cette plateforme a été conçue pour fournir aux responsables RH un
                <strong> outil numérique clé-en-main</strong> permettant de :
              </p>
              <div className="objectivesGrid">
                <div className="objectiveCard">
                  <div className="objectiveIcon">📊</div>
                  <h3>Collecter des données fiables</h3>
                  <p>Obtenez des données structurées et objectives sur les pratiques de communication interne</p>
                </div>
                <div className="objectiveCard">
                  <div className="objectiveIcon">📈</div>
                  <h3>Visualiser en temps réel</h3>
                  <p>Accédez instantanément aux résultats agrégés via un dashboard sécurisé</p>
                </div>
                <div className="objectiveCard">
                  <div className="objectiveIcon">🔍</div>
                  <h3>Identifier les axes d&apos;amélioration</h3>
                  <p>Identifiez précisément les dimensions à travailler en priorité</p>
                </div>
              </div>
            </section>

            {/* Contexte d'Usage */}
            <section className="contentSection">
              <h2>🏢 Contexte d&apos;Usage</h2>
              <p>
                Ce questionnaire s&apos;inscrit dans une démarche de{' '}
                <strong>diagnostic organisationnel</strong> et peut être utilisé dans le cadre de :
              </p>
              <div className="useCases">
                <div className="useCase">
                  <div className="useCaseIcon">🔎</div>
                  <div>
                    <h4>Audits internes RH</h4>
                    <p>Évaluez l&apos;état actuel de la communication pour établir un diagnostic de départ</p>
                  </div>
                </div>
                <div className="useCase">
                  <div className="useCaseIcon">📚</div>
                  <div>
                    <h4>Projets de recherche académique</h4>
                    <p>Collectez des données pour des mémoires, thèses ou études sur la GRH</p>
                  </div>
                </div>
                <div className="useCase">
                  <div className="useCaseIcon">🚀</div>
                  <div>
                    <h4>Plans de développement managérial</h4>
                    <p>Identifiez les compétences à développer chez vos managers</p>
                  </div>
                </div>
                <div className="useCase">
                  <div className="useCaseIcon">🌡️</div>
                  <div>
                    <h4>Évaluations de climat social</h4>
                    <p>Mesurez la perception de la communication comme composante du climat organisationnel</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cadre Théorique */}
            <section className="contentSection">
              <h2>📚 Cadre Théorique</h2>
              <p>
                Ce questionnaire s&apos;appuie sur des modèles validés de mesure de la communication
                organisationnelle :
              </p>
              <div className="theoryCards">
                <div className="theoryCard">
                  <h4>Modèle de Shannon & Weaver</h4>
                  <p>Théorie mathématique de la transmission de l&apos;information (1949)</p>
                </div>
                <div className="theoryCard">
                  <h4>Théorie de Putnam & Pacanowsky</h4>
                  <p>Communication organisationnelle comme processus culturel et interactif</p>
                </div>
                <div className="theoryCard">
                  <h4>Échelle de Likert</h4>
                  <p>Méthode de mesure des attitudes et perceptions adaptée au contexte managérial</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="contentSection">
              <h2>❓ Questions Fréquentes</h2>
              <div className="faqGrid">
                <div className="faqItem">
                  <h4>Combien de temps faut-il pour répondre ?</h4>
                  <p>En moyenne 5 à 10 minutes selon le rythme de lecture.</p>
                </div>
                <div className="faqItem">
                  <h4>Le questionnaire est-il vraiment anonyme ?</h4>
                  <p>Oui. Aucune donnée personnelle (nom, email, IP) n&apos;est collectée ou stockée.</p>
                </div>
                <div className="faqItem">
                  <h4>Qui peut voir les résultats ?</h4>
                  <p>Seuls les responsables RH ayant le mot de passe peuvent accéder au dashboard.</p>
                </div>
                <div className="faqItem">
                  <h4>Puis-je personnaliser le questionnaire ?</h4>
                  <p>Oui, le code est open source et peut être adapté à vos besoins spécifiques.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="sidebar">
            <div className="sidebarCard">
              <h3>📋 Résumé</h3>
              <div className="summaryList">
                <div className="summaryItem">
                  <span className="summaryLabel">Questions</span>
                  <span className="summaryValue">35</span>
                </div>
                <div className="summaryItem">
                  <span className="summaryLabel">Dimensions</span>
                  <span className="summaryValue">5</span>
                </div>
                <div className="summaryItem">
                  <span className="summaryLabel">Durée</span>
                  <span className="summaryValue">~8 min</span>
                </div>
                <div className="summaryItem">
                  <span className="summaryLabel">Anonymat</span>
                  <span className="summaryValue yes">✓ 100%</span>
                </div>
              </div>
            </div>

            <div className="sidebarCard highlight">
              <h3>Prêt à commencer ?</h3>
              <p>Accédez au questionnaire ou consultez les résultats.</p>
              <div className="sidebarButtons">
                <Link href="/survey" className="btnPrimary">Questionnaire</Link>
                <Link href="/dashboard" className="btnSecondary">Dashboard</Link>
              </div>
            </div>

            <div className="sidebarCard">
              <h3>Accès Rapide</h3>
              <div className="quickLinks">
                <Link href="/survey">Répondre au questionnaire</Link>
                <Link href="/dashboard">Voir les résultats</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: var(--cream);
        }
        .topNav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(245, 240, 232, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
        }
        .navContainer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .navBrand {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 600;
          font-size: 1.2rem;
        }
        .navLogoLink {
          color: var(--ink);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navLogo {
          font-size: 1.5rem;
          color: var(--gold);
        }
        .navLinks {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .navLink {
          color: var(--ink);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.3s;
        }
        .navLink:hover {
          background: rgba(201, 168, 76, 0.1);
          color: var(--gold);
        }
        .navBtn {
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          border: 2px solid var(--ink);
          color: var(--ink);
        }
        .navBtn:hover {
          background: var(--ink);
          color: var(--cream);
        }
        .navBtnPrimary {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--ink);
        }
        .navBtnPrimary:hover {
          background: #b8943f;
          border-color: #b8943f;
          color: var(--ink);
        }
        .navCta {
          background: var(--gold) !important;
          color: var(--ink) !important;
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          font-weight: 600;
        }
        .pageContainer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem 4rem;
        }
        .pageHeader {
          margin-bottom: 3rem;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1rem;
        }
        .breadcrumb a {
          color: var(--gold);
          text-decoration: none;
        }
        .breadcrumb a:hover {
          text-decoration: underline;
        }
        .pageHeader h1 {
          font-size: 2.5rem;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .pageIntro {
          font-size: 1.15rem;
          color: #555;
          max-width: 700px;
          line-height: 1.7;
        }
        .contentGrid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
        }
        .mainContent {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .contentSection h2 {
          font-size: 1.5rem;
          color: var(--ink);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--gold);
        }
        .contentSection p {
          color: #444;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .problemCard {
          background: linear-gradient(135deg, var(--ink) 0%, #2d2d44 100%);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }
        .problemQuote {
          color: var(--cream) !important;
          font-size: 1.1rem !important;
          font-style: italic;
          line-height: 1.8 !important;
          margin: 0 !important;
        }
        .iconList {
          list-style: none;
          padding: 0;
          margin-top: 1rem;
        }
        .iconList li {
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;
          color: #444;
        }
        .iconList li:last-child {
          border-bottom: none;
        }
        .objectivesGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .objectiveCard {
          background: var(--white);
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(26, 26, 46, 0.08);
          transition: all 0.3s;
        }
        .objectiveCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(26, 26, 46, 0.12);
        }
        .objectiveIcon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .objectiveCard h3 {
          font-size: 1rem;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }
        .objectiveCard p {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
        }
        .useCases {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        .useCase {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--white);
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(26, 26, 46, 0.06);
        }
        .useCaseIcon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .useCase h4 {
          font-size: 1rem;
          color: var(--ink);
          margin-bottom: 0.25rem;
        }
        .useCase p {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
        .theoryCards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .theoryCard {
          background: rgba(201, 168, 76, 0.1);
          padding: 1.25rem;
          border-radius: 10px;
          border-left: 3px solid var(--gold);
        }
        .theoryCard h4 {
          font-size: 0.95rem;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }
        .theoryCard p {
          font-size: 0.8rem;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
        .faqGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .faqItem {
          background: var(--white);
          padding: 1.25rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(26, 26, 46, 0.06);
        }
        .faqItem h4 {
          font-size: 0.95rem;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }
        .faqItem p {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .sidebarCard {
          background: var(--white);
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(26, 26, 46, 0.08);
        }
        .sidebarCard.highlight {
          background: linear-gradient(135deg, var(--ink) 0%, #2d2d44 100%);
        }
        .sidebarCard.highlight h3,
        .sidebarCard.highlight p {
          color: var(--cream);
        }
        .sidebarCard h3 {
          font-size: 1.1rem;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .summaryList {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .summaryItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .summaryLabel {
          color: #666;
          font-size: 0.9rem;
        }
        .summaryValue {
          font-weight: 600;
          color: var(--ink);
        }
        .summaryValue.yes {
          color: var(--sage);
        }
        .sidebarButtons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .btnPrimary {
          display: block;
          text-align: center;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, var(--gold) 0%, #d4b35a 100%);
          color: var(--ink);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
        }
        .btnSecondary {
          display: block;
          text-align: center;
          padding: 0.875rem 1.5rem;
          background: transparent;
          color: var(--cream);
          border: 2px solid var(--cream);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
        }
        .btnSecondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .quickLinks {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .quickLinks a {
          color: var(--gold);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
          transition: color 0.3s;
        }
        .quickLinks a:hover {
          color: var(--ink);
        }
        @media (max-width: 1024px) {
          .contentGrid {
            grid-template-columns: 1fr;
          }
          .sidebar {
            order: -1;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .sidebarCard {
            flex: 1;
            min-width: 280px;
          }
          .objectivesGrid {
            grid-template-columns: 1fr;
          }
          .useCases {
            grid-template-columns: 1fr;
          }
          .theoryCards {
            grid-template-columns: 1fr;
          }
          .faqGrid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .navLinks {
            display: none;
          }
          .pageHeader h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </main>
  )
}

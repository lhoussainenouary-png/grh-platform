'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <nav className="topNav">
        <div className="navContainer">
          <Link href="/" className="navBrand">
            <span className="navLogo"></span>
            <span>GRH Platform</span>
          </Link>
          <div className="navLinks">
            <Link href="/" className="navLink">Accueil</Link>
            <Link href="/context" className="navLink">Contexte</Link>
            <Link href="/survey" className="navLink navLinkPrimary">Questionnaire</Link>
            <Link href="/dashboard" className="navLink">Dashboard</Link>
          </div>
          <span className="navMeta">Communication Manageriale</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="heroBackground">
          <div className="heroShape heroShape1"></div>
          <div className="heroShape heroShape2"></div>
          <div className="heroShape heroShape3"></div>
        </div>
        <div className="heroContent">
          <div className="heroBadge">
            <span className="badgeDot"></span>
            Plateforme d&apos;Évaluation Managériale
          </div>
          <h1 className="heroTitle">
            Diagnostiquer la<br />
            <span className="heroHighlight">Communication</span><br />
            Managériale
          </h1>
          <p className="heroSubtitle">
            Un outil puissant pour mesurer, analyser et améliorer les pratiques
            de communication au sein de votre organisation.
          </p>
          <div className="heroActions">
            <Link href="/survey" className="btnPrimary">
              Remplir le Questionnaire
            </Link>
            <Link href="/dashboard" className="btnSecondary">
              Voir les Résultats
            </Link>
          </div>
          <div className="heroMeta">
            <div className="metaItem">
              <span className="metaNumber">35</span>
              <span className="metaLabel">Questions</span>
            </div>
            <div className="metaDivider"></div>
            <div className="metaItem">
              <span className="metaNumber">5</span>
              <span className="metaLabel">Dimensions</span>
            </div>
            <div className="metaDivider"></div>
            <div className="metaItem">
              <span className="metaNumber">~8</span>
              <span className="metaLabel">Minutes</span>
            </div>
          </div>
        </div>
        <div className="heroVisual">
          <div className="visualCard visualCardMain">
            <div className="visualCardHeader">
              <span className="visualDot"></span>
              <span className="visualDot"></span>
              <span className="visualDot"></span>
            </div>
            <div className="visualContent">
              <div className="visualLabel">Score Global</div>
              <div className="visualScore">3.2<span>/4</span></div>
              <div className="visualBar">
                <div className="visualBarFill" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
          <div className="visualCard visualCardClarity">
            <div className="visualLabel">Clarté</div>
            <div className="visualMiniScore">3.5</div>
          </div>
          <div className="visualCard visualCardEcoute">
            <div className="visualLabel">Écoute</div>
            <div className="visualMiniScore">2.9</div>
          </div>
          <div className="visualCard visualCardTransp">
            <div className="visualLabel">Transparence</div>
            <div className="visualMiniScore">3.1</div>
          </div>
          <div className="visualCard visualCardCoh">
            <div className="visualLabel">Cohérence</div>
            <div className="visualMiniScore">3.4</div>
          </div>
          <div className="visualCard visualCardAccess">
            <div className="visualLabel">Accessibilité</div>
            <div className="visualMiniScore">2.8</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features sectionLight">
        <div className="sectionHeader">
          <div className="sectionBadge">Fonctionnalités</div>
          <h2>Tout ce dont vous avez besoin</h2>
          <p>Une solution complète pour évaluer et améliorer la communication managériale</p>
        </div>
        <div className="featuresGrid">
          <div className="featureCard">
            <div className="featureIcon"></div>
            <h3>100% Anonyme</h3>
            <p>Aucune donnée personnelle n&apos;est collectée. Les répondants peuvent s&apos;exprimer en toute confiance.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"></div>
            <h3>Dashboard en Temps Réel</h3>
            <p>Visualisez instantanément les résultats agrégés avec des graphiques interactifs et des KPIs clairs.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"></div>
            <h3>5 Dimensions Mesurées</h3>
            <p>Clarté, Écoute, Transparence, Cohérence et Accessibilité pour une analyse approfondie.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"></div>
            <h3>Rapide et Simple</h3>
            <p>35 questions structurées avec une interface intuitive. Durée moyenne : 5 à 10 minutes.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"></div>
            <h3>Multi-Supports</h3>
            <p>Accessible sur desktop, tablette et mobile. Partagez facilement via email, WhatsApp ou QR code.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon"></div>
            <h3>Intégration Google Sheets</h3>
            <p>Stockage automatique des réponses dans Google Sheets pour une analyse approfondie.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="method" className="howItWorks sectionDark">
        <div className="sectionHeader">
          <div className="sectionBadge">Comment ça marche</div>
          <h2>Simple en 4 étapes</h2>
        </div>
        <div className="stepsContainer">
          <div className="step">
            <div className="stepNumber">01</div>
            <div className="stepContent">
              <h3>Partagez</h3>
              <p>Envoyez le lien du questionnaire à vos équipes par email, WhatsApp ou cualquier autre canal.</p>
            </div>
            <div className="stepConnector"></div>
          </div>
          <div className="step">
            <div className="stepNumber">02</div>
            <div className="stepContent">
              <h3>Répondez</h3>
              <p>Les employés remplissent le formulaire anonyme en quelques minutes.</p>
            </div>
            <div className="stepConnector"></div>
          </div>
          <div className="step">
            <div className="stepNumber">03</div>
            <div className="stepContent">
              <h3>Collectez</h3>
              <p>Les réponses sont automatiquement stockées dans Google Sheets.</p>
            </div>
            <div className="stepConnector"></div>
          </div>
          <div className="step">
            <div className="stepNumber">04</div>
            <div className="stepContent">
              <h3>Analysez</h3>
              <p>Consultez le dashboard sécurisé pour visualiser les résultats et identifier les axes d&apos;amélioration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="dimensions sectionLight">
        <div className="sectionHeader">
          <div className="sectionBadge">Les 5 Dimensions</div>
          <h2>Ce que nous mesurons</h2>
        </div>
        <div className="dimensionsGrid">
          <div className="dimensionCard dimensionClarity">
            <div className="dimensionIcon"></div>
            <h3>Clarté</h3>
            <p>Questions Q6-Q11</p>
            <p className="dimensionDesc">Précision des objectifs, instructions et délais communicate par le manager.</p>
          </div>
          <div className="dimensionCard dimensionEcoute">
            <div className="dimensionIcon"></div>
            <h3>Écoute</h3>
            <p>Questions Q12-Q17</p>
            <p className="dimensionDesc">Capacité à recevoir le feedback et à favoriser le dialogue ouvert.</p>
          </div>
          <div className="dimensionCard dimensionTransp">
            <div className="dimensionIcon"></div>
            <h3>Transparence</h3>
            <p>Questions Q18-Q23</p>
            <p className="dimensionDesc">Partage d&apos;information et implication dans les décisions.</p>
          </div>
          <div className="dimensionCard dimensionCoh">
            <div className="dimensionIcon"></div>
            <h3>Cohérence</h3>
            <p>Questions Q24-Q29</p>
            <p className="dimensionDesc">Alignement entre le discours et les actions du manager.</p>
          </div>
          <div className="dimensionCard dimensionAccess">
            <div className="dimensionIcon"></div>
            <h3>Accessibilité</h3>
            <p>Questions Q30-Q33</p>
            <p className="dimensionDesc">Disponibilité et proximité managériale.</p>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="privacy sectionDark">
        <div className="privacyContent">
          <div className="sectionBadge light">Vie Privée Garantie</div>
          <h2>Vos données restent privées</h2>
          <p>Cette plateforme est conçue avec la confidentialité au cœur de son fonctionnement.
             Aucune donnée permettant d&apos;identifier un répondant n&apos;est collectée.</p>
          <div className="privacyFeatures">
            <div className="privacyFeature">
              <span className="checkIcon"></span>
              <span>Aucune donnée personnelle collectée</span>
            </div>
            <div className="privacyFeature">
              <span className="checkIcon"></span>
              <span>Résultats affichés de manière agrégée</span>
            </div>
            <div className="privacyFeature">
              <span className="checkIcon"></span>
              <span>Dashboard protégé par mot de passe</span>
            </div>
          </div>
        </div>
        <div className="privacyVisual">
          <div className="shieldIcon"></div>
          <div className="shieldText">Anonymat<br/>Total</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta sectionLight">
        <div className="ctaContent">
          <h2>Prêt à évaluer la communication managériale ?</h2>
          <p>Commencez en moins de 5 minutes. Aucune installation requise.</p>
          <div className="ctaButtons">
            <Link href="/survey" className="btnPrimary btnLarge">
              Commencer le Questionnaire
            </Link>
            <Link href="/dashboard" className="btnSecondary btnLarge">
              Voir les Résultats
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerContent">
          <div className="footerBrand">
            <span className="navLogo"></span>
            <span>GRH Platform</span>
            <p>Plateforme d&apos;évaluation de la communication managériale</p>
            <div className="footerHighlights">
              <span>35 questions</span>
              <span>5 dimensions</span>
              <span>100% anonyme</span>
            </div>
          </div>
          <div className="footerLinks">
            <div className="footerColumn">
              <h4>Raccourcis</h4>
              <div className="footerNavList">
                <a href="#features">Fonctionnalités</a>
                <a href="#method">Méthodologie</a>
                <a href="#privacy">Confidentialité</a>
              </div>
            </div>
            <div id="contact" className="footerColumn footerContact">
              <h4>Contact</h4>
              <p className="contactIntro">Equipe de recherche</p>
              <div className="contactList">
                <div className="personCard">
                  <div className="personHeader">
                    <p className="personName">Nouary Lhoussaine</p>
                    <a href="https://www.linkedin.com/in/nouary-lhoussaine/" target="_blank" rel="noopener" className="personLinkedin">LinkedIn</a>
                  </div>
                  <a href="mailto:lhoussaine.nouary@usmba.ac.ma" className="personEmail">lhoussaine.nouary@usmba.ac.ma</a>
                </div>
                <div className="personCard">
                  <div className="personHeader">
                    <p className="personName">Faiza Al Houz</p>
                    <a href="https://www.linkedin.com/in/faiza-al-houz-456b1b319" target="_blank" rel="noopener" className="personLinkedin">LinkedIn</a>
                  </div>
                  <a href="mailto:faiza.alhouz@usmba.ac.ma" className="personEmail">faiza.alhouz@usmba.ac.ma</a>
                </div>
                <div className="personCard">
                  <div className="personHeader">
                    <p className="personName">Meryam Es-Sofi</p>
                    <a href="https://www.linkedin.com/in/meryam-es-sofi-0468b02b6" target="_blank" rel="noopener" className="personLinkedin">LinkedIn</a>
                  </div>
                  <a href="mailto:meryamessofi@yahoo.com" className="personEmail">meryamessofi@yahoo.com</a>
                </div>
                <div className="personCard">
                  <div className="personHeader">
                    <p className="personName">Mouhsine El Boukhliki</p>
                    <a href="https://www.linkedin.com/in/mouhsine-el-boukhliki" target="_blank" rel="noopener" className="personLinkedin">LinkedIn</a>
                  </div>
                  <a href="mailto:mouhsinelboukhliki@gmail.com" className="personEmail">mouhsinelboukhliki@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>© 2026 GRH Platform — Questionnaire de Communication Managériale</p>
        </div>
      </footer>

      <style jsx>{`
        /* Navigation */
        .topNav {
          position: fixed;
          top: 1rem;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0 1.5rem;
        }
        .navContainer {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0.65rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(245, 240, 232, 0.82);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 999px;
          box-shadow: 0 10px 35px rgba(26, 26, 46, 0.12);
        }
        .navBrand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 600;
          font-size: 1.2rem;
          color: var(--ink);
          text-decoration: none;
        }
        .navLogo {
          width: 24px;
          height: 24px;
          background: var(--gold);
          border-radius: 4px;
          transform: rotate(45deg);
          display: inline-block;
        }
        .navLinks {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .navLink {
          color: var(--ink);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.45rem 0.9rem;
          border-radius: 10px;
          border: 1px solid rgba(26, 26, 46, 0.15);
          background: rgba(255, 255, 255, 0.55);
          transition: all 0.25s;
        }
        .navLink:hover {
          border-color: rgba(201, 168, 76, 0.6);
          background: rgba(201, 168, 76, 0.18);
        }
        .navLinkPrimary {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
          box-shadow: 0 4px 14px rgba(201, 168, 76, 0.35);
        }
        .navMeta {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: rgba(26, 26, 46, 0.7);
          padding-right: 0.35rem;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 8rem 4rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .heroBackground {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .heroShape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }
        .heroShape1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, var(--gold) 0%, #d4b35a 100%);
          top: -100px;
          right: 20%;
          animation: float 8s ease-in-out infinite;
        }
        .heroShape2 {
          width: 300px;
          height: 300px;
          background: var(--rust);
          bottom: 10%;
          left: -50px;
          animation: float 10s ease-in-out infinite reverse;
          opacity: 0.2;
        }
        .heroShape3 {
          width: 200px;
          height: 200px;
          background: var(--sage);
          top: 40%;
          right: -50px;
          animation: float 6s ease-in-out infinite;
          opacity: 0.2;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        .heroContent {
          position: relative;
          z-index: 1;
        }
        .heroBadge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(201, 168, 76, 0.15);
          color: var(--gold);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .badgeDot {
          width: 8px;
          height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .heroTitle {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          color: var(--ink);
          margin-bottom: 1.5rem;
        }
        .heroHighlight {
          background: linear-gradient(135deg, var(--gold) 0%, #d4b35a 50%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .heroSubtitle {
          font-size: 1.2rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 500px;
        }
        .heroActions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .btnPrimary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.75rem;
          background: linear-gradient(135deg, var(--gold) 0%, #d4b35a 100%);
          color: var(--ink);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(201, 168, 76, 0.3);
        }
        .btnPrimary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(201, 168, 76, 0.4);
        }
        .btnSecondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.75rem;
          background: transparent;
          color: var(--ink);
          border: 2px solid var(--ink);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }
        .btnSecondary:hover {
          background: var(--ink);
          color: var(--cream);
        }
        .btnIcon {
          font-size: 1.1rem;
        }
        .heroMeta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .metaItem {
          display: flex;
          flex-direction: column;
        }
        .metaNumber {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--ink);
        }
        .metaLabel {
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .metaDivider {
          width: 1px;
          height: 40px;
          background: #ddd;
        }

        /* Hero Visual */
        .heroVisual {
          position: relative;
          height: 500px;
        }
        .visualCard {
          position: absolute;
          background: var(--white);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 10px 40px rgba(26, 26, 46, 0.1);
        }
        .visualCardMain {
          width: 280px;
          height: 220px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        .visualCardHeader {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .visualDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--rust);
        }
        .visualDot:nth-child(2) { background: var(--gold); }
        .visualDot:nth-child(3) { background: var(--sage); }
        .visualContent {
          text-align: center;
        }
        .visualLabel {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .visualScore {
          font-size: 3rem;
          font-weight: 700;
          color: var(--ink);
        }
        .visualScore span {
          font-size: 1.2rem;
          color: #999;
        }
        .visualBar {
          height: 6px;
          background: #eee;
          border-radius: 3px;
          margin-top: 1rem;
          overflow: hidden;
        }
        .visualBarFill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold) 0%, var(--sage) 100%);
          border-radius: 3px;
        }
        .visualCardClarity { top: 5%; right: 15%; }
        .visualCardEcoute { top: 15%; left: 5%; }
        .visualCardTransp { bottom: 20%; right: 5%; }
        .visualCardCoh { bottom: 10%; left: 15%; }
        .visualCardAccess { bottom: 25%; right: 25%; }
        .visualMiniScore {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink);
        }
        .dimensionClarity .visualMiniScore { color: var(--gold); }
        .dimensionEcoute .visualMiniScore { color: var(--rust); }
        .dimensionTransp .visualMiniScore { color: var(--sage); }
        .dimensionCoh .visualMiniScore { color: #6b5b95; }
        .dimensionAccess .visualMiniScore { color: #45b8ac; }

        /* Features */
        .features {
          padding: 6rem 4rem;
          background: linear-gradient(135deg, var(--surface-light-alt) 0%, var(--surface-light) 100%);
        }
        .sectionLight {
          --section-heading: var(--text-on-light);
          --section-text: var(--text-on-light-muted);
        }
        .sectionDark {
          --section-heading: var(--text-on-dark);
          --section-text: var(--text-on-dark-muted);
        }
        .sectionHeader h2 {
          font-size: 2.5rem;
          color: var(--section-heading);
          margin-bottom: 1rem;
        }
        .sectionHeader {
          text-align: center;
          margin-bottom: 4rem;
        }
        .sectionBadge {
          display: inline-block;
          background: var(--gold);
          color: var(--ink);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .sectionBadge.light {
          background: rgba(255, 255, 255, 0.15);
          color: var(--cream);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .sectionHeader h2 {
          font-size: 2.5rem;
          color: var(--cream);
          margin-bottom: 1rem;
        }
        .sectionHeader p {
          color: var(--section-text);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .featuresGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .featureCard {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(201, 168, 76, 0.35);
          box-shadow: 0 12px 32px rgba(26, 26, 46, 0.08);
          border-radius: 16px;
          transition: all 0.3s;
        }
        .featureCard:hover {
          transform: translateY(-5px);
          background: var(--white);
          border-color: var(--gold);
        }
        .featureIcon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--gold) 0%, #d4b35a 100%);
          border-radius: 12px;
          position: relative;
        }
        .featureIcon::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--ink);
        }
        .featureCard:nth-child(1) .featureIcon { border-radius: 50%; }
        .featureCard:nth-child(1) .featureIcon::after { width: 16px; height: 16px; border-radius: 50%; }

        .featureCard:nth-child(2) .featureIcon::after { width: 20px; height: 14px; border-radius: 2px; }

        .featureCard:nth-child(3) .featureIcon::after {
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 16px solid var(--ink);
          background: transparent;
        }

        .featureCard:nth-child(4) .featureIcon::after {
          width: 18px; height: 18px;
          border: 3px solid var(--ink);
          border-radius: 50%;
          background: transparent;
        }

        .featureCard:nth-child(5) .featureIcon { border-radius: 8px; }
        .featureCard:nth-child(5) .featureIcon::after {
          width: 14px; height: 20px;
          border: 3px solid var(--ink);
          border-radius: 7px 7px 4px 4px;
          background: transparent;
        }

        .featureCard:nth-child(6) .featureIcon::after {
          width: 18px; height: 12px;
          border: 3px solid var(--ink);
          border-radius: 2px;
          background: transparent;
          transform: translate(-50%, -50%) rotate(-15deg);
        }
        .featureCard h3 {
          font-size: 1.2rem;
          color: var(--ink);
          margin-bottom: 0.75rem;
        }
        .featureCard p {
          color: rgba(26, 26, 46, 0.72);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* How It Works */
        .howItWorks {
          padding: 6rem 4rem;
          background: linear-gradient(135deg, var(--surface-dark) 0%, var(--surface-dark-alt) 100%);
        }
        .stepsContainer {
          display: flex;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        .step {
          flex: 1;
          text-align: center;
          position: relative;
          padding: 0 1.5rem;
        }
        .stepNumber {
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--gold);
          opacity: 0.4;
          margin-bottom: 1rem;
        }
        .stepContent h3 {
          font-size: 1.25rem;
          color: var(--section-heading);
          margin-bottom: 0.75rem;
        }
        .stepContent p {
          color: var(--section-text);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .stepConnector {
          position: absolute;
          top: 2.5rem;
          right: -10%;
          width: 20%;
          height: 2px;
          background: linear-gradient(90deg, var(--gold) 0%, transparent 100%);
        }

        /* Dimensions */
        .dimensions {
          padding: 6rem 4rem;
          background: linear-gradient(135deg, #f9f4ea 0%, #efe5d4 100%);
        }
        .dimensionsGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .dimensionCard {
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s;
        }
        .dimensionCard:hover {
          transform: translateY(-5px);
        }
        .dimensionIcon {
          width: 50px;
          height: 50px;
          margin: 0 auto 0.75rem;
          background: var(--ink);
          border-radius: 50%;
          position: relative;
        }
        .dimensionIcon::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: var(--gold);
          border-radius: 2px;
        }
        .dimensionEcoute .dimensionIcon { background: var(--rust); }
        .dimensionEcoute .dimensionIcon::after { background: var(--cream); }
        .dimensionTransp .dimensionIcon { background: var(--sage); }
        .dimensionTransp .dimensionIcon::after { background: var(--cream); }
        .dimensionCoh .dimensionIcon { background: #6b5b95; }
        .dimensionCoh .dimensionIcon::after { background: var(--cream); }
        .dimensionAccess .dimensionIcon { background: #45b8ac; }
        .dimensionAccess .dimensionIcon::after { background: var(--cream); }
        .dimensionCard h3 {
          font-size: 1rem;
          color: var(--ink);
          margin-bottom: 0.25rem;
        }
        .dimensionCard p {
          font-size: 0.75rem;
          color: rgba(26, 26, 46, 0.72);
          margin-bottom: 0.5rem;
        }
        .dimensionDesc {
          font-size: 0.8rem !important;
          color: rgba(26, 26, 46, 0.75) !important;
          line-height: 1.5;
        }
        .dimensionCard {
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s;
          border: 1px solid transparent;
        }
        .dimensionCard:hover {
          transform: translateY(-5px);
          border-color: var(--gold);
          box-shadow: 0 10px 30px rgba(26, 26, 46, 0.1);
        }
        .dimensionClarity {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.04) 100%);
          border-color: rgba(201, 168, 76, 0.25);
        }
        .dimensionEcoute {
          background: linear-gradient(135deg, rgba(139, 58, 58, 0.1) 0%, rgba(139, 58, 58, 0.04) 100%);
          border-color: rgba(139, 58, 58, 0.2);
        }
        .dimensionTransp {
          background: linear-gradient(135deg, rgba(74, 103, 65, 0.1) 0%, rgba(74, 103, 65, 0.04) 100%);
          border-color: rgba(74, 103, 65, 0.2);
        }
        .dimensionCoh {
          background: linear-gradient(135deg, rgba(107, 91, 149, 0.1) 0%, rgba(107, 91, 149, 0.04) 100%);
          border-color: rgba(107, 91, 149, 0.2);
        }
        .dimensionAccess {
          background: linear-gradient(135deg, rgba(69, 184, 172, 0.1) 0%, rgba(69, 184, 172, 0.04) 100%);
          border-color: rgba(69, 184, 172, 0.2);
        }

        /* Privacy */
        .privacy {
          padding: 6rem 4rem;
          background: linear-gradient(135deg, var(--surface-dark) 0%, var(--surface-dark-alt) 100%);
          color: var(--text-on-dark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
        }
        .privacyContent {
          flex: 1;
        }
        .privacyContent h2 {
          font-size: 2.2rem;
          margin-bottom: 1rem;
          color: var(--section-heading);
        }
        .privacyContent > p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--section-text);
          margin-bottom: 2rem;
          max-width: 500px;
        }
        .privacyFeatures {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .privacyFeature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
        }
        .checkIcon {
          width: 24px;
          height: 24px;
          background: var(--sage);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .checkIcon::after {
          content: '';
          width: 8px;
          height: 12px;
          border: 2px solid var(--cream);
          border-top: none;
          border-left: none;
          transform: rotate(45deg) translateY(-1px);
        }
        .privacyVisual {
          text-align: center;
        }
        .shieldIcon {
          width: 120px;
          height: 140px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--gold) 0%, #d4b35a 100%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          position: relative;
        }
        .shieldIcon::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 70px;
          background: var(--ink);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .shieldText {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
        }

        /* CTA */
        .cta {
          padding: 6rem 4rem;
          background: linear-gradient(135deg, var(--surface-light-alt) 0%, #f1e8d8 100%);
          text-align: center;
        }
        .ctaContent h2 {
          font-size: 2.5rem;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .ctaContent > p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }
        .ctaButtons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .btnLarge {
          padding: 1.25rem 2.5rem;
          font-size: 1.1rem;
        }

        /* Footer */
        .footer {
          background: linear-gradient(145deg, #121224 0%, #1a1a2e 50%, #23233b 100%);
          color: var(--cream);
          padding: 4.5rem 4rem 2rem;
        }
        .footerContent {
          display: grid;
          grid-template-columns: 1.2fr 2fr;
          max-width: 1200px;
          margin: 0 auto;
          gap: 3rem;
        }
        .footerBrand {
          max-width: 360px;
        }
        .footerBrand .navLogo {
          font-size: 2rem;
        }
        .footerBrand span:first-of-type {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 600;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .footerBrand p {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.6;
        }
        .footerHighlights {
          margin-top: 1.25rem;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .footerHighlights span {
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--cream);
          opacity: 0.9;
          border: 1px solid rgba(245, 240, 232, 0.2);
          border-radius: 999px;
          padding: 0.3rem 0.55rem;
        }
        .footerLinks {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        .footerNavList {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .footerColumn h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
          color: var(--gold);
        }
        .footerColumn a {
          display: block;
          color: var(--cream);
          text-decoration: none;
          font-size: 0.95rem;
          opacity: 0.8;
          transition: color 0.3s, opacity 0.3s;
        }
        .footerColumn a:hover {
          opacity: 1;
          color: var(--gold);
        }
        .footerContact {
          min-width: 280px;
        }
        .contactIntro {
          font-size: 0.85rem;
          color: rgba(245, 240, 232, 0.7);
          margin-bottom: 0.75rem;
        }
        .contactList {
          display: grid;
          gap: 0.6rem;
        }
        .personCard {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(201, 168, 76, 0.28);
          border-radius: 10px;
          padding: 0.7rem 0.8rem;
          transition: all 0.25s;
        }
        .personCard:hover {
          border-color: rgba(201, 168, 76, 0.7);
          background: rgba(201, 168, 76, 0.1);
        }
        .personHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.35rem;
        }
        .personName {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--cream);
        }
        .personLinkedin {
          text-decoration: none;
          font-size: 0.74rem;
          color: var(--ink);
          background: var(--gold);
          padding: 0.2rem 0.45rem;
          border-radius: 999px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .personLinkedin:hover {
          background: #b8943f;
        }
        .personEmail {
          font-size: 0.78rem;
          color: rgba(245, 240, 232, 0.75);
          text-decoration: none;
          border-bottom: 1px dashed rgba(245, 240, 232, 0.2);
          width: fit-content;
        }
        .personEmail:hover {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }
        .footerBottom {
          text-align: center;
          padding-top: 2rem;
          margin-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footerBottom p {
          font-size: 0.85rem;
          opacity: 0.6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .topNav {
            top: 0.5rem;
            padding: 0 0.75rem;
          }
          .navContainer {
            border-radius: 12px;
          }
          .navMeta {
            display: none;
          }
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 7rem 2rem 3rem;
          }
          .heroSubtitle {
            margin: 0 auto 2rem;
          }
          .heroActions {
            justify-content: center;
          }
          .heroMeta {
            justify-content: center;
          }
          .heroVisual {
            display: none;
          }
          .featuresGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stepsContainer {
            flex-direction: column;
            gap: 2rem;
          }
          .stepConnector {
            display: none;
          }
          .dimensionsGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .privacy {
            flex-direction: column;
            text-align: center;
          }
          .footerContent {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .navLinks {
            display: none;
          }
          .heroTitle {
            font-size: 2.5rem;
          }
          .featuresGrid {
            grid-template-columns: 1fr;
          }
          .dimensionsGrid {
            grid-template-columns: 1fr;
          }
          .ctaButtons {
            flex-direction: column;
          }
          .footerContent {
            flex-direction: column;
          }
          .footerLinks {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}

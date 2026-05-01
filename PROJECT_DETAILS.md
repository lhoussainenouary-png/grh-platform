# Project Details: GRH Platform - Managerial Communication Questionnaire

## 📌 Project Overview
The **GRH Platform** is a specialized digital tool designed for Human Resources (HR) professionals and researchers to assess, visualize, and analyze **managerial communication** within organizations. It provides a seamless transition from data collection via a multi-step survey to real-time analysis through an advanced dashboard.

### Core Value Proposition
- **Structured Assessment**: Uses a validated v2.0 instrument with 27 targeted questions.
- **Enhanced UX**: A wizard-style survey featuring section-specific mascots and progress tracking.
- **Advanced Analytics**: Beyond simple averages, it calculates psychometric indicators like **Cronbach's Alpha** and **IQC (Index of Communication Quality)**.
- **Privacy First**: Built-in anonymization for demographic groups with 5 or fewer respondents.
- **Serverless Backend**: Leverages Google Apps Script and Google Sheets for a cost-effective, maintainable data pipeline.

---

## 🏗️ Architecture & Technology Stack

### Frontend: Next.js 14
- **Framework**: Next.js (App Router) for a modern, responsive single-page application experience.
- **State Management**: React `useState` and `useMemo` for handling survey progress and dashboard data parsing.
- **Styling**: Vanilla CSS for deep customization and consistency across the survey and dashboard.
- **Visualizations**: `Chart.js` with `react-chartjs-2` for interactive charts (Radar, Bar, Pie, Line, Doughnut).

### Backend: Google Apps Script (GAS)
- **Functionality**: Handles incoming POST requests from the survey and manages the Google Sheet storage.
- **Automation**: Automatically initializes the header row on the first submission to ensure data integrity.
- **Export**: Provides a CORS-friendly CSV export for the dashboard.

### External Integrations
- **Google Sheets**: Acts as the primary database.
- **OpenRouter API**: (Optional/Planned) Integrated for sentiment analysis of open-ended responses (Q26 & Q27).
- **Docx/File-Saver**: Enables downloading reports in document format.

---

## 📊 Data Model (Survey v2.0)

The survey is structured into **7 distinct steps**, comprising 27 questions:

1. **Demographics (Q1–Q5)**: Department, Education, Seniority, Hierarchy, and Age.
2. **Dimension 1: Clarté (Q6–Q9)**: Clarity of objectives and instructions.
3. **Dimension 2: Écoute (Q10–Q13)**: Active listening and feedback.
4. **Dimension 3: Transparence (Q14–Q17)**: Openness regarding decisions and changes.
5. **Dimension 4: Cohérence (Q18–Q21)**: Alignment between words and actions.
6. **Dimension 5: Accessibilité (Q22–Q25)**: Manager availability and openness.
7. **Open Feedback (Q26–Q27)**: Qualitative input on strengths and areas for improvement.

*Note: Likert questions (Q6–Q25) use a 4-point scale: Jamais, Rarement, Souvent, Toujours.*

---

## 📈 Dashboard & Statistical Methodology

The dashboard transforms raw CSV data into actionable insights using several key metrics:

### 1. IQC (Index of Communication Quality)
A weighted average of the five communication dimensions, prioritized as follows:
- **Clarté**: 28%
- **Écoute**: 26%
- **Transparence**: 22%
- **Cohérence**: 14%
- **Accessibilité**: 10%

### 2. Cronbach's Alpha (Reliability)
Measures the internal consistency of each dimension. The dashboard provides an interpretation (e.g., "Excellent", "Acceptable", "Insufficient") based on standard psychometric thresholds (α ≥ 0.70).

### 3. Kaiser Level (Sample Adequacy)
Indicates the reliability of the dataset based on sample size:
- **n ≥ 200**: Reliable for advanced analysis.
- **30 ≤ n < 200**: Indicative trends.
- **n < 30**: Insufficient (interpret with caution).

### 4. Dynamic Anonymization
To protect individual privacy, any demographic category (e.g., a specific department) with 5 or fewer responses is automatically merged into a **"Masqué (≤5 répondants)"** category in charts.

---

## 🛠️ Configuration & Environment

The project relies on specific environment variables for connectivity:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | The Web App URL from Google Apps Script deployment. |
| `NEXT_PUBLIC_CSV_URL` | The "Publish to Web" CSV URL from the Google Sheet. |
| `NEXT_PUBLIC_DASHBOARD_PASSWORD` | Security code for dashboard access (Default: `GESI2026`). |
| `OPENROUTER_API_KEY` | (Optional) API key for AI-driven sentiment analysis. |

---

## 🚀 Deployment Workflow

1. **Google Apps Script**:
   - Create a Google Sheet.
   - Paste `google-script.gs` into the script editor.
   - Deploy as a Web App (Access: Anyone).
2. **Next.js**:
   - Set environment variables in `.env.local`.
   - Run `npm install` and `npm run build`.
   - Deploy to Vercel, Netlify, or similar.
3. **CSV Publication**:
   - In Google Sheets: File > Share > Publish to web > CSV.

---

## 📝 Current Status & Roadmap
- [x] v2.0 Survey Instrument Integration.
- [x] Multi-step Wizard with Mascots.
- [x] Advanced Statistical Library (`lib/surveyStats.js`).
- [x] Dashboard Anonymization Logic.
- [ ] AI Sentiment Analysis (OpenRouter Integration) - *In Progress*.
- [ ] Improved Report Generation Styling - *Planned*.

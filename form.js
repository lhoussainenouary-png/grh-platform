/**
 * form.js - Gestion de la soumission du questionnaire
 * Envoie les données vers Google Apps Script via fetch API
 */

// =====================================================
// CONFIGURATION - À modifier avec votre URL Google Apps Script
// =====================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/VOTRE_ID_DE_SCRIPT/exec';

// =====================================================
// Éléments du DOM
// =====================================================
const surveyForm = document.getElementById('surveyForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// =====================================================
// Gestion de la soumission du formulaire
// =====================================================
surveyForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // Empêche le comportement par défaut

  // Vérifie que le formulaire est valide
  if (!surveyForm.checkValidity()) {
    alert('Veuillez répondre à toutes les questions obligatoires.');
    return;
  }

  // Affiche l'état de chargement
  setLoadingState(true);

  // Récupère les données du formulaire
  const formData = new FormData(surveyForm);
  const data = Object.fromEntries(formData.entries());

  try {
    // Envoie les données à Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important pour éviter les erreurs CORS
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString()
    });

    // Affiche le message de succès
    showSuccessMessage();

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    setLoadingState(false);
  }
});

/**
 * Affiche l'état de chargement sur le bouton
 * @param {boolean} isLoading - État de chargement
 */
function setLoadingState(isLoading) {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Envoi en cours...';
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer mes réponses';
  }
}

/**
 * Affiche le message de succès et cache le formulaire
 */
function showSuccessMessage() {
  surveyForm.style.display = 'none';
  successMessage.style.display = 'block';

  // Fait défiler la page vers le message de succès
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Validation en temps réel des champs requis
 * Ajoute un feedback visuel lorsque l'utilisateur remplit le formulaire
 */
document.querySelectorAll('select, input[type="radio"]').forEach(function(input) {
  input.addEventListener('change', function() {
    // Retire les styles d'erreur si présents
    this.closest('.question-card')?.classList.remove('error');
  });
});

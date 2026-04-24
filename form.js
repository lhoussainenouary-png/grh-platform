/**
 * form.js - Gestion de la soumission du questionnaire
 * Envoie les données vers Google Apps Script via fetch API
 */

// =====================================================
// CONFIGURATION - À modifier avec votre URL Google Apps Script
// =====================================================
// Préférez le questionnaire Next.js (/survey) avec NEXT_PUBLIC_GOOGLE_SCRIPT_URL dans .env.local
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/VOTRE_NOUVEAU_DEPLOIEMENT/exec';

// =====================================================
// Éléments du DOM
// =====================================================
const surveyForm = document.getElementById('surveyForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Hide the original submit button (we use custom navigation)
if (submitBtn) {
  submitBtn.style.display = 'none';
}

// =====================================================
// GESTION DES SECTIONS
// =====================================================
let currentSection = 1;
const totalSections = 7;

/**
 * Initialize section visibility on page load
 */
function initSections() {
  // Hide all sections except the first one
  document.querySelectorAll('.section').forEach((section, index) => {
    if (index === 0) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

/**
 * Validate current section before moving to next
 * @returns {boolean} - true if valid, false otherwise
 */
function validateCurrentSection() {
  const currentSectionEl = document.querySelector(`.section[data-section="${currentSection}"]`);
  const inputs = currentSectionEl.querySelectorAll('input[required], select[required], textarea[required]');

  let isValid = true;
  let firstInvalidInput = null;

  inputs.forEach(input => {
    if (input.type === 'radio') {
      // For radio buttons, check if any in the group is checked
      const radioGroup = currentSectionEl.querySelectorAll(`input[name="${input.name}"]`);
      const isChecked = Array.from(radioGroup).some(radio => radio.checked);
      if (!isChecked) {
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = radioGroup[0];
      }
    } else if (!input.value || input.value.trim() === '') {
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = input;
    }
  });

  if (!isValid && firstInvalidInput) {
    // Scroll to the first invalid input
    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    alert('Veuillez répondre à toutes les questions obligatoires de cette section avant de continuer.');
  }

  return isValid;
}

/**
 * Go to a specific section
 * @param {number} sectionNumber - The section number to navigate to
 */
function goToSection(sectionNumber) {
  // Validate current section if moving forward
  if (sectionNumber > currentSection) {
    if (!validateCurrentSection()) {
      return;
    }
  }

  // Hide current section
  const currentSectionEl = document.querySelector(`.section[data-section="${currentSection}"]`);
  if (currentSectionEl) {
    currentSectionEl.classList.remove('active');
  }

  // Update current section
  currentSection = sectionNumber;

  // Show new section
  const newSectionEl = document.querySelector(`.section[data-section="${currentSection}"]`);
  if (newSectionEl) {
    newSectionEl.classList.add('active');
    // Scroll to top of the section
    newSectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Submit the final form
 */
function submitFinalForm() {
  // Validate current section first
  if (!validateCurrentSection()) {
    return;
  }

  // Trigger the form submission
  surveyForm.requestSubmit();
}

// Initialize sections on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSections);
} else {
  initSections();
}

// =====================================================
// LANDING PAGE FUNCTIONS
// =====================================================

/**
 * Start the survey - hide landing page and show first section
 */
function startSurvey() {
  const landingPage = document.getElementById('landingPage');
  const surveyContainer = document.getElementById('surveyContainer');

  if (landingPage && surveyContainer) {
    // Hide landing page
    landingPage.classList.add('hidden');
    // Show survey container
    surveyContainer.style.display = 'block';
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

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

  // Also hide section navigation if present
  const navButtons = document.querySelectorAll('.section-navigation');
  navButtons.forEach(nav => nav.style.display = 'none');

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

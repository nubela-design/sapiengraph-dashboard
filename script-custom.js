document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[name="radioCancel"]');
  const textareaCard = document.getElementById('textareaCard');
  const elaborateTextarea = document.getElementById('elaborateTextarea');
  const lowerPricingCard = document.getElementById('lowerPricingCard');
  const technicalSupportText = document.getElementById('technicalSupportText');
  const helpResourcesCard = document.getElementById('helpResourcesCard');
  const nextButton = document.querySelector('.btn-outline-success');
  const warningMessage = document.getElementById('warningMessage');

  // Options that should show textarea
  const textareaOptions = ['radioCancel2', 'radioCancel4', 'radioCancel6', 'radioCancel8'];

  // Custom placeholders for each option
  const placeholders = {
    'radioCancel2': 'Tell us what you need...',
    'radioCancel4': 'What features are you looking for?',
    'radioCancel6': 'Which provider are you switching to?',
    'radioCancel8': 'Tell us why...'
  };

  // Check if any radio button is selected
  function isReasonSelected() {
    return Array.from(radioButtons).some(radio => radio.checked);
  }

  // Handle next button click
  nextButton.addEventListener('click', function(e) {
    if (!isReasonSelected()) {
      e.preventDefault();
      warningMessage.classList.remove('d-none');
      // Scroll to warning message
      warningMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Hide warning when a radio is selected
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      // Hide warning message if shown
      warningMessage.classList.add('d-none');

      // Hide all cards first
      textareaCard.classList.add('d-none');
      lowerPricingCard.classList.add('d-none');
      technicalSupportText.classList.add('d-none');
      helpResourcesCard.classList.add('d-none');
      elaborateTextarea.value = '';

      // Reset button text to default
      nextButton.textContent = 'Next to cancelation';

      // Handle specific cases
      if (textareaOptions.includes(this.id)) {
        textareaCard.classList.remove('d-none');
        elaborateTextarea.placeholder = placeholders[this.id];
        elaborateTextarea.focus();
      } 
      else if (this.id === 'radioCancel3') { // Out of budget option
        lowerPricingCard.classList.remove('d-none');
        nextButton.textContent = 'Decline offer';
      }
      else if (this.id === 'radioCancel5') { // Technical issues
        technicalSupportText.classList.remove('d-none');
      }
      else if (this.id === 'radioCancel7') { // Not sure how to use
        helpResourcesCard.classList.remove('d-none');
      }
    });
  });
});
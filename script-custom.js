document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[name="radioCancel"]');
  const textareaCard = document.getElementById('textareaCard');
  const elaborateTextarea = document.getElementById('elaborateTextarea');
  const lowerPricingCard = document.getElementById('lowerPricingCard');

  // Options that should show textarea
  const textareaOptions = ['radioCancel2', 'radioCancel4', 'radioCancel6', 'radioCancel8'];

  // Custom placeholders for each option
  const placeholders = {
    'radioCancel2': 'Tell us what you need...',
    'radioCancel4': 'What features are you looking for?',
    'radioCancel6': 'Which provider are you switching to?',
    'radioCancel8': 'Tell us why...'
  };

  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      // Handle textarea visibility
      if (textareaOptions.includes(this.id)) {
        textareaCard.classList.remove('d-none');
        elaborateTextarea.placeholder = placeholders[this.id];
        elaborateTextarea.focus();
      } else {
        textareaCard.classList.add('d-none');
        elaborateTextarea.value = '';
      }

      // Handle lower pricing card visibility
      if (this.id === 'radioCancel3') { // Out of budget option
        lowerPricingCard.classList.remove('d-none');
      } else {
        lowerPricingCard.classList.add('d-none');
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[name="radioCancel"]');
  const textareaCard = document.getElementById('textareaCard');
  const elaborateTextarea = document.getElementById('elaborateTextarea');
  const lowerPricingCard = document.getElementById('lowerPricingCard');
  const technicalSupportText = document.getElementById('technicalSupportText');
  const helpResourcesCard = document.getElementById('helpResourcesCard');
  const nextButton = document.querySelector('.btn-outline-success');
  const warningMessage = document.getElementById('warningMessage');

  // Custom placeholders for each option
  const placeholders = {
    'radioCancel1': 'Tell us more about why your company has shut down...',
    'radioCancel2': 'Tell us more about why your project stopped / ended...',
    'radioCancel3': "Tell us more about why it doesn't fit your needs...",
    'radioCancel4': 'Tell us more about your budget constraints...',
    'radioCancel5': 'What features are you looking for?',
    'radioCancel6': 'Please describe the technical issues you\'re experiencing...',
    'radioCancel7': 'Which provider are you switching to and why?',
    'radioCancel8': 'What aspects of the platform are unclear to you?',
    'radioCancel9': 'Please tell us more about your reason...'
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

      // Show textarea for all options
      textareaCard.classList.remove('d-none');
      elaborateTextarea.value = '';
      elaborateTextarea.placeholder = placeholders[this.id];
      elaborateTextarea.focus();

      // Show additional info for specific cases
      lowerPricingCard.classList.toggle('d-none', this.id !== 'radioCancel4');
      technicalSupportText.classList.toggle('d-none', this.id !== 'radioCancel6');
      helpResourcesCard.classList.toggle('d-none', this.id !== 'radioCancel8');
    });
  });

  // Add billing plan switcher functionality
  const billingPlanSections = {
    'annual-yearly': document.getElementById('annualYearly'),
    'annual-monthly': document.getElementById('annualMonthly'),
    'monthly': document.getElementById('monthlyMonthly')
  };

  // Get the dropdown items
  const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
  
  // Get the billing text element
  const billingText = document.querySelector('.billing-text');
  
  // Function to update content visibility
  function updateBillingContent(planType) {
    // Hide all sections first
    Object.values(billingPlanSections).forEach(section => {
      if (section) section.classList.add('d-none');
    });
    
    // Get the current plan badge in the dropdown button
    const currentPlanBadge = document.querySelector('.dropdown-toggle .badge');
    
    // Show the selected section and update badge visibility
    switch(planType) {
      case 'annual-yearly':
        if (billingPlanSections['annual-yearly']) {
          billingPlanSections['annual-yearly'].classList.remove('d-none');
          billingText.textContent = 'Annual plan, billed yearly';
          if (currentPlanBadge) currentPlanBadge.classList.remove('d-none');
        }
        break;
      case 'annual-monthly':
        if (billingPlanSections['annual-monthly']) {
          billingPlanSections['annual-monthly'].classList.remove('d-none');
          billingText.textContent = 'Annual plan, billed monthly';
          if (currentPlanBadge) currentPlanBadge.classList.add('d-none');
        }
        break;
      case 'monthly':
        if (billingPlanSections['monthly']) {
          billingPlanSections['monthly'].classList.remove('d-none');
          billingText.textContent = 'Monthly plan';
          if (currentPlanBadge) currentPlanBadge.classList.add('d-none');
        }
        break;
    }
  }

  // Add click event listeners to dropdown items
  dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      dropdownItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Determine which plan was selected
      if (this.href.endsWith('cancel-plans.html')) {
        updateBillingContent('annual-yearly');
      } else if (this.href.endsWith('cancel-plans-annual-monthly.html')) {
        updateBillingContent('annual-monthly');
      } else if (this.href.endsWith('cancel-plans-monthly.html')) {
        updateBillingContent('monthly');
      }
    });
  });

  // Helper function to create current plan badge
  function createCurrentPlanBadge() {
    const badge = document.createElement('span');
    badge.className = 'badge bg-secondary';
    badge.textContent = 'Current plan';
    return badge;
  }

  // Initialize with annual yearly plan visible
  updateBillingContent('annual-yearly');
});
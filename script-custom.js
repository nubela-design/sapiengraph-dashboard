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

      // Handle specific cases
      if (textareaOptions.includes(this.id)) {
        textareaCard.classList.remove('d-none');
        elaborateTextarea.placeholder = placeholders[this.id];
        elaborateTextarea.focus();
      } 
      else if (this.id === 'radioCancel3') { // Out of budget option
        lowerPricingCard.classList.remove('d-none');
      }
      else if (this.id === 'radioCancel5') { // Technical issues
        technicalSupportText.classList.remove('d-none');
      }
      else if (this.id === 'radioCancel7') { // Not sure how to use
        helpResourcesCard.classList.remove('d-none');
      }
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
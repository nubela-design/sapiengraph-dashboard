document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[name="radioCancel"]');
  const textareas = {
    'radioCancel1': document.getElementById('companyTextarea'),
    'radioCancel2': document.getElementById('projectTextarea'),
    'radioCancel3': document.getElementById('needsTextarea'),
    'radioCancel4': document.getElementById('budgetTextarea'),
    'radioCancel5': document.getElementById('featuresTextarea'),
    'radioCancel6': document.getElementById('technicalTextarea'),
    'radioCancel7': document.getElementById('providerTextarea'),
    'radioCancel8': document.getElementById('helpTextarea'),
    'radioCancel9': document.getElementById('otherTextarea')
  };

  const additionalInfo = {
    'radioCancel6': document.getElementById('technicalInfo'),
    'radioCancel8': document.getElementById('helpInfo')
  };

  // Hide warning when a radio is selected
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      // Hide all textareas first
      Object.values(textareas).forEach(textarea => {
        if (textarea) textarea.classList.add('d-none');
      });

      // Hide all additional info
      Object.values(additionalInfo).forEach(info => {
        if (info) info.classList.add('d-none');
      });

      // Show the selected textarea
      const selectedTextarea = textareas[this.id];
      if (selectedTextarea) {
        selectedTextarea.classList.remove('d-none');
        selectedTextarea.focus();
      }

      // Show additional info if applicable
      const selectedInfo = additionalInfo[this.id];
      if (selectedInfo) {
        selectedInfo.classList.remove('d-none');
      }
    });
  });

  const lowerPricingCard = document.getElementById('lowerPricingCard');
  const technicalSupportText = document.getElementById('technicalSupportText');
  const helpResourcesCard = document.getElementById('helpResourcesCard');
  const nextButton = document.querySelector('.btn-outline-success');
  const warningMessage = document.getElementById('warningMessage');

  // Custom placeholders for each option
  const placeholders = {
    'radioCancel1': 'Please elaborate...',
    'radioCancel2': 'Please elaborate...',
    'radioCancel3': 'Please elaborate...',
    'radioCancel4': 'Please elaborate...',
    'radioCancel5': 'Please elaborate...',
    'radioCancel6': 'Please elaborate...',
    'radioCancel7': 'Please elaborate...',
    'radioCancel8': 'Please elaborate...',
    'radioCancel9': 'Please elaborate...'
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
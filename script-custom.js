// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  // Handle pricing toggle only if elements exist
  const toggle = document.getElementById('planToggle');
  if (toggle) {
    // Radio button and textarea functionality
    const radioButtons = document.querySelectorAll('input[name="radioCancel"]');
    const textarea = document.getElementById('floatingTextarea2');

    if (!radioButtons.length || !textarea) return;

    radioButtons.forEach(radio => {
      radio.addEventListener('change', function() {
        const isOtherSelected = this.id === 'radioCancel8';
        textarea.classList.toggle('d-none', !isOtherSelected);
        
        if (!isOtherSelected) {
          textarea.value = '';
        } else {
          textarea.focus();
        }
      });
    });

    // Toggle handler
    function handleToggle() {
      // Loop through each text container and toggle classes
      textContainers.forEach((textContainer) => {
        textContainer.classList.toggle('text-change', !toggle.checked);
      });

      // Update billed text for each element
      billedTexts.forEach((element) => {
        element.textContent = toggle.checked ? '/mo, billed annually' : '/mo, billed monthly';
      });

      // Update pricing and show/hide elements
      const targetPricing = toggle.checked ? pricing.annual : pricing.monthly;
      updatePricing(targetPricing);
      annually.forEach(el => el.classList.toggle('d-none', toggle.checked));
      credits.forEach(el => el.classList.toggle('d-none', toggle.checked));

      // Animate to new numbers
      animateNumber(litePrice, !toggle.checked ? 40 : 49, !toggle.checked ? 49 : 40, 500);
      animateNumber(proPrice, !toggle.checked ? 249 : 299, !toggle.checked ? 299 : 249, 500);
      animateNumber(proPlusPrice, !toggle.checked ? 749 : 899, !toggle.checked ? 899 : 749, 500);
      animateNumber(bizPrice, !toggle.checked ? 1582 : 1899, !toggle.checked ? 1899 : 1582, 500);
    }

    // Initially hide annually and credits using Bootstrap classes
    annually.forEach(el => el.classList.add('d-none'));
    credits.forEach(el => el.classList.add('d-none'));

    // Attach the event listener
    toggle.addEventListener('click', handleToggle);

    // Trigger the toggle handler initially
    handleToggle();
  }

  // Radio button and textarea functionality
  const radioButtons = document.querySelectorAll('input[name="radioCancel"]');
  
  // Define radio options with their associated content
  const radioConfig = {
    'radioCancel2': {
      id: 'needsTextarea',
      placeholder: 'Tell us what you need',
      type: 'textarea'
    },
    'radioCancel4': {
      id: 'featuresTextarea',
      placeholder: 'What features are you looking for?',
      type: 'textarea'
    },
    'radioCancel5': {
      id: 'technicalInfo',
      type: 'text',
      content: 'Contact us at <a class="text-success" href="mailto:hello@sapiengraph.com">hello@sapiengraph.com</a>.'
    },
    'radioCancel6': {
      id: 'providerTextarea',
      placeholder: 'Which provider are you switching to?',
      type: 'textarea'
    },
    'radioCancel7': {
      id: 'helpInfo',
      type: 'text',
      content: '<a class="text-success" href="https://sapiengraph.com/user-guide#sapiengraph-user-guide" target="_blank">Read our docs</a>, <a class="text-success" href="https://sapiengraph.com/blog/tag/faq/" target="_blank">read our FAQ</a>, or <a class="text-success" href="mailto:hello@sapiengraph.com">contact us</a>.'
    },
    'radioCancel8': {
      id: 'floatingTextarea2',
      placeholder: 'Tell us why',
      type: 'textarea'
    }
  };

  // Exit if elements don't exist
  if (!radioButtons.length) return;

  // Add change event listener to each radio button
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      // Hide all additional content first
      Object.values(radioConfig).forEach(({id}) => {
        const element = document.getElementById(id);
        if (element) {
          element.classList.add('d-none');
          if (element.tagName === 'TEXTAREA') {
            element.value = '';
          }
        }
      });

      // Show content for selected radio if it exists
      const selectedConfig = radioConfig[this.id];
      if (selectedConfig) {
        const element = document.getElementById(selectedConfig.id);
        if (element) {
          element.classList.remove('d-none');
          if (selectedConfig.type === 'textarea') {
            element.placeholder = selectedConfig.placeholder;
            element.focus();
          } else if (selectedConfig.type === 'text') {
            element.innerHTML = selectedConfig.content;
          }
        }
      }

      // Update the Next button behavior
      const nextButton = document.querySelector('[data-bs-target="#modalCancelNext"]');
      if (nextButton) {
        if (this.id === 'radioCancel3') { // Out of budget option
          nextButton.setAttribute('data-bs-target', '#modalCancelOutOfMyBudgets');
        } else {
          nextButton.setAttribute('data-bs-target', '#modalCancelNext');
        }
      }
    });
  });

  // Handle modal reset
  const cancelModal = document.getElementById('modalCancel');
  if (cancelModal) {
    cancelModal.addEventListener('show.bs.modal', function() {
      radioButtons.forEach(radio => radio.checked = false);
      Object.values(radioConfig).forEach(({id}) => {
        const element = document.getElementById(id);
        if (element) {
          element.classList.add('d-none');
          if (element.tagName === 'TEXTAREA') {
            element.value = '';
          }
        }
      });
      
      // Reset the Next button to default modal
      const nextButton = document.querySelector('[data-bs-target="#modalCancelNext"]');
      if (nextButton) {
        nextButton.setAttribute('data-bs-target', '#modalCancelNext');
      }
    });
  }
});

// Pricing data
const pricing = {
  monthly: { lite: '$49', pro: '$299', proPlus: '$899', business: '$1899' },
  annual: { lite: '$40', pro: '$249', proPlus: '$749', business: '$1582' }
};

// Get elements
const toggle = document.getElementById('planToggle');
const litePrice = document.getElementById('litePrice');
const proPrice = document.getElementById('proPrice');
const proPlusPrice = document.getElementById('proPlusPrice');
const bizPrice = document.getElementById('bizPrice');

const annually = document.querySelectorAll('.paid-annually');
const credits = document.querySelectorAll('.free-credits');

// Get text container elements
const textContainers = document.querySelectorAll('.text-change');
const billedTexts = document.querySelectorAll('.billedText'); // Use a class instead of ID

// Animate number function
function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Update pricing function
function updatePricing(plan) {
  const { lite, pro, proPlus, business } = plan;
  litePrice.textContent = lite;
  proPrice.textContent = pro;
  proPlusPrice.textContent = proPlus;
  bizPrice.textContent = business;
}

function handleCheckbox(clickedCheckbox) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if (checkbox !== clickedCheckbox) {
      checkbox.checked = false;
    }
  });
}

// Function to handle the search criteria button
function handleSearchCriteriaButton() {
  const searchCriteriaBtn = document.getElementById('searchCriteriaBtn');
  const filterContent = document.querySelector('.card.card-body.custom-rounded.border.py-3').nextElementSibling;

  if (!searchCriteriaBtn || !filterContent) return;

  function checkButtonPosition() {
    const filterContentRect = filterContent.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (filterContentRect.bottom > windowHeight) {
      searchCriteriaBtn.classList.add('fixed');
    } else {
      searchCriteriaBtn.classList.remove('fixed');
    }
  }

  // Check button position on scroll
  window.addEventListener('scroll', checkButtonPosition);

  // Check button position when filter content expands/collapses
  const collapseElements = filterContent.querySelectorAll('.collapse');
  collapseElements.forEach(element => {
    element.addEventListener('shown.bs.collapse', checkButtonPosition);
    element.addEventListener('hidden.bs.collapse', checkButtonPosition);
  });

  // Initial check
  checkButtonPosition();
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', handleSearchCriteriaButton);

// Aji - moved from prospector-people-result.html by Roy - 11 sep 2024
// Table sorting functionality
let currentColumn = 3; // Set Last checked as the default sorted column
let lastCheckedColumnSorted = true;

document.addEventListener("DOMContentLoaded", function (event) {
  // Simulate click on "Last checked" header after the page loads (default sort)
  sortTable(currentColumn);
  lastCheckedColumnSorted = false;
});

function sortTable(columnIndex) {
  const table = document.getElementById('myTable');
  if (!table) return;
  
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    let cellA = a.getElementsByTagName('td')[columnIndex].innerText.trim().toLowerCase();
    let cellB = b.getElementsByTagName('td')[columnIndex].innerText.trim().toLowerCase();

    if (columnIndex === 3) { // For Last checked column, reverse sorting
      [cellA, cellB] = [cellB, cellA];
    }

    return cellA.localeCompare(cellB);
  });

  tbody.innerHTML = '';
  rows.forEach(row => {
    tbody.appendChild(row);
  });

  resetHeaders();
  const clickedHeader = document.getElementById(`header${columnIndex}`);

  if (!lastCheckedColumnSorted && columnIndex === 3) {
    clickedHeader.classList.add('active-header');
    lastCheckedColumnSorted = true;
  } else {
    clickedHeader.classList.add('active-header');
  }

  currentColumn = columnIndex;
  resetSortIcons(columnIndex);
}

function resetHeaders() {
  const headers = document.querySelectorAll('th');
  headers.forEach(header => {
    header.classList.remove('active-header');
  });
}

function resetSortIcons(exceptIndex) {
  const icons = document.querySelectorAll('.fa-sort');
  icons.forEach(icon => {
    icon.classList.remove('fa-sort-up', 'fa-sort-down');
    icon.classList.add('fa-sort');
  });

  const clickedHeaderIcon = document.getElementById(`header${exceptIndex}`).getElementsByTagName('i')[0];
  clickedHeaderIcon.classList.remove('fa-sort');
  clickedHeaderIcon.classList.add('fas', 'fa-sort');
}

// ------------------------------------------------------------------------------------------------

// Roy - 02 dec 2024

// Show/hide textarea based on "Other" radio selection
document.addEventListener('DOMContentLoaded', function() {
  const otherRadio = document.getElementById('radioCancel8');
  const textarea = document.getElementById('floatingTextarea2');
  
  // Handle radio button changes
  document.querySelectorAll('input[name="radioCancel"]').forEach(radio => {
    radio.addEventListener('change', function() {
      // Show textarea only when "Other" is selected
      textarea.classList.toggle('d-none', radio.id !== 'radioCancel8');
      
      // Clear textarea when switching away from "Other"
      if (radio.id !== 'radioCancel8') {
        textarea.value = '';
      }
    });
  });
});
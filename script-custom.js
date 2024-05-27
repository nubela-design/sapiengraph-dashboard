// Initialize tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

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
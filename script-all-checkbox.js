//PROSPECTOR JS//PROSPECTOR JS//

// All checkboxes-->

function handleSelectAllCheckbox() {
    // Get the checkbox in the table header
    var selectAllCheckbox = document.getElementById("selectAllCheckbox");
    // Get all checkboxes in the table body
    var checkboxes = document.querySelectorAll("tbody input[type='checkbox']");
    
    // Toggle the checked state of each checkbox in the table body
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
    });
  }
  
  // All checkboxes Companies
  
  function handleSelectAllCompaniesCheckbox() {
    // Get the checkbox in the table header
    var selectAllCheckbox = document.getElementById("selectAllCompaniesCheckbox");
    // Get all checkboxes in the table body
    var checkboxes = document.querySelectorAll("tbody input[type='checkbox']");
    
    // Toggle the checked state of each checkbox in the table body
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = selectAllCompaniesCheckbox.checked;
    });
  }
  
  //PROSPECTOR JS//PROSPECTOR JS//     
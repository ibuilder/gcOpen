/**
 * gcVDC - Main JavaScript Functionality
 */

// DOM Elements
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
const themeSwitcher = document.querySelector('.theme-switcher');
const progressBars = document.querySelectorAll('.progress-bar');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInputs = document.querySelectorAll('.search-elements');

// Initialize tooltips and popovers from Bootstrap
function initBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

// Toggle sidebar visibility
function toggleSidebar() {
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
  }
}

// Toggle between light and dark theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update the theme switcher button text/icon
  if (themeSwitcher) {
    if (newTheme === 'dark') {
      themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
      themeSwitcher.setAttribute('title', 'Switch to Light Mode');
    } else {
      themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
      themeSwitcher.setAttribute('title', 'Switch to Dark Mode');
    }
  }
}

// Set the theme based on user preference or local storage
function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set the correct icon/text for the theme switcher button
  if (themeSwitcher) {
    if (savedTheme === 'dark') {
      themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
      themeSwitcher.setAttribute('title', 'Switch to Light Mode');
    } else {
      themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
      themeSwitcher.setAttribute('title', 'Switch to Dark Mode');
    }
  }
}

// Animation for progress bars
function animateProgressBars() {
  if (progressBars.length) {
    progressBars.forEach(progressBar => {
      const value = progressBar.getAttribute('aria-valuenow');
      progressBar.style.width = '0%';
      
      setTimeout(() => {
        progressBar.style.width = value + '%';
      }, 200);
    });
  }
}

// Filter elements in a table
function filterElements() {
  const searchInput = document.getElementById('search-elements');
  if (!searchInput) return;
  
  const filter = searchInput.value.toUpperCase();
  const tables = document.querySelectorAll('.filterable-table');
  
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
      let shouldShow = false;
      const cells = row.querySelectorAll('td');
      
      cells.forEach(cell => {
        const text = cell.textContent || cell.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          shouldShow = true;
        }
      });
      
      row.style.display = shouldShow ? '' : 'none';
    });
  });
}

// Apply filter by system type
function filterBySystem(systemType) {
  const rows = document.querySelectorAll('.filterable-table tbody tr');
  
  if (systemType === 'all') {
    rows.forEach(row => {
      row.style.display = '';
    });
    return;
  }
  
  rows.forEach(row => {
    const type = row.getAttribute('data-system');
    row.style.display = (type === systemType) ? '' : 'none';
  });
}

// Apply filter by status
function filterByStatus(status) {
  const rows = document.querySelectorAll('.filterable-table tbody tr');
  
  if (status === 'all') {
    rows.forEach(row => {
      row.style.display = '';
    });
    return;
  }
  
  rows.forEach(row => {
    const rowStatus = row.getAttribute('data-status');
    row.style.display = (rowStatus === status) ? '' : 'none';
  });
}

// Apply multiple filters
function applyFilters() {
  const systemFilter = document.querySelector('.system-filter.active').getAttribute('data-filter');
  const statusFilter = document.querySelector('.status-filter.active').getAttribute('data-filter');
  const rows = document.querySelectorAll('.filterable-table tbody tr');
  
  rows.forEach(row => {
    const rowSystem = row.getAttribute('data-system');
    const rowStatus = row.getAttribute('data-status');
    
    const systemMatch = (systemFilter === 'all' || rowSystem === systemFilter);
    const statusMatch = (statusFilter === 'all' || rowStatus === statusFilter);
    
    row.style.display = (systemMatch && statusMatch) ? '' : 'none';
  });
}

// Handle filter button clicks
function setupFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filterGroup = this.getAttribute('data-filter-group');
      const filter = this.getAttribute('data-filter');
      
      // Remove active class from other buttons in this group
      document.querySelectorAll(`.filter-btn[data-filter-group="${filterGroup}"]`).forEach(el => {
        el.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Apply the filters
      applyFilters();
    });
  });
}

// Load data via AJAX (to be replaced with actual API calls)
function loadData(endpoint, callback) {
  // Simulate API call with timeout
  setTimeout(() => {
    // This would be replaced with actual fetch call to the backend
    const dummyData = {
      'elements': [
        { id: 1, name: 'Element 1', type: 'HVAC Duct', status: 'Not Started', location: 'Level 1 - Zone C' },
        { id: 2, name: 'Element 2', type: 'Drainage Duct', status: 'In Progress', location: 'Level 2 - Zone A' },
        { id: 3, name: 'Element 3', type: 'Duct', status: 'Complete', location: 'Level 2 - Zone B' }
      ],
      'clashes': [
        { id: 1, element1: 'HVAC Duct', element2: 'Structural Beam', location: 'Level 1 - Zone C', severity: 'High' },
        { id: 2, name: 'Pipe vs. Wall', element1: 'Water Pipe', element2: 'Wall', location: 'Level 2 - Zone A', severity: 'Medium' }
      ],
      'progress': {
        overall: 12,
        structural: 11,
        mechanical: 17,
        electrical: 17,
        plumbing: 25,
        firePrevention: 0,
        architectural: 13
      }
    };
    
    callback(dummyData);
  }, 500);
}

// Update progress bars with data
function updateProgressBars(progressData) {
  if (!progressData) return;
  
  const overallProgress = document.querySelector('.progress-bar-overall');
  const structuralProgress = document.querySelector('.progress-bar-structural');
  const mechanicalProgress = document.querySelector('.progress-bar-mechanical');
  const electricalProgress = document.querySelector('.progress-bar-electrical');
  const plumbingProgress = document.querySelector('.progress-bar-plumbing');
  const firePreventionProgress = document.querySelector('.progress-bar-fire-prevention');
  const architecturalProgress = document.querySelector('.progress-bar-architectural');
  
  if (overallProgress) overallProgress.style.width = progressData.overall + '%';
  if (structuralProgress) structuralProgress.style.width = progressData.structural + '%';
  if (mechanicalProgress) mechanicalProgress.style.width = progressData.mechanical + '%';
  if (electricalProgress) electricalProgress.style.width = progressData.electrical + '%';
  if (plumbingProgress) plumbingProgress.style.width = progressData.plumbing + '%';
  if (firePreventionProgress) firePreventionProgress.style.width = progressData.firePrevention + '%';
  if (architecturalProgress) architecturalProgress.style.width = progressData.architectural + '%';
}

// Populate table with elements data
function populateElementsTable(elements) {
  const tableBody = document.querySelector('.elements-table tbody');
  if (!tableBody || !elements) return;
  
  tableBody.innerHTML = '';
  
  elements.forEach(element => {
    const row = document.createElement('tr');
    row.setAttribute('data-system', getSystemFromType(element.type));
    row.setAttribute('data-status', getStatusCode(element.status));
    
    row.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>
        <span class="type-indicator type-${getSystemFromType(element.type).toLowerCase()}"></span>
        ${element.type}
      </td>
      <td>${element.location}</td>
      <td>
        <span class="badge badge-${getStatusCode(element.status).toLowerCase()}">${element.status}</span>
      </td>
      <td>
        <button class="btn btn-sm btn-primary edit-element" data-id="${element.id}">
          <i class="fas fa-edit"></i>
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Helper function to get system type from element type
function getSystemFromType(type) {
  if (type.includes('HVAC') || type.includes('Duct')) return 'Mechanical';
  if (type.includes('Pipe') || type.includes('Drainage')) return 'Plumbing';
  if (type.includes('Wire') || type.includes('Electrical')) return 'Electrical';
  if (type.includes('Beam') || type.includes('Column')) return 'Structural';
  if (type.includes('Sprinkler') || type.includes('Fire')) return 'FirePrevention';
  if (type.includes('Wall') || type.includes('Window')) return 'Architectural';
  
  return 'Other';
}

// Helper function to normalize status to code
function getStatusCode(status) {
  if (status === 'Not Started') return 'not-started';
  if (status === 'In Progress') return 'in-progress';
  if (status === 'Complete') return 'complete';
  if (status === 'On Hold') return 'on-hold';
  
  return 'not-started';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  setInitialTheme();
  
  // Initialize Bootstrap components
  initBootstrapComponents();
  
  // Animate progress bars
  animateProgressBars();
  
  // Setup filter buttons
  setupFilterButtons();
  
  // Add event listeners
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
  }
  
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', toggleTheme);
  }
  
  if (searchInputs.length) {
    searchInputs.forEach(input => {
      input.addEventListener('keyup', filterElements);
    });
  }
  
  // Load data for current page
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    switch (currentPage) {
      case 'work-in-place':
        loadData('/api/elements', populateElementsTable);
        loadData('/api/progress', updateProgressBars);
        break;
      case 'clash-detection':
        loadData('/api/clashes', populateClashesTable);
        break;
      case 'dashboard':
        loadData('/api/progress', updateProgressBars);
        initCharts();
        break;
    }
  }
});

// Function to handle when new elements are added to the DOM (e.g. after AJAX)
function bindNewElements() {
  // Rebind edit buttons
  const editButtons = document.querySelectorAll('.edit-element');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const elementId = this.getAttribute('data-id');
      openEditModal(elementId);
    });
  });
}

// Open modal for editing an element
function openEditModal(elementId) {
  const editModal = new bootstrap.Modal(document.getElementById('editElementModal'));
  
  // Fetch element data (would be replaced with actual API call)
  loadData(`/api/elements/${elementId}`, function(element) {
    // Populate form fields
    document.getElementById('edit-element-id').value = element.id;
    document.getElementById('edit-element-name').value = element.name;
    document.getElementById('edit-element-type').value = element.type;
    document.getElementById('edit-element-location').value = element.location;
    document.getElementById('edit-element-status').value = getStatusCode(element.status);
    
    // Show modal
    editModal.show();
  });
}

// Save edited element
function saveElement() {
  const elementId = document.getElementById('edit-element-id').value;
  const elementName = document.getElementById('edit-element-name').value;
  const elementType = document.getElementById('edit-element-type').value;
  const elementLocation = document.getElementById('edit-element-location').value;
  const elementStatus = document.getElementById('edit-element-status').value;
  
  // Prepare data for API call
  const data = {
    id: elementId,
    name: elementName,
    type: elementType,
    location: elementLocation,
    status: getStatusFromCode(elementStatus)
  };
  
  // This would be replaced with actual API call
  console.log('Saving element:', data);
  
  // Close modal
  const editModal = bootstrap.Modal.getInstance(document.getElementById('editElementModal'));
  editModal.hide();
  
  // Refresh data
  loadData('/api/elements', populateElementsTable);
  loadData('/api/progress', updateProgressBars);
}

// Helper function to get display status from code
function getStatusFromCode(code) {
  if (code === 'not-started') return 'Not Started';
  if (code === 'in-progress') return 'In Progress';
  if (code === 'complete') return 'Complete';
  if (code === 'on-hold') return 'On Hold';
  
  return 'Not Started';
}

// Export functions for use in other scripts
window.gcVDC = {
  toggleSidebar,
  toggleTheme,
  filterElements,
  filterBySystem,
  filterByStatus,
  applyFilters,
  loadData,
  saveElement,
  bindNewElements
};

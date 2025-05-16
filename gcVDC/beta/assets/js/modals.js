/**
 * gcVDC - Modal Management
 * Handles creation, display, and functionality of all modals in the application
 */

// Modal DOM Elements
let addElementModal = null;
let editElementModal = null;
let filterModal = null;
let clashDetailModal = null;
let settingsModal = null;

// Initialize all modals on document load
function initModals() {
  // Get modal elements
  const addElementModalEl = document.getElementById('addElementModal');
  const editElementModalEl = document.getElementById('editElementModal');
  const filterModalEl = document.getElementById('filterModal');
  const clashDetailModalEl = document.getElementById('clashDetailModal');
  const settingsModalEl = document.getElementById('settingsModal');
  
  // Initialize Bootstrap modals
  if (addElementModalEl) {
    addElementModal = new bootstrap.Modal(addElementModalEl);
    setupAddElementModal();
  }
  
  if (editElementModalEl) {
    editElementModal = new bootstrap.Modal(editElementModalEl);
    setupEditElementModal();
  }
  
  if (filterModalEl) {
    filterModal = new bootstrap.Modal(filterModalEl);
    setupFilterModal();
  }
  
  if (clashDetailModalEl) {
    clashDetailModal = new bootstrap.Modal(clashDetailModalEl);
    setupClashDetailModal();
  }
  
  if (settingsModalEl) {
    settingsModal = new bootstrap.Modal(settingsModalEl);
    setupSettingsModal();
  }
  
  // Bind modal trigger buttons
  bindModalTriggers();
}

// Setup the Add Element Modal
function setupAddElementModal() {
  const form = document.getElementById('addElementForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitAddElementForm();
  });
  
  // Type selector changes may affect available fields or values
  const typeSelector = document.getElementById('element-type');
  if (typeSelector) {
    typeSelector.addEventListener('change', function() {
      updateFormBasedOnType(this.value);
    });
  }
}

// Setup the Edit Element Modal
function setupEditElementModal() {
  const form = document.getElementById('editElementForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitEditElementForm();
  });
  
  // Type selector changes may affect available fields or values
  const typeSelector = document.getElementById('edit-element-type');
  if (typeSelector) {
    typeSelector.addEventListener('change', function() {
      updateEditFormBasedOnType(this.value);
    });
  }
}

// Setup the Filter Modal
function setupFilterModal() {
  const applyFilterBtn = document.getElementById('applyFilters');
  if (!applyFilterBtn) return;
  
  applyFilterBtn.addEventListener('click', function() {
    applyModalFilters();
    filterModal.hide();
  });
  
  // Handle system filter checkboxes
  const systemCheckboxes = document.querySelectorAll('.system-filter-checkbox');
  systemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilterSummary);
  });
  
  // Handle status filter checkboxes
  const statusCheckboxes = document.querySelectorAll('.status-filter-checkbox');
  statusCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilterSummary);
  });
  
  // Reset filters button
  const resetFiltersBtn = document.getElementById('resetFilters');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetFilters);
  }
}

// Setup the Clash Detail Modal
function setupClashDetailModal() {
  // Any specific setup for clash detail modal
  const resolveClashBtn = document.getElementById('resolveClashBtn');
  if (resolveClashBtn) {
    resolveClashBtn.addEventListener('click', resolveClash);
  }
}

// Setup the Settings Modal
function setupSettingsModal() {
  const form = document.getElementById('settingsForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    saveSettings();
  });
  
  // Reset to defaults button
  const resetBtn = document.getElementById('resetToDefaults');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetSettings);
  }
}

// Bind all modal trigger buttons
function bindModalTriggers() {
  // Add Element button
  const addElementBtn = document.getElementById('addElementBtn');
  if (addElementBtn) {
    addElementBtn.addEventListener('click', () => {
      clearAddElementForm();
      addElementModal.show();
    });
  }
  
  // Filter button
  const filterBtn = document.getElementById('filterBtn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      filterModal.show();
    });
  }
  
  // Edit element buttons (may be dynamically added)
  bindEditButtons();
  
  // Clash detail buttons (may be dynamically added)
  bindClashDetailButtons();
  
  // Settings button
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      loadCurrentSettings();
      settingsModal.show();
    });
  }
}

// Bind edit buttons (may need to be called after loading data)
function bindEditButtons() {
  const editButtons = document.querySelectorAll('.edit-element-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const elementId = this.getAttribute('data-element-id');
      loadElementForEdit(elementId);
      editElementModal.show();
    });
  });
}

// Bind clash detail buttons (may need to be called after loading data)
function bindClashDetailButtons() {
  const clashDetailButtons = document.querySelectorAll('.clash-detail-btn');
  clashDetailButtons.forEach(button => {
    button.addEventListener('click', function() {
      const clashId = this.getAttribute('data-clash-id');
      loadClashDetails(clashId);
      clashDetailModal.show();
    });
  });
}

// Submit the Add Element form
function submitAddElementForm() {
  // Get form data
  const name = document.getElementById('element-name').value;
  const type = document.getElementById('element-type').value;
  const location = document.getElementById('element-location').value;
  const status = document.getElementById('element-status').value;
  
  // Prepare data for API
  const elementData = {
    name,
    type,
    location,
    status
  };
  
  // Call the API (would be replaced with actual implementation)
  console.log('Adding new element:', elementData);
  
  // Show success message
  showToast('Element added successfully!', 'success');
  
  // Close the modal
  addElementModal.hide();
  
  // Refresh the elements list
  refreshElementsList();
}

// Submit the Edit Element form
function submitEditElementForm() {
  // Get form data
  const id = document.getElementById('edit-element-id').value;
  const name = document.getElementById('edit-element-name').value;
  const type = document.getElementById('edit-element-type').value;
  const location = document.getElementById('edit-element-location').value;
  const status = document.getElementById('edit-element-status').value;
  
  // Prepare data for API
  const elementData = {
    id,
    name,
    type,
    location,
    status
  };
  
  // Call the API (would be replaced with actual implementation)
  console.log('Updating element:', elementData);
  
  // Show success message
  showToast('Element updated successfully!', 'success');
  
  // Close the modal
  editElementModal.hide();
  
  // Refresh the elements list
  refreshElementsList();
}

// Apply filters from the filter modal
function applyModalFilters() {
  // Get selected systems
  const selectedSystems = [];
  document.querySelectorAll('.system-filter-checkbox:checked').forEach(checkbox => {
    selectedSystems.push(checkbox.value);
  });
  
  // Get selected statuses
  const selectedStatuses = [];
  document.querySelectorAll('.status-filter-checkbox:checked').forEach(checkbox => {
    selectedStatuses.push(checkbox.value);
  });
  
  // Get location filter if available
  const locationFilter = document.getElementById('location-filter') ? 
                        document.getElementById('location-filter').value : '';
  
  // Apply filters to the table
  filterTable(selectedSystems, selectedStatuses, locationFilter);
  
  // Update filter indicator on the page
  updateFilterIndicator(selectedSystems, selectedStatuses, locationFilter);
}

// Filter the elements table based on selected filters
function filterTable(systems, statuses, location) {
  const table = document.querySelector('.elements-table');
  if (!table) return;
  
  const rows = table.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const rowSystem = row.getAttribute('data-system');
    const rowStatus = row.getAttribute('data-status');
    const rowLocation = row.querySelector('td:nth-child(4)').textContent;
    
    // Check if row matches all filters
    const systemMatch = systems.length === 0 || systems.includes(rowSystem);
    const statusMatch = statuses.length === 0 || statuses.includes(rowStatus);
    const locationMatch = !location || rowLocation.toLowerCase().includes(location.toLowerCase());
    
    // Show/hide row based on filter match
    row.style.display = (systemMatch && statusMatch && locationMatch) ? '' : 'none';
  });
}

// Update the filter summary shown in the modal
function updateFilterSummary() {
  const filterSummary = document.getElementById('filterSummary');
  if (!filterSummary) return;
  
  // Count selected systems
  const selectedSystems = document.querySelectorAll('.system-filter-checkbox:checked').length;
  const totalSystems = document.querySelectorAll('.system-filter-checkbox').length;
  
  // Count selected statuses
  const selectedStatuses = document.querySelectorAll('.status-filter-checkbox:checked').length;
  const totalStatuses = document.querySelectorAll('.status-filter-checkbox').length;
  
  // Location filter
  const locationFilter = document.getElementById('location-filter') ? 
                        document.getElementById('location-filter').value : '';
  
  // Build summary text
  let summaryText = '';
  
  if (selectedSystems === 0) {
    summaryText += 'No systems selected. ';
  } else if (selectedSystems === totalSystems) {
    summaryText += 'All systems selected. ';
  } else {
    summaryText += `${selectedSystems} of ${totalSystems} systems selected. `;
  }
  
  if (selectedStatuses === 0) {
    summaryText += 'No statuses selected. ';
  } else if (selectedStatuses === totalStatuses) {
    summaryText += 'All statuses selected. ';
  } else {
    summaryText += `${selectedStatuses} of ${totalStatuses} statuses selected. `;
  }
  
  if (locationFilter) {
    summaryText += `Location filter: "${locationFilter}".`;
  }
  
  filterSummary.textContent = summaryText;
}

// Update the filter indicator on the main page
function updateFilterIndicator(systems, statuses, location) {
  const filterIndicator = document.getElementById('activeFilters');
  if (!filterIndicator) return;
  
  if (systems.length === 0 && statuses.length === 0 && !location) {
    filterIndicator.style.display = 'none';
    return;
  }
  
  // Display the indicator
  filterIndicator.style.display = 'inline-block';
  
  // Count total active filters
  const totalFilters = (systems.length > 0 ? 1 : 0) + 
                       (statuses.length > 0 ? 1 : 0) + 
                       (location ? 1 : 0);
  
  filterIndicator.textContent = `${totalFilters} active filter${totalFilters > 1 ? 's' : ''}`;
}

// Reset all filters in the filter modal
function resetFilters() {
  // Reset system checkboxes
  document.querySelectorAll('.system-filter-checkbox').forEach(checkbox => {
    checkbox.checked = true;
  });
  
  // Reset status checkboxes
  document.querySelectorAll('.status-filter-checkbox').forEach(checkbox => {
    checkbox.checked = true;
  });
  
  // Reset location filter
  if (document.getElementById('location-filter')) {
    document.getElementById('location-filter').value = '';
  }
  
  // Update the filter summary
  updateFilterSummary();
}

// Load element data for editing
function loadElementForEdit(elementId) {
  // This would be replaced with an actual API call
  // Simulating data retrieval
  const element = {
    id: elementId,
    name: `Element ${elementId}`,
    type: 'HVAC Duct',
    location: 'Level 2 - Zone A',
    status: 'in-progress'
  };
  
  // Populate form fields
  document.getElementById('edit-element-id').value = element.id;
  document.getElementById('edit-element-name').value = element.name;
  document.getElementById('edit-element-type').value = element.type;
  document.getElementById('edit-element-location').value = element.location;
  document.getElementById('edit-element-status').value = element.status;
}

// Load clash details
function loadClashDetails(clashId) {
  // This would be replaced with an actual API call
  // Simulating data retrieval
  const clash = {
    id: clashId,
    description: `Clash ${clashId}`,
    element1: 'HVAC Duct',
    element2: 'Structural Beam',
    location: 'Level 2 - Zone A',
    severity: 'High',
    status: 'Open'
  };
  
  // Populate modal with clash data
  const modal = document.getElementById('clashDetailModal');
  if (!modal) return;
  
  const titleEl = modal.querySelector('.modal-title');
  const element1El = modal.querySelector('#clash-element1');
  const element2El = modal.querySelector('#clash-element2');
  const locationEl = modal.querySelector('#clash-location');
  const severityEl = modal.querySelector('#clash-severity');
  const statusEl = modal.querySelector('#clash-status');
  
  if (titleEl) titleEl.textContent = clash.description;
  if (element1El) element1El.textContent = clash.element1;
  if (element2El) element2El.textContent = clash.element2;
  if (locationEl) locationEl.textContent = clash.location;
  if (severityEl) severityEl.textContent = clash.severity;
  if (statusEl) statusEl.textContent = clash.status;
}

// Resolve a clash
function resolveClash() {
  const clashId = document.querySelector('#clashDetailModal .clash-id').value;
  if (!clashId) return;
  
  // This would be replaced with an actual API call
  console.log('Resolving clash:', clashId);
  
  // Show success message
  showToast('Clash marked as resolved!', 'success');
  
  // Close the modal
  clashDetailModal.hide();
  
  // Refresh the clashes list
  refreshClashesList();
}

// Clear the Add Element form
function clearAddElementForm() {
  const form = document.getElementById('addElementForm');
  if (form) form.reset();
}

// Update form fields based on selected element type
function updateFormBasedOnType(type) {
  // This could be expanded to show/hide specific fields based on element type
  console.log('Element type changed to:', type);
  
  // Example: Show/hide specific properties based on type
  const additionalFieldsContainer = document.getElementById('type-specific-fields');
  if (!additionalFieldsContainer) return;
  
  // Clear previous fields
  additionalFieldsContainer.innerHTML = '';
  
  // Add type-specific fields
  if (type === 'HVAC Duct') {
    additionalFieldsContainer.innerHTML = `
      <div class="form-group">
        <label for="element-diameter">Diameter (mm)</label>
        <input type="number" class="form-control" id="element-diameter" required>
      </div>
      <div class="form-group">
        <label for="element-material">Material</label>
        <select class="form-control" id="element-material" required>
          <option value="Metal">Metal</option>
          <option value="Plastic">Plastic</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>
    `;
  } else if (type === 'Structural Beam') {
    additionalFieldsContainer.innerHTML = `
      <div class="form-group">
        <label for="element-profile">Profile</label>
        <select class="form-control" id="element-profile" required>
          <option value="I-Beam">I-Beam</option>
          <option value="H-Beam">H-Beam</option>
          <option value="C-Channel">C-Channel</option>
          <option value="L-Angle">L-Angle</option>
        </select>
      </div>
      <div class="form-group">
        <label for="element-length">Length (mm)</label>
        <input type="number" class="form-control" id="element-length" required>
      </div>
    `;
  }
}

// Update edit form fields based on selected element type
function updateEditFormBasedOnType(type) {
  // Similar to updateFormBasedOnType but for the edit form
  const additionalFieldsContainer = document.getElementById('edit-type-specific-fields');
  if (!additionalFieldsContainer) return;
  
  // Clear previous fields
  additionalFieldsContainer.innerHTML = '';
  
  // Add type-specific fields based on the type
  if (type === 'HVAC Duct') {
    additionalFieldsContainer.innerHTML = `
      <div class="form-group">
        <label for="edit-element-diameter">Diameter (mm)</label>
        <input type="number" class="form-control" id="edit-element-diameter" value="200" required>
      </div>
      <div class="form-group">
        <label for="edit-element-material">Material</label>
        <select class="form-control" id="edit-element-material" required>
          <option value="Metal" selected>Metal</option>
          <option value="Plastic">Plastic</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>
    `;
  } else if (type === 'Structural Beam') {
    additionalFieldsContainer.innerHTML = `
      <div class="form-group">
        <label for="edit-element-profile">Profile</label>
        <select class="form-control" id="edit-element-profile" required>
          <option value="I-Beam" selected>I-Beam</option>
          <option value="H-Beam">H-Beam</option>
          <option value="C-Channel">C-Channel</option>
          <option value="L-Angle">L-Angle</option>
        </select>
      </div>
      <div class="form-group">
        <label for="edit-element-length">Length (mm)</label>
        <input type="number" class="form-control" id="edit-element-length" value="3000" required>
      </div>
    `;
  }
}

// Load current settings into the settings modal
function loadCurrentSettings() {
  // This would be replaced with actual settings loaded from backend/local storage
  // For now, just setting some default values
  
  // User preferences
  document.getElementById('notification-email').checked = true;
  document.getElementById('notification-clash').checked = true;
  document.getElementById('notification-progress').checked = false;
  document.getElementById('notification-alerts').checked = true;
  
  // 3D viewer settings
  document.getElementById('show-grid').checked = true;
  document.getElementById('show-coordinate-axes').checked = true;
  document.getElementById('camera-speed').value = 5;
  
  // System colors (if color pickers exist)
  const structuralColor = document.getElementById('structural-color');
  const mechanicalColor = document.getElementById('mechanical-color');
  const electricalColor = document.getElementById('electrical-color');
  const plumbingColor = document.getElementById('plumbing-color');
  const fireProtectionColor = document.getElementById('fire-protection-color');
  const architecturalColor = document.getElementById('architectural-color');
  
  if (structuralColor) structuralColor.value = '#0d6efd';
  if (mechanicalColor) mechanicalColor.value = '#0dcaf0';
  if (electricalColor) electricalColor.value = '#ffc107';
  if (plumbingColor) plumbingColor.value = '#20c997';
  if (fireProtectionColor) fireProtectionColor.value = '#dc3545';
  if (architecturalColor) architecturalColor.value = '#6f42c1';
  
  // Status colors
  const notStartedColor = document.getElementById('not-started-color');
  const inProgressColor = document.getElementById('in-progress-color');
  const completeColor = document.getElementById('complete-color');
  const onHoldColor = document.getElementById('on-hold-color');
  
  if (notStartedColor) notStartedColor.value = '#6c757d';
  if (inProgressColor) inProgressColor.value = '#ffc107';
  if (completeColor) completeColor.value = '#28a745';
  if (onHoldColor) onHoldColor.value = '#dc3545';
}

// Save settings from the settings modal
function saveSettings() {
  // Get form values
  const emailNotifications = document.getElementById('notification-email').checked;
  const clashNotifications = document.getElementById('notification-clash').checked;
  const progressNotifications = document.getElementById('notification-progress').checked;
  const alertNotifications = document.getElementById('notification-alerts').checked;
  
  const showGrid = document.getElementById('show-grid').checked;
  const showCoordinateAxes = document.getElementById('show-coordinate-axes').checked;
  const cameraSpeed = document.getElementById('camera-speed').value;
  
  // Get color values if they exist
  const structuralColor = document.getElementById('structural-color')?.value;
  const mechanicalColor = document.getElementById('mechanical-color')?.value;
  const electricalColor = document.getElementById('electrical-color')?.value;
  const plumbingColor = document.getElementById('plumbing-color')?.value;
  const fireProtectionColor = document.getElementById('fire-protection-color')?.value;
  const architecturalColor = document.getElementById('architectural-color')?.value;
  
  const notStartedColor = document.getElementById('not-started-color')?.value;
  const inProgressColor = document.getElementById('in-progress-color')?.value;
  const completeColor = document.getElementById('complete-color')?.value;
  const onHoldColor = document.getElementById('on-hold-color')?.value;
  
  // Prepare settings object
  const settings = {
    notifications: {
      email: emailNotifications,
      clash: clashNotifications,
      progress: progressNotifications,
      alerts: alertNotifications
    },
    viewer3d: {
      showGrid,
      showCoordinateAxes,
      cameraSpeed
    },
    colors: {
      systems: {
        structural: structuralColor,
        mechanical: mechanicalColor,
        electrical: electricalColor,
        plumbing: plumbingColor,
        firePrevention: fireProtectionColor,
        architectural: architecturalColor
      },
      status: {
        notStarted: notStartedColor,
        inProgress: inProgressColor,
        complete: completeColor,
        onHold: onHoldColor
      }
    }
  };
  
  // Save settings (would be replaced with actual API call)
  console.log('Saving settings:', settings);
  
  // If color settings changed, update CSS variables
  if (structuralColor) document.documentElement.style.setProperty('--structural-color', structuralColor);
  if (mechanicalColor) document.documentElement.style.setProperty('--mechanical-color', mechanicalColor);
  if (electricalColor) document.documentElement.style.setProperty('--electrical-color', electricalColor);
  if (plumbingColor) document.documentElement.style.setProperty('--plumbing-color', plumbingColor);
  if (fireProtectionColor) document.documentElement.style.setProperty('--fire-protection-color', fireProtectionColor);
  if (architecturalColor) document.documentElement.style.setProperty('--architectural-color', architecturalColor);
  
  if (notStartedColor) document.documentElement.style.setProperty('--not-started-color', notStartedColor);
  if (inProgressColor) document.documentElement.style.setProperty('--in-progress-color', inProgressColor);
  if (completeColor) document.documentElement.style.setProperty('--complete-color', completeColor);
  if (onHoldColor) document.documentElement.style.setProperty('--on-hold-color', onHoldColor);
  
  // Show success message
  showToast('Settings saved successfully!', 'success');
  
  // Close the modal
  settingsModal.hide();
}

// Reset settings to defaults
function resetSettings() {
  if (!confirm('Are you sure you want to reset all settings to defaults?')) {
    return;
  }
  
  // Reset notification settings
  document.getElementById('notification-email').checked = true;
  document.getElementById('notification-clash').checked = true;
  document.getElementById('notification-progress').checked = true;
  document.getElementById('notification-alerts').checked = true;
  
  // Reset 3D viewer settings
  document.getElementById('show-grid').checked = true;
  document.getElementById('show-coordinate-axes').checked = true;
  document.getElementById('camera-speed').value = 5;
  
  // Reset system colors
  if (document.getElementById('structural-color')) document.getElementById('structural-color').value = '#0d6efd';
  if (document.getElementById('mechanical-color')) document.getElementById('mechanical-color').value = '#0dcaf0';
  if (document.getElementById('electrical-color')) document.getElementById('electrical-color').value = '#ffc107';
  if (document.getElementById('plumbing-color')) document.getElementById('plumbing-color').value = '#20c997';
  if (document.getElementById('fire-protection-color')) document.getElementById('fire-protection-color').value = '#dc3545';
  if (document.getElementById('architectural-color')) document.getElementById('architectural-color').value = '#6f42c1';
  
  // Reset status colors
  if (document.getElementById('not-started-color')) document.getElementById('not-started-color').value = '#6c757d';
  if (document.getElementById('in-progress-color')) document.getElementById('in-progress-color').value = '#ffc107';
  if (document.getElementById('complete-color')) document.getElementById('complete-color').value = '#28a745';
  if (document.getElementById('on-hold-color')) document.getElementById('on-hold-color').value = '#dc3545';
  
  // Show success message
  showToast('Settings reset to defaults!', 'info');
}

// Helper function to refresh elements list
function refreshElementsList() {
  // This would be replaced with an actual API call to refresh data
  console.log('Refreshing elements list');
  
  // For demo purposes, just reload the page after a short delay
  // In a real app, this would update the table with new data without page reload
  setTimeout(() => {
    if (typeof window.gcVDC.loadData === 'function') {
      window.gcVDC.loadData('/api/elements', function(data) {
        window.gcVDC.populateElementsTable(data);
      });
    }
  }, 500);
}

// Helper function to refresh clashes list
function refreshClashesList() {
  // This would be replaced with an actual API call to refresh data
  console.log('Refreshing clashes list');
  
  // For demo purposes, just reload the page after a short delay
  // In a real app, this would update the table with new data without page reload
  setTimeout(() => {
    if (typeof window.gcVDC.loadData === 'function') {
      window.gcVDC.loadData('/api/clashes', function(data) {
        window.gcVDC.populateClashesTable(data);
      });
    }
  }, 500);
}

// Helper function to show toast notifications
function showToast(message, type = 'info') {
  // Check if toast container exists, create if not
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  // Create a unique ID for this toast
  const toastId = 'toast-' + Date.now();
  
  // Create toast element
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-${type}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  // Add toast to container
  toastContainer.innerHTML += toastHtml;
  
  // Initialize the Bootstrap toast and show it
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 5000
  });
  
  toast.show();
  
  // Remove toast from DOM after it's hidden
  toastElement.addEventListener('hidden.bs.toast', function() {
    toastElement.remove();
  });
}

// Event handler for document ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modals
  initModals();
});

// Export functions for use in other scripts
window.gcVDC = window.gcVDC || {};
Object.assign(window.gcVDC, {
  showToast,
  loadElementForEdit,
  loadClashDetails,
  resolveClash,
  bindEditButtons,
  bindClashDetailButtons
});

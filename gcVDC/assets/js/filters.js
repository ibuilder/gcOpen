/**
 * gcVDC - Filtering Functionality
 * Handles advanced filtering throughout the application
 */

// Current active filters
let activeFilters = {
  systems: [],
  statuses: [],
  location: '',
  level: '',
  zone: '',
  dateRange: {
    start: null,
    end: null
  }
};

// Initialize filters on page load
function initFilters() {
  // Get filter elements
  const systemFilterBtns = document.querySelectorAll('.system-filter');
  const statusFilterBtns = document.querySelectorAll('.status-filter');
  const locationFilter = document.getElementById('location-filter');
  const levelFilter = document.getElementById('level-filter');
  const zoneFilter = document.getElementById('zone-filter');
  const dateRangeStart = document.getElementById('date-range-start');
  const dateRangeEnd = document.getElementById('date-range-end');
  const clearFiltersBtn = document.getElementById('clear-filters');
  
  // Bind event listeners to system filter buttons
  systemFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      toggleSystemFilter(this);
      applyFilters();
    });
  });
  
  // Bind event listeners to status filter buttons
  statusFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      toggleStatusFilter(this);
      applyFilters();
    });
  });
  
  // Bind event listeners to other filter inputs
  if (locationFilter) {
    locationFilter.addEventListener('input', function() {
      activeFilters.location = this.value;
      applyFilters();
    });
  }
  
  if (levelFilter) {
    levelFilter.addEventListener('change', function() {
      activeFilters.level = this.value;
      applyFilters();
    });
  }
  
  if (zoneFilter) {
    zoneFilter.addEventListener('change', function() {
      activeFilters.zone = this.value;
      applyFilters();
    });
  }
  
  if (dateRangeStart) {
    dateRangeStart.addEventListener('change', function() {
      activeFilters.dateRange.start = this.value ? new Date(this.value) : null;
      applyFilters();
    });
  }
  
  if (dateRangeEnd) {
    dateRangeEnd.addEventListener('change', function() {
      activeFilters.dateRange.end = this.value ? new Date(this.value) : null;
      applyFilters();
    });
  }
  
  // Bind event listener to clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  // Initialize search filter
  initSearchFilter();
  
  // Initialize filter presets
  initFilterPresets();
}

// Toggle system filter selection
function toggleSystemFilter(button) {
  const system = button.getAttribute('data-system');
  
  if (button.classList.contains('active')) {
    // Remove from active filters
    button.classList.remove('active');
    activeFilters.systems = activeFilters.systems.filter(s => s !== system);
  } else {
    // Add to active filters
    button.classList.add('active');
    activeFilters.systems.push(system);
  }
  
  // Update filter indicator
  updateFilterIndicator();
}

// Toggle status filter selection
function toggleStatusFilter(button) {
  const status = button.getAttribute('data-status');
  
  if (button.classList.contains('active')) {
    // Remove from active filters
    button.classList.remove('active');
    activeFilters.statuses = activeFilters.statuses.filter(s => s !== status);
  } else {
    // Add to active filters
    button.classList.add('active');
    activeFilters.statuses.push(status);
  }
  
  // Update filter indicator
  updateFilterIndicator();
}

// Initialize search filter functionality
function initSearchFilter() {
  const searchInput = document.getElementById('search-filter');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filterTableBySearch(searchTerm);
  });
}

// Filter table based on search term
function filterTableBySearch(searchTerm) {
  const tables = document.querySelectorAll('.filterable-table');
  
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
      // Skip already hidden rows (filtered by other criteria)
      if (row.style.display === 'none') return;
      
      const cells = row.querySelectorAll('td');
      let matchFound = false;
      
      cells.forEach(cell => {
        const text = cell.textContent || cell.innerText;
        if (text.toLowerCase().indexOf(searchTerm) > -1) {
          matchFound = true;
        }
      });
      
      row.style.display = matchFound ? '' : 'none';
    });
  });
  
  // Update filtered counts
  updateFilteredCounts();
}

// Apply all active filters to the table
function applyFilters() {
  const tables = document.querySelectorAll('.filterable-table');
  
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
      let showRow = true;
      
      // Apply system filter
      if (activeFilters.systems.length > 0) {
        const rowSystem = row.getAttribute('data-system');
        if (!activeFilters.systems.includes(rowSystem)) {
          showRow = false;
        }
      }
      
      // Apply status filter
      if (showRow && activeFilters.statuses.length > 0) {
        const rowStatus = row.getAttribute('data-status');
        if (!activeFilters.statuses.includes(rowStatus)) {
          showRow = false;
        }
      }
      
      // Apply location filter
      if (showRow && activeFilters.location) {
        const locationCell = row.querySelector('td[data-location]');
        if (locationCell) {
          const location = locationCell.textContent || locationCell.innerText;
          if (!location.toLowerCase().includes(activeFilters.location.toLowerCase())) {
            showRow = false;
          }
        }
      }
      
      // Apply level filter
      if (showRow && activeFilters.level) {
        const rowLevel = row.getAttribute('data-level');
        if (rowLevel !== activeFilters.level) {
          showRow = false;
        }
      }
      
      // Apply zone filter
      if (showRow && activeFilters.zone) {
        const rowZone = row.getAttribute('data-zone');
        if (rowZone !== activeFilters.zone) {
          showRow = false;
        }
      }
      
      // Apply date range filter
      if (showRow && (activeFilters.dateRange.start || activeFilters.dateRange.end)) {
        const dateCell = row.querySelector('td[data-date]');
        if (dateCell) {
          const dateStr = dateCell.getAttribute('data-date');
          const rowDate = new Date(dateStr);
          
          if (activeFilters.dateRange.start && rowDate < activeFilters.dateRange.start) {
            showRow = false;
          }
          
          if (activeFilters.dateRange.end) {
            const endDate = new Date(activeFilters.dateRange.end);
            endDate.setHours(23, 59, 59, 999); // Set to end of day
            if (rowDate > endDate) {
              showRow = false;
            }
          }
        }
      }
      
      // Apply row visibility
      row.style.display = showRow ? '' : 'none';
    });
  });
  
  // Update filter indicator
  updateFilterIndicator();
  
  // Update counters
  updateFilteredCounts();
}

// Clear all active filters
function clearFilters() {
  // Reset active filters object
  activeFilters = {
    systems: [],
    statuses: [],
    location: '',
    level: '',
    zone: '',
    dateRange: {
      start: null,
      end: null
    }
  };
  
  // Reset UI elements
  const systemFilterBtns = document.querySelectorAll('.system-filter');
  systemFilterBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  
  const statusFilterBtns = document.querySelectorAll('.status-filter');
  statusFilterBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  
  const locationFilter = document.getElementById('location-filter');
  if (locationFilter) locationFilter.value = '';
  
  const levelFilter = document.getElementById('level-filter');
  if (levelFilter) levelFilter.selectedIndex = 0;
  
  const zoneFilter = document.getElementById('zone-filter');
  if (zoneFilter) zoneFilter.selectedIndex = 0;
  
  const dateRangeStart = document.getElementById('date-range-start');
  if (dateRangeStart) dateRangeStart.value = '';
  
  const dateRangeEnd = document.getElementById('date-range-end');
  if (dateRangeEnd) dateRangeEnd.value = '';
  
  const searchInput = document.getElementById('search-filter');
  if (searchInput) searchInput.value = '';
  
  // Show all rows
  const tables = document.querySelectorAll('.filterable-table');
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      row.style.display = '';
    });
  });
  
  // Update filter indicator
  updateFilterIndicator();
  
  // Update counters
  updateFilteredCounts();
}

// Update the filter indicator to show active filters
function updateFilterIndicator() {
  const filterIndicator = document.getElementById('filter-indicator');
  if (!filterIndicator) return;
  
  // Count active filters
  const filterCount = 
    activeFilters.systems.length + 
    activeFilters.statuses.length + 
    (activeFilters.location ? 1 : 0) + 
    (activeFilters.level ? 1 : 0) + 
    (activeFilters.zone ? 1 : 0) + 
    (activeFilters.dateRange.start || activeFilters.dateRange.end ? 1 : 0);
  
  // Show/hide indicator based on active filter count
  if (filterCount > 0) {
    filterIndicator.textContent = `${filterCount} active filter${filterCount > 1 ? 's' : ''}`;
    filterIndicator.style.display = 'inline-block';
  } else {
    filterIndicator.style.display = 'none';
  }
}

// Update counters showing filtered results
function updateFilteredCounts() {
  const tables = document.querySelectorAll('.filterable-table');
  
  tables.forEach(table => {
    const totalCountEl = table.parentElement.querySelector('.total-count');
    const filteredCountEl = table.parentElement.querySelector('.filtered-count');
    
    if (!totalCountEl || !filteredCountEl) return;
    
    const totalRows = table.querySelectorAll('tbody tr').length;
    const visibleRows = table.querySelectorAll('tbody tr:not([style*="display: none"])').length;
    
    totalCountEl.textContent = totalRows;
    filteredCountEl.textContent = visibleRows;
  });
}

// Initialize filter presets
function initFilterPresets() {
  // Load saved presets from local storage
  updateFilterPresets();
  
  // Set up preset buttons
  const savePresetBtn = document.getElementById('save-preset');
  if (savePresetBtn) {
    savePresetBtn.addEventListener('click', function() {
      // Show modal to get preset name
      const presetName = prompt('Enter a name for this filter preset:');
      if (presetName) {
        saveFilterPreset(presetName);
      }
    });
  }
  
  // Set up preset dropdown
  const presetDropdown = document.getElementById('preset-dropdown');
  if (presetDropdown) {
    presetDropdown.addEventListener('change', function() {
      const presetId = this.value;
      if (presetId) {
        loadFilterPreset(presetId);
      }
    });
  }
}

// Update filter presets dropdown
function updateFilterPresets() {
  const presetDropdown = document.getElementById('preset-dropdown');
  if (!presetDropdown) return;
  
  // Get presets from local storage
  const presets = JSON.parse(localStorage.getItem('filterPresets') || '[]');
  
  // Clear existing options except the first one
  while (presetDropdown.options.length > 1) {
    presetDropdown.remove(1);
  }
  
  // Add presets to dropdown
  presets.forEach((preset, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = preset.name;
    presetDropdown.appendChild(option);
  });
}

// Create a saved filter preset
function saveFilterPreset(name) {
  if (!name) return;
  
  // Create a copy of the current active filters
  const presetData = JSON.parse(JSON.stringify(activeFilters));
  
  // Add name and timestamp
  presetData.name = name;
  presetData.created = new Date().toISOString();
  
  // Get existing presets from local storage
  let presets = JSON.parse(localStorage.getItem('filterPresets') || '[]');
  
  // Add new preset
  presets.push(presetData);
  
  // Save to local storage
  localStorage.setItem('filterPresets', JSON.stringify(presets));
  
  // Update presets dropdown
  updateFilterPresets();
  
  // Show success message
  if (window.gcVDC && window.gcVDC.showToast) {
    window.gcVDC.showToast(`Filter preset "${name}" saved successfully!`, 'success');
  }
}

// Load a saved filter preset
function loadFilterPreset(presetId) {
  // Get presets from local storage
  const presets = JSON.parse(localStorage.getItem('filterPresets') || '[]');
  
  // Find the selected preset
  const preset = presets[presetId];
  if (!preset) return;
  
  // Clear current filters
  clearFilters();
  
  // Apply preset filters
  activeFilters = {
    systems: preset.systems || [],
    statuses: preset.statuses || [],
    location: preset.location || '',
    level: preset.level || '',
    zone: preset.zone || '',
    dateRange: {
      start: preset.dateRange?.start ? new Date(preset.dateRange.start) : null,
      end: preset.dateRange?.end ? new Date(preset.dateRange.end) : null
    }
  };
  
  // Update UI elements
  const systemFilterBtns = document.querySelectorAll('.system-filter');
  systemFilterBtns.forEach(btn => {
    const system = btn.getAttribute('data-system');
    if (activeFilters.systems.includes(system)) {
      btn.classList.add('active');
    }
  });
  
  const statusFilterBtns = document.querySelectorAll('.status-filter');
  statusFilterBtns.forEach(btn => {
    const status = btn.getAttribute('data-status');
    if (activeFilters.statuses.includes(status)) {
      btn.classList.add('active');
    }
  });
  
  const locationFilter = document.getElementById('location-filter');
  if (locationFilter) locationFilter.value = activeFilters.location;
  
  const levelFilter = document.getElementById('level-filter');
  if (levelFilter && activeFilters.level) {
    Array.from(levelFilter.options).forEach((option, index) => {
      if (option.value === activeFilters.level) {
        levelFilter.selectedIndex = index;
      }
    });
  }
  
  const zoneFilter = document.getElementById('zone-filter');
  if (zoneFilter && activeFilters.zone) {
    Array.from(zoneFilter.options).forEach((option, index) => {
      if (option.value === activeFilters.zone) {
        zoneFilter.selectedIndex = index;
      }
    });
  }
  
  const dateRangeStart = document.getElementById('date-range-start');
  if (dateRangeStart && activeFilters.dateRange.start) {
    const date = new Date(activeFilters.dateRange.start);
    dateRangeStart.value = date.toISOString().split('T')[0];
  }
  
  const dateRangeEnd = document.getElementById('date-range-end');
  if (dateRangeEnd && activeFilters.dateRange.end) {
    const date = new Date(activeFilters.dateRange.end);
    dateRangeEnd.value = date.toISOString().split('T')[0];
  }
  
  // Apply filters
  applyFilters();
  
  // Show success message
  if (window.gcVDC && window.gcVDC.showToast) {
    window.gcVDC.showToast(`Filter preset "${preset.name}" loaded successfully!`, 'success');
  }
}

// Delete a saved filter preset
function deleteFilterPreset(presetId) {
  // Get presets from local storage
  let presets = JSON.parse(localStorage.getItem('filterPresets') || '[]');
  
  // Find the selected preset
  const preset = presets[presetId];
  if (!preset) return;
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete the filter preset "${preset.name}"?`)) {
    return;
  }
  
  // Remove preset
  presets.splice(presetId, 1);
  
  // Save to local storage
  localStorage.setItem('filterPresets', JSON.stringify(presets));
  
  // Update presets dropdown
  updateFilterPresets();
  
  // Show success message
  if (window.gcVDC && window.gcVDC.showToast) {
    window.gcVDC.showToast(`Filter preset "${preset.name}" deleted successfully!`, 'success');
  }
}

// Export filter data as JSON
function exportFilters() {
  // Get active filters
  const filterData = JSON.stringify(activeFilters, null, 2);
  
  // Create a blob and download link
  const blob = new Blob([filterData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gcvdc-filters.json';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Cleanup
  URL.revokeObjectURL(url);
}

// Import filter data from JSON file
function importFilters(file) {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      const importedFilters = JSON.parse(e.target.result);
      
      // Validate imported data
      if (!importedFilters.systems || !importedFilters.statuses) {
        throw new Error('Invalid filter data format');
      }
      
      // Clear current filters
      clearFilters();
      
      // Apply imported filters
      activeFilters = {
        systems: importedFilters.systems || [],
        statuses: importedFilters.statuses || [],
        location: importedFilters.location || '',
        level: importedFilters.level || '',
        zone: importedFilters.zone || '',
        dateRange: {
          start: importedFilters.dateRange?.start ? new Date(importedFilters.dateRange.start) : null,
          end: importedFilters.dateRange?.end ? new Date(importedFilters.dateRange.end) : null
        }
      };
      
      // Update UI elements to match imported filters
      updateUIFromFilters();
      
      // Apply filters
      applyFilters();
      
      // Show success message
      if (window.gcVDC && window.gcVDC.showToast) {
        window.gcVDC.showToast('Filters imported successfully!', 'success');
      }
    } catch (error) {
      // Show error message
      if (window.gcVDC && window.gcVDC.showToast) {
        window.gcVDC.showToast('Error importing filters: ' + error.message, 'danger');
      } else {
        alert('Error importing filters: ' + error.message);
      }
    }
  };
  
  reader.readAsText(file);
}

// Update UI elements to match current filters
function updateUIFromFilters() {
  // Update system filter buttons
  const systemFilterBtns = document.querySelectorAll('.system-filter');
  systemFilterBtns.forEach(btn => {
    const system = btn.getAttribute('data-system');
    btn.classList.toggle('active', activeFilters.systems.includes(system));
  });
  
  // Update status filter buttons
  const statusFilterBtns = document.querySelectorAll('.status-filter');
  statusFilterBtns.forEach(btn => {
    const status = btn.getAttribute('data-status');
    btn.classList.toggle('active', activeFilters.statuses.includes(status));
  });
  
  // Update other filter inputs
  const locationFilter = document.getElementById('location-filter');
  if (locationFilter) locationFilter.value = activeFilters.location;
  
  const levelFilter = document.getElementById('level-filter');
  if (levelFilter && activeFilters.level) {
    for (let i = 0; i < levelFilter.options.length; i++) {
      if (levelFilter.options[i].value === activeFilters.level) {
        levelFilter.selectedIndex = i;
        break;
      }
    }
  }
  
  const zoneFilter = document.getElementById('zone-filter');
  if (zoneFilter && activeFilters.zone) {
    for (let i = 0; i < zoneFilter.options.length; i++) {
      if (zoneFilter.options[i].value === activeFilters.zone) {
        zoneFilter.selectedIndex = i;
        break;
      }
    }
  }
  
  const dateRangeStart = document.getElementById('date-range-start');
  if (dateRangeStart && activeFilters.dateRange.start) {
    dateRangeStart.value = activeFilters.dateRange.start.toISOString().split('T')[0];
  }
  
  const dateRangeEnd = document.getElementById('date-range-end');
  if (dateRangeEnd && activeFilters.dateRange.end) {
    dateRangeEnd.value = activeFilters.dateRange.end.toISOString().split('T')[0];
  }
}

// Set up import/export buttons
function initImportExport() {
  const exportBtn = document.getElementById('export-filters');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportFilters);
  }
  
  const importBtn = document.getElementById('import-filters');
  if (importBtn) {
    importBtn.addEventListener('click', function() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json';
      fileInput.style.display = 'none';
      
      fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          importFilters(this.files[0]);
        }
      });
      
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    });
  }
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', function() {
  initFilters();
  initImportExport();
});

// Export functions for use in other scripts
window.gcVDC = window.gcVDC || {};
Object.assign(window.gcVDC, {
  applyFilters,
  clearFilters,
  saveFilterPreset,
  loadFilterPreset,
  deleteFilterPreset,
  exportFilters,
  importFilters
});

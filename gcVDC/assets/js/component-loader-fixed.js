// Component Loader with Direct HTML Injection
// This version doesn't use fetch() to avoid CORS issues with local files

// Load components and initialize page
function initComponents() {
  // Load sidebar
  loadSidebar();
  
  // Load header
  loadHeader();
  
  // Set active navigation item based on current page
  setActiveNavItem();
  
  // Set page title based on current page
  setPageTitle();
  
  // Initialize event listeners for theme radio buttons if they exist
  initThemeRadioButtons();
  
  // Apply current theme
  applyCurrentTheme();
}

// Load sidebar by direct HTML injection (no fetch)
function loadSidebar() {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;
  
  sidebarContainer.innerHTML = `
    <div class="sidebar">
      <div class="sidebar-logo">
        <i class="fas fa-cubes fa-lg text-primary"></i>
        <span>gcVDC</span>
      </div>
      <div class="sidebar-nav">
        <div class="nav-item">
          <a href="index.html" class="nav-link" id="nav-dashboard">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="work-in-place.html" class="nav-link" id="nav-work-in-place">
            <i class="fas fa-tasks"></i>
            <span>Work In Place</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="clash-detection.html" class="nav-link" id="nav-clash-detection">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Clash Detection</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="reports.html" class="nav-link" id="nav-reports">
            <i class="fas fa-chart-bar"></i>
            <span>Reports</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="plans.html" class="nav-link" id="nav-plans">
            <i class="fas fa-map"></i>
            <span>Plans</span>
          </a>
        </div>
        <div class="nav-item">
          <a href="settings.html" class="nav-link" id="nav-settings">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </a>
        </div>
      </div>
      <div class="sidebar-footer">
        <button type="button" class="btn btn-sm btn-outline-secondary" id="toggle-sidebar" title="Toggle Sidebar">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="theme-switcher" title="Switch Theme">
          <i class="fas fa-moon"></i>
        </button>
      </div>
    </div>
  `;
}

// Load header by direct HTML injection (no fetch)
function loadHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;
  
  headerContainer.innerHTML = `
    <div class="header">
      <div class="header-title">
        <h1><span id="page-title">Dashboard</span></h1>
      </div>
      <div class="header-actions">
        <div class="header-search">
          <input type="text" class="form-control search-filter" id="search-filter" placeholder="Search...">
          <i class="fas fa-search search-icon"></i>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-outline-primary" id="filterBtn" data-bs-toggle="modal" data-bs-target="#filterModal">
            <i class="fas fa-filter"></i>
            <span>Filter</span>
            <span class="badge bg-primary" id="filter-indicator" style="display: none;">0</span>
          </button>
          <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Filter Options</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#" id="clear-filters">Clear All Filters</a></li>
            <li><a class="dropdown-item" href="#" id="save-preset">Save Current Filters</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="import-filters">Import Filters</a></li>
            <li><a class="dropdown-item" href="#" id="export-filters">Export Filters</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user-circle"></i>
            <span>User</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="settings.html#user-preferences">User Preferences</a></li>
            <li><a class="dropdown-item" href="settings.html#project-settings">Project Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

// Set active navigation item based on current page
function setActiveNavItem() {
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    const activeNavItem = document.getElementById(`nav-${currentPage}`);
    if (activeNavItem) {
      activeNavItem.classList.add('active');
    }
  }
}

// Set page title based on current page
function setPageTitle() {
  const pageTitleElement = document.getElementById('page-title');
  if (pageTitleElement) {
    const currentPage = document.body.getAttribute('data-page');
    let title = '';
    
    switch (currentPage) {
      case 'dashboard':
        title = 'Dashboard';
        break;
      case 'work-in-place':
        title = 'Work In Place Tracking';
        break;
      case 'clash-detection':
        title = 'Clash Detection';
        break;
      case 'reports':
        title = 'Reports';
        break;
      case 'plans':
        title = 'Plans';
        break;
      case 'settings':
        title = 'Settings';
        break;
      default:
        title = 'Dashboard';
    }
    
    pageTitleElement.textContent = title;
    document.title = title + ' - gcVDC';
  }
}

// Initialize theme radio buttons if they exist
function initThemeRadioButtons() {
  const themeLightRadio = document.getElementById('theme-light');
  const themeDarkRadio = document.getElementById('theme-dark');
  
  if (themeLightRadio && themeDarkRadio) {
    // Set initial value based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme === 'light') {
      themeLightRadio.checked = true;
    } else {
      themeDarkRadio.checked = true;
    }
    
    // Add event listeners
    themeLightRadio.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      }
    });
    
    themeDarkRadio.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }
}

// Apply current theme
function applyCurrentTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// Update the theme icon
function updateThemeIcon(theme) {
  const themeSwitcher = document.getElementById('theme-switcher');
  if (themeSwitcher) {
    const icon = themeSwitcher.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
}

// Toggle theme function for theme switcher button
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  
  // Update radio buttons if they exist
  const themeLightRadio = document.getElementById('theme-light');
  const themeDarkRadio = document.getElementById('theme-dark');
  if (themeLightRadio && themeDarkRadio) {
    if (newTheme === 'light') {
      themeLightRadio.checked = true;
    } else {
      themeDarkRadio.checked = true;
    }
  }
}

// Add event listener for theme switcher button
document.addEventListener('click', function(e) {
  const themeSwitcher = e.target.closest('#theme-switcher');
  if (themeSwitcher) {
    toggleTheme();
  }
});

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', initComponents);

// Component Loader - Loads components and sets active navigation

// Load components and initialize page
function initComponents() {
  // Set active navigation item based on current page
  setActiveNavItem();
  
  // Set page title based on current page
  setPageTitle();
  
  // Initialize event listeners for theme radio buttons if they exist
  initThemeRadioButtons();
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

// Update the theme icon (used by theme radio buttons)
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

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', initComponents);

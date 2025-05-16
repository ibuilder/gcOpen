// Theme Manager - Handles theme switching functionality

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  
  // Initialize theme switch button icon
  updateThemeIcon(savedTheme);
  
  // Add event listener to theme switcher button
  document.addEventListener('click', function(e) {
    const themeSwitcher = e.target.closest('#theme-switcher');
    if (themeSwitcher) {
      toggleTheme();
    }
  });
}

// Apply theme to document
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Toggle between light and dark themes
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Apply theme
  applyTheme(newTheme);
  
  // Save theme preference
  localStorage.setItem('theme', newTheme);
  
  // Update theme switch button icon
  updateThemeIcon(newTheme);
  
  // Update radio buttons in settings if they exist
  updateThemeRadioButtons(newTheme);
}

// Update the theme switcher icon based on current theme
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

// Update radio buttons in settings if they exist
function updateThemeRadioButtons(theme) {
  const themeLightRadio = document.getElementById('theme-light');
  const themeDarkRadio = document.getElementById('theme-dark');
  
  if (themeLightRadio && themeDarkRadio) {
    if (theme === 'light') {
      themeLightRadio.checked = true;
    } else {
      themeDarkRadio.checked = true;
    }
  }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);

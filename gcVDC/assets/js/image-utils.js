/**
 * gcVDC - Image Utilities
 * Enhanced version with additional functionality for image management
 */

/**
 * Image Utilities namespace
 */
const ImageUtils = {
  /**
   * Configuration options
   */
  config: {
    imagePath: 'assets/img/',
    useSpriteSheet: false,
    lazyLoadEnabled: true,
    lazyLoadThreshold: 100,
    placeholderImage: 'placeholder.svg',
    defaultAvatarImage: 'user-avatar.svg',
    preloadImages: [
      'logo.svg',
      'favicon.svg',
      'structural-icon.svg',
      'mechanical-icon.svg',
      'electrical-icon.svg',
      'plumbing-icon.svg',
      'fire-protection-icon.svg',
      'architectural-icon.svg'
    ]
  },
  
  /**
   * System types configuration
   */
  systemTypes: {
    'structural': {
      color: '#0d6efd',
      icon: 'structural-icon.svg',
      displayName: 'Structural'
    },
    'mechanical': {
      color: '#0dcaf0',
      icon: 'mechanical-icon.svg',
      displayName: 'Mechanical'
    },
    'electrical': {
      color: '#ffc107',
      icon: 'electrical-icon.svg',
      displayName: 'Electrical'
    },
    'plumbing': {
      color: '#20c997',
      icon: 'plumbing-icon.svg',
      displayName: 'Plumbing'
    },
    'fire-protection': {
      color: '#dc3545',
      icon: 'fire-protection-icon.svg',
      displayName: 'Fire Protection'
    },
    'architectural': {
      color: '#6f42c1',
      icon: 'architectural-icon.svg',
      displayName: 'Architectural'
    }
  },
  
  /**
   * Placeholder types configuration
   */
  placeholderTypes: {
    'empty-state': {
      file: 'empty-state.svg',
      class: 'empty-state-img',
      alt: 'No items found'
    },
    'no-data-chart': {
      file: 'no-data-chart.svg',
      class: 'no-data-chart-img',
      alt: 'No data available'
    },
    'plan-placeholder': {
      file: 'plan-placeholder.svg',
      class: 'plan-placeholder-img',
      alt: 'No plan preview available'
    },
    'model-placeholder': {
      file: 'model-placeholder.svg',
      class: 'model-placeholder-img',
      alt: '3D model visualization'
    }
  },
  
  /**
   * Initialize the image utilities
   * @param {Object} options - Configuration options
   */
  init: function(options = {}) {
    // Merge options with default config
    this.config = { ...this.config, ...options };
    
    // Preload important images
    if (this.config.preloadImages && this.config.preloadImages.length > 0) {
      this.preloadImages(this.config.preloadImages);
    }
    
    // Initialize lazy loading if enabled
    if (this.config.lazyLoadEnabled) {
      this.initLazyLoading();
    }
    
    // Add error handling for images
    this.initErrorHandling();
    
    // Initialize dark mode detection
    this.initDarkModeDetection();
    
    console.log('gcVDC Image Utilities initialized');
  },
  
  /**
   * Get the appropriate system icon based on system type
   * @param {string} systemType - The system type (e.g., "Structural", "Mechanical")
   * @param {boolean} large - Whether to use the large version of the icon
   * @returns {string} HTML for the system icon
   */
  getSystemIcon: function(systemType, large = false) {
    // Normalize system type to lowercase
    const type = systemType.toLowerCase();
    
    // Get system config
    const system = this.systemTypes[type] || this.systemTypes['structural'];
    
    // Determine class names
    const sizeClass = large ? 'system-icon-lg' : 'system-icon';
    const systemClass = `system-icon-${type}`;
    
    // Use sprite sheet or direct image
    if (this.config.useSpriteSheet) {
      return `<span class="system-icon-sprite ${systemClass} ${large ? 'large' : ''}" 
              title="${system.displayName} System" 
              aria-label="${system.displayName} System"></span>`;
    } else {
      return `<img src="${this.config.imagePath}${system.icon}" 
              alt="${system.displayName} System" 
              class="${sizeClass} ${systemClass}">`;
    }
  },
  
  /**
   * Get placeholder image for empty states
   * @param {string} type - Type of placeholder (e.g., "empty-state", "no-data-chart")
   * @param {string} message - Optional message to display with the placeholder
   * @returns {string} HTML for the placeholder
   */
  getPlaceholderImage: function(type, message = '') {
    // Get placeholder config
    const placeholder = this.placeholderTypes[type] || this.placeholderTypes['empty-state'];
    
    // Create image HTML
    let html = `<div class="text-center">
      <img src="${this.config.imagePath}${placeholder.file}" 
           alt="${placeholder.alt}" 
           class="${placeholder.class} placeholder-img"
           loading="${this.config.lazyLoadEnabled ? 'lazy' : 'eager'}">`;
    
    // Add optional message
    if (message) {
      html += `<p class="text-muted">${message}</p>`;
    }
    
    html += '</div>';
    
    return html;
  },
  
  /**
   * Get user avatar image
   * @param {string} userId - Optional user ID to get specific avatar
   * @param {boolean} large - Whether to use the large version of the avatar
   * @returns {string} HTML for the user avatar
   */
  getUserAvatar: function(userId = null, large = false) {
    // Determine size class
    const sizeClass = large ? 'user-avatar-lg' : 'user-avatar';
    
    // In a real app, this would fetch the user's avatar if available
    // For now, use the default avatar
    return `<img src="${this.config.imagePath}${this.config.defaultAvatarImage}" 
             alt="User Avatar" 
             class="${sizeClass}"
             loading="${this.config.lazyLoadEnabled ? 'lazy' : 'eager'}">`;
  },
  
  /**
   * Preload a list of images
   * @param {Array} images - List of image filenames to preload
   */
  preloadImages: function(images) {
    if (!images || images.length === 0) return;
    
    // Create preload container if it doesn't exist
    let preloadContainer = document.querySelector('.preload-images');
    if (!preloadContainer) {
      preloadContainer = document.createElement('div');
      preloadContainer.className = 'preload-images';
      document.body.appendChild(preloadContainer);
    }
    
    // Add images to preload container
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = `${this.config.imagePath}${image}`;
      img.alt = `Preload ${image}`;
      preloadContainer.appendChild(img);
    });
  },
  
  /**
   * Initialize lazy loading for images
   */
  initLazyLoading: function() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports lazy loading
      document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      this.initIntersectionObserver();
    }
  },
  
  /**
   * Initialize intersection observer for lazy loading
   */
  initIntersectionObserver: function() {
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src || lazyImage.src;
          lazyImage.removeAttribute('loading');
          imageObserver.unobserve(lazyImage);
        }
      });
    }, {
      rootMargin: `0px 0px ${this.config.lazyLoadThreshold}px 0px`
    });
    
    lazyImages.forEach(image => {
      if (!image.dataset.src) {
        image.dataset.src = image.src;
      }
      imageObserver.observe(image);
    });
  },
  
  /**
   * Initialize error handling for images
   */
  initErrorHandling: function() {
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('onerror')) {
        img.addEventListener('error', function() {
          // If image fails to load, replace with appropriate placeholder
          if (this.classList.contains('system-icon')) {
            this.src = `${ImageUtils.config.imagePath}structural-icon.svg`;
          } else if (this.classList.contains('user-avatar')) {
            this.src = `${ImageUtils.config.imagePath}${ImageUtils.config.defaultAvatarImage}`;
          } else {
            this.src = `${ImageUtils.config.imagePath}${ImageUtils.config.placeholderImage}`;
          }
          
          // Add broken image class
          this.classList.add('broken-image');
          
          // Log error
          console.warn('Image failed to load:', this.src);
        });
      }
    });
    
    // Also handle dynamically added images
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function() {
      const result = originalAppendChild.apply(this, arguments);
      if (result.tagName === 'IMG' && !result.hasAttribute('onerror')) {
        result.addEventListener('error', function() {
          if (this.classList.contains('system-icon')) {
            this.src = `${ImageUtils.config.imagePath}structural-icon.svg`;
          } else if (this.classList.contains('user-avatar')) {
            this.src = `${ImageUtils.config.imagePath}${ImageUtils.config.defaultAvatarImage}`;
          } else {
            this.src = `${ImageUtils.config.imagePath}${ImageUtils.config.placeholderImage}`;
          }
          this.classList.add('broken-image');
        });
      }
      return result;
    };
  },
  
  /**
   * Initialize dark mode detection
   */
  initDarkModeDetection: function() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply dark mode if preferred
    if (darkModeMediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Listen for changes in color scheme preference
    darkModeMediaQuery.addEventListener('change', e => {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Dispatch theme change event
      const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
      document.dispatchEvent(event);
    });
  },
  
  /**
   * Get system color
   * @param {string} systemType - The system type
   * @returns {string} The system color
   */
  getSystemColor: function(systemType) {
    const type = systemType.toLowerCase();
    const system = this.systemTypes[type] || this.systemTypes['structural'];
    return system.color;
  },
  
  /**
   * Create a color badge for a system
   * @param {string} systemType - The system type
   * @param {string} text - Text to display in the badge
   * @returns {string} HTML for the badge
   */
  getSystemBadge: function(systemType, text) {
    const type = systemType.toLowerCase();
    const system = this.systemTypes[type] || this.systemTypes['structural'];
    
    return `<span class="badge" style="background-color: ${system.color};">
      ${text || system.displayName}
    </span>`;
  },
  
  /**
   * Create an image badge
   * @param {string} text - Text to display
   * @param {string} color - Badge color (default: primary)
   * @returns {string} HTML for the badge
   */
  getImageBadge: function(text, color = 'primary') {
    return `<span class="badge bg-${color}">${text}</span>`;
  },
  
  /**
   * Create an image container with optional overlay and badge
   * @param {string} imageSrc - Image source
   * @param {string} altText - Alt text
   * @param {Object} options - Additional options
   * @returns {string} HTML for the image container
   */
  getImageContainer: function(imageSrc, altText, options = {}) {
    const {
      badge = null,
      badgeColor = 'primary',
      overlay = null,
      className = ''
    } = options;
    
    let html = `<div class="img-container ${className}">
      <img src="${this.config.imagePath}${imageSrc}" 
           alt="${altText}" 
           class="img-fluid"
           loading="${this.config.lazyLoadEnabled ? 'lazy' : 'eager'}">`;
    
    if (overlay) {
      html += `<div class="img-overlay">${overlay}</div>`;
    }
    
    if (badge) {
      html += `<span class="img-badge bg-${badgeColor}">${badge}</span>`;
    }
    
    html += '</div>';
    
    return html;
  },
  
  /**
   * Create a status indicator
   * @param {string} status - Status (not-started, in-progress, complete, on-hold)
   * @param {string} text - Optional text to display
   * @returns {string} HTML for the status indicator
   */
  getStatusIndicator: function(status, text = '') {
    let html = `<span class="status-indicator status-${status}"></span>`;
    
    if (text) {
      html = `<div class="d-flex align-items-center">
        ${html}
        <span class="ms-1">${text}</span>
      </div>`;
    }
    
    return html;
  },
  
  /**
   * Create a system icon with status
   * @param {string} systemType - System type
   * @param {string} status - Status
   * @param {string} text - Optional text
   * @returns {string} HTML for the system icon with status
   */
  getSystemIconWithStatus: function(systemType, status, text = '') {
    let html = `<div class="d-flex align-items-center">
      ${this.getSystemIcon(systemType)}
      ${this.getStatusIndicator(status)}
    </div>`;
    
    if (text) {
      html = `<div class="d-flex align-items-center">
        ${html}
        <span class="ms-2">${text}</span>
      </div>`;
    }
    
    return html;
  }
};

// Initialize on document ready
document.addEventListener('DOMContentLoaded', function() {
  ImageUtils.init();
});

// Export functions for use in other scripts
window.gcVDC = window.gcVDC || {};
Object.assign(window.gcVDC, {
  getSystemIcon: function(systemType, large) {
    return ImageUtils.getSystemIcon(systemType, large);
  },
  getPlaceholderImage: function(type, message) {
    return ImageUtils.getPlaceholderImage(type, message);
  },
  getUserAvatar: function(userId, large) {
    return ImageUtils.getUserAvatar(userId, large);
  },
  getSystemColor: function(systemType) {
    return ImageUtils.getSystemColor(systemType);
  },
  getSystemBadge: function(systemType, text) {
    return ImageUtils.getSystemBadge(systemType, text);
  },
  getImageBadge: function(text, color) {
    return ImageUtils.getImageBadge(text, color);
  },
  getImageContainer: function(imageSrc, altText, options) {
    return ImageUtils.getImageContainer(imageSrc, altText, options);
  },
  getStatusIndicator: function(status, text) {
    return ImageUtils.getStatusIndicator(status, text);
  },
  getSystemIconWithStatus: function(systemType, status, text) {
    return ImageUtils.getSystemIconWithStatus(systemType, status, text);
  },
  preloadImages: function(images) {
    ImageUtils.preloadImages(images);
  }
});

// component-loader.js
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
    }

    async loadComponent(componentPath, targetElementId) {
        try {
            // Check if component is already cached
            let html = this.loadedComponents.get(componentPath);
            
            if (!html) {
                // Fetch the component
                const response = await fetch(componentPath);
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentPath}`);
                }
                html = await response.text();
                this.loadedComponents.set(componentPath, html);
            }
            
            // Insert the component into the target element
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = html;
                return true;
            } else {
                console.error(`Target element not found: ${targetElementId}`);
                return false;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            return false;
        }
    }

    async loadPageComponents(pageConfig) {
        const promises = [];
        
        // Load all components for the page
        for (const [componentPath, targetElementId] of Object.entries(pageConfig)) {
            promises.push(this.loadComponent(componentPath, targetElementId));
        }
        
        // Wait for all components to load
        await Promise.all(promises);
        
        // Initialize page-specific functionality after components are loaded
        this.initializePageFunctionality();
    }

    initializePageFunctionality() {
        // Set active sidebar link based on current page
        const currentPage = window.location.pathname.split('/').pop();
        const activeLink = document.querySelector(`a[href="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Initialize Bootstrap components
        this.initializeBootstrapComponents();
        
        // Set page title in header
        const pageTitle = document.title.split(' - ')[0];
        const pageTitleElement = document.getElementById('pageTitle');
        if (pageTitleElement) {
            pageTitleElement.textContent = pageTitle;
        }
    }

    initializeBootstrapComponents() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Initialize Bootstrap popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
}

// Create a global instance
const componentLoader = new ComponentLoader();

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Define the components to load for all pages
    const pageComponents = {
        'components/sidebar.html': 'sidebar-container',
        'components/header.html': 'header-container'
    };
    
    // Load the components
    await componentLoader.loadPageComponents(pageComponents);
});

// embedded-components.js
// This file contains all component HTML embedded as JavaScript strings
// This approach works without a server

const components = {
    sidebar: `
        <!-- Sidebar Component -->
        <aside class="sidebar">
            <div class="logo">
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 15 L20 5 L35 15 L35 25 L20 35 L5 25 Z" fill="#ffffff" stroke="#1a237e" stroke-width="1"/>
                    <path d="M5 15 L20 25 L35 15" fill="none" stroke="#1a237e" stroke-width="1"/>
                    <path d="M20 25 L20 35" fill="none" stroke="#1a237e" stroke-width="1"/>
                    <text x="20" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1a237e">gc</text>
                </svg>
                <h2>gcDesign</h2>
            </div>
            
            <nav>
                <ul class="sidebar-nav">
                    <li>
                        <a href="dashboard.html">
                            <i class="fas fa-tachometer-alt"></i>
                            Dashboard
                        </a>
                    </li>
                </ul>
                
                <div class="sidebar-section">
                    <div class="sidebar-section-title">DOCUMENT SET</div>
                    <ul class="sidebar-nav">
                        <li>
                            <a href="file-explorer.html">
                                <i class="fas fa-folder"></i>
                                File Explorer
                            </a>
                        </li>
                        <li>
                            <a href="drawings.html">
                                <i class="fas fa-drafting-compass"></i>
                                Drawings
                            </a>
                        </li>
                        <li>
                            <a href="specifications.html">
                                <i class="fas fa-file-alt"></i>
                                Specifications
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-section-title">MANAGEMENT</div>
                    <ul class="sidebar-nav">
                        <li>
                            <a href="rfis.html">
                                <i class="fas fa-question-circle"></i>
                                RFIs
                            </a>
                        </li>
                        <li>
                            <a href="submittals.html">
                                <i class="fas fa-file-upload"></i>
                                Submittals
                            </a>
                        </li>
                        <li>
                            <a href="permits.html">
                                <i class="fas fa-stamp"></i>
                                Permits
                            </a>
                        </li>
                        <li>
                            <a href="field-reports.html">
                                <i class="fas fa-clipboard-list"></i>
                                Field Reports
                            </a>
                        </li>
                        <li>
                            <a href="meetings.html">
                                <i class="fas fa-calendar-alt"></i>
                                Meetings
                            </a>
                        </li>
                        <li>
                            <a href="transmittals.html">
                                <i class="fas fa-paper-plane"></i>
                                Transmittals
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-section-title">SETTINGS</div>
                    <ul class="sidebar-nav">
                        <li>
                            <a href="project-info.html">
                                <i class="fas fa-info-circle"></i>
                                Project Information
                            </a>
                        </li>
                        <li>
                            <a href="companies.html">
                                <i class="fas fa-building"></i>
                                Companies
                            </a>
                        </li>
                        <li>
                            <a href="users.html">
                                <i class="fas fa-users"></i>
                                Users
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div class="user-profile">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin User">
                <div class="user-info">
                    <h6>Admin User</h6>
                    <small>Administrator</small>
                </div>
                <a href="#" class="text-white ms-auto">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </aside>
    `,
    
    header: `
        <!-- Header Component -->
        <header class="header">
            <div class="d-flex align-items-center">
                <button class="btn btn-link d-md-none p-0 me-3" id="sidebarToggle">
                    <i class="fas fa-bars fs-4"></i>
                </button>
                <h1 class="page-title" id="pageTitle">Dashboard</h1>
            </div>
            
            <div class="header-actions">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search..." class="form-control">
                </div>
                
                <div class="notification-badge">
                    <a href="#" class="text-dark">
                        <i class="fas fa-bell fs-5"></i>
                        <span class="badge">3</span>
                    </a>
                </div>
                
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin User" width="32" height="32" class="rounded-circle me-2">
                        <span class="d-none d-md-inline text-dark">Admin User</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i> Profile</a></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i> Settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
                    </ul>
                </div>
            </div>
        </header>
    `
};

// Component loader class
class EmbeddedComponentLoader {
    loadComponent(componentName, targetElementId) {
        const targetElement = document.getElementById(targetElementId);
        if (targetElement && components[componentName]) {
            targetElement.innerHTML = components[componentName];
            return true;
        }
        return false;
    }

    loadPageComponents() {
        // Load sidebar and header
        this.loadComponent('sidebar', 'sidebar-container');
        this.loadComponent('header', 'header-container');
        
        // Initialize page functionality
        this.initializePageFunctionality();
    }

    initializePageFunctionality() {
        // Set active sidebar link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
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
        
        // Initialize mobile sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
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
const componentLoader = new EmbeddedComponentLoader();

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    componentLoader.loadPageComponents();
});

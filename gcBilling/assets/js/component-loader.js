// Component Loader - Works without server
const components = {
    sidebar: `
        <nav class="sidebar">
            <div class="sidebar-brand">
                <i class="fas fa-building me-2"></i>
                GCBilling
            </div>
            
            <ul class="sidebar-nav">
                <li class="nav-item">
                    <a href="dashboard.html" class="nav-link">
                        <i class="fas fa-tachometer-alt"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a href="project-information.html" class="nav-link">
                        <i class="fas fa-info-circle"></i>
                        Project Information
                    </a>
                </li>
                <li class="nav-item">
                    <a href="budget.html" class="nav-link">
                        <i class="fas fa-calculator"></i>
                        Budget (GMP)
                    </a>
                </li>
                <li class="nav-item">
                    <a href="organization-chart.html" class="nav-link">
                        <i class="fas fa-sitemap"></i>
                        Org Chart
                    </a>
                </li>
                <li class="nav-item">
                    <a href="general-conditions.html" class="nav-link">
                        <i class="fas fa-file-contract"></i>
                        General Conditions
                    </a>
                </li>
                <li class="nav-item">
                    <a href="schedule-of-values.html" class="nav-link">
                        <i class="fas fa-table"></i>
                        Schedule of Values
                    </a>
                </li>
                <li class="nav-item">
                    <a href="change-orders.html" class="nav-link">
                        <i class="fas fa-exchange-alt"></i>
                        Change Orders
                    </a>
                </li>
                <li class="nav-item">
                    <a href="applications.html" class="nav-link">
                        <i class="fas fa-file-invoice"></i>
                        Applications
                    </a>
                </li>
                <li class="nav-item">
                    <a href="reports.html" class="nav-link">
                        <i class="fas fa-chart-bar"></i>
                        Reports
                    </a>
                </li>
                <li class="nav-item">
                    <a href="settings.html" class="nav-link">
                        <i class="fas fa-cog"></i>
                        Settings
                    </a>
                </li>
                <li class="nav-item">
                    <a href="user.html" class="nav-link">
                        <i class="fas fa-user-circle"></i>
                        User
                    </a>
                </li>
                <li class="nav-item">
                    <a href="help.html" class="nav-link">
                        <i class="fas fa-question-circle"></i>
                        Help & FAQs
                    </a>
                </li>
            </ul>
            
            <div class="sidebar-footer p-3 mt-auto">
                <div class="d-flex align-items-center">
                    <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        AU
                    </div>
                    <div class="ms-2">
                        <small class="text-light">Admin User</small>
                    </div>
                </div>
            </div>
        </nav>
    `,
    
    header: `
        <header class="content-header">
            <div class="d-flex align-items-center">
                <button class="btn btn-link d-md-none p-0 me-3" id="sidebarToggle">
                    <i class="fas fa-bars fa-lg"></i>
                </button>
                <div>
                    <h1 class="h4 mb-0" id="pageTitle">Dashboard</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0" id="breadcrumb">
                            <li class="breadcrumb-item active">Highrise Development</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="action-buttons">
                <div class="dropdown d-inline-block">
                    <button class="btn btn-outline-secondary btn-icon" data-bs-toggle="dropdown">
                        <i class="fas fa-bell"></i>
                        <span class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">3</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end" style="width: 300px;">
                        <h6 class="dropdown-header">Notifications</h6>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <i class="fas fa-check-circle text-success"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <p class="mb-0">Application #5 approved</p>
                                    <small class="text-muted">2 hours ago</small>
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-center" href="#">View all notifications</a>
                    </div>
                </div>
                
                <button class="btn btn-outline-secondary btn-icon" onclick="refreshDashboardData()">
                    <i class="fas fa-sync-alt"></i>
                </button>
                
                <div class="dropdown d-inline-block">
                    <button class="btn btn-outline-secondary btn-icon" data-bs-toggle="dropdown">
                        <i class="fas fa-user-circle"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="user.html">
                            <i class="fas fa-user me-2"></i> Profile
                        </a>
                        <a class="dropdown-item" href="settings.html">
                            <i class="fas fa-cog me-2"></i> Settings
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-sign-out-alt me-2"></i> Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    `
};

// Function to load components
function loadComponent(componentName, containerId) {
    const container = document.getElementById(containerId);
    if (container && components[componentName]) {
        container.innerHTML = components[componentName];
        
        // If it's the sidebar, initialize it after a short delay to ensure DOM is ready
        if (componentName === 'sidebar') {
            setTimeout(() => {
                initializeSidebar();
            }, 100);
        }
    }
}

// Load components when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar if container exists
    if (document.getElementById('sidebar-container')) {
        loadComponent('sidebar', 'sidebar-container');
    }
    
    // Load header if container exists
    if (document.getElementById('header-container')) {
        loadComponent('header', 'header-container');
    }
});

// Expose loadComponent function globally
window.loadComponent = loadComponent;

// HTML Components for gsDeliver Dashboard

// Sidebar Component
function createSidebar(activePage) {
    return `
    <nav class="sidebar">
        <div class="brand-section">
            <h4><i class="bi bi-truck"></i> gsDeliver</h4>
        </div>
        <div class="user-section">
            <div class="d-flex align-items-center">
                <i class="bi bi-person-circle fs-4 me-2"></i>
                <div>
                    <div class="user-name">Admin User</div>
                    <small class="text-muted">General Contractor</small>
                </div>
            </div>
        </div>
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link ${activePage === 'dashboard' ? 'active' : ''}" href="index.html">
                    <i class="bi bi-house-door"></i> Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'projects' ? 'active' : ''}" href="projects.html">
                    <i class="bi bi-folder"></i> Projects
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'partners' ? 'active' : ''}" href="partners.html">
                    <i class="bi bi-people"></i> Partners
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'items' ? 'active' : ''}" href="items.html">
                    <i class="bi bi-box"></i> Items
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'deliveries' ? 'active' : ''}" href="deliveries.html">
                    <i class="bi bi-truck"></i> Deliveries
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'schedule' ? 'active' : ''}" href="schedule.html">
                    <i class="bi bi-calendar3"></i> Schedule
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'daily-reports' ? 'active' : ''}" href="daily-reports.html">
                    <i class="bi bi-file-text"></i> Daily Reports
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${activePage === 'settings' ? 'active' : ''}" href="settings.html">
                    <i class="bi bi-gear"></i> Settings
                </a>
            </li>
        </ul>
    </nav>`;
}

// Project Card Component
function createProjectCard(project) {
    return `
    <div class="col-md-4 mb-4">
        <div class="project-card hover-shadow">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5>${project.name}</h5>
                <div class="dropdown">
                    <button class="btn btn-link text-muted p-0" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">View Details</a></li>
                        <li><a class="dropdown-item" href="#">Edit Project</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#">Delete Project</a></li>
                    </ul>
                </div>
            </div>
            <p class="text-muted">${project.client}</p>
            <div class="mb-3">
                <small class="text-muted"><i class="bi bi-calendar3 me-1"></i> ${project.startDate} - ${project.endDate}</small>
            </div>
            <div class="mb-3">
                <small class="text-muted"><i class="bi bi-currency-dollar me-1"></i> Budget: $${project.budget.toLocaleString()}</small>
            </div>
            <div class="mb-3">
                <small class="text-muted"><i class="bi bi-person me-1"></i> Manager: ${project.manager}</small>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="fw-semibold">Progress</span>
                <span class="text-primary">${project.progress}%</span>
            </div>
            <div class="progress mb-3" style="height: 8px;">
                <div class="progress-bar" style="width: ${project.progress}%"></div>
            </div>
            <div class="d-flex justify-content-between">
                <span class="badge bg-${project.statusColor}">${project.status}</span>
                <a href="#" class="btn btn-sm btn-outline-primary">View Project</a>
            </div>
        </div>
    </div>`;
}

// Partner Card Component
function createPartnerCard(partner) {
    return `
    <div class="col-md-4 mb-4">
        <div class="partner-card hover-shadow">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5>${partner.company}</h5>
                <div class="dropdown">
                    <button class="btn btn-link text-muted p-0" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">View Details</a></li>
                        <li><a class="dropdown-item" href="#">Edit Partner</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#">Remove Partner</a></li>
                    </ul>
                </div>
            </div>
            <p class="text-muted">${partner.contact}</p>
            <div class="mb-2">
                <small class="text-muted"><i class="bi bi-envelope me-1"></i> ${partner.email}</small>
            </div>
            <div class="mb-2">
                <small class="text-muted"><i class="bi bi-telephone me-1"></i> ${partner.phone}</small>
            </div>
            <div class="mb-2">
                <small class="text-muted"><i class="bi bi-geo-alt me-1"></i> ${partner.address}</small>
            </div>
            <div class="mb-3">
                <small class="text-muted"><i class="bi bi-briefcase me-1"></i> Category: ${partner.category}</small>
            </div>
            <div class="rating mb-3">
                ${generateStarRating(partner.rating)}
                <small class="text-muted ms-2">${partner.rating}</small>
            </div>
            <div class="d-flex justify-content-between">
                <span class="badge bg-${partner.type === 'Supplier' ? 'primary' : 'success'}">${partner.type}</span>
                <a href="#" class="btn btn-sm btn-outline-primary">View Projects (${partner.projectCount})</a>
            </div>
        </div>
    </div>`;
}

// Helper function for star ratings
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="bi bi-star-half"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    return stars;
}

// Dashboard Card Component
function createDashboardCard(data) {
    return `
    <div class="col-md-3 mb-4">
        <div class="dashboard-card">
            <h6>${data.title}</h6>
            <h2>${data.value}</h2>
            <small class="text-muted">
                <i class="bi bi-arrow-${data.trend.direction} text-${data.trend.color}"></i> ${data.trend.text}
            </small>
            <span class="status-badge badge-${data.badge.type} ms-2">${data.badge.text}</span>
        </div>
    </div>`;
}

// Header Component
function createHeader() {
    return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">`;
}

// Footer Scripts Component
function createFooterScripts(includeCharts = false) {
    let scripts = `
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`;
    
    if (includeCharts) {
        scripts += `
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`;
    }
    
    scripts += `
    <script src="js/components.js"></script>
    <script src="js/script.js"></script>`;
    
    return scripts;
}

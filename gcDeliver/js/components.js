// HTML Components for gcDeliver Dashboard

// Sidebar Component
function createSidebar(activePage) {
    return `
    <nav class="sidebar">
        <div class="brand-section">
            <h4><i class="bi bi-truck"></i> gcDeliver</h4>
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
                <small class="text-muted"><i class="bi bi-currency-dollar me-1"></i> Budget: ${project.budget.toLocaleString()}</small>
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

// Item Card Component
function createItemCard(item) {
    return `
    <div class="col-md-4 mb-4">
        <div class="item-card dashboard-card hover-shadow">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5>${item.name}</h5>
                <div class="dropdown">
                    <button class="btn btn-link text-muted p-0" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">View Details</a></li>
                        <li><a class="dropdown-item" href="#">Edit Item</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#">Delete Item</a></li>
                    </ul>
                </div>
            </div>
            <p class="text-muted small">${item.description}</p>
            <div class="mb-2">
                <strong>Quantity:</strong> ${item.quantity} ${item.unit}
            </div>
            <div class="mb-2">
                <strong>Price:</strong> ${item.price.toLocaleString()} per ${item.unit}
            </div>
            <div class="mb-2">
                <strong>Project:</strong> ${item.project}
            </div>
            <div class="mb-2">
                <strong>Supplier:</strong> ${item.supplier}
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="badge bg-${item.statusColor}">${item.status}</span>
                <strong class="text-primary">${item.totalPrice.toLocaleString()}</strong>
            </div>
        </div>
    </div>`;
}

// Delivery Card Component
function createDeliveryCard(delivery) {
    return `
    <div class="col-md-4 mb-4">
        <div class="delivery-card dashboard-card hover-shadow">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h6 class="text-primary">${delivery.id}</h6>
                <span class="badge bg-${delivery.statusColor}">${delivery.status}</span>
            </div>
            <h5 class="mb-2">${delivery.project}</h5>
            <div class="mb-2">
                <i class="bi bi-building text-muted me-1"></i>
                <strong>Supplier:</strong> ${delivery.supplier}
            </div>
            <div class="mb-2">
                <i class="bi bi-geo-alt text-muted me-1"></i>
                <strong>Location:</strong> ${delivery.location}
            </div>
            <div class="mb-2">
                <i class="bi bi-calendar text-muted me-1"></i>
                <strong>Expected:</strong> ${delivery.expectedDate}
            </div>
            ${delivery.deliveredDate ? `
            <div class="mb-2">
                <i class="bi bi-check-circle text-muted me-1"></i>
                <strong>Delivered:</strong> ${delivery.deliveredDate}
            </div>` : ''}
            <div class="mb-3">
                <strong>Items:</strong>
                <ul class="mb-0 ps-3">
                    ${delivery.items.map(item => `<li class="small">${item}</li>`).join('')}
                </ul>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary flex-grow-1">View Details</button>
                ${delivery.status === 'Pending' ? '<button class="btn btn-sm btn-success flex-grow-1">Confirm</button>' : ''}
            </div>
        </div>
    </div>`;
}

// Report Card Component  
function createReportCard(report) {
    const totalManpower = Object.values(report.manpower).reduce((sum, count) => sum + count, 0);
    
    return `
    <div class="col-md-6 mb-4">
        <div class="report-card dashboard-card hover-shadow">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5>${report.project}</h5>
                <button class="btn btn-sm btn-outline-primary" onclick="viewReport('${report.id}')">
                    View Details
                </button>
            </div>
            <div class="mb-3">
                <span class="text-muted"><i class="bi bi-calendar3 me-1"></i> ${report.date}</span>
                <span class="text-muted ms-3">
                    <i class="bi bi-${report.weatherIcon} text-${report.weatherColor} me-1"></i> ${report.weather}
                </span>
                <span class="badge bg-success ms-3">${report.status}</span>
            </div>
            
            <h6 class="mb-2">Work Completed</h6>
            <p class="small text-muted mb-3">${report.workCompleted}</p>
            
            <div class="row">
                <div class="col-6">
                    <h6 class="mb-2">Materials Delivered</h6>
                    <ul class="small text-muted mb-0">
                        ${report.materials.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="col-6">
                    <h6 class="mb-2">Equipment Used</h6>
                    <ul class="small text-muted mb-0">
                        ${report.equipment.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="mt-3">
                <h6 class="mb-2">Incidents/Delays</h6>
                <p class="small text-muted mb-0">${report.incidents}</p>
            </div>
            
            <div class="mt-3 d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">Total Manpower</h6>
                    <h4 class="mb-0">${totalManpower} workers</h4>
                </div>
                <div class="text-end text-muted small">
                    Submitted by: ${report.submittedBy}
                </div>
            </div>
        </div>
    </div>`;
}

// Gantt Task Component
function createGanttTask(task) {
    return `
    <div class="gantt-row">
        <div class="task-name">
            ${task.name}
            <div class="small text-muted">${task.project}</div>
        </div>
        <div class="timeline" style="flex: 6;">
            <div class="task-bar" 
                 style="left: ${task.start}%; width: ${task.width}%; background-color: ${task.color};"
                 data-bs-toggle="tooltip" 
                 data-bs-placement="top" 
                 title="${task.name} - ${task.progress}% complete">
                ${task.progress}%
            </div>
        </div>
    </div>`;
}

// Activity Item Component
function createActivityItem(activity) {
    return `
    <div class="activity-item d-flex align-items-start mb-3">
        <div class="activity-icon bg-${activity.color}-subtle text-${activity.color} rounded-circle p-2 me-3">
            <i class="bi ${activity.icon}"></i>
        </div>
        <div>
            <h6 class="mb-1">${activity.title}</h6>
            <small class="text-muted">${activity.time}</small>
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

// Export all component functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createSidebar,
        createProjectCard,
        createPartnerCard,
        createDashboardCard,
        createItemCard,
        createDeliveryCard,
        createReportCard,
        createGanttTask,
        createActivityItem,
        generateStarRating,
        createHeader,
        createFooterScripts
    };
}// HTML Components for gsDeliver Dashboard

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

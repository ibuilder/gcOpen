// GCBilling - Main JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeSidebar();
    initializeModals();
    initializeCharts();
    initializeDataTables();
    initializeTooltips();
});

// Sidebar functionality
function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('#sidebarToggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Set active state based on current page
    const currentPage = window.location.pathname.split('/').pop();
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'dashboard.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Modal functionality
function initializeModals() {
    // New Application Modal
    const newApplicationBtn = document.querySelector('#newApplicationBtn');
    if (newApplicationBtn) {
        newApplicationBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('newApplicationModal'));
            modal.show();
        });
    }
    
    // New Change Order Modal
    const newChangeOrderBtn = document.querySelector('#newChangeOrderBtn');
    if (newChangeOrderBtn) {
        newChangeOrderBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('newChangeOrderModal'));
            modal.show();
        });
    }
    
    // Export Report Modal
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('exportModal'));
            modal.show();
        });
    });
}

// Charts initialization
function initializeCharts() {
    // Project Status Chart
    const projectStatusCtx = document.getElementById('projectStatusChart');
    if (projectStatusCtx) {
        new Chart(projectStatusCtx, {
            type: 'line',
            data: {
                labels: ['Jun 2024', 'Jul 2024', 'Sep 2024', 'Nov 2024', 'Jan 2025', 'Mar 2025', 'May 2025'],
                datasets: [{
                    label: 'Planned Progress',
                    data: [0, 20, 40, 60, 80, 90, 100],
                    borderColor: '#6c757d',
                    borderDash: [5, 5],
                    tension: 0.1
                }, {
                    label: 'Actual Progress',
                    data: [0, 15, 35, 55, 75, 85, 95],
                    borderColor: '#0d6efd',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // SOV Categories Chart
    const sovCategoriesCtx = document.getElementById('sovCategoriesChart');
    if (sovCategoriesCtx) {
        new Chart(sovCategoriesCtx, {
            type: 'pie',
            data: {
                labels: ['Site Construction', 'General Requirements', 'Masonry', 'Metals', 'Concrete'],
                datasets: [{
                    data: [8, 12, 18, 22, 24],
                    backgroundColor: [
                        '#0dcaf0',
                        '#0d6efd',
                        '#fd7e14',
                        '#6f42c1',
                        '#ffc107'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Change Orders by Month Chart
    const changeOrdersCtx = document.getElementById('changeOrdersChart');
    if (changeOrdersCtx) {
        new Chart(changeOrdersCtx, {
            type: 'bar',
            data: {
                labels: ['3/2023', '4/2023', '5/2023', '6/2023'],
                datasets: [{
                    label: 'Approved',
                    data: [60000, 0, 50000, 55000],
                    backgroundColor: '#0d6efd'
                }, {
                    label: 'Pending',
                    data: [0, 0, 0, 45000],
                    backgroundColor: '#ffc107'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Data Tables initialization
function initializeDataTables() {
    // Add sorting functionality to tables
    const sortableTables = document.querySelectorAll('.sortable-table');
    sortableTables.forEach(table => {
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                sortTable(table, header.dataset.sort);
            });
        });
    });
}

// Table sorting function
function sortTable(table, column) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const sortOrder = table.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
    
    rows.sort((a, b) => {
        const aValue = a.querySelector(`td[data-${column}]`).textContent;
        const bValue = b.querySelector(`td[data-${column}]`).textContent;
        
        if (sortOrder === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    table.dataset.sortOrder = sortOrder;
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Form submission handlers
function handleApplicationSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate API call
    console.log('Submitting application:', Object.fromEntries(formData));
    
    // Close modal and show success message
    const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
    modal.hide();
    showNotification('Application created successfully', 'success');
}

function handleChangeOrderSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate API call
    console.log('Submitting change order:', Object.fromEntries(formData));
    
    // Close modal and show success message
    const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
    modal.hide();
    showNotification('Change order created successfully', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions
function exportToPDF(reportType) {
    console.log(`Exporting ${reportType} to PDF`);
    showNotification(`Exporting ${reportType} to PDF...`, 'info');
    
    // Simulate export process
    setTimeout(() => {
        showNotification(`${reportType} exported successfully`, 'success');
    }, 2000);
}

function exportToExcel(reportType) {
    console.log(`Exporting ${reportType} to Excel`);
    showNotification(`Exporting ${reportType} to Excel...`, 'info');
    
    // Simulate export process
    setTimeout(() => {
        showNotification(`${reportType} exported successfully`, 'success');
    }, 2000);
}

// Settings page functions
function saveSettings(section) {
    const form = document.querySelector(`#${section}Form`);
    if (form) {
        const formData = new FormData(form);
        console.log(`Saving ${section} settings:`, Object.fromEntries(formData));
        showNotification(`${section} settings saved successfully`, 'success');
    }
}

// Dashboard refresh function
function refreshDashboardData() {
    showNotification('Refreshing dashboard data...', 'info');
    
    // Simulate data refresh
    setTimeout(() => {
        // Update charts
        if (window.projectStatusChart) {
            window.projectStatusChart.update();
        }
        
        showNotification('Dashboard data refreshed', 'success');
    }, 1500);
}

// Organization chart functionality
function addTeamMember() {
    const modal = new bootstrap.Modal(document.getElementById('addTeamMemberModal'));
    modal.show();
}

function handleTeamMemberSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    console.log('Adding team member:', Object.fromEntries(formData));
    
    const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
    modal.hide();
    showNotification('Team member added successfully', 'success');
}

// Global utility functions
window.gcBilling = {
    exportToPDF,
    exportToExcel,
    saveSettings,
    refreshDashboardData,
    addTeamMember,
    showNotification
};

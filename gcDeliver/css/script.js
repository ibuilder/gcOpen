// Script.js - Main JavaScript file for gsDeliver Dashboard

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});

// Chart.js configurations
function initializeCharts() {
    // Manpower Distribution Chart
    const manpowerCtx = document.getElementById('manpowerChart');
    if (manpowerCtx) {
        new Chart(manpowerCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Carpenters', 'Electricians', 'Plumbers', 'HVAC Technicians', 'Laborers'],
                datasets: [{
                    label: 'Workers',
                    data: [12, 8, 5, 7, 15],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.8)',
                        'rgba(25, 135, 84, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(220, 53, 69, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ],
                    borderColor: [
                        'rgba(13, 110, 253, 1)',
                        'rgba(25, 135, 84, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(108, 117, 125, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Project Progress Chart (Gantt-style)
    const ganttCtx = document.getElementById('ganttChart');
    if (ganttCtx) {
        new Chart(ganttCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Foundation Work', 'Structural Framing', 'Electrical Wiring', 'Plumbing Installation', 'HVAC Systems'],
                datasets: [{
                    label: 'Progress %',
                    data: [90, 75, 45, 60, 30],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.8)',
                        'rgba(25, 135, 84, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(220, 53, 69, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.x + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize charts when page loads
if (typeof Chart !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeCharts);
}

// Modal handlers
function setupModalHandlers() {
    // Add Project Modal
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addProjectModal'));
            modal.show();
        });
    }

    // Add Partner Modal
    const addPartnerBtn = document.getElementById('addPartnerBtn');
    if (addPartnerBtn) {
        addPartnerBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addPartnerModal'));
            modal.show();
        });
    }

    // Add Item Modal
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addItemModal'));
            modal.show();
        });
    }

    // Add Delivery Modal
    const addDeliveryBtn = document.getElementById('addDeliveryBtn');
    if (addDeliveryBtn) {
        addDeliveryBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addDeliveryModal'));
            modal.show();
        });
    }

    // Add Daily Report Modal
    const addReportBtn = document.getElementById('addReportBtn');
    if (addReportBtn) {
        addReportBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addReportModal'));
            modal.show();
        });
    }
}

// Setup form validations
function setupFormValidations() {
    'use strict'
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                
                form.classList.add('was-validated')
            }, false)
        })
}

// File upload handler
function setupFileUploadHandlers() {
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    
    fileUploadAreas.forEach(area => {
        area.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.click();
            
            fileInput.addEventListener('change', function(e) {
                const files = e.target.files;
                if (files.length > 0) {
                    // Handle file upload
                    console.log('Files selected:', files);
                    // Here you would typically upload the files to your server
                }
            });
        });
        
        // Drag and drop functionality
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // Handle file upload
                console.log('Files dropped:', files);
                // Here you would typically upload the files to your server
            }
        });
    });
}

// Search functionality
function setupSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const targetSelector = e.target.dataset.target;
            const items = document.querySelectorAll(targetSelector);
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Settings page tab functionality
function setupSettingsTabs() {
    const settingsPage = document.querySelector('.settings-page');
    if (settingsPage) {
        const tabLinks = settingsPage.querySelectorAll('.nav-link');
        const tabPanes = settingsPage.querySelectorAll('.tab-pane');
        
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and panes
                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('show', 'active'));
                
                // Add active class to clicked link and corresponding pane
                this.classList.add('active');
                const targetPane = document.querySelector(this.getAttribute('href'));
                targetPane.classList.add('show', 'active');
            });
        });
    }
}

// Export functionality
function setupExportButtons() {
    const exportBtns = document.querySelectorAll('.export-btn');
    
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const format = this.dataset.format;
            const type = this.dataset.type;
            
            // Here you would typically make an API call to generate the export
            console.log(`Exporting ${type} as ${format}`);
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Exporting...';
            this.disabled = true;
            
            // Simulate export process
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert(`${type} exported successfully as ${format}!`);
            }, 2000);
        });
    });
}

// Date picker initialization
function setupDatePickers() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        // Set default date to today if not already set
        if (!input.value) {
            const today = new Date().toISOString().split('T')[0];
            input.value = today;
        }
    });
}

// Status change handlers
function setupStatusHandlers() {
    const statusSelects = document.querySelectorAll('.status-select');
    
    statusSelects.forEach(select => {
        select.addEventListener('change', function(e) {
            const newStatus = e.target.value;
            const itemId = e.target.dataset.itemId;
            
            // Here you would typically update the status on the server
            console.log(`Status updated to ${newStatus} for item ${itemId}`);
            
            // Update UI based on new status
            const statusBadge = e.target.closest('.card').querySelector('.status-badge');
            if (statusBadge) {
                statusBadge.textContent = newStatus;
                statusBadge.className = `status-badge status-${newStatus.toLowerCase()}`;
            }
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    setupModalHandlers();
    setupFormValidations();
    setupFileUploadHandlers();
    setupSearchFunctionality();
    setupSettingsTabs();
    setupExportButtons();
    setupDatePickers();
    setupStatusHandlers();
});

// Sidebar active state
function updateSidebarActiveState() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update sidebar on page load
document.addEventListener('DOMContentLoaded', updateSidebarActiveState);

// Notification system
function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
    }
    
    document.getElementById('toastContainer').appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

// Example usage of notifications
function handleFormSubmit(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Item added successfully!', 'success');
            // Close modal if exists
            const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
            if (modal) {
                modal.hide();
            }
            form.reset();
        }, 1000);
    });
}

// Apply to all forms with data-notify attribute
document.querySelectorAll('form[data-notify="true"]').forEach(handleFormSubmit);

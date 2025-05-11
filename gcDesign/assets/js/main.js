// gcDesign - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Active sidebar link
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.sidebar-nav a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });

    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            const label = this.nextElementSibling;
            if (label && fileName) {
                label.textContent = fileName;
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search functionality based on the current page
            console.log('Searching for:', searchTerm);
        });
    }

    // Task checkbox handling
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]');
    
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.style.opacity = '0.6';
                taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.querySelector('.task-title').style.textDecoration = 'none';
            }
        });
    });

    // Dynamic modal content loading
    const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-bs-target');
            const modalType = this.getAttribute('data-modal-type');
            
            if (modalType) {
                loadModalContent(modalId, modalType);
            }
        });
    });

    // Function to load dynamic modal content
    function loadModalContent(modalId, modalType) {
        const modal = document.querySelector(modalId);
        const modalBody = modal.querySelector('.modal-body');
        
        // Load content based on modal type
        switch(modalType) {
            case 'add-project':
                modalBody.innerHTML = getAddProjectForm();
                break;
            case 'add-user':
                modalBody.innerHTML = getAddUserForm();
                break;
            case 'add-company':
                modalBody.innerHTML = getAddCompanyForm();
                break;
            default:
                modalBody.innerHTML = '<p>Content not found</p>';
        }
    }

    // Modal content generators
    function getAddProjectForm() {
        return `
            <form>
                <div class="mb-3">
                    <label for="projectName" class="form-label">Project Name</label>
                    <input type="text" class="form-control" id="projectName" required>
                </div>
                <div class="mb-3">
                    <label for="projectDescription" class="form-label">Description</label>
                    <textarea class="form-control" id="projectDescription" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="projectStartDate" class="form-label">Start Date</label>
                    <input type="date" class="form-control" id="projectStartDate" required>
                </div>
                <div class="mb-3">
                    <label for="projectEndDate" class="form-label">End Date</label>
                    <input type="date" class="form-control" id="projectEndDate" required>
                </div>
                <div class="mb-3">
                    <label for="projectStatus" class="form-label">Status</label>
                    <select class="form-control" id="projectStatus">
                        <option>Planning</option>
                        <option>In Progress</option>
                        <option>On Hold</option>
                        <option>Completed</option>
                    </select>
                </div>
            </form>
        `;
    }

    function getAddUserForm() {
        return `
            <form>
                <div class="mb-3">
                    <label for="userName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="userName" required>
                </div>
                <div class="mb-3">
                    <label for="userEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="userEmail" required>
                </div>
                <div class="mb-3">
                    <label for="userRole" class="form-label">Role</label>
                    <select class="form-control" id="userRole">
                        <option>Administrator</option>
                        <option>Project Manager</option>
                        <option>Engineer</option>
                        <option>Contractor</option>
                        <option>Client</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="userPhone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="userPhone">
                </div>
                <div class="mb-3">
                    <label for="userPermissions" class="form-label">Permissions</label>
                    <select class="form-control" id="userPermissions" multiple>
                        <option>View Projects</option>
                        <option>Edit Projects</option>
                        <option>Delete Projects</option>
                        <option>Manage Users</option>
                        <option>Manage Companies</option>
                    </select>
                </div>
            </form>
        `;
    }

    function getAddCompanyForm() {
        return `
            <form>
                <div class="mb-3">
                    <label for="companyName" class="form-label">Company Name</label>
                    <input type="text" class="form-control" id="companyName" required>
                </div>
                <div class="mb-3">
                    <label for="companyType" class="form-label">Company Type</label>
                    <select class="form-control" id="companyType">
                        <option>General Contractor</option>
                        <option>Subcontractor</option>
                        <option>Supplier</option>
                        <option>Architect</option>
                        <option>Engineer</option>
                        <option>Owner</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="companyEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="companyEmail">
                </div>
                <div class="mb-3">
                    <label for="companyPhone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="companyPhone">
                </div>
                <div class="mb-3">
                    <label for="companyAddress" class="form-label">Address</label>
                    <textarea class="form-control" id="companyAddress" rows="2"></textarea>
                </div>
            </form>
        `;
    }

    // Form submission handling
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // Handle form submission
            console.log('Form submitted:', data);
            
            // Close modal if form is in a modal
            const modal = e.target.closest('.modal');
            if (modal) {
                const bsModal = bootstrap.Modal.getInstance(modal);
                bsModal.hide();
                
                // Show success message
                showNotification('Success', 'Item has been added successfully!', 'success');
            }
        }
    });

    // Notification function
    function showNotification(title, message, type = 'info') {
        // Create toast element
        const toastHtml = `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2 text-${type}"></i>
                    <strong class="me-auto">${title}</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        // Create container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Add toast to container
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        
        // Initialize and show toast
        const toastElement = toastContainer.lastElementChild;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remove toast after it's hidden
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }

    // Date formatting helper
    function formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    // File size formatting helper
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Initialize page-specific functionality
    initializePageFunctionality();

    function initializePageFunctionality() {
        const path = window.location.pathname;
        
        if (path.includes('dashboard')) {
            initializeDashboard();
        } else if (path.includes('drawings')) {
            initializeDrawings();
        } else if (path.includes('submittals')) {
            initializeSubmittals();
        }
        // Add more page-specific initializations as needed
    }

    function initializeDashboard() {
        // Dashboard-specific functionality
        console.log('Dashboard initialized');
    }

    function initializeDrawings() {
        // Drawings page functionality
        console.log('Drawings page initialized');
    }

    function initializeSubmittals() {
        // Submittals page functionality
        console.log('Submittals page initialized');
    }
});

// Export utility functions for use in other scripts
window.gcDesign = {
    showNotification: function(title, message, type) {
        // Implementation from above
    },
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    },
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Chart initialization for dashboard
if (window.Chart) {
    // Project Status Chart
    const statusChart = document.getElementById('statusChart');
    if (statusChart) {
        new Chart(statusChart, {
            type: 'doughnut',
            data: {
                labels: ['Structural', 'Architectural', 'Mechanical', 'Electrical', 'Plumbing'],
                datasets: [{
                    data: [92, 68, 74, 66, 45],
                    backgroundColor: [
                        '#4caf50',
                        '#2196f3',
                        '#ff9800',
                        '#f44336',
                        '#9c27b0'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
}
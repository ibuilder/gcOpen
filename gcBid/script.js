// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Handle form submissions for modals
document.addEventListener('DOMContentLoaded', function() {
    // Add Project Form
    const addProjectForm = document.querySelector('#addProjectModal form');
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Project form submitted');
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
            modal.hide();
        });
    }

    // Add Qualified Bidder Form
    const addBidderForm = document.querySelector('#addBidderModal form');
    if (addBidderForm) {
        addBidderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Bidder form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addBidderModal'));
            modal.hide();
        });
    }

    // Add Prequalification Form
    const addPrequalForm = document.querySelector('#addPrequalificationModal form');
    if (addPrequalForm) {
        addPrequalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Prequalification form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addPrequalificationModal'));
            modal.hide();
        });
    }

    // Add Bid Package Form
    const addBidPackageForm = document.querySelector('#addBidPackageModal form');
    if (addBidPackageForm) {
        addBidPackageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Bid Package form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addBidPackageModal'));
            modal.hide();
        });
    }

    // Add Budget Form
    const addBudgetForm = document.querySelector('#addBudgetModal form');
    if (addBudgetForm) {
        addBudgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Budget form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addBudgetModal'));
            modal.hide();
        });
    }

    // Add Schedule of Values Form
    const addScheduleForm = document.querySelector('#addScheduleModal form');
    if (addScheduleForm) {
        addScheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Schedule form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addScheduleModal'));
            modal.hide();
        });
    }

    // Add Contract Form
    const addContractForm = document.querySelector('#addContractModal form');
    if (addContractForm) {
        addContractForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contract form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addContractModal'));
            modal.hide();
        });
    }

    // Add Company Form
    const addCompanyForm = document.querySelector('#addCompanyModal form');
    if (addCompanyForm) {
        addCompanyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Company form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addCompanyModal'));
            modal.hide();
        });
    }

    // Add Discipline Form
    const addDisciplineForm = document.querySelector('#addDisciplineModal form');
    if (addDisciplineForm) {
        addDisciplineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Discipline form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addDisciplineModal'));
            modal.hide();
        });
    }

    // Add User Form
    const addUserForm = document.querySelector('#addUserModal form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('User form submitted');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
            modal.hide();
        });
    }

    // Handle file explorer actions
    const createFolderBtn = document.querySelector('#createFolderBtn');
    if (createFolderBtn) {
        createFolderBtn.addEventListener('click', function() {
            const folderName = prompt('Enter folder name:');
            if (folderName) {
                console.log('Creating folder:', folderName);
            }
        });
    }

    // Handle file uploads with drag and drop
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseFiles');
    const fileList = document.getElementById('fileList');
    const selectedFiles = document.getElementById('selectedFiles');
    const uploadButton = document.getElementById('uploadButton');
    
    let filesToUpload = [];

    if (uploadArea) {
        // Click to browse files
        browseButton.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('click', () => fileInput.click());

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        // Handle selected files
        function handleFiles(files) {
            filesToUpload = Array.from(files);
            displayFiles();
        }

        // Display selected files
        function displayFiles() {
            if (filesToUpload.length === 0) {
                fileList.style.display = 'none';
                uploadButton.disabled = true;
                return;
            }

            fileList.style.display = 'block';
            uploadButton.disabled = false;
            selectedFiles.innerHTML = '';

            filesToUpload.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'list-group-item';
                fileItem.innerHTML = `
                    <div class="file-info">
                        <i class="fas fa-file file-icon"></i>
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${formatFileSize(file.size)}</span>
                    </div>
                    <span class="remove-file" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </span>
                `;
                selectedFiles.appendChild(fileItem);
            });

            // Add remove file handlers
            document.querySelectorAll('.remove-file').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.currentTarget.dataset.index);
                    filesToUpload.splice(index, 1);
                    displayFiles();
                });
            });
        }

        // Format file size
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Upload button click
        uploadButton.addEventListener('click', () => {
            console.log('Uploading files:', filesToUpload);
            // Here you would implement the actual upload logic
            const modal = bootstrap.Modal.getInstance(document.getElementById('fileUploadModal'));
            modal.hide();
            filesToUpload = [];
            fileInput.value = '';
            displayFiles();
        });
    }

    // Sidebar navigation active state
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.parentElement.classList.add('active');
        }
    });

    // Sign out functionality
    const signOutLink = document.querySelector('.sign-out');
    if (signOutLink) {
        signOutLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Signing out...');
            // Add sign out logic here
        });
    }

    // Project select dropdown
    const projectSelect = document.querySelector('.project-select');
    if (projectSelect) {
        projectSelect.addEventListener('change', function(e) {
            console.log('Project selected:', e.target.value);
            // Add project switch logic here
        });
    }

    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
            // Add search logic here
        });
    }

    // Handle table row clicks
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Skip if this is an empty state row
            if (this.querySelector('.text-muted')) return;
            
            console.log('Row clicked');
            // Add row click handler logic here
        });
    });

    // Initialize empty tables with sample data (optional)
    function populateTableWithSampleData(tableId, data) {
        const table = document.getElementById(tableId);
        if (table && data && data.length > 0) {
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            
            data.forEach(item => {
                const row = document.createElement('tr');
                Object.values(item).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        }
    }

    // Handle modal form validation
    const modalForms = document.querySelectorAll('.modal form');
    modalForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});
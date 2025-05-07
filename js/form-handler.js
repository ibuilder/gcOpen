/**
 * Form handling logic for gcOpen.org
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initQuoteForm();
});

/**
 * Initialize the contact form
 */
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm(contactForm)) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
                
                // Simulate form submission (replace with actual API call)
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const formContainer = contactForm.closest('.card-body');
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.innerHTML = '<strong>Message sent!</strong> We\'ll get back to you soon.';
                    formContainer.appendChild(successMessage);
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
}

/**
 * Initialize the quote request form
 */
function initQuoteForm() {
    const quoteForm = document.querySelector('#quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm(quoteForm)) {
                // Show loading state
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
                
                // Collect form data
                const formData = new FormData(quoteForm);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Simulate API call (replace with actual API endpoint)
                setTimeout(function() {
                    // Reset form
                    quoteForm.reset();
                    
                    // Show success message with modal
                    const modal = new bootstrap.Modal(document.getElementById('quote-success-modal'));
                    modal.show();
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }, 1500);
            }
        });
    }
}

/**
 * Validate form inputs
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.invalid-feedback');
    existingErrors.forEach(error => error.remove());
    
    // Reset validation states
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    });
    
    // Validate each input
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            // Required field is empty
            markInvalid(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && input.value.trim()) {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                markInvalid(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(input);
            }
        } else if (input.value.trim()) {
            markValid(input);
        }
    });
    
    return isValid;
}

/**
 * Mark an input as invalid with an error message
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function markInvalid(input, message) {
    input.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

/**
 * Mark an input as valid
 * @param {HTMLElement} input - The input element
 */
function markValid(input) {
    input.classList.add('is-valid');
}

/**
 * Send form data to server (replace with actual implementation)
 * @param {Object} data - The form data
 * @returns {Promise} - A promise that resolves when the data is sent
 */
function sendFormData(data) {
    // This is a placeholder function
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        console.log('Sending form data:', data);
        
        // Simulate successful API call
        setTimeout(() => {
            resolve({ success: true, message: 'Form submitted successfully' });
        }, 1000);
    });
}

/**
 * Handle form submission success
 * @param {HTMLFormElement} form - The form element
 * @param {Object} response - The server response
 */
function handleFormSuccess(form, response) {
    // Reset form
    form.reset();
    
    // Show success message
    const formContainer = form.closest('.card-body');
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.innerHTML = `<strong>Success!</strong> ${response.message}`;
    formContainer.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(function() {
        successMessage.remove();
    }, 5000);
}

/**
 * Handle form submission error
 * @param {HTMLFormElement} form - The form element
 * @param {Error} error - The error object
 */
function handleFormError(form, error) {
    // Show error message
    const formContainer = form.closest('.card-body');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger mt-3';
    errorMessage.innerHTML = `<strong>Error!</strong> ${error.message || 'Something went wrong. Please try again.'}`;
    formContainer.appendChild(errorMessage);
    
    // Remove error message after 5 seconds
    setTimeout(function() {
        errorMessage.remove();
    }, 5000);
}

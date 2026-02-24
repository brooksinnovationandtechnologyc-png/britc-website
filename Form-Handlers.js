// Form Handler JavaScript
// Handles product information request form submission

// Get product name from URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product') || 'General Inquiry';
    
    const productNameElement = document.getElementById('product-name');
    if (productNameElement) {
        productNameElement.textContent = productName;
    }
});

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('info-request-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                productName: new URLSearchParams(window.location.search).get('product') || 'General Inquiry',
                companyName: document.getElementById('company-name').value,
                contactName: document.getElementById('contact-name').value,
                contactTitle: document.getElementById('contact-title').value,
                contactEmail: document.getElementById('contact-email').value,
                contactPhone: document.getElementById('contact-phone').value,
                organizationType: document.getElementById('organization-type').value,
                inquiryDetails: document.getElementById('inquiry-details').value,
                ndaAgreement: document.getElementById('nda-agreement').checked,
                urgentRequest: document.getElementById('urgent-request').checked,
                timestamp: new Date().toISOString()
            };
            
            // Send email using your preferred method
            sendEmail(formData);
        });
    }
});

function sendEmail(formData) {
    // IMPORTANT: You need to choose ONE of the following methods to actually send emails:
    
    // ============================================================
    // OPTION 1: FormSpree (Recommended - Easy Setup)
    // ============================================================
    // 1. Go to https://formspree.io and create a free account
    // 2. Create a new form and get your form endpoint
    // 3. Replace 'YOUR_FORMSPREE_ID' below with your actual Form ID
    
    /*
    fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _subject: `Product Inquiry: ${formData.productName}`,
            _replyto: formData.contactEmail,
            'Product Name': formData.productName,
            'Company Name': formData.companyName,
            'Contact Name': formData.contactName,
            'Contact Title': formData.contactTitle,
            'Contact Email': formData.contactEmail,
            'Contact Phone': formData.contactPhone,
            'Organization Type': formData.organizationType,
            'Inquiry Details': formData.inquiryDetails,
            'NDA Agreement': formData.ndaAgreement ? 'Yes' : 'No',
            'Urgent Request': formData.urgentRequest ? 'Yes' : 'No',
            'Timestamp': formData.timestamp
        })
    })
    .then(response => {
        if (response.ok) {
            showConfirmation(formData);
        } else {
            showError();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError();
    });
    */
    
    // ============================================================
    // OPTION 2: EmailJS (No backend required)
    // ============================================================
    // 1. Go to https://www.emailjs.com and create a free account
    // 2. Set up an email service and template
    // 3. Get your User ID, Service ID, and Template ID
    // 4. Replace the IDs below with your actual IDs
    // 5. Add this script to request-info.html head section:
    //    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    //    <script>emailjs.init('YOUR_PUBLIC_KEY');</script>
    
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'brooksinnovationandtechnologyc@gmail.com',
        subject: `Product Inquiry: ${formData.productName}`,
        product_name: formData.productName,
        company_name: formData.companyName,
        contact_name: formData.contactName,
        contact_title: formData.contactTitle,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        organization_type: formData.organizationType,
        inquiry_details: formData.inquiryDetails,
        nda_agreement: formData.ndaAgreement ? 'Yes' : 'No',
        urgent_request: formData.urgentRequest ? 'Yes' : 'No',
        timestamp: formData.timestamp
    }, 'YOUR_PUBLIC_KEY')
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showConfirmation(formData);
    }, function(error) {
        console.log('FAILED...', error);
        showError();
    });
    */
    
    // ============================================================
    // OPTION 3: Your Own Backend Server
    // ============================================================
    // If you have your own backend server (PHP, Node.js, Python, etc.),
    // send the form data to your server endpoint:
    
    /*
    fetch('/api/send-inquiry-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showConfirmation(formData);
        } else {
            showError();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError();
    });
    */
    
    // ============================================================
    // TEMPORARY DEMO MODE (Remove this in production)
    // ============================================================
    // For demonstration purposes, just show the confirmation
    // This does NOT actually send an email
    console.log('Form data that would be sent:', formData);
    alert('DEMO MODE: Email functionality not configured yet.\n\nTo enable email sending, edit form-handler.js and choose one of the three options:\n1. FormSpree (easiest)\n2. EmailJS (no backend)\n3. Your own server\n\nSee the comments in form-handler.js for setup instructions.');
    showConfirmation(formData);
}

function showConfirmation(formData) {
    // Hide the form
    document.getElementById('form-content').style.display = 'none';
    
    // Show confirmation message
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';
    
    // Fill in confirmation details
    document.getElementById('confirmed-product').textContent = formData.productName;
    document.getElementById('confirmed-email').textContent = formData.contactEmail;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showError() {
    alert('There was an error submitting your request. Please try again or contact us directly at brooksinnovationandtechnologyc@gmail.com');
}

// Form validation helper
function validateForm(formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    
    if (!formData.companyName.trim()) {
        alert('Please enter your company name');
        return false;
    }
    
    if (!formData.contactName.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!emailRegex.test(formData.contactEmail)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!phoneRegex.test(formData.contactPhone)) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    if (!formData.organizationType) {
        alert('Please select your organization type');
        return false;
    }
    
    return true;
}
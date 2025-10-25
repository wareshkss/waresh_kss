// Main JavaScript for Al-Khwarizmi Smart Solutions Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAOS();
    initializeScrollToTop();
    initializeSmoothScrolling();
    initializeFormHandlers();
    initializeNewsletterForm();
    initializeRequestServiceModal();
    initializeNavbarScroll();
    initializeAnimations();
});

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// Initialize scroll to top button
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize form handlers
function initializeFormHandlers() {
    // Add loading states to buttons
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="loading"></span> جاري الإرسال...';
                submitBtn.disabled = true;
            }
        });
    });
}

// Initialize newsletter form
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate API call
                setTimeout(() => {
                    showNotification('تم الاشتراك بنجاح!', 'success');
                    this.reset();
                }, 1000);
            }
        });
    }
}

// Initialize request service modal
function initializeRequestServiceModal() {
    const requestServiceBtn = document.getElementById('requestServiceBtn');
    const requestServiceModal = document.getElementById('requestServiceModal');
    const submitRequestBtn = document.getElementById('submitRequestBtn');
    const requestServiceForm = document.getElementById('requestServiceForm');

    if (requestServiceBtn && requestServiceModal) {
        requestServiceBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(requestServiceModal);
            modal.show();
        });
    }

    if (submitRequestBtn && requestServiceForm) {
        submitRequestBtn.addEventListener('click', function() {
            // Validate form
            const formData = new FormData(requestServiceForm);
            const requiredFields = ['name', 'email', 'phone', 'service_type'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = requestServiceForm.querySelector(`[name="${field}"]`);
                if (!input || !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Show loading state
                this.innerHTML = '<span class="loading"></span> جاري الإرسال...';
                this.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', 'success');
                    requestServiceForm.reset();
                    bootstrap.Modal.getInstance(requestServiceModal).hide();
                    this.innerHTML = 'إرسال الطلب';
                    this.disabled = false;
                }, 2000);
            } else {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        });
    }
}

// Initialize navbar scroll effects
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// Initialize animations and interactions
function initializeAnimations() {
    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .product-card, .project-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Update toast appearance based on type
        const toastHeader = toast.querySelector('.toast-header');
        if (type === 'success') {
            toastHeader.className = 'toast-header bg-success text-white';
        } else if (type === 'error') {
            toastHeader.className = 'toast-header bg-danger text-white';
        } else {
            toastHeader.className = 'toast-header bg-primary text-white';
        }
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar-scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.showNotification = showNotification;
window.debounce = debounce;
window.throttle = throttle;

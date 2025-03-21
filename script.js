// Smooth scrolling for navigation links
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

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your contact form submission logic here
            console.log('Contact form submitted');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Add your registration logic here
            console.log('Registration form submitted');
        });
        
        // Password strength check on input
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
        }
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            console.log('Login form submitted');
        });
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your forgot password logic here
            console.log('Forgot password form submitted');
        });
    }
});

// CTA Button click handler
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Scroll to trade match section
        const tradeMatchSection = document.querySelector('#trade-match');
        if (tradeMatchSection) {
            tradeMatchSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add animation to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Shop item click handler
const shopButtons = document.querySelectorAll('.shop-button');
shopButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.parentElement.querySelector('h3').textContent;
        alert(`Thank you for your interest in ${itemName}! Our team will contact you shortly to arrange the trade.`);
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.parentElement.insertBefore(menuButton, nav);
    nav.classList.add('mobile-menu');
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    } else {
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton) {
            menuButton.remove();
            nav.classList.remove('mobile-menu', 'active');
        }
    }
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .shop-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation trigger
window.addEventListener('load', () => {
    animateOnScroll();
});

// Form submission animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            submitButton.style.transform = 'scale(1)';
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }, 200);
    });
}

// Mobile menu toggle animation
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Add hover effect to shop items
const shopItems = document.querySelectorAll('.shop-item');
shopItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
});

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text span');
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Contains number
    if (/\d/.test(password)) strength++;
    
    // Contains lowercase letter
    if (/[a-z]/.test(password)) strength++;
    
    // Contains uppercase letter
    if (/[A-Z]/.test(password)) strength++;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Update strength bar and text
    let strengthLevel = 'weak';
    let strengthWidth = '25%';
    
    if (strength >= 4) {
        strengthLevel = 'very-strong';
        strengthWidth = '100%';
    } else if (strength >= 3) {
        strengthLevel = 'strong';
        strengthWidth = '75%';
    } else if (strength >= 2) {
        strengthLevel = 'medium';
        strengthWidth = '50%';
    }
    
    strengthBar.style.width = strengthWidth;
    strengthBar.setAttribute('data-strength', strengthLevel);
    strengthText.textContent = strengthLevel.charAt(0).toUpperCase() + strengthLevel.slice(1);
    strengthText.setAttribute('data-strength', strengthLevel);
}

// Password Visibility Toggle
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Email Verification
function sendVerificationEmail(email) {
    // Add your email verification logic here
    console.log('Sending verification email to:', email);
}

// Social Login Handlers
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList[1]; // google, facebook, twitter, etc.
        // Add your social login logic here
        console.log('Social login with:', provider);
    });
});

// Security Features Check
function checkSecurityFeatures(password) {
    const features = {
        length: password.length >= 8,
        number: /\d/.test(password),
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    // Update security features list
    const securityList = document.querySelector('.security-features ul');
    if (securityList) {
        securityList.innerHTML = `
            <li class="${features.length ? 'valid' : 'invalid'}">
                <i class="fas ${features.length ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                At least 8 characters
            </li>
            <li class="${features.number ? 'valid' : 'invalid'}">
                <i class="fas ${features.number ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                Contains a number
            </li>
            <li class="${features.lowercase ? 'valid' : 'invalid'}">
                <i class="fas ${features.lowercase ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                Contains a lowercase letter
            </li>
            <li class="${features.uppercase ? 'valid' : 'invalid'}">
                <i class="fas ${features.uppercase ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                Contains an uppercase letter
            </li>
            <li class="${features.special ? 'valid' : 'invalid'}">
                <i class="fas ${features.special ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                Contains a special character
            </li>
        `;
    }
}

// Exchange Button Handler
document.addEventListener('DOMContentLoaded', function() {
    const exchangeButton = document.querySelector('.exchange-button');
    if (exchangeButton) {
        exchangeButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }
}); 
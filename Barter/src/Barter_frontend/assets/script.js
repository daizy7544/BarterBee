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
    button.addEventListener('click', (e) => {
        if (!button.getAttribute('href')) {
            e.preventDefault();
            const itemName = button.parentElement.querySelector('h3').textContent;
            alert(`Thank you for your interest in ${itemName}! Our team will contact you shortly to arrange the trade.`);
        }
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

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.search-container button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Redirect to shop page with search parameter
        window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            try {
                // Here you would typically send this to your backend
                // For now, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'white';
                successMessage.style.marginTop = '1rem';
                
                newsletterForm.appendChild(successMessage);
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                console.error('Error subscribing to newsletter:', error);
            }
        }
    });
}

// How It Works Section Functionality
function handleStepClick(stepNumber) {
    // Remove active class from all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // Add active class to clicked step
    const clickedStep = document.querySelector(`.step[data-step="${stepNumber}"]`);
    clickedStep.classList.add('active');

    // Handle navigation based on step number
    switch(stepNumber) {
        case 1:
            // Navigate to signup page
            window.location.href = 'login.html?action=signup';
            break;
        case 2:
            // Navigate to item listing page
            window.location.href = 'shop.html?action=list';
            break;
        case 3:
            // Navigate to browse items page
            window.location.href = 'shop.html?action=browse';
            break;
        case 4:
            // Navigate to trading page
            window.location.href = 'shop.html?action=trade';
            break;
    }
}

// Add hover effect to steps
document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('mouseenter', () => {
        step.style.transform = 'translateY(-10px)';
    });

    step.addEventListener('mouseleave', () => {
        if (!step.classList.contains('active')) {
            step.style.transform = 'translateY(0)';
        }
    });
});

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.querySelectorAll('.close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const addBeecoinBtn = document.getElementById('addBeecoinBtn');
const beecoinAmount = document.getElementById('beecoinAmount');
const startTradingBtn = document.getElementById('startTradingBtn');
const newsletterForm = document.getElementById('newsletterForm');
const shopGrid = document.getElementById('shopGrid');

// Sample shop items data
const shopItems = [
    {
        id: 1,
        name: 'Organic Honey',
        description: 'Pure, natural honey from local beekeepers',
        image: 'assets/honey.jpg',
        price: 100
    },
    {
        id: 2,
        name: 'Herbal Tea',
        description: 'Premium quality herbal tea blends',
        image: 'assets/tea.jpg',
        price: 50
    },
    {
        id: 3,
        name: 'Handmade Soap',
        description: 'Natural, handmade soap products',
        image: 'assets/soap.jpg',
        price: 75
    },
    {
        id: 4,
        name: 'Natural Shampoo',
        description: 'Organic shampoo with natural ingredients',
        image: 'assets/shampoo.jpg',
        price: 80
    },
    {
        id: 5,
        name: 'Organic Cosmetics',
        description: 'Natural and organic beauty products',
        image: 'assets/cosmetic.jpg',
        price: 120
    },
    {
        id: 6,
        name: 'Organic Food',
        description: 'Fresh organic produce and products',
        image: 'assets/organic-food.jpg',
        price: 90
    }
];

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners for Modals
loginBtn.addEventListener('click', () => openModal(loginModal));
signupLink.addEventListener('click', () => {
    closeModal(loginModal);
    openModal(signupModal);
});
loginLink.addEventListener('click', () => {
    closeModal(signupModal);
    openModal(loginModal);
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Add your login logic here
    showToast('Login successful!', 'success');
    closeModal(loginModal);
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }

    // Add your signup logic here
    showToast('Account created successfully!', 'success');
    closeModal(signupModal);
});

// Search Functionality
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = shopItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    renderShopItems(filteredItems);
});

// BeeCoin Functions
addBeecoinBtn.addEventListener('click', () => {
    const currentAmount = parseInt(beecoinAmount.textContent);
    beecoinAmount.textContent = currentAmount + 100;
    showToast('Added 100 BeeCoins!', 'success');
});

// Start Trading Button
startTradingBtn.addEventListener('click', () => {
    // Add your trading logic here
    showToast('Starting trading session...', 'info');
});

// Newsletter Subscription
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    // Add your newsletter subscription logic here
    showToast('Successfully subscribed to newsletter!', 'success');
    newsletterForm.reset();
});

// Shop Items Rendering
function renderShopItems(items) {
    shopGrid.innerHTML = items.map(item => `
        <div class="shop-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="item-price">${item.price} BeeCoins</div>
            <button class="shop-button" onclick="handleTrade(${item.id})">Trade Now</button>
        </div>
    `).join('');
}

// Trade Handler
function handleTrade(itemId) {
    const item = shopItems.find(item => item.id === itemId);
    if (parseInt(beecoinAmount.textContent) >= item.price) {
        beecoinAmount.textContent = parseInt(beecoinAmount.textContent) - item.price;
        showToast(`Successfully traded for ${item.name}!`, 'success');
    } else {
        showToast('Insufficient BeeCoins!', 'error');
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#4CAF50' : 
                        type === 'error' ? '#f44336' : '#2196F3'
    }).showToast();
}

// Initialize shop items
renderShopItems(shopItems); 
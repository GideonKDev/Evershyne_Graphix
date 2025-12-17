// Main JavaScript for CyberDesign Cafe
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Service Category Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const serviceCards = document.querySelectorAll('.service-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter service cards
            serviceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const backToTop = document.getElementById('backToTop');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.style.display = 'flex';
        } else {
            header.classList.remove('scrolled');
            backToTop.style.display = 'none';
        }
    });
    
    // Back to Top button
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // View More Services button
    const viewMoreBtn = document.getElementById('viewMoreServices');
    const additionalServices = document.querySelectorAll('.service-card:nth-child(n+5)');
    
    if (viewMoreBtn && additionalServices.length > 0) {
        // Hide additional services initially
        additionalServices.forEach(service => {
            service.style.display = 'none';
        });
        
        viewMoreBtn.addEventListener('click', function() {
            // Show all hidden services
            additionalServices.forEach(service => {
                service.style.display = 'block';
                setTimeout(() => {
                    service.style.opacity = '1';
                    service.style.transform = 'translateY(0)';
                }, 100);
            });
            
            // Hide the button
            this.style.display = 'none';
            
            // Scroll to services section
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Service card hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(255, 107, 53, 0.3)';
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 107, 53, 0.1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter .btn-small');
    const newsletterInput = document.querySelector('.newsletter input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value;
            
            if (email && validateEmail(email)) {
                // In a real application, you would send this to your server
                newsletterInput.value = '';
                showNotification('Thank you for subscribing!', 'success');
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #2ecc71, #27ae60)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 1002;
            animation: slideIn 0.3s ease;
            min-width: 300px;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Add animation keyframes for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Service card animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe service cards
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add CSS for animated class
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Initialize animations
    setTimeout(() => {
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('animated');
        });
    }, 500);
    
    // Pricing card hover effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Contact form simulation (would be replaced with real form handling)
    const contactButtons = document.querySelectorAll('a[href="#contact"], .btn-primary[href="#contact"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Show notification
                setTimeout(() => {
                    showNotification('Contact our team for personalized service quotes!', 'success');
                }, 1000);
            }
        });
    });
    
    // Initialize the page
    console.log('CyberDesign Cafe website initialized successfully!');
    
    // Add a welcome message
    setTimeout(() => {
        console.log('Welcome to CyberDesign Cafe - Your Digital Solutions Partner!');
    }, 1000);
});
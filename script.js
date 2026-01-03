// Main JavaScript for Evershine Graphixs
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
    
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox Gallery
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = lightboxModal.querySelector('img');
    const lightboxTitle = lightboxModal.querySelector('.lightbox-info h3');
    const lightboxDesc = lightboxModal.querySelector('.lightbox-info p');
    const closeLightbox = lightboxModal.querySelector('.close-lightbox');
    const nextBtn = lightboxModal.querySelector('.lightbox-nav.next');
    const prevBtn = lightboxModal.querySelector('.lightbox-nav.prev');
    
    let currentGalleryItem = 0;
    let galleryItemsArray = [];
    
    // Initialize gallery items array
    galleryItems.forEach((item, index) => {
        galleryItemsArray.push({
            img: item.querySelector('img').src,
            title: item.querySelector('.gallery-overlay h3').textContent,
            desc: item.querySelector('.gallery-overlay p').textContent,
            category: item.dataset.category
        });
        
        // Add click event to gallery items
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Open lightbox function
    function openLightbox(index) {
        currentGalleryItem = index;
        updateLightbox();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update lightbox content
    function updateLightbox() {
        const item = galleryItemsArray[currentGalleryItem];
        lightboxImage.src = item.img;
        lightboxImage.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
    }
    
    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox on background click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Next image
    nextBtn.addEventListener('click', () => {
        currentGalleryItem = (currentGalleryItem + 1) % galleryItemsArray.length;
        updateLightbox();
    });
    
    // Previous image
    prevBtn.addEventListener('click', () => {
        currentGalleryItem = (currentGalleryItem - 1 + galleryItemsArray.length) % galleryItemsArray.length;
        updateLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                break;
            case 'ArrowRight':
                currentGalleryItem = (currentGalleryItem + 1) % galleryItemsArray.length;
                updateLightbox();
                break;
            case 'ArrowLeft':
                currentGalleryItem = (currentGalleryItem - 1 + galleryItemsArray.length) % galleryItemsArray.length;
                updateLightbox();
                break;
        }
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
    
    // Observe gallery items
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe team cards
  // In the JavaScript file, remove or update these parts:

// Remove this block (or comment it out):
/*
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    observer.observe(card);
});
*/

// And remove from the animations initialization:
/*
teamCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('animated');
});
*/

// Instead, just observe the CEO card:
const ceoCard = document.querySelector('.ceo-card');
if (ceoCard) {
    observer.observe(ceoCard);
}

// Update the animations initialization for CEO section:
setTimeout(() => {
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('animated');
    });
    
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.add('animated');
    });
    
    // CEO card animation
    if (ceoCard) {
        ceoCard.style.transitionDelay = '0.3s';
        ceoCard.classList.add('animated');
    }
}, 500);
    
    // Add CSS for animated class
    // const animationStyle = document.createElement('style');
    // animationStyle.textContent = `
    //     .service-card,
    //     .gallery-item,
    //     .team-card {
    //         opacity: 0;
    //         transform: translateY(30px);
    //         transition: opacity 0.6s ease, transform 0.6s ease;
    //     }
        
    //     .service-card.animated,
    //     .gallery-item.animated,
    //     .team-card.animated {
    //         opacity: 1;
    //         transform: translateY(0);
    //     }
    // `;
    document.head.appendChild(animationStyle);
    
    // Initialize animations
    setTimeout(() => {
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('animated');
        });
        
        galleryItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.classList.add('animated');
        });
        
        teamCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('animated');
        });
    }, 500);
    
    // Contact form simulation
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
    console.log('Evershine Graphixs website initialized successfully!');
    
    // Add a welcome message
    setTimeout(() => {
        console.log('Welcome to Evershine Graphixs - Your Digital Solutions Partner!');
    }, 1000);
});
// Gallery Load More Functionality
const loadMoreBtn = document.getElementById('loadMoreGallery');
const galleryItems = document.querySelectorAll('.gallery-item');

if (loadMoreBtn && galleryItems.length > 8) {
    // Initially show only 8 items
    for (let i = 8; i < galleryItems.length; i++) {
        galleryItems[i].style.display = 'none';
    }
    
    let visibleItems = 8;
    
    loadMoreBtn.addEventListener('click', function() {
        // Show next 4 items
        for (let i = visibleItems; i < visibleItems + 4 && i < galleryItems.length; i++) {
            galleryItems[i].style.display = 'block';
            // Add animation
            setTimeout(() => {
                galleryItems[i].style.opacity = '1';
                galleryItems[i].style.transform = 'translateY(0)';
            }, 100);
        }
        
        visibleItems += 4;
        
        // Hide button if all items are visible
        if (visibleItems >= galleryItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
// }// Register Service Worker for PWA
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('ServiceWorker registration successful');
//       })
//       .catch(err => {
//         console.log('ServiceWorker registration failed: ', err);
//       });
//   });
// }

// // Detect if app is installed
// window.addEventListener('appinstalled', (evt) => {
//   console.log('Evershine Graphixs was installed as PWA!');
// });

// // Show install prompt
// let deferredPrompt;
// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later
//   deferredPrompt = e;
  
//   // Show your custom install button (optional)
//   showInstallPromotion();
// });

// function showInstallPromotion() {
//   // You can show a custom install button here
//   const installBtn = document.createElement('button');
//   installBtn.id = 'installBtn';
//   installBtn.innerHTML = '📲 Install App';
//   installBtn.style.cssText = `
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     background: var(--gradient);
//     color: white;
//     padding: 12px 24px;
//     border: none;
//     border-radius: 25px;
//     cursor: pointer;
//     z-index: 1000;
//     box-shadow: 0 5px 15px rgba(0,0,0,0.2);
//     font-weight: 600;
//   `;
  
//   installBtn.addEventListener('click', () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted install');
//         }
//         deferredPrompt = null;
//       });
//     }
//     installBtn.style.display = 'none';
//   });
  
//   document.body.appendChild(installBtn);
// }
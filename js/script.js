// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
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

// Smart scroll behavior for navbar and menus
let lastScrollTop = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    const galleryFilter = document.querySelector('.gallery-filter');
    const menuNav = document.querySelector('.menu-nav');
    
    // Add scrolled class for background effect
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Hide/show menus based on scroll direction
    if (currentScroll > 100) {
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // Scrolling down - hide menus
            if (navbar) navbar.classList.add('navbar-hidden');
            if (galleryFilter) galleryFilter.classList.add('filter-hidden');
            if (menuNav) menuNav.classList.add('menu-nav-hidden');
        } else if (currentScroll < lastScrollTop) {
            // Scrolling up - show menus
            if (navbar) navbar.classList.remove('navbar-hidden');
            if (galleryFilter) galleryFilter.classList.remove('filter-hidden');
            if (menuNav) menuNav.classList.remove('menu-nav-hidden');
        }
    } else {
        // At top of page - always show menus
        if (navbar) navbar.classList.remove('navbar-hidden');
        if (galleryFilter) galleryFilter.classList.remove('filter-hidden');
        if (menuNav) menuNav.classList.remove('menu-nav-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Menu Tab Functionality
const menuTabs = document.querySelectorAll('.menu-tab');
const menuSections = document.querySelectorAll('.menu-section');

if (menuTabs.length > 0) {
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.getAttribute('data-category');
            
            // Remove active class from all tabs and sections
            menuTabs.forEach(t => t.classList.remove('active'));
            menuSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Menu Category Filters
const categoryFilters = document.querySelectorAll('.category-filter');
const menuItems = document.querySelectorAll('.menu-item');

if (categoryFilters.length > 0) {
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter menu items
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
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
}

// Gallery Filters
const galleryFilters = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryFilters.length > 0) {
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');
            
            // Remove active class from all filters
            galleryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let visibleImages = [];

if (galleryImages.length > 0 && lightbox) {
    // Update visible images array
    function updateVisibleImages() {
        visibleImages = Array.from(galleryImages).filter(img => 
            img.closest('.gallery-item').style.display !== 'none'
        );
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            updateVisibleImages();
            currentImageIndex = visibleImages.indexOf(img);
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            updateVisibleImages();
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            lightboxImg.src = visibleImages[currentImageIndex].src;
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            updateVisibleImages();
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            lightboxImg.src = visibleImages[currentImageIndex].src;
        });
    }

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });
}

// Reservation Form
const reservationForm = document.getElementById('reservation-form');
const successModal = document.getElementById('success-modal');
const modalClose = document.querySelector('.modal-close');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const date = formData.get('date');
        const time = formData.get('time');
        const guests = formData.get('guests');
        const contact = formData.get('contact');
        
        // Basic validation
        if (!name || !phone || !date || !time || !guests) {
            alert('Per favore, compila tutti i campi obbligatori.');
            return;
        }
        
        // Simulate form submission
        setTimeout(() => {
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            reservationForm.reset();
        }, 1000);
        
        // In a real application, you would send the data to your server here
        console.log('Reservation data:', {
            name, phone, date, time, guests, contact
        });
    });
}

if (modalClose && successModal) {
    modalClose.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .menu-item, .gallery-item, .feature-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Set minimum date for reservation form
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add loading states to buttons
document.querySelectorAll('button[type="submit"], .btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit') {
            this.classList.add('loading');
            this.disabled = true;
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.disabled = false;
            }, 2000);
        }
    });
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => tooltip.classList.add('show'), 10);
        
        this.addEventListener('mouseleave', function() {
            tooltip.remove();
        }, { once: true });
    });
});

// Add CSS for animations and loading states
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loading {
        position: relative;
        color: transparent !important;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #ffffff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .tooltip.show {
        opacity: 1;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border: 5px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.9);
    }
    
    .navbar.scrolled {
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);
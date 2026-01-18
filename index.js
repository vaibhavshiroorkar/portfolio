// ==========================================
// PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initNavbarScroll();
    initActiveSection();
    initContactModal();
});

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle?.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Add scroll-animate class to elements
    const animateElements = document.querySelectorAll(
        '.glass-card, .timeline-item, .section-title, .about-content, .stat'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('scroll-animate');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
        observer.observe(el);
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ==========================================
// ACTIVE SECTION HIGHLIGHTING
// ==========================================
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ==========================================
// CONTACT MODAL
// ==========================================
function initContactModal() {
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');

    if (!contactBtn || !contactModal) return;

    // Open modal
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal via button
    modalClose?.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal by clicking overlay
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================
// SMOOTH SCROLL POLYFILL (for older browsers)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip for contact button - let the modal handler take over
        if (this.id === 'contactBtn') return;

        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = 100; // Fixed navbar height + extra padding
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

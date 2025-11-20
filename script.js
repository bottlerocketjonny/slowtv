// ================================
// Mobile Menu Toggle
// ================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ================================
// Smooth Scrolling for Navigation Links
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 120; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Scroll Animation Observer
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all sections and key elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.section, .tour-item, .release-card, .gallery-item'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// ================================
// Active Navigation Link on Scroll
// ================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, #hero');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================================
// Newsletter Form Handler
// ================================

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mailing list is a work in progress. Check back soon!');
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================================
// Parallax Effect for Hero
// ================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const heroContent = document.querySelector('.hero-content');
        const halftoneOverlay = document.querySelector('.halftone-overlay');

        // Parallax effect - content moves slower than scroll
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight);

        // Halftone overlay subtle movement
        halftoneOverlay.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ================================
// Ticket Link Handler (Placeholder)
// ================================

document.querySelectorAll('.tour-tickets').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Ticket links coming soon! Check back later or follow us on social media for updates.');
    });
});

// ================================
// Mobile Menu Toggle (if needed)
// ================================

// Add this functionality if you want a hamburger menu on mobile
// For now, the navigation wraps on smaller screens

// ================================
// Image Lazy Loading Enhancement
// ================================

// When you add real images, this will help with performance
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ================================
// Console Message
// ================================

console.log('%cSLOW TV', 'font-size: 48px; font-weight: bold; color: #4A5947;');
console.log('%cWebsite built with DIY spirit 🎸', 'font-size: 16px; color: #6B7B7A;');
console.log('Interested in the code? Check out the source!');

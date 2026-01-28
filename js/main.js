/**
 * BALLRS.AI Coming Soon Page - JavaScript
 */

// ============================================
// Typewriter Effect
// ============================================
const taglineText = "The Future of Football is AI-Powered";
const taglineElement = document.querySelector('.tagline-text');
let charIndex = 0;

function typeWriter() {
    if (charIndex < taglineText.length) {
        taglineElement.textContent += taglineText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

// Start typewriter after initial animations
setTimeout(typeWriter, 1200);

// ============================================
// Particle System
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position
        particle.style.left = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation duration and delay
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 15;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// Form Handling
// ============================================
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email-input');
const formMessage = document.getElementById('form-message');

// Check if returning from successful submission
if (window.location.search.includes('success=true')) {
    if (formMessage) {
        showMessage('Thank you! We\'ll notify you when we launch.', 'success');
    }
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

if (form) {
    form.addEventListener('submit', function(e) {
        const email = emailInput.value.trim();

        // Basic validation
        if (!isValidEmail(email)) {
            e.preventDefault();
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Store email in localStorage as backup
        const emails = JSON.parse(localStorage.getItem('ballrs_signups') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('ballrs_signups', JSON.stringify(emails));
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;

        // Form will submit naturally to Formsubmit
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;

    // Clear message after 8 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 8000);
}

// ============================================
// Video Handling
// ============================================
const video = document.getElementById('bg-video');

if (video) {
    // Ensure video plays on mobile
    video.play().catch(function(error) {
        console.log('Video autoplay prevented:', error);
    });

    // Pause video when tab is not visible (save resources)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            video.pause();
        } else {
            video.play();
        }
    });
}

// ============================================
// Performance Optimization
// ============================================

// Reduce particles on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        if (index > 15) particle.remove();
    });
}

// ============================================
// Console Easter Egg
// ============================================
console.log('%c BALLRS.AI ', 'background: #2D8A7E; color: #00FF66; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c The Future of Football is AI-Powered ', 'color: #00FF66; font-size: 14px;');
console.log('%c Join us: https://ballrs.ai ', 'color: #888888; font-size: 12px;');

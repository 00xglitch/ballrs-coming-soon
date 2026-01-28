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

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Basic validation
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    // In production, replace with actual API call
    submitEmail(email);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitEmail(email) {
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call (replace with actual endpoint)
    setTimeout(() => {
        // Store email in localStorage as backup
        const emails = JSON.parse(localStorage.getItem('ballrs_signups') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('ballrs_signups', JSON.stringify(emails));
        }

        // Show success message
        showMessage('Thank you! We\'ll notify you when we launch.', 'success');

        // Reset form
        emailInput.value = '';
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;

        // Log for debugging (remove in production)
        console.log('Email captured:', email);
        console.log('All signups:', emails);
    }, 1000);
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// ============================================
// Video Handling
// ============================================
const video = document.getElementById('bg-video');

// Ensure video plays on mobile
video.play().catch(function(error) {
    console.log('Video autoplay prevented:', error);
    // Video will still be visible as poster or first frame
});

// Pause video when tab is not visible (save resources)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        video.pause();
    } else {
        video.play();
    }
});

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

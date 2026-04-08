// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            mobileToggle.innerHTML = '✕';
        } else {
            mobileToggle.innerHTML = '☰';
        }
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.innerHTML = '☰';
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animElements = document.querySelectorAll('.animate-on-scroll');
    animElements.forEach(el => observer.observe(el));
});

// Navbar background change on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(253, 242, 248, 0.95)';
        header.style.boxShadow = '0 4px 30px rgba(236, 72, 153, 0.1)';
    } else {
        header.style.background = 'rgba(253, 242, 248, 0.85)';
        header.style.boxShadow = 'none';
    }
});

// Google Sheets Form Submission
const form = document.getElementById('recruitment-form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // This is where the Google Apps Script Web App URL goes!
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyToqQ3eN4i2G471h31DV6yssGEbIEYRFFxxvTETAaVnM-WD_ooxTq4GipYKMFu3ZD7xA/exec';
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Submitting...';
        btn.disabled = true;

        if (scriptURL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            alert("Oops! The database is not connected yet. Please paste the Google Web App script URL into app.js.");
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        fetch(scriptURL, { 
            method: 'POST', 
            body: data,
            mode: 'no-cors'
        })
            .then(response => {
                alert("Thank you! Your application has been submitted.");
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Oh no! Something went wrong communicating with the server.");
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });
}

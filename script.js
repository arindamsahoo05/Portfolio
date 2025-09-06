document.addEventListener('DOMContentLoaded', () => {

    // Sticky Navbar & Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');

    window.onscroll = () => {
        // Sticky Header
        header.classList.toggle('sticky', window.scrollY > 100);

        // Active link on scroll
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };

    // ScrollReveal animations
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    // Revealing elements from different origins
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .certificates-container, .project-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
    ScrollReveal().reveal('.skills-column', { origin: 'top' });
    ScrollReveal().reveal('.timeline-item:nth-child(odd)', { origin: 'left' });
    ScrollReveal().reveal('.timeline-item:nth-child(even)', { origin: 'right' });


    // Typed.js for typing animation
    const typed = new Typed('.multiple-text', {
        strings: ['Frontend Developer', 'Web Designer', 'Full Stack Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Radial Bar Animation
    const radialBars = document.querySelectorAll('.radial-bar');
    const CIRCUMFERENCE = 2 * Math.PI * 80; // 2 * pi * radius

    const animateRadialBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progressBar = bar.querySelector('.progress-bar');
                const percentageDiv = bar.querySelector('.percentage');
                const targetPercent = parseInt(bar.dataset.percent, 10);

                // Animate the stroke
                const offset = CIRCUMFERENCE - (targetPercent / 100 * CIRCUMFERENCE);
                progressBar.style.setProperty('--offset', offset);
                progressBar.classList.add('animate');
                progressBar.style.stroke = 'var(--main-color)';

                // Animate the number
                let start = 0;
                const duration = 1000;
                const stepTime = 10;
                const steps = duration / stepTime;
                const increment = targetPercent / steps;

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= targetPercent) {
                        start = targetPercent;
                        clearInterval(timer);
                    }
                    percentageDiv.textContent = `${Math.round(start)}%`;
                }, stepTime);

                observer.unobserve(bar);
            }
        });
    };

    const observer = new IntersectionObserver(animateRadialBars, {
        threshold: 0.5
    });

    radialBars.forEach(bar => {
        observer.observe(bar);
    });
});
// JavaScript for Service Modals (Pop-ups)
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Show modal when a "Learn More" button is clicked
    learnMoreBtns.forEach(btn => {
        btn.onclick = function() {
            const modal = document.querySelector(btn.dataset.modalTarget);
            modal.style.display = "block";
        }
    });

    // Hide modal when the close button (x) is clicked
    closeBtns.forEach(btn => {
        btn.onclick = function() {
            const modal = btn.closest('.modal');
            modal.style.display = "none";
        }
    });

    // Hide modal when the user clicks outside of the modal content
    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
});
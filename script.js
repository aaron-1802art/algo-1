document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (Features Section)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe features header
    const featuresHeader = document.querySelector('.features-header');
    if (featuresHeader) {
        scrollObserver.observe(featuresHeader);
    }

    // Observe individual feature cards with a slight stagger effect
    const featureCards = document.querySelectorAll('.feature-card-wrapper');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });
});

// ============================================
// STELLAR - Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll-triggered fade-in animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections that should animate on scroll
    document.querySelectorAll('.components-section, .courses-section, .stats-section, .testimonial-section, .cta-section, .course-list-item, .component-feature').forEach(el => {
        el.classList.add('scroll-fade');
        fadeObserver.observe(el);
    });

    // --- Navbar background on scroll ---
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.6)';
        }

        lastScroll = scrollY;
    }, { passive: true });

    // --- Sidebar item hover effect ---
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-item.active').forEach(a => a.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // --- Style tabs interaction ---
    document.querySelectorAll('.style-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.style-tab.active').forEach(a => a.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // --- Stats period tabs ---
    document.querySelectorAll('.stats-period span').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.stats-period span.active').forEach(a => a.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // --- Stats date tabs ---
    document.querySelectorAll('.stats-dates span').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.stats-dates span.active').forEach(a => a.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // --- Counter animation for 110k ---
    const statsNumber = document.querySelector('.stats-number');
    if (statsNumber) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(statsNumber, 0, 110, 2000);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsNumber);
    }

    function animateCounter(el, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(start + (end - start) * eased);
            el.textContent = current + 'k';

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // --- Radius slider interaction ---
    const radiusSlider = document.querySelector('.radius-slider');
    if (radiusSlider) {
        const flightInner = document.querySelector('.flight-card-inner');
        radiusSlider.addEventListener('input', (e) => {
            if (flightInner) {
                flightInner.style.borderRadius = e.target.value + 'px';
            }
            const label = radiusSlider.closest('.radius-control').querySelector('span');
            if (label) {
                label.textContent = 'Corner Radius: ' + e.target.value;
            }
        });
    }

});

// --- Add CSS for scroll animations ---
const style = document.createElement('style');
style.textContent = `
    .scroll-fade {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    }
    .scroll-fade.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

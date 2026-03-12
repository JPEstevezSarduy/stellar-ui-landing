document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered fade-in
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.bento-card, .course-card, .craft-feature, .hex-item, .big-testimonial, .big-testimonial-author').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        obs.observe(el);
    });

    // Navbar scroll effect
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 80 ? 'rgba(5,5,5,0.9)' : 'rgba(5,5,5,0.7)';
    }, { passive: true });

    // Tab interactions
    document.querySelectorAll('.style-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tab.parentElement.querySelectorAll('.style-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            item.closest('.bento-sidebar').querySelectorAll('.sidebar-item.active').forEach(a => a.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Counter animation for 110k
    const statsNum = document.querySelector('.stats-number');
    if (statsNum) {
        const sObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCount(statsNum, 0, 110, 2000);
                    sObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        sObs.observe(statsNum);
    }

    function animateCount(el, start, end, dur) {
        const t0 = performance.now();
        function tick(t) {
            const p = Math.min((t - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(start + (end - start) * ease) + 'k';
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
});

// Visibility class
const s = document.createElement('style');
s.textContent = '.vis{opacity:1 !important;transform:translateY(0) !important}';
document.head.appendChild(s);

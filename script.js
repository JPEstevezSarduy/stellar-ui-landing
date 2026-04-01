document.addEventListener('DOMContentLoaded', () => {
    // Preloader Stars Generation
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.classList.add('preloader-star');
            const size = Math.random() * 2 + 0.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = Math.random() * 0.7 + 0.1;
            starsContainer.appendChild(star);
        }
    }

    // Preloader Percentage Logic
    const preloader = document.getElementById('preloader');
    const counterElement = document.getElementById('counter');
    const lineProgress = document.getElementById('preloader-line');

    if (preloader && counterElement && lineProgress) {
        let count = 0;
        const duration = 2000;
        const interval = 20;

        const timer = setInterval(() => {
            count += (100 / (duration / interval));
            if (count >= 100) {
                count = 100;
                clearInterval(timer);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.visibility = 'hidden';
                        preloader.style.display = 'none';
                    }, 600);
                }, 400);
            }
            counterElement.textContent = Math.floor(count);
            lineProgress.style.width = count + '%';
        }, interval);
    }

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

    // Hero video: reproduce completo, luego loop infinito en los últimos 3 segundos
    const heroVideo = document.querySelector('.hero-video-background video');
    if (heroVideo) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroVideo.pause();
        }
        let looping = false;
        heroVideo.addEventListener('timeupdate', () => {
            if (!looping && heroVideo.currentTime >= heroVideo.duration - 0.1) {
                looping = true;
            }
            if (looping && heroVideo.currentTime >= heroVideo.duration - 0.1) {
                heroVideo.currentTime = heroVideo.duration - 0.5;
                heroVideo.play();
            }
        });
    }

    // Navbar scroll effect
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 80 ? 'rgba(5,5,5,0.95)' : 'rgba(5,5,5,0.75)';
    }, { passive: true });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        // Cerrar menú al hacer click en un link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
        // Cerrar al hacer scroll
        window.addEventListener('scroll', () => {
            if (mobileMenu.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        }, { passive: true });
    }

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

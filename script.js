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

    // Hero video: intro completo → boomerang live en últimos 3s
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches) heroVideo.pause();

        let boomerangStart = 0;
        let boomerangEnd = 0;
        let isReversing = false;
        let lastFrameTime = 0;
        let animFrameId = null;
        let boomerangActive = false;

        heroVideo.addEventListener('loadedmetadata', () => {
            boomerangEnd = heroVideo.duration;
            boomerangStart = Math.max(0, boomerangEnd - 3);
        });

        // Intro termina → activa modo boomerang
        heroVideo.addEventListener('ended', () => {
            boomerangActive = true;
            heroVideo.currentTime = boomerangStart;
            heroVideo.play().catch(() => {});
        });

        // Durante boomerang: al llegar al final → reversa
        heroVideo.addEventListener('timeupdate', () => {
            if (!boomerangActive || isReversing) return;
            if (heroVideo.currentTime >= boomerangEnd - 0.05) {
                isReversing = true;
                heroVideo.pause();
                lastFrameTime = performance.now();
                animFrameId = requestAnimationFrame(rewindLoop);
            }
        });

        function rewindLoop(now) {
            if (!isReversing) return;
            const delta = (now - lastFrameTime) / 1000;
            lastFrameTime = now;

            heroVideo.currentTime = Math.max(boomerangStart, heroVideo.currentTime - delta);

            if (heroVideo.currentTime <= boomerangStart) {
                isReversing = false;
                heroVideo.currentTime = boomerangStart;
                heroVideo.play().catch(() => {});
            } else {
                animFrameId = requestAnimationFrame(rewindLoop);
            }
        }

        // Limpieza al cambiar de pestaña
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && animFrameId) {
                cancelAnimationFrame(animFrameId);
                isReversing = false;
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

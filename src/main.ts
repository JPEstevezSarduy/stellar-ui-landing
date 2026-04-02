// Visibility class — inyectar antes del DOM load
const visStyle = document.createElement('style');
visStyle.textContent = '.vis{opacity:1 !important;transform:translateY(0) !important}';
document.head.appendChild(visStyle);

document.addEventListener('DOMContentLoaded', () => {
    initScrollFadeIn();
    initHeroBoomerang();
    initNavbarScroll();
    initHamburgerMenu();
    initTabs();
    initStatsCounter();
});

function initScrollFadeIn(): void {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('vis');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll<HTMLElement>(
        '.bento-card, .course-card, .craft-feature, .hex-item, .big-testimonial, .big-testimonial-author'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        obs.observe(el);
    });
}

function initHeroBoomerang(): void {
    const heroVideo = document.getElementById('heroVideo') as HTMLVideoElement | null;
    if (!heroVideo) return;
    const video: HTMLVideoElement = heroVideo;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
        video.pause();
        return;
    }

    let boomerangStart = 0;
    let boomerangEnd = 0;
    let isReversing = false;
    let lastFrameTime = 0;
    let animFrameId: number | null = null;
    let boomerangActive = false;

    const LOOP_DURATION = 3;

    video.addEventListener('loadedmetadata', () => {
        boomerangEnd = video.duration;
        boomerangStart = Math.max(0, boomerangEnd - LOOP_DURATION);
    });

    video.addEventListener('ended', () => {
        boomerangActive = true;
        video.currentTime = boomerangStart;
        video.play().catch(() => {});
    });

    video.addEventListener('timeupdate', () => {
        if (!boomerangActive || isReversing) return;
        if (video.currentTime >= boomerangEnd - 0.05) {
            isReversing = true;
            video.pause();
            lastFrameTime = performance.now();
            animFrameId = requestAnimationFrame(rewindLoop);
        }
    });

    function rewindLoop(now: number): void {
        if (!isReversing) return;
        const delta = (now - lastFrameTime) / 1000;
        lastFrameTime = now;

        video.currentTime = Math.max(boomerangStart, video.currentTime - delta);

        if (video.currentTime <= boomerangStart) {
            isReversing = false;
            video.currentTime = boomerangStart;
            video.play().catch(() => {});
        } else {
            animFrameId = requestAnimationFrame(rewindLoop);
        }
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && animFrameId) {
            cancelAnimationFrame(animFrameId);
            isReversing = false;
        }
    });
}

function initNavbarScroll(): void {
    const nav = document.querySelector<HTMLElement>('.navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 80
            ? 'rgba(5,5,5,0.95)'
            : 'rgba(5,5,5,0.75)';
    }, { passive: true });
}

function initHamburgerMenu(): void {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    window.addEventListener('scroll', () => {
        if (mobileMenu.classList.contains('open')) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    }, { passive: true });
}

function initTabs(): void {
    document.querySelectorAll<HTMLElement>('.style-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tab.parentElement?.querySelectorAll('.style-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    document.querySelectorAll<HTMLElement>('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            item.closest('.bento-sidebar')?.querySelectorAll('.sidebar-item.active').forEach(a => a.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function initStatsCounter(): void {
    const statsNum = document.querySelector<HTMLElement>('.stats-number');
    if (!statsNum) return;

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

function animateCount(el: HTMLElement, start: number, end: number, dur: number): void {
    const t0 = performance.now();
    function tick(t: number): void {
        const p = Math.min((t - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (end - start) * ease) + 'k';
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

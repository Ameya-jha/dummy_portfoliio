/* ============================================================
   SAINTOFDESOLATION // PORTFOLIO — script.js
   ============================================================ */

'use strict';

// ─── TYPING EFFECT & COUNT UP ────────────────────────────────
const roles = ["Vibecoder.", "Bot Developer.", "Server Developer.", "Community Moderator."];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
    const dynamicTextElement = document.getElementById("dynamic-text");
    if (!dynamicTextElement) return;

    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        dynamicTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        dynamicTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentCharIndex === currentRole.length) {
        typingSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 400; 
    }

    setTimeout(typeEffect, typingSpeed);
}

function countUp() {
    const numberElement = document.getElementById("interactive-number");
    if (!numberElement) return;

    let count = 0;
    const target = 1; 
    
    const interval = setInterval(() => {
        count++;
        if (count <= target) {
            numberElement.textContent = count.toString().padStart(2, '0');
        } else {
            clearInterval(interval);
        }
    }, 300);
}

// ─── NAV HAMBURGER ────────────────────────────────────────────
function initHamburger() {
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────
function initScrollReveal() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));
}

// ─── NAV SCROLL TINT ──────────────────────────────────────────
function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.style.borderBottomColor = 'rgba(68,68,68,0.8)';
            nav.classList.add('scrolled');
        } else {
            nav.style.borderBottomColor = '';
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ─── METRIC BARS ──────────────────────────────────────────────
function initMetricBars() {
    const metricObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.metric-fill').forEach(fill => {
                        const targetWidth = fill.style.getPropertyValue('--w') || '100%';
                        fill.style.width = targetWidth;
                    });
                    metricObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    document.querySelectorAll('.about-right').forEach(el => metricObserver.observe(el));
}

// ─── CURSOR TRAIL ─────────────────────────────────────────────
function initCursorTrail() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const DOT_COUNT = 6;
    const dots = [];

    for (let i = 0; i < DOT_COUNT; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: ${Math.max(2, 6 - i)}px;
            height: ${Math.max(2, 6 - i)}px;
            border-radius: 50%;
            background: rgba(255,255,255,${0.12 - i * 0.015});
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.05s linear;
            will-change: transform;
        `;
        document.body.appendChild(dot);
        dots.push({ el: dot, x: 0, y: 0 });
    }

    let mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    }, { passive: true });

    function animate() {
        dots.forEach((dot, i) => {
            const lag = 0.28 + i * 0.08;
            dot.x += (mx - dot.x) * lag;
            dot.y += (my - dot.y) * lag;
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top  = dot.y + 'px';
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ─── GLITCH TEXT ──────────────────────────────────────────────
function initGlitch() {
    const handle = document.querySelector('.hero-handle');
    if (!handle) return;
    function glitchOnce() {
        handle.style.textShadow = '2px 0 #888, -2px 0 #444';
        setTimeout(() => { handle.style.textShadow = ''; }, 80);
    }
    function scheduleGlitch() {
        setTimeout(() => {
            glitchOnce();
            scheduleGlitch();
        }, 4000 + Math.random() * 8000);
    }
    scheduleGlitch();
}

// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────────
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        const isActive = link.getAttribute('href') === `#${id}`;
                        link.style.color = isActive ? 'var(--white)' : '';
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => sectionObserver.observe(s));
}

// Initialize Everything On Load
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    countUp();
    initHamburger();
    initScrollReveal();
    initNavScroll();
    initMetricBars();
    initCursorTrail();
    initGlitch();
    initNavHighlight();
    document.querySelectorAll('.work-item, .contact-link').forEach(item => item.setAttribute('tabindex', '0'));
});

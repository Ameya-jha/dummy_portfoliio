/* ============================================================
   SAINTOFDESOLATION // PORTFOLIO — script.js
   ============================================================ */

'use strict';

// ─── NAV HAMBURGER ────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── SCROLL REVEAL ────────────────────────────────────────────
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

// ─── NAV SCROLL TINT ──────────────────────────────────────────
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'rgba(68,68,68,0.8)';
  } else {
    nav.style.borderBottomColor = '';
  }
}, { passive: true });

// ─── METRIC BARS (trigger on scroll into view) ────────────────
// The .metric-fill uses CSS transition triggered by .visible on parent
// We need to add .visible to .about-right when it enters viewport
const metricObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.metric-fill').forEach(fill => {
          // Force reflow then let CSS transition kick in
          fill.style.width = fill.style.getPropertyValue('--w') || getComputedStyle(fill).getPropertyValue('--w');
        });
        metricObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.about-right').forEach(el => metricObserver.observe(el));

// ─── CURSOR TRAIL (subtle, monochrome) ────────────────────────
(function initCursorTrail() {
  // Only on pointer devices with hover capability
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

  let frameId;
  function animate() {
    dots.forEach((dot, i) => {
      const lag = 0.28 + i * 0.08;
      dot.x += (mx - dot.x) * lag;
      dot.y += (my - dot.y) * lag;
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top  = dot.y + 'px';
    });
    frameId = requestAnimationFrame(animate);
  }

  animate();
})();

// ─── WORK ITEMS — staggered keyboard focus ring ───────────────
document.querySelectorAll('.work-item, .contact-link').forEach((item, i) => {
  item.setAttribute('tabindex', '0');
});

// ─── GLITCH TEXT ON HERO HANDLE (occasional, subtle) ─────────
(function initGlitch() {
  const handle = document.querySelector('.hero-handle');
  if (!handle) return;

  function glitchOnce() {
    handle.style.textShadow = '2px 0 #888, -2px 0 #444';
    setTimeout(() => {
      handle.style.textShadow = '';
    }, 80);
  }

  // Fire occasionally
  function scheduleGlitch() {
    const delay = 4000 + Math.random() * 8000;
    setTimeout(() => {
      glitchOnce();
      scheduleGlitch();
    }, delay);
  }

  scheduleGlitch();
})();

// ─── PILL HOVER SOUND (visual only fallback) ──────────────────
// Pills already have CSS transitions; no extra JS needed.

// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────────
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

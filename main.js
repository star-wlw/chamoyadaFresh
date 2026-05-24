/* =============================================
   CHAMOYADAS FEST — JS
   ============================================= */

// ── Hamburger menu ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Navbar scroll effect ────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = '0 4px 28px rgba(0,0,0,0.35)';
  } else {
    navbar.style.boxShadow = '0 3px 20px rgba(0,0,0,0.25)';
  }
});

// ── Active nav link on scroll ───────────────
const sections = document.querySelectorAll('section[id], .hero[id]');
const links    = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Scroll reveal ───────────────────────────
const revealEls = document.querySelectorAll(
  '.card, .topping-item, .contacto-card, .nosotros-text, .nosotros-visual'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Stagger reveal for toppings ─────────────
document.querySelectorAll('.topping-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 60}ms`;
});

// ── Price tag bounce on hover ───────────────
document.querySelectorAll('.price-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'scale(1.1) rotate(-2deg)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});

// ── Smooth cursor glow (desktop only) ──────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 28px; height: 28px; border-radius: 50%;
    background: radial-gradient(circle, rgba(229,57,53,0.35), transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.08s, top 0.08s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── Cup parallax in hero (subtle) ──────────
const heroCups = document.querySelector('.hero-cups');
document.addEventListener('mousemove', e => {
  if (!heroCups) return;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  heroCups.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
});
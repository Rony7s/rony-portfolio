/* ============================================================
   MD. RONY AHMMED SHAH — PORTFOLIO SCRIPT
   Features: Loader, Particles, Typing, Scroll, Nav, Counters,
             Skill Bars, Filter, Theme Toggle, Contact Form
   ============================================================ */

'use strict';

/* ── LOADER ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger initial reveals
    observeReveal();
  }, 1900);
  document.body.style.overflow = 'hidden';
});

/* ── SCROLL PROGRESS ────────────────────────────────────────── */
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollBar.style.width = pct + '%';
}, { passive: true });

/* ── NAVBAR ─────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  highlightNav();
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav highlight based on scroll
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) link.classList.add('active');
      else link.classList.remove('active');
    }
  });
}

/* ── BACK TO TOP ────────────────────────────────────────────── */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── THEME TOGGLE ───────────────────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

/* ── TYPING ANIMATION ───────────────────────────────────────── */
const typedEl = document.getElementById('typed-text');
const roles = [
  'Junior Software Engineer',
  'Laravel Developer',
  'JavaScript Developer',
  'Flutter Developer',
  'AI & EdTech Enthusiast',
  'Python Programmer',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIdx];
  if (isDeleting) {
    charIdx--;
  } else {
    charIdx++;
  }
  typedEl.textContent = currentRole.slice(0, charIdx);
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIdx === currentRole.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 300;
  }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 2000); // start after loader

/* ── PARTICLE CANVAS ────────────────────────────────────────── */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId;
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '#3dd9c5' : '#6c63ff';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    if (mouse.x !== null) {
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        this.x += dx * 0.015;
        this.y += dy * 0.015;
      }
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
  particles = Array.from({ length: count }, () => new Particle());
}
initParticles();

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = '#3dd9c5';
        ctx.globalAlpha = (1 - dist / 100) * 0.12;
        ctx.lineWidth = 0.7;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  animFrameId = requestAnimationFrame(animateParticles);
}
animateParticles();

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function observeReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((s, idx) => {
          if (s === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
        // Trigger skill bars & counters when visible
        entry.target.querySelectorAll('.skill-fill').forEach(bar => animateBar(bar));
        entry.target.querySelectorAll('.stat-number').forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

/* ── ANIMATED COUNTERS ──────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + (target >= 10 ? '+' : '');
    if (current < target) requestAnimationFrame(tick);
    else el.textContent = target + '+';
  };
  tick();
}

/* ── SKILL BARS ─────────────────────────────────────────────── */
function animateBar(bar) {
  const width = bar.getAttribute('data-width');
  bar.style.width = width + '%';
}

/* ── PROJECT FILTER ─────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── CONTACT FORM ───────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.className = 'form-status error';
    return;
  }
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formStatus.className = 'form-status success';
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    setTimeout(() => { formStatus.textContent = ''; }, 5000);
  }, 1800);
});

/* ── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── STAT COUNTER OBSERVER (section reveal) ─────────────────── */
const statsRow = document.querySelector('.stats-row');
if (statsRow) {
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => animateCounter(el));
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statsObs.observe(statsRow);
}

/* ── SKILL BARS OBSERVER ────────────────────────────────────── */
document.querySelectorAll('.skill-category').forEach(cat => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => animateBar(bar));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  io.observe(cat);
});

/* ── PROJECT CARD IMG HOVER RIPPLE ──────────────────────────── */
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const placeholder = card.querySelector('.project-img-placeholder');
    if (placeholder) {
      placeholder.style.transform = 'scale(1.08)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const placeholder = card.querySelector('.project-img-placeholder');
    if (placeholder) {
      placeholder.style.transform = 'scale(1)';
    }
  });
});

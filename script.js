// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

// ========== HAMBURGER MENU ==========
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ========== ACTIVE NAV LINK ==========
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ========== HERO ROLE ROTATOR ==========
const roles = document.querySelectorAll('.role-item');
let currentRole = 0;

function rotateRoles() {
  roles[currentRole].classList.remove('active');
  currentRole = (currentRole + 1) % roles.length;
  roles[currentRole].classList.add('active');
}

setInterval(rotateRoles, 2500);

// ========== SCROLL FADE-IN ANIMATIONS ==========
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

// Add fade-in-up class to animatable elements
const animateTargets = [
  '.glass-card',
  '.timeline-card',
  '.section-header',
  '.project-card',
  '.cert-card',
  '.contact-card',
];

animateTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${i * 0.07}s`;
    observer.observe(el);
  });
});

// ========== SMOOTH SCROLL OFFSET FIX ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========== PARTICLES / GRID DOTS BG for HERO ==========
// Subtle interactive glow effect on hero mousemove
const hero = document.getElementById('hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * 4;
    const rotY = ((x - centerX) / centerX) * 4;
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `perspective(1000px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
    }
  });
  hero.addEventListener('mouseleave', () => {
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      heroContent.style.transition = 'transform 0.8s ease';
    }
  });
  hero.addEventListener('mouseenter', () => {
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transition = 'transform 0.1s ease';
    }
  });
}

// ========== TYPING EFFECT for hero tagline ==========
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.opacity = 1;
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      tagline.textContent += text[i];
      i++;
      setTimeout(typeChar, 25);
    }
  }
  setTimeout(typeChar, 800);
}

// ========== STAT COUNTER ANIMATION ==========
function animateCount(el, target, isFloat = false) {
  const duration = 1500;
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * ease;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString() + (target >= 1000 ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isFloat ? target.toFixed(1) : (target >= 1000 ? target.toLocaleString() + '+' : target);
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = num.textContent.trim();
        if (val === '1000+') animateCount(num, 1000);
        else if (val === '3+') { num.textContent = '0+'; animateCount(num, 3); }
        else if (val === '6+') { num.textContent = '0+'; animateCount(num, 6); }
        else if (val === '7.2') animateCount(num, 7.2, true);
      });
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statObserver.observe(statsSection);

// ========== INIT ==========
updateActiveLink();

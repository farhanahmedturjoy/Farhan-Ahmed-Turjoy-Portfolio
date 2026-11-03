const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });

  document.querySelectorAll('.section-label, .section-title, .about-content, .skill-card, .experience-card, .project-card, .education-item, .certifications, .contact-panel').forEach((el, index) => {
    el.classList.add('reveal');
    if (el.matches('.skill-card, .project-card, .education-item')) {
      el.style.setProperty('--delay', `${(index % 3) * 90}ms`);
    }
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}

/* Keep section reveals modest and honor motion preferences. */
if (!reduceMotion) {
  const sections = document.querySelectorAll('main > .section');
  sections.forEach((section, i) => {
    section.style.setProperty('--section-index', i);
  });
}

/* Let the visitor preview a chosen profile image locally in the circular portrait.
   The file is not uploaded to GitHub or stored on a server. */
const photoInput = document.getElementById('profile-photo-input');
const profilePhoto = document.getElementById('profile-photo');
if (photoInput && profilePhoto) {
  photoInput.addEventListener('change', () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') profilePhoto.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

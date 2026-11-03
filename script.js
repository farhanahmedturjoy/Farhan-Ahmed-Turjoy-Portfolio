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



/* Lightweight interaction layer */
(() => {
  if (document.querySelector('.scroll-progress')) return;
  const bar=document.createElement('div');
  bar.className='scroll-progress';
  bar.setAttribute('aria-hidden','true');
  bar.innerHTML='<span></span>';
  document.body.prepend(bar);

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking=false;
  const updateProgress=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    document.documentElement.style.setProperty('--scroll-progress',max>0?String(window.scrollY/max):'0');
    ticking=false;
  };
  window.addEventListener('scroll',()=>{
    if(!ticking){window.requestAnimationFrame(updateProgress);ticking=true;}
  },{passive:true});
  updateProgress();

  if(reduced) return;
  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    window.addEventListener('pointermove',e=>{
      document.documentElement.style.setProperty('--pointer-x',e.clientX+'px');
      document.documentElement.style.setProperty('--pointer-y',e.clientY+'px');
    },{passive:true});

    const cards=document.querySelectorAll('.skill-card,.project-card,.experience-card,.education-item');
    cards.forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width;
        const y=(e.clientY-r.top)/r.height;
        const ry=(x-.5)*5;
        const rx=(.5-y)*4;
        card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-3px)';
      });
      card.addEventListener('pointerleave',()=>{card.style.transform='';});
    });
  }
})();

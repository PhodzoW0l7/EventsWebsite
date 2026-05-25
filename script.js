/* ═══════════════════════════════════════
   NAVBAR — adds .scrolled class on scroll
═══════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ═══════════════════════════════════════
   SCROLL REVEAL — animates .reveal elements
═══════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

/* ═══════════════════════════════════════
   GALLERY SLIDER
═══════════════════════════════════════ */
const track     = document.getElementById('sliderTrack');
const prevBtn   = document.getElementById('sliderPrev');
const nextBtn   = document.getElementById('sliderNext');
const dotsWrap  = document.getElementById('sliderDots');

let currentSlide = 0;
const slides = track ? track.querySelectorAll('.slide') : [];
const total  = slides.length;

// Build dots
if (dotsWrap && total > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function goToSlide(index) {
  currentSlide = (index + total) % total;
  const slideWidth = slides[0].offsetWidth + 24; // 24 = gap (1.5rem)
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  dotsWrap.querySelectorAll('span').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto-advance every 5 seconds
setInterval(() => goToSlide(currentSlide + 1), 5000);

/* ═══════════════════════════════════════
   HAMBURGER MENU (mobile)
═══════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.right = '2rem';
  navLinks.style.background = 'rgba(26,22,18,0.97)';
  navLinks.style.padding = '1.5rem 2rem';
  navLinks.style.gap = '1.25rem';
});
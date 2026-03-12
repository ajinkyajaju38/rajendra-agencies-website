/* ── Navbar scroll effect ── */
const nav = document.querySelector('nav');
if(nav){
  const isHeroPage = document.querySelector('.hero');

  function updateNav(){
    if(isHeroPage){
      if(window.scrollY > 60){
        nav.classList.remove('transparent');
        nav.classList.add('scrolled');
      } else {
        nav.classList.add('transparent');
        nav.classList.remove('scrolled');
      }
    } else {
      nav.classList.remove('transparent');
      nav.classList.add('scrolled');
    }
  }

  updateNav();
  window.addEventListener('scroll', updateNav);
}

/* ── Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
if(hamburger && mobileMenu){
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if(menuClose && mobileMenu){
  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}
// Close mobile menu on link click
if(mobileMenu){
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Fade-up on scroll ── */
const fadeEls = document.querySelectorAll(
  '.product-card, .testi-card, .brand-card, .why-visual-card, .why-item, .catalog-item, .cinfo-row, .hero-card'
);
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); } });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
fadeEls.forEach(el => { el.classList.add('fade-up'); fadeObserver.observe(el); });

/* ── Animated counters ── */
function animateCount(el){
  const raw = el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const target = parseInt(raw);
  if(isNaN(target)) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if(current >= target) clearInterval(timer);
  }, 24);
}
const counterEls = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ animateCount(e.target); counterObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

/* ── Product category filter (products page) ── */
const filterBtns = document.querySelectorAll('.filter-btn');
if(filterBtns.length){
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.catalog-item').forEach(item => {
        const itemCat = item.dataset.cat || 'all';
        const show = cat === 'all' || itemCat === cat;
        item.style.display = show ? '' : 'none';
        if(show){
          item.classList.remove('visible');
          setTimeout(() => item.classList.add('visible'), 60);
        }
      });
    });
  });
}

/* ── Homepage product tabs ── */
const ptabs = document.querySelectorAll('.ptab');
ptabs.forEach(tab => {
  tab.addEventListener('click', () => {
    ptabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ── Netlify form AJAX ── */
function handleForm(formId, successId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    fetch('/', { method: 'POST', body: new FormData(form) })
      .then(() => {
        form.style.display = 'none';
        const success = document.getElementById(successId);
        if(success) success.style.display = 'block';
      })
      .catch(() => {
        form.style.display = 'none';
        const success = document.getElementById(successId);
        if(success) success.style.display = 'block';
      });
  });
}
handleForm('enquiryForm', 'formSuccess');
handleForm('contactForm', 'contactSuccess');

/* ── Active nav link highlight ── */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if(a.getAttribute('href') === currentPage){
    a.style.color = 'var(--orange)';
  }
});

/* ── Marquee duplicate for seamless loop ── */
const track = document.querySelector('.marquee-track');
if(track){ track.innerHTML += track.innerHTML; }

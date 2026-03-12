/* ── Navbar scroll effect ── */
const nav = document.querySelector('nav');
if(nav){
  const isHero = document.querySelector('.hero');
  if(isHero){ nav.classList.add('transparent'); }
  window.addEventListener('scroll',()=>{
    if(window.scrollY > 60){
      nav.classList.remove('transparent');
      nav.classList.add('scrolled');
    } else {
      nav.classList.add('transparent');
      nav.classList.remove('scrolled');
      if(!isHero) nav.classList.remove('transparent');
    }
  });
  if(!isHero){ nav.classList.remove('transparent'); nav.classList.add('scrolled'); }
}

/* ── Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
if(hamburger){
  hamburger.addEventListener('click',()=>{ mobileMenu.classList.add('open'); document.body.style.overflow='hidden'; });
}
if(menuClose){
  menuClose.addEventListener('click',()=>{ mobileMenu.classList.remove('open'); document.body.style.overflow=''; });
}

/* ── Fade-up on scroll ── */
const fadeEls = document.querySelectorAll('.product-card,.testi-card,.brand-card,.why-visual-card,.why-item,.catalog-item,.cinfo-row,.feature-card,.hero-card');
const fadeObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
fadeEls.forEach(el=>{ el.classList.add('fade-up'); fadeObserver.observe(el); });

/* ── Animated counters ── */
function animateCount(el){
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix||'';
  let current = 0;
  const step = Math.ceil(target/60);
  const timer = setInterval(()=>{
    current = Math.min(current+step, target);
    el.textContent = current + suffix;
    if(current>=target) clearInterval(timer);
  },24);
}
const counterEls = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ animateCount(e.target); counterObserver.unobserve(e.target); } });
},{threshold:0.5});
counterEls.forEach(el=>counterObserver.observe(el));

/* ── Product filter tabs ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const prodItems = document.querySelectorAll('.catalog-item,.prod-item');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    prodItems.forEach(item=>{
      const show = cat==='all' || item.dataset.cat===cat;
      item.style.display = show ? 'block' : 'none';
      if(show){ item.classList.remove('visible'); setTimeout(()=>item.classList.add('visible'),50); }
    });
  });
});

/* ── Products tab (homepage) ── */
const ptabs = document.querySelectorAll('.ptab');
ptabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    ptabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ── Netlify form handling ── */
function handleForm(formId, successId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    fetch('/',{method:'POST',body:new FormData(form)})
      .then(()=>{
        form.style.display='none';
        document.getElementById(successId).style.display='block';
      })
      .catch(()=>{
        form.style.display='none';
        document.getElementById(successId).style.display='block';
      });
  });
}
handleForm('enquiryForm','formSuccess');
handleForm('contactForm','contactSuccess');

/* ── Active nav highlight ── */
const currentPath = location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===currentPath){ a.style.color='var(--orange)'; }
});

/* ── Marquee double for seamless loop ── */
const track = document.querySelector('.marquee-track');
if(track){ track.innerHTML += track.innerHTML; }
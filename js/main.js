// Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if(hamburger){
  hamburger.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open');
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.feature-card,.product-card,.testi-card,.brand-card,.prod-item');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.1});
revealEls.forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(20px)';
  el.style.transition='opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// Form submission (Netlify)
function handleForm(formId, successId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    fetch('/', { method:'POST', body: data })
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

// Product filter
const filterBtns = document.querySelectorAll('.filter-btn');
const prodItems = document.querySelectorAll('.prod-item');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    prodItems.forEach(item=>{
      if(cat==='all'||item.dataset.cat===cat){
        item.style.display='block';
      } else {
        item.style.display='none';
      }
    });
  });
});
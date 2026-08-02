(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  const reveal = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), {threshold:.14});
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = Number(el.dataset.counter); let done = false;
    const ob = new IntersectionObserver(entries => { if (!entries[0].isIntersecting || done) return; done=true; const start=performance.now(); const run=t=>{const p=Math.min(1,(t-start)/1100);el.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(run)};requestAnimationFrame(run); ob.disconnect();},{threshold:.8}); ob.observe(el);
  });
  const dots = document.querySelectorAll('.scroll-dots a');
  const sections = document.querySelectorAll('[data-screen]');
  if (dots.length) { const ob = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting){dots.forEach(d=>d.classList.toggle('active',d.dataset.target===e.target.id));}}),{threshold:.5}); sections.forEach(s=>ob.observe(s)); dots.forEach(d=>d.addEventListener('click',e=>{e.preventDefault();document.getElementById(d.dataset.target)?.scrollIntoView({behavior:'smooth'})})); }
  const parallax = () => { if (window.innerWidth <= 900 || matchMedia('(prefers-reduced-motion: reduce)').matches) return; document.querySelectorAll('.parallax-layer').forEach(el=>{const r=el.closest('[data-parallax-section]')?.getBoundingClientRect(); if(r) el.style.transform=`translateY(${Math.max(-45,Math.min(45,-r.top*(Number(el.dataset.speed)||.12)))}px)`}); };
  window.addEventListener('scroll', parallax, {passive:true}); parallax();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { const value=button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===button)); document.querySelectorAll('.news-card[data-category]').forEach(card=>card.dataset.hidden=value!=='all'&&card.dataset.category!==value?'true':'false'); }));
})();

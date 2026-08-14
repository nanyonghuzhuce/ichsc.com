(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => nav?.classList.add('open'));
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
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length > 1) { let current = 0; const label = document.querySelector('.hero-caption span:first-child'); setInterval(() => { slides[current].classList.remove('active'); current = (current + 1) % slides.length; slides[current].classList.add('active'); if (label) label.textContent = String(current + 1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0'); }, 6200); }
  document.querySelectorAll('[data-carousel]').forEach(carousel => { const photos=[...carousel.querySelectorAll('img')]; if(photos.length<2)return; let current=0; setInterval(()=>{photos[current].classList.remove('active');current=(current+1)%photos.length;photos[current].classList.add('active')},5200); });
  const certificateTrigger = document.querySelector('[data-certificate-preview]');
  const certificateModal = document.querySelector('[data-certificate-modal]');
  const certificateClose = document.querySelector('[data-certificate-close]');
  const closeCertificate = () => { if (!certificateModal) return; certificateModal.hidden = true; document.body.style.overflow = ''; };
  certificateTrigger?.addEventListener('click', () => { if (!certificateModal) return; certificateModal.hidden = false; document.body.style.overflow = 'hidden'; });
  certificateClose?.addEventListener('click', closeCertificate);
  certificateModal?.addEventListener('click', e => { if (e.target === certificateModal) closeCertificate(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCertificate(); });
  const verifyForm = document.querySelector('[data-verify-form]');
  verifyForm?.addEventListener('submit', e => {
    const entity = verifyForm.querySelector('[name="entity"]')?.value.trim() || '';
    const certificate = verifyForm.querySelector('[name="certificate"]')?.value.trim().toUpperCase() || '';
    const level = verifyForm.querySelector('[name="level"]')?.value || '';
    const isEnglish = document.documentElement.lang === 'en';
    const registeredEntity = isEnglish ? 'Henan Qingke Construction Industry Co., Ltd.' : '河南省清科建设实业有限公司';
    const registeredCertificate = 'ICHSC-2026-00354A';
    const matches = (entity === registeredEntity || certificate === registeredCertificate)
      && (!entity || entity === registeredEntity)
      && (!certificate || certificate === registeredCertificate)
      && (!level || /2|II|Ⅱ|专业能力|Certified Operator/i.test(level));
    const result = document.querySelector('[data-verify-result]');
    if (matches) {
      e.preventDefault();
      window.location.href = 'c/ICHSC-2026-00354A.html';
      return;
    }
    if (result) {
      result.innerHTML = isEnglish
        ? '<strong>No matching certification record</strong><p>Please check the legal entity name or certificate number and try again.</p>'
        : '<strong>未找到匹配的认证记录</strong><p>请核对单位全称或证书编号后重新查询。</p>';
    }
    e.preventDefault();
  });
})();

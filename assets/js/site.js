(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => nav?.classList.add('open'));
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
  document.querySelectorAll('[data-counter]').forEach(element => {
    const target = Number(element.dataset.counter); let done = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || done) return;
      done = true;
      const start = performance.now();
      const run = time => { const progress = Math.min(1, (time - start) / 1100); element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))); if (progress < 1) requestAnimationFrame(run); };
      requestAnimationFrame(run); observer.disconnect();
    }, { threshold: 0.8 });
    observer.observe(element);
  });
  const dots = document.querySelectorAll('.scroll-dots a');
  const sections = document.querySelectorAll('[data-screen]');
  if (dots.length) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) dots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === entry.target.id)); }), { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
    dots.forEach(dot => dot.addEventListener('click', event => { event.preventDefault(); document.getElementById(dot.dataset.target)?.scrollIntoView({ behavior: 'smooth' }); }));
  }
  const parallax = () => {
    if (window.innerWidth <= 900 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.parallax-layer').forEach(element => {
      const rect = element.closest('[data-parallax-section]')?.getBoundingClientRect();
      if (rect) element.style.transform = `translateY(${Math.max(-45, Math.min(45, -rect.top * (Number(element.dataset.speed) || 0.12)))}px)`;
    });
  };
  window.addEventListener('scroll', parallax, { passive: true });
  parallax();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.news-card[data-category]').forEach(card => { card.dataset.hidden = value !== 'all' && card.dataset.category !== value ? 'true' : 'false'; });
  }));
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length > 1) {
    let current = 0; const label = document.querySelector('.hero-caption span:first-child');
    setInterval(() => { slides[current].classList.remove('active'); current = (current + 1) % slides.length; slides[current].classList.add('active'); if (label) label.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`; }, 6200);
  }
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const photos = [...carousel.querySelectorAll('img')]; if (photos.length < 2) return;
    let current = 0;
    setInterval(() => { photos[current].classList.remove('active'); current = (current + 1) % photos.length; photos[current].classList.add('active'); }, 5200);
  });
  const certificateTrigger = document.querySelector('[data-certificate-preview]');
  const certificateModal = document.querySelector('[data-certificate-modal]');
  const certificateClose = document.querySelector('[data-certificate-close]');
  const closeCertificate = () => { if (!certificateModal) return; certificateModal.hidden = true; document.body.style.overflow = ''; };
  certificateTrigger?.addEventListener('click', () => { if (!certificateModal) return; certificateModal.hidden = false; document.body.style.overflow = 'hidden'; });
  certificateClose?.addEventListener('click', closeCertificate);
  certificateModal?.addEventListener('click', event => { if (event.target === certificateModal) closeCertificate(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCertificate(); });
  const verifyForm = document.querySelector('[data-verify-form]');
  verifyForm?.addEventListener('submit', event => {
    const entity = verifyForm.querySelector('[name="entity"]')?.value.trim() || '';
    const certificate = verifyForm.querySelector('[name="certificate"]')?.value.trim().toUpperCase() || '';
    const level = verifyForm.querySelector('[name="level"]')?.value || '';
    const isEnglish = document.documentElement.lang === 'en';
    const registeredEntity = isEnglish ? 'Henan Qingke Construction Industry Co., Ltd.' : '河南省清科建设实业有限公司';
    const registeredCertificate = 'ICHSC-2026-00354A';
    const matches = (entity === registeredEntity || certificate === registeredCertificate) && (!level || /2|II|专业能力认证|Certified Operator/i.test(level));
    const result = document.querySelector('[data-verify-result]');
    event.preventDefault();
    if (matches) { window.location.href = 'c/ICHSC-2026-00354A.html'; return; }
    if (result) result.innerHTML = isEnglish ? '<strong>No matching certification record</strong><p>Please check the legal entity name or certificate number and try again.</p>' : '<strong>未找到匹配记录</strong><p>请检查单位名称或证书编号后重新查询。</p>';
  });
  const contactForm = document.querySelector('[data-contact-form]');
  contactForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const button = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector('[data-form-status]');
    const isEnglish = document.documentElement.lang === 'en';
    const idleText = button?.textContent;
    if (!window.emailjs) {
      if (status) status.textContent = isEnglish ? 'The enquiry service is unavailable. Please email info@ichsc.com.' : '咨询服务暂不可用，请直接发送邮件至 info@ichsc.com。';
      return;
    }
    button.disabled = true;
    button.textContent = isEnglish ? 'Sending...' : '正在发送...';
    if (status) status.textContent = '';
    try {
      await window.emailjs.sendForm('service_zz4hhyk', 'template_ichsc_contact', contactForm, { publicKey: 'o0vtB2eJgzT6EzxRp' });
      contactForm.reset();
      if (status) status.textContent = isEnglish ? 'Thank you. Your enquiry has been sent successfully.' : '感谢您的咨询，信息已成功发送。';
    } catch (error) {
      if (status) status.textContent = isEnglish ? 'Unable to send the enquiry. Please try again or email info@ichsc.com.' : '发送未成功，请稍后重试或直接发送邮件至 info@ichsc.com。';
      console.error('EmailJS contact form error:', error);
    } finally {
      button.disabled = false;
      button.textContent = idleText;
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('.info-card, .product-card, .result-card, .contact-form');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((target) => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(18px)';
    target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(target);
  });

  const visibilityState = () => {
    revealTargets.forEach((item) => {
      if (item.classList.contains('is-visible')) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  };

  visibilityState();

  const header = document.querySelector('.site-header');
  const toggleHeaderShadow = () => {
    if (!header) return;
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleHeaderShadow);
  toggleHeaderShadow();
});

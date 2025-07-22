window.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  }), { threshold: .15 });
  document.querySelectorAll('.fade, .fade-left, .fade-right').forEach(el => observer.observe(el));

  const reveal = document.getElementById('reveal-on-scroll');
  const arrow = document.getElementById('scroll-arrow');
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');

  let burgerShown = false;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      reveal.classList.add('visible');
      arrow.classList.add('hide'); // Hide the arrow when content is revealed
      if (!burgerShown) {
        burger.classList.add('visible');
        burgerShown = true;
      }
    } else {
      reveal.classList.remove('visible');
      arrow.classList.remove('hide'); // Show the arrow again if scrolled to top
      // Hamburger stays visible once shown (do not remove .visible from burger)
    }
  });

  arrow.classList.add('visible');

  arrow.addEventListener('click', function(e) {
    e.preventDefault();
    const services = document.getElementById('services');
    if (services) {
      services.scrollIntoView({ behavior: 'smooth' });
      if (!burgerShown) {
        burger.classList.add('visible');
        burgerShown = true;
      }
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
      burger.classList.remove('active');
      menu.classList.remove('open');
    });
  });

  document.body.addEventListener('click', function(e) {
    if (
      menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      burger.classList.remove('active');
      menu.classList.remove('open');
    }
  });

  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  burger.addEventListener('click', function(e) {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
    e.stopPropagation();
  });
});
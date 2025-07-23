window.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  }), { threshold: .15 });
  document.querySelectorAll('.fade, .fade-left, .fade-right').forEach(el => observer.observe(el));

  const reveal = document.getElementById('reveal-on-scroll');
  const arrow = document.getElementById('scroll-arrow');
  const burger = document.getElementById('hamburger');
  
  burger.classList.add('visible');
  const topLimit = 150;
  const nav = document.querySelector('.main-nav');

  function updateHomeLink() {
    let homeLink = nav.querySelector('.nav-home');
    if (window.scrollY > topLimit) {
      if (!homeLink) {
        homeLink = document.createElement('a');
        homeLink.href = "#hero";
        homeLink.className = "nav-home";
        homeLink.textContent = "Home";
        nav.insertBefore(homeLink, nav.firstChild);
      }
    } else {
      if (homeLink) {
        nav.removeChild(homeLink);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  window.addEventListener('scroll', function() {
    updateHomeLink();

    if (window.scrollY > 10) {
      reveal.classList.add('visible');
      arrow.classList.add('hide');
    } else {
      reveal.classList.remove('visible');
      arrow.classList.remove('hide');
    }
  });

  arrow.classList.add('visible');

  arrow.addEventListener('click', function(e) {
    e.preventDefault();
    const services = document.getElementById('services');
    if (services) {
      const header = document.querySelector('.site-header');
      const headerHeight = header.offsetHeight || 80;
      const top = services.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });

  burger.addEventListener('click', function(e) {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    e.stopPropagation();
  });

  document.body.addEventListener('click', function(e) {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      burger.classList.remove('active');
      nav.classList.remove('open');
    }
  });
});
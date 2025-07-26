window.addEventListener('DOMContentLoaded', function() {

  const reveal = document.getElementById('reveal-on-scroll');
  const arrow = document.getElementById('scroll-arrow');
  const burger = document.getElementById('hamburger');
  const nav = document.querySelector('.main-nav');

  // Close menu after clicking a nav item (mobile)
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        burger.classList.remove('active');
        nav.classList.remove('open');
      }
    });
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target); // Stop observing once triggered
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade, .fade-left, .fade-right').forEach(el => observer.observe(el));


  window.addEventListener('scroll', function() {
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

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  try {
    const response = await fetch('https://formspree.io/f/xeozandp', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    const messageElement = document.getElementById('form-message');
    if (response.ok) {
      messageElement.innerHTML = "Message sent! Thank you for reaching out!";
      messageElement.classList.add('success');
      form.reset();
    } else {
      messageElement.innerHTML = "Oops! Something went wrong. Please try again.";
      messageElement.classList.remove('success');
    }
  } catch (error) {
    const messageElement = document.getElementById('form-message');
    messageElement.innerHTML = "Network error. Please try again later.";
    messageElement.classList.remove('success');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // --- ANIMATION ON SCROLL ---
  const animatedElements = document.querySelectorAll('[data-animation]');

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // The 'show' class will trigger the transition/animation
        entry.target.classList.add('show');
        // Stop observing the element after it has been animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // --- SETUP ANIMATIONS ---
  animatedElements.forEach(element => {
    // Add initial hidden/animation classes based on data-attribute
    const animationType = element.dataset.animation;
    if (animationType) {
      element.classList.add('hidden', animationType);
    }

    // If the element is part of a stagger group, apply a delay
    const staggerGroup = element.closest('[data-stagger-group]');
    if (staggerGroup) {
      const delay = parseInt(element.dataset.staggerDelay, 10) || 100;
      const index = Array.from(staggerGroup.children).indexOf(element);
      element.style.setProperty('--stagger-delay', `${index * delay}ms`);
    }

    animationObserver.observe(element);
  });

  // --- NAVBAR & HERO SCROLL EFFECTS ---
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hero parallax effect
    if (hero) {
      hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- TYPED.JS INITIALIZATION ---
  const typedElement = document.querySelector('#typed-text');
  if (typedElement) {
    new Typed('#typed-text', {
      strings: ['Fullstack Developer', 'Software Engineer', 'Problem Solver'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });
  }
});

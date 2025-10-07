
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

const aboutSection = document.querySelector('#about');
aboutSection.classList.add('slide-in-left');

const skillsSection = document.querySelector('#skills');
skillsSection.classList.add('slide-in-right');

const slideInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.classList.remove('slide-in-left');
      entry.target.classList.remove('slide-in-right');
    }
  });
});

slideInObserver.observe(aboutSection);
slideInObserver.observe(skillsSection);

const cards = document.querySelectorAll('.skill-card, .project-card');

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
        entry.target.classList.remove('slide-in');
      }, index * 100);
    }
  });
});

cards.forEach(card => {
  card.classList.add('slide-in');
  cardObserver.observe(card);
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const typed = new Typed('#typed-text', {
  strings: ['Fullstack Developer', 'Software Engineer', 'Problem Solver'],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true
});

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
});

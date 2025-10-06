
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

const cards = document.querySelectorAll('.skill-card, .project-card');

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.classList.remove('slide-in');
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

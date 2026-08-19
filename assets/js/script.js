'use strict';

const elementToggleFunc = (elem) => elem?.classList.toggle('active');

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn?.addEventListener('click', () => {
  elementToggleFunc(sidebar);
  const expanded = sidebar?.classList.contains('active');
  sidebarBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const ctaButtons = document.querySelectorAll('[data-nav-target]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navbar = document.querySelector('.navbar');

const scrollToTop = () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const normalizeRoute = (route) => {
  if (!route) return 'home';
  const cleaned = route.toString().trim().replace(/^#\/?/, '');
  return cleaned || 'home';
};

const getNavRoute = (pageName) => {
  if (pageName.startsWith('work/')) return 'work';
  return pageName;
};

const setActivePage = (pageName) => {
  const normalizedPage = normalizeRoute(pageName);
  const pageExists = Array.from(pages).some((page) => page.dataset.page === normalizedPage);
  const activePage = pageExists ? normalizedPage : 'home';

  pages.forEach((page) => page.classList.toggle('active', page.dataset.page === activePage));
  const activeRoute = getNavRoute(activePage);
  navigationLinks.forEach((link) => link.classList.toggle('active', link.dataset.route === activeRoute));

  if (navbar?.classList.contains('active')) {
    navbar.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
  scrollToTop();
};

const navigateTo = (pageName) => {
  const normalizedPage = normalizeRoute(pageName);
  const currentHash = normalizeRoute(window.location.hash);
  const targetHash = normalizedPage;

  if (currentHash !== targetHash) {
    window.location.hash = `#/${targetHash}`;
  } else {
    setActivePage(normalizedPage);
  }
};

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.dataset.route) {
      navigateTo(link.dataset.route);
    }
  });
});

const routeLinks = document.querySelectorAll('a[href^="#/"]');
routeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const href = link.getAttribute('href');
    if (href) {
      navigateTo(href);
    }
  });
});

ctaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.navTarget) {
      navigateTo(button.dataset.navTarget);
    }
  });
});

navToggle?.addEventListener('click', () => {
  navbar?.classList.toggle('active');
  const expanded = navbar?.classList.contains('active');
  navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

const handleHashChange = () => {
  setActivePage(window.location.hash);
};

window.addEventListener('hashchange', handleHashChange);
handleHashChange();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

const updateFormState = () => {
  if (!form || !formBtn) return;
  if (form.checkValidity()) {
    formBtn.removeAttribute('disabled');
  } else {
    formBtn.setAttribute('disabled', '');
  }
};

formInputs.forEach((input) => input.addEventListener('input', updateFormState));
updateFormState();

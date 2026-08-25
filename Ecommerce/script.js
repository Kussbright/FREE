document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Fade-in Animation Observer
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // Hero Slider (if exists)
  const slides = document.querySelectorAll('.hero-slide');
  if(slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }

  // Quick View Modal
  const modal = document.getElementById('quickViewModal');
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  const closeBtn = document.querySelector('.modal-close');
  
  if(modal && quickViewBtns.length > 0) {
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Dynamic mapping of card data to modal
        const card = btn.closest('.product-card');
        const title = card.querySelector('.product-title').innerText;
        const price = card.querySelector('.product-price').innerText;
        const imgSrc = card.querySelector('img').src;

        modal.querySelector('.modal-img img').src = imgSrc;
        modal.querySelector('.modal-info h2').innerText = title;
        modal.querySelector('.modal-info .price').innerText = price;
        
        modal.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.classList.remove('active');
    });
  }
});

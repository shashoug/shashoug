/**
 * Modern Resume Website
 * Enhanced with smooth animations and interactions
 */
(function() {
  "use strict";

  // ============================================
  // INITIALIZE AOS (Animate On Scroll)
  // ============================================
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 50
    });
  });

  // ============================================
  // TYPING ANIMATION
  // ============================================
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    const typed = new Typed('#typed-text', {
      strings: [
        'scalable mobile apps',
        'cross-platform solutions',
        'AI-powered systems',
        'enterprise software',
        'beautiful user experiences'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // ============================================
  // SMOOTH SCROLLING FOR NAVIGATION
  // ============================================
  const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ============================================
  // NAVBAR BACKGROUND ON SCROLL
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove background based on scroll position
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
      navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // ACTIVE NAVIGATION HIGHLIGHT
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // ============================================
  // ANIMATED COUNTERS
  // ============================================
  const counterElements = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    const countersSection = document.querySelector('.stats-grid');
    if (!countersSection) return;

    const rect = countersSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      hasAnimated = true;
      counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  window.addEventListener('load', animateCounters);

  // ============================================
  // PARALLAX EFFECT FOR ORBS
  // ============================================
  const orbs = document.querySelectorAll('.gradient-orb');
  
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // ============================================
  // CARD TILT EFFECT
  // ============================================
  const cards = document.querySelectorAll('.glass-card, .tech-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // ============================================
  // CURSOR TRAIL EFFECT (OPTIONAL)
  // ============================================
  let cursorDots = [];
  const maxDots = 10;

  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
    
    document.body.appendChild(dot);
    cursorDots.push(dot);

    setTimeout(() => {
      dot.remove();
      cursorDots.shift();
    }, 1000);

    if (cursorDots.length > maxDots) {
      cursorDots[0].remove();
      cursorDots.shift();
    }
  });

  // Add cursor dot styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .cursor-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: fade-out 1s ease-out;
      opacity: 0.6;
    }
    
    @keyframes fade-out {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      100% {
        transform: scale(0);
        opacity: 0;
      }
    }

    .nav-link.active {
      color: var(--text-primary);
    }

    .nav-link.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // SMOOTH REVEAL ON PAGE LOAD
  // ============================================
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

  // ============================================
  // PREVENT FLASH OF UNSTYLED CONTENT
  // ============================================
  document.documentElement.style.visibility = 'visible';

  console.log('✨ Resume website loaded successfully!');

})();
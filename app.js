/* ==========================================================================
   MOHAMED WALID - AI ENGINEER PORTFOLIO JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Typing Effect in Hero Section ---
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    'AI Engineer',
    'Computer Vision Specialist',
    'Deep Learning Developer',
    'YOLOv8 & PyTorch Researcher'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingElement) typeEffect();

  // --- 2. Neural Background Canvas ---
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(width / 20, 60);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5
      });
    }

    function animateNeuralNetwork() {
      ctx.clearRect(0, 0, width, height);

      // Check theme color for particles
      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(6, 182, 212, ' : 'rgba(59, 130, 246, ';

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor + '0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = particleColor + (1 - dist / 140) * 0.25 + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateNeuralNetwork);
    }
    animateNeuralNetwork();
  }

  // --- 3. Navbar Scroll & Mobile Menu ---
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 4. Dark / Light Theme Switcher ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      document.documentElement.classList.toggle('light');
    });
  }

  // --- 5. Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // --- 6. AI Sandbox Visualizer Tabs & Scanner Logic ---
  const sandboxTabs = document.querySelectorAll('.sandbox-tab');
  const demoPanels = document.querySelectorAll('.demo-panel');

  sandboxTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sandboxTabs.forEach(t => t.classList.remove('active'));
      demoPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const demoId = tab.getAttribute('data-demo');
      const targetPanel = document.getElementById(demoId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Rescan simulation button
  document.querySelectorAll('.re-scan-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const panel = e.target.closest('.demo-panel');
      const scanLine = panel.querySelector('.scan-line');
      if (scanLine) {
        scanLine.style.animation = 'none';
        void scanLine.offsetWidth; // Trigger reflow
        scanLine.style.animation = 'scan 1.5s ease-in-out';
      }
    });
  });

  // --- 7. Modals Logic ---
  const modalOpenBtns = document.querySelectorAll('.open-modal-btn');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = 'auto';
    });
  });

  // --- 8. Contact Form Handler ---
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formToast.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        formToast.style.display = 'none';
      }, 5000);
    });
  }

});

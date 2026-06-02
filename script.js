/* ============================================
   Personal Web Resume — Vanilla JavaScript
   Left Sidebar Layout · No Libraries
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     TYPING EFFECT — cycles through job titles
     ========================================================== */
  const typedTextEl = document.querySelector('.typed-text');

  const words = [
    'Front-End Developer',
    'UI/UX Designer',
    'Creative Thinker',
    'Problem Solver',
    'Freelancer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();


  /* ==========================================================
     SIDEBAR MOBILE TOGGLE
     ========================================================== */
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function openSidebar() {
    hamburger.classList.add('active');
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close sidebar when clicking overlay
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar when clicking a nav link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });


  /* ==========================================================
     ACTIVE NAV LINK ON SCROLL
     ========================================================== */
  const sections = document.querySelectorAll('section[id]');

  function activateNavLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', activateNavLink);
  activateNavLink();   // run once on load


  /* ==========================================================
     SCROLL REVEAL (Intersection Observer)
     ========================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================================
     SKILL BAR ANIMATION
     ========================================================== */
  const skillSection = document.querySelector('#skills');
  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-fill').forEach(fill => {
          const percent = fill.getAttribute('data-percent');
          fill.style.width = percent + '%';
          fill.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.3 });

  if (skillSection) skillObserver.observe(skillSection);


  /* ==========================================================
     COUNTER ANIMATION
     ========================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-count'));
        const suffix = target.getAttribute('data-suffix') || '';
        animateCounter(target, finalValue, suffix);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 25);
  }


  /* ==========================================================
     BACK TO TOP BUTTON
     ========================================================== */
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ==========================================================
      CONTACT FORM VALIDATION
      ========================================================== */
  const contactForm = document.getElementById('contactForm');
  const ownerEmail = 'ahsanimran972@gmail.com';

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

      // Name
      const nameField = contactForm.querySelector('#name');
      if (nameField.value.trim().length < 2) {
        showError(nameField, 'Please enter your name (min 2 characters)');
        isValid = false;
      }

      // Email
      const emailField = contactForm.querySelector('#email');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
      }

      // Subject
      const subjectField = contactForm.querySelector('#subject');
      if (subjectField.value.trim().length < 3) {
        showError(subjectField, 'Please enter a subject (min 3 characters)');
        isValid = false;
      }

      // Message
      const messageField = contactForm.querySelector('#message');
      if (messageField.value.trim().length < 10) {
        showError(messageField, 'Please enter a message (min 10 characters)');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
          const payload = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            subject: subjectField.value.trim(),
            message: messageField.value.trim(),
            _subject: 'New Resume Contact: ' + subjectField.value.trim(),
            _template: 'table',
            _captcha: 'false'
          };

          const response = await fetch('https://formsubmit.co/ajax/' + ownerEmail, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error('Request failed');
          }

          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 2500);
        } catch (error) {
          // Fallback to user's mail client if API is blocked.
          const fallbackBody =
            'Name: ' + nameField.value.trim() + '\n' +
            'Email: ' + emailField.value.trim() + '\n\n' +
            'Message:\n' + messageField.value.trim();

          window.location.href =
            'mailto:' + ownerEmail +
            '?subject=' + encodeURIComponent('Resume Contact: ' + subjectField.value.trim()) +
            '&body=' + encodeURIComponent(fallbackBody);

          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  function showError(field, message) {
    const group = field.closest('.form-group');
    group.classList.add('error');
    const errorMsg = group.querySelector('.error-msg');
    if (errorMsg) errorMsg.textContent = message;
  }


  /* ==========================================================
     SMOOTH SCROLL FOR ALL ANCHOR LINKS
     Accounts for no fixed top navbar in desktop mode
     ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        // On mobile we have a 60px header; on desktop none
        const offset = window.innerWidth <= 1024 ? 70 : 20;
        const targetPos = target.offsetTop - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});

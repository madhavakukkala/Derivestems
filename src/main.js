import Lenis from 'lenis';

/* ==========================================================================
   DERIVESTEMS MINIMALIST APPLE-STYLE INTERACTIVE CONTROLLER
   High Performance Scroll Actions, SVG Plant Drawing, and Conversational FAQ
   ========================================================================== */

// Initialize Lenis smooth scroll globally
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easeOutExpo
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {

  // Intercept anchor clicks and scroll smoothly via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, {
          offset: -80,
          duration: 1.5
        });
      }
    });
  });

  // 1. FLOATING NAVBAR COMPRESS & ACTIVE SECTION TRACKING
  const navbar = document.getElementById('navbar-menu-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add scrolled class for solid background transition
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // High performance active link update
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. MOBILE NAVIGATION DRAWER
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  // 3. MAGNETIC MICRO-INTERACTION FOR CALL-TO-ACTIONS
  const magneticButtons = document.querySelectorAll('.magnetic');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Slight displacement (Apple-like weight)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.01)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });

  // 3b. MOUSE PARALLAX FOR HERO 3D TREE & FLOATING REVIEWS
  const heroSection = document.getElementById('hero');
  const heroTree = document.getElementById('hero-tree-img');
  const cardLeft = document.querySelector('.floating-review-card.card-left');
  const cardRight = document.querySelector('.floating-review-card.card-right');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Tree sway
      if (heroTree) {
        heroTree.style.transform = `scale(1.03) translate(${x * 30}px, ${y * 20}px) rotate(${x * 4}deg)`;
      }

      // Left card displacement (offsetting the static tilt)
      if (cardLeft) {
        cardLeft.style.transform = `translate(${x * -40}px, ${y * -30 + 30}px) rotate(${-3.5 + x * -5}deg)`;
      }

      // Right card displacement (offsetting the static tilt)
      if (cardRight) {
        cardRight.style.transform = `translate(${x * 40}px, ${y * 30 - 20}px) rotate(${3 + x * 5}deg)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      if (heroTree) {
        heroTree.style.transform = 'scale(1) translate(0, 0) rotate(0deg)';
      }
      if (cardLeft) {
        cardLeft.style.transform = 'rotate(-3.5deg) translateY(30px)';
      }
      if (cardRight) {
        cardRight.style.transform = 'rotate(3deg) translateY(-20px)';
      }
    });
  }

  // 4. PARALLAX IMAGE SCROLL CONTROLLER
  const parallaxImages = document.querySelectorAll('.parallax-image-container img');

  const handleParallax = () => {
    const viewHeight = window.innerHeight;
    parallaxImages.forEach(img => {
      const container = img.parentElement;
      const speed = parseFloat(container.getAttribute('data-speed') || '1.5');
      const rect = container.getBoundingClientRect();

      // Check if image is visible in screen
      if (rect.top < viewHeight && rect.bottom > 0) {
        const relativeScroll = (viewHeight - rect.top) / (viewHeight + rect.height);
        // Translate image inside overflow container
        const translateY = (relativeScroll - 0.5) * 45 * (speed - 1);
        img.style.transform = `scale(1.1) translateY(${translateY}px)`;
      }
    });
  };

  // Run parallax on scroll and frame load
  window.addEventListener('scroll', handleParallax);
  setTimeout(handleParallax, 200);

  // 5. VECTOR PLANT STEM GROWTH DRAWINGS ON SCROLL
  const animateSVGPathOnScroll = (pathId, sectionId) => {
    const path = document.getElementById(pathId);
    const section = document.getElementById(sectionId);
    if (!path || !section) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Calculate scroll progress percentage through the section
      // Starts drawing when the top of the section enters the bottom 90% of screen
      // Finishes drawing when the top hits the top 15% of screen
      const startTrigger = viewHeight * 0.9;
      const endTrigger = viewHeight * 0.15;

      let progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      progress = Math.min(Math.max(progress, 0), 1);

      path.style.strokeDashoffset = pathLength - (progress * pathLength);
    });
  };

  // Bind grow vectors for each plant art section
  animateSVGPathOnScroll('hero-stem-path', 'hero');
  animateSVGPathOnScroll('about-stem-path', 'about');
  animateSVGPathOnScroll('process-stem-path', 'process');

  // 6. ENTRANCE REVEAL TRANSITIONS & COUNT METRICS
  const revealElements = document.querySelectorAll('.scroll-reveal');
  let countersAnimated = false;

  const animateCounter = (el, target, duration = 2000) => {
    let start = 0;
    const isPercentage = el.getAttribute('data-target') === '95';
    const isPlus = el.getAttribute('data-target') === '100' || el.getAttribute('data-target') === '50';
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += 1;
      el.textContent = start + (isPercentage ? '%' : (isPlus ? '+' : ''));
      if (start >= target) {
        clearInterval(timer);
        el.textContent = target + (isPercentage ? '%' : (isPlus ? '+' : ''));
      }
    }, Math.max(stepTime, 15));
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Trigger counters if they enter viewport
        if (entry.target.classList.contains('metrics-container') && !countersAnimated) {
          countersAnimated = true;
          document.querySelectorAll('.metric-number').forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            animateCounter(num, target, 1600);
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });



  // 8. PROCESS STEP ACTIVE STATE ON SCROLL
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const processSection = document.getElementById('process');

  if (processSection) {
    window.addEventListener('scroll', () => {
      const viewHeight = window.innerHeight;
      timelineSteps.forEach(step => {
        const rect = step.getBoundingClientRect();
        // Step becomes active when its marker hits the upper-middle of viewport
        if (rect.top < viewHeight * 0.6) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    });
  }

  // 9. MINIMALIST TESTIMONIAL CAROUSEL
  const testimonialTrack = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('#carousel-dots .dot');
  let currentSlide = 0;
  const slideCount = dots.length;
  let autoSlideTimer;

  const updateSlide = (slideIndex) => {
    currentSlide = slideIndex;
    if (testimonialTrack) {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  };

  const startAutoSlide = () => {
    autoSlideTimer = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slideCount;
      updateSlide(nextSlide);
    }, 6000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideTimer);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      updateSlide(index);
      startAutoSlide();
    });
  });

  // Carousel Swipe support
  if (testimonialTrack) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    testimonialTrack.addEventListener('mousedown', (e) => {
      stopAutoSlide();
      isDragging = true;
      startX = e.clientX;
      testimonialTrack.style.transition = 'none';
    });

    testimonialTrack.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
      const walk = currentX - startX;
      const baseTranslate = -currentSlide * testimonialTrack.offsetWidth;
      testimonialTrack.style.transform = `translateX(${baseTranslate + walk}px)`;
    });

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      testimonialTrack.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      const walk = currentX - startX;
      const threshold = 100;

      if (Math.abs(walk) > threshold) {
        if (walk < 0 && currentSlide < slideCount - 1) {
          updateSlide(currentSlide + 1);
        } else if (walk > 0 && currentSlide > 0) {
          updateSlide(currentSlide - 1);
        } else {
          updateSlide(currentSlide);
        }
      } else {
        updateSlide(currentSlide);
      }
      startAutoSlide();
    };

    testimonialTrack.addEventListener('mouseup', endDrag);
    testimonialTrack.addEventListener('mouseleave', endDrag);

    // Mobile touch
    testimonialTrack.addEventListener('touchstart', (e) => {
      stopAutoSlide();
      isDragging = true;
      startX = e.touches[0].clientX;
      testimonialTrack.style.transition = 'none';
    });

    testimonialTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const walk = currentX - startX;
      const baseTranslate = -currentSlide * testimonialTrack.offsetWidth;
      testimonialTrack.style.transform = `translateX(${baseTranslate + walk}px)`;
    });

    testimonialTrack.addEventListener('touchend', endDrag);
    startAutoSlide();
  }

  // 10. CONVERSATIONAL FAQ CHATBOT ENGINE
  const chatFeed = document.getElementById('chat-feed');
  const suggestionList = document.getElementById('chat-suggestions-list');

  const faqDatabase = {
    0: "We work with a wide range of industries including B2B SaaS companies, digital creators, marketing agencies, consultants, e-commerce brands, startup founders, and coaching professionals looking to scale their digital brand authority.",
    1: "Yes! Content planning and ideation are included in all of our content creation packages. We conduct research on your niche to map out the highest-performing topics, visual hooks, and script templates for your brand.",
    2: "Absolutely. We offer complete branding design packages covering logo systems, typographic styling, curated color schemes, brand guidelines, and visual templates to ensure a professional look on all media.",
    3: "Yes, we regularly build custom service configurations based on our clients' publishing volumes or graphic needs. Reach out to us using the contact form below and we'll create a custom proposal for you.",
    4: "To get started, simply fill out the inquiry form below or email us directly at contact@derivestems.com. We will respond within 24 hours to schedule a brief 15-minute discovery call and map out your content roadmap."
  };

  if (chatFeed && suggestionList) {
    const suggestionButtons = suggestionList.querySelectorAll('.chat-btn-suggestion');

    suggestionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const questionId = btn.getAttribute('data-id');
        const questionText = btn.textContent;
        const answerText = faqDatabase[questionId];

        // 1. Disable buttons to prevent multiple clicks during response
        suggestionButtons.forEach(b => b.classList.add('disabled'));

        // 2. Append User bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble bubble-user';
        userBubble.textContent = questionText;
        chatFeed.appendChild(userBubble);
        chatFeed.scrollTop = chatFeed.scrollHeight;

        // 3. Show typing indicator from assistant after 400ms
        setTimeout(() => {
          const typingBubble = document.createElement('div');
          typingBubble.className = 'chat-bubble bubble-assistant';
          typingBubble.id = 'chat-typing-bubble';
          typingBubble.innerHTML = `
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          `;
          chatFeed.appendChild(typingBubble);
          chatFeed.scrollTop = chatFeed.scrollHeight;

          // 4. Resolve typing indicator to assistant answer after 1000ms
          setTimeout(() => {
            const typingEl = document.getElementById('chat-typing-bubble');
            if (typingEl) typingEl.remove();

            const assistantBubble = document.createElement('div');
            assistantBubble.className = 'chat-bubble bubble-assistant';
            assistantBubble.textContent = answerText;
            chatFeed.appendChild(assistantBubble);
            chatFeed.scrollTop = chatFeed.scrollHeight;

            // 5. Re-enable suggestion buttons
            suggestionButtons.forEach(b => b.classList.remove('disabled'));
          }, 1000);

        }, 400);
      });
    });
  }

  // 11. INQUIRY FORM DISPATCHER
  const inquiryForm = document.getElementById('inquiry-form');
  const formStatus = document.getElementById('form-status');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const serviceSelect = document.getElementById('form-service');
      const service = serviceSelect.options[serviceSelect.selectedIndex].text;
      const message = document.getElementById('form-message').value;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Redirecting...';
      formStatus.className = 'form-status';
      formStatus.innerHTML = '';

      // Structure the message nicely for WhatsApp
      const textMessage = `Hi DeriveStems! I would like to get in touch.

*Details:*
• *Name:* ${name}
• *Email:* ${email}
• *Service:* ${service}
• *Project Details:* ${message}`;

      const encodedText = encodeURIComponent(textMessage);
      const whatsappUrl = `https://wa.me/919573823328?text=${encodedText}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formStatus.classList.add('status-success');
        formStatus.innerHTML = `Redirecting you to WhatsApp to send your message...<br><br>If it did not open automatically, <a href="${whatsappUrl}" target="_blank" style="color:#3b5724; text-decoration:underline; font-weight:500;">click here to message us</a>.`;
        
        inquiryForm.reset();
        window.open(whatsappUrl, '_blank');
      }, 800);
    });
  }
});

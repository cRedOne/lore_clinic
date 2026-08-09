document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. ПООЧЕРЕДНАЯ ПОДСВЕТКА БУКВ L -> O -> R -> E
     ========================================================================== */
  const letters = [
    document.getElementById('let-l'),
    document.getElementById('let-o'),
    document.getElementById('let-r'),
    document.getElementById('let-e')
  ];

  let currentIdx = 0;

  setTimeout(() => {
    switchLetterGlow();
    setInterval(switchLetterGlow, 2000);
  }, 1000);

  function switchLetterGlow() {
    letters.forEach(letEl => {
      if (letEl) letEl.classList.remove('glow');
    });

    if (letters[currentIdx]) {
      letters[currentIdx].classList.add('glow');
    }

    currentIdx = (currentIdx + 1) % letters.length;
  }

  /* ==========================================================================
     2. МУЛЬТИЯЗЫЧНОСТЬ
     ========================================================================== */
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ==========================================================================
     3. МОБІЛЬНЕ МЕНЮ (БУРГЕР) ТА ПЛАВНИЙ СКРОЛЛ ДО БЛОКІВ
     ========================================================================== */
  const burgerBtn = document.getElementById('burgerBtn');
  const navMobileWrapper = document.getElementById('navMobileWrapper');
  const navLinks = document.querySelectorAll('.nav-link');

  if (burgerBtn && navMobileWrapper) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('is-active');
      navMobileWrapper.classList.toggle('is-open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          if (burgerBtn && navMobileWrapper) {
            burgerBtn.classList.remove('is-active');
            navMobileWrapper.classList.remove('is-open');
          }

          const headerHeight = document.querySelector('.header').offsetHeight || 80;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ==========================================================================
     4. АККОРДЕОН
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.closest('.accordion-item');
      const isOpen = currentItem.classList.contains('is-open');

      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('is-open');
        const icon = item.querySelector('.icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        currentItem.classList.add('is-open');
        const icon = header.querySelector('.icon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  /* ==========================================================================
     5. МОДАЛЬНОЕ ОКНО
     ========================================================================== */
  const modal = document.getElementById('priceModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  /* ==========================================================================
     6. СЛАЙДЕР ВИТРИНЫ
     ========================================================================== */
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');

  if (track) {
    const slides = track.querySelectorAll('.slide-card');

    if (slides.length > 0 && dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToSlide(index));
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll('.dot');

      function getScrollAmount() {
        const cardWidth = slides[0].offsetWidth;
        const gap = 20;
        return cardWidth + gap;
      }

      function scrollToSlide(index) {
        track.scrollTo({
          left: index * getScrollAmount(),
          behavior: 'smooth'
        });
      }

      track.addEventListener('scroll', () => {
        const scrollPosition = track.scrollLeft;
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const itemWidth = getScrollAmount();
        
        let activeIndex;

        if (scrollPosition >= maxScrollLeft - 5) {
          activeIndex = slides.length - 1;
        } else {
          activeIndex = Math.round(scrollPosition / itemWidth);
        }

        activeIndex = Math.max(0, Math.min(activeIndex, slides.length - 1));

        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      });

      let isDown = false;
      let startX;
      let scrollLeft;

      slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) img.addEventListener('dragstart', (e) => e.preventDefault());
      });

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('dragging');
        track.style.scrollBehavior = 'auto';
        track.style.scrollSnapType = 'none';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      const stopDragging = () => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('dragging');
        track.style.scrollBehavior = 'smooth';
        track.style.scrollSnapType = 'x mandatory';
      };

      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('mouseleave', stopDragging);

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
      });
    }
  }

  /* ==========================================================================
     7. ИНТЕРАКТИВНАЯ КАРТА ПО КЛИКУ
     ========================================================================== */
  const mapContainer = document.getElementById('mapContainer');
  const mapOverlay = document.getElementById('mapOverlay');

  if (mapContainer && mapOverlay) {
    mapOverlay.addEventListener('click', () => {
      mapContainer.classList.add('map-active');
    });
  }
});
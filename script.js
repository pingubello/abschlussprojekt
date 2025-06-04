// Progressive Enhancement JavaScript for Agrargenossenschaft Finow
// Base functionality works without JavaScript, enhanced with JS

// Simple utility functions
function addClass(element, className) {
  if (element && !element.classList.contains(className)) {
    element.classList.add(className);
  }
}

function removeClass(element, className) {
  if (element && element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

// Mobile Navigation Enhancement
function enhanceMobileNavigation() {
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  if (!navToggle || !navList) return;

  // Basic click handler
  navToggle.addEventListener("click", function (e) {
    e.preventDefault();
    toggleClass(navList, "active");

    // Update accessibility attributes
    const isOpen = navList.classList.contains("active");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu when clicking links
  const navLinks = navList.querySelectorAll(".nav__link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      removeClass(navList, "active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
      removeClass(navList, "active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    }
  });

  // Escape key to close menu
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navList.classList.contains("active")) {
      removeClass(navList, "active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
      navToggle.focus();
    }
  });
}

// Recipe Slideshow Enhancement
function enhanceSlideshow() {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    // Remove active from all
    slides.forEach(function (slide) {
      removeClass(slide, "active");
    });
    indicators.forEach(function (indicator) {
      removeClass(indicator, "active");
    });

    // Add active to current
    if (slides[index]) {
      addClass(slides[index], "active");
      currentSlide = index;
    }
    if (indicators[index]) {
      addClass(indicators[index], "active");
    }
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 7000);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Initialize first slide
  showSlide(0);

  // Add click handlers to indicators
  indicators.forEach(function (indicator, index) {
    indicator.addEventListener("click", function () {
      showSlide(index);
      stopAutoplay();
      startAutoplay(); // Restart autoplay
    });
  });

  // Add click handlers to slides for recipe navigation
  slides.forEach(function (slide) {
    const recipeUrl = slide.getAttribute("data-recipe-url");
    if (recipeUrl) {
      slide.addEventListener("click", function (e) {
        // Don't navigate if clicking on indicators
        if (!e.target.classList.contains("indicator")) {
          window.location.href = recipeUrl;
        }
      });
      // Add cursor pointer to indicate clickability
      slide.style.cursor = "pointer";
    }
  });

  // Start autoplay
  startAutoplay();

  // Pause on hover
  const slideshow = document.querySelector(".slideshow");
  if (slideshow) {
    slideshow.addEventListener("mouseenter", stopAutoplay);
    slideshow.addEventListener("mouseleave", startAutoplay);
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
      stopAutoplay();
      startAutoplay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    }
  });
}

// Aquaponics Enhancement - Simple version
function enhanceAquaponics() {
  // On desktop (≥1200px), show the interaction hint
  if (window.innerWidth >= 1200) {
    const interactionHint = document.querySelector(".interaction-hint");
    if (interactionHint) {
      interactionHint.style.display = "block";
    }
  } else {
    // On mobile, hide the interaction hint
    const interactionHint = document.querySelector(".interaction-hint");
    if (interactionHint) {
      interactionHint.style.display = "none";
    }
  }
}

// Active Navigation Enhancement
function enhanceActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav__link");

  // First, remove all active classes
  navLinks.forEach(function (link) {
    removeClass(link, "nav__link--active");
  });

  // Then, add active class only to the current page
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      (currentPage === "" && href === "index.html") ||
      (currentPage === "index.html" && href === "index.html")
    ) {
      addClass(link, "nav__link--active");
    }
  });
}

// Accessibility Enhancements
function enhanceAccessibility() {
  // Add skip link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Zum Hauptinhalt springen";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--forest-green);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1001;
    transition: top 0.3s;
  `;

  skipLink.addEventListener("focus", function () {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content ID if missing
  const main = document.querySelector("main");
  if (main && !main.id) {
    main.id = "main-content";
  }

  // Add aria-labels to navigation toggle
  const navToggle = document.querySelector(".nav__toggle");
  if (navToggle) {
    navToggle.setAttribute("aria-label", "Navigation umschalten");
    navToggle.setAttribute("aria-expanded", "false");
  }
}

// Smooth Scrolling Enhancement
function enhanceSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Responsive Behavior
function handleResize() {
  // Reset mobile menu on desktop
  if (window.innerWidth > 767) {
    const navList = document.querySelector(".nav__list");
    const navToggle = document.querySelector(".nav__toggle");

    if (navList && navToggle) {
      removeClass(navList, "active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    }
  }

  // Update aquaponics hint display
  enhanceAquaponics();
}

// Debounced resize handler to prevent excessive calls
let resizeTimeout;
function debouncedResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 250);
}

// Initialize all enhancements when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Add js-enabled class for progressive enhancement
  document.body.classList.add("js-enabled");

  enhanceMobileNavigation();
  enhanceSlideshow();
  enhanceAquaponics();
  // enhanceActiveNavigation(); // Disabled - using manual HTML active states instead
  enhanceAccessibility();
  enhanceSmoothScrolling();
});

// Handle window resize
window.addEventListener("resize", debouncedResize);

// Export for potential module use (optional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    enhanceMobileNavigation,
    enhanceSlideshow,
    enhanceAquaponics,
    enhanceActiveNavigation,
    enhanceAccessibility,
    enhanceSmoothScrolling,
  };
}

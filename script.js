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

  // Set initial hamburger icon
  navToggle.textContent = "☰";
  navToggle.setAttribute("aria-label", "Navigation öffnen");

  // Basic click handler
  navToggle.addEventListener("click", function () {
    const isActive = navList.classList.contains("active");

    if (isActive) {
      // Close menu
      navList.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-label", "Navigation öffnen");
      navToggle.textContent = "☰"; // Show hamburger lines
    } else {
      // Open menu
      navList.classList.add("active");
      document.body.classList.add("nav-open");
      navToggle.setAttribute("aria-label", "Navigation schließen");
      navToggle.textContent = "✕"; // Show X
    }
  });

  // Close navigation when clicking on a link (mobile)
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 767) {
        navList.classList.remove("active");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-label", "Navigation öffnen");
        navToggle.textContent = "☰"; // Reset to hamburger lines
      }
    });
  });

  // Close navigation when clicking outside (mobile)
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 767 &&
      navList.classList.contains("active") &&
      !navToggle.contains(e.target) &&
      !navList.contains(e.target)
    ) {
      navList.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-label", "Navigation öffnen");
      navToggle.textContent = "☰"; // Reset to hamburger lines
    }
  });

  // Handle window resize - ensure body scroll is restored
  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) {
      navList.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-label", "Navigation öffnen");
      navToggle.textContent = "☰"; // Reset to hamburger lines
    }
  });

  // Escape key to close menu
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navList.classList.contains("active")) {
      navList.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-label", "Navigation öffnen");
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

  // Prevent multiple initializations
  if (window.slideshowInitialized) {
    console.log("Slideshow already initialized, skipping...");
    return;
  }
  window.slideshowInitialized = true;

  let currentSlide = 0;
  let slideInterval = null;
  let isTransitioning = false; // Prevent rapid transitions

  function showSlide(index) {
    // Prevent multiple rapid calls
    if (isTransitioning) {
      console.log("Transition in progress, skipping...");
      return;
    }

    if (index < 0 || index >= slides.length) {
      console.log("Invalid slide index:", index);
      return;
    }

    isTransitioning = true;

    // Force remove active class from ALL indicators using querySelectorAll
    const allIndicators = document.querySelectorAll(".indicator");
    const allSlides = document.querySelectorAll(".slide");

    // Clear everything first
    allIndicators.forEach(function (indicator) {
      indicator.classList.remove("active");
    });

    allSlides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    // Set new active states
    if (allSlides[index]) {
      allSlides[index].classList.add("active");
      currentSlide = index;
    }

    if (allIndicators[index]) {
      allIndicators[index].classList.add("active");
    }

    // Allow next transition after a short delay
    setTimeout(function () {
      isTransitioning = false;
    }, 100);
  }

  function nextSlide() {
    if (isTransitioning) return;
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startAutoplay() {
    // Always stop existing interval first
    stopAutoplay();
    slideInterval = setInterval(nextSlide, 4000);
    console.log("Autoplay started");
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
      console.log("Autoplay stopped");
    }
  }

  // Initialize first slide
  showSlide(0);

  // Add click handlers to indicators - use event delegation to prevent duplicates
  const indicatorContainer = document.querySelector(".slideshow__indicators");
  if (indicatorContainer) {
    // Remove any existing listeners first
    indicatorContainer.removeEventListener("click", handleIndicatorClick);
    indicatorContainer.addEventListener("click", handleIndicatorClick);
  }

  function handleIndicatorClick(e) {
    if (!e.target.classList.contains("indicator")) return;

    e.preventDefault();
    e.stopPropagation();

    // Find the index of the clicked indicator
    const clickedIndicator = e.target;
    const allIndicators = Array.from(document.querySelectorAll(".indicator"));
    const index = allIndicators.indexOf(clickedIndicator);

    if (index !== -1 && index !== currentSlide) {
      console.log("User clicked indicator:", index);
      stopAutoplay();
      showSlide(index);
      // Restart autoplay after user interaction
      setTimeout(startAutoplay, 500);
    }
  }

  // Add click handlers to slides for recipe navigation
  slides.forEach(function (slide) {
    const recipeUrl = slide.getAttribute("data-recipe-url");
    if (recipeUrl) {
      slide.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("indicator") ||
          e.target.closest(".slideshow__indicators")
        ) {
          return;
        }
        window.location.href = recipeUrl;
      });
      slide.style.cursor = "pointer";
    }
  });

  // Start autoplay after everything is set up
  setTimeout(startAutoplay, 500);

  // Pause on hover
  const slideshow = document.querySelector(".slideshow");
  if (slideshow) {
    slideshow.addEventListener("mouseenter", stopAutoplay);
    slideshow.addEventListener("mouseleave", function () {
      setTimeout(startAutoplay, 200);
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      stopAutoplay();
      showSlide(prev);
      setTimeout(startAutoplay, 500);
    } else if (e.key === "ArrowRight") {
      stopAutoplay();
      nextSlide();
      setTimeout(startAutoplay, 500);
    }
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", function () {
    stopAutoplay();
    window.slideshowInitialized = false;
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
  // Prevent multiple initializations
  if (window.jsEnhancementsLoaded) {
    console.log("JavaScript enhancements already loaded, skipping...");
    return;
  }
  window.jsEnhancementsLoaded = true;

  console.log("Initializing JavaScript enhancements...");

  // Add js-enabled class for progressive enhancement
  document.body.classList.add("js-enabled");

  enhanceMobileNavigation();
  enhanceSlideshow();
  enhanceAquaponics();
  // enhanceActiveNavigation(); // Disabled - using manual HTML active states instead
  enhanceAccessibility();
  enhanceSmoothScrolling();

  console.log("JavaScript enhancements loaded successfully");
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

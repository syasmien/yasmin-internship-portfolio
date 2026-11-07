const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}



document.querySelectorAll("[data-slider]").forEach((slider) => {
  const slides = slider.querySelector(".slides");
  const images = slides.querySelectorAll("img");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");
  const dotsContainer = slider.querySelector(".slide-dots");

  let currentIndex = 0;

  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to image ${index + 1}`);

    dot.addEventListener("click", () => {
      showSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function showSlide(index) {
    currentIndex = (index + images.length) % images.length;

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  prev.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  next.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  showSlide(0);
});



/* ========================================
   REUSABLE POSTER SLIDER
======================================== */

function initialiseSlider(sliderSelector, slideSelector,
                          dotSelector, prevSelector,
                          nextSelector) {

  document.querySelectorAll(sliderSelector).forEach(slider => {

    const slides = slider.querySelectorAll(slideSelector);
    const dots = slider.querySelectorAll(dotSelector);
    const prev = slider.querySelector(prevSelector);
    const next = slider.querySelector(nextSelector);

    let current = 0;

    function showSlide(index) {

      current = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === current);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });

    }

    prev.addEventListener("click", () => {
      showSlide(current - 1);
    });

    next.addEventListener("click", () => {
      showSlide(current + 1);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
      });
    });

    /* Swipe support for mobile */

    let touchStartX = 0;

    slider.addEventListener("touchstart", event => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", event => {

      const touchEndX = event.changedTouches[0].screenX;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 50) {

        if (difference > 0) {
          showSlide(current + 1);
        } else {
          showSlide(current - 1);
        }

      }

    }, { passive: true });

  });

}


/* Initialise TETA slider */

initialiseSlider(
  ".teta-slider",
  ".teta-slide",
  ".teta-dot",
  ".teta-prev",
  ".teta-next"
);


/* Initialise Notebook slider */

initialiseSlider(
  ".notebook-slider",
  ".notebook-slide",
  ".notebook-dot",
  ".notebook-prev",
  ".notebook-next"
);


// Keep the footer year current without needing to update it manually.
const yearLabel = document.querySelector("[data-current-year]");
if (yearLabel) yearLabel.textContent = new Date().getFullYear();

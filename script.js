document.addEventListener("DOMContentLoaded", function () {
  // --- 1. GESTIONE TEMA DARK/LIGHT ---
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

  // --- 2. GESTIONE CAROSELLO (RECENSIONI) CON SUPPORTO TOUCH/SWIPE ---
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector(".next-btn");
    const prevBtn = carousel.querySelector(".prev-btn");
    const dotsNav = carousel.querySelector(".carousel-dots");
    let currentIndex = 0;

    // Crea i pallini indicatori
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");
    };

    const goNext = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel(currentIndex);
    };

    const goPrev = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel(currentIndex);
    };

    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (prevBtn) prevBtn.addEventListener("click", goPrev);

    dotsNav.addEventListener("click", (e) => {
      const targetDot = e.target.closest("span");
      if (!targetDot) return;
      currentIndex = dots.indexOf(targetDot);
      updateCarousel(currentIndex);
    });

    // Autoplay
    let autoPlayInterval = setInterval(goNext, 6000);

    // SUPPORTO TOUCH / SWIPE PER MOBILE
    let startX = 0;
    let isDragging = false;

    track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval); // Ferma l'autoplay mentre si tocca
      },
      { passive: true }
    );

    track.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (diffX > 50) {
        // Swipe Sinistra (Prossimo)
        goNext();
      } else if (diffX < -50) {
        // Swipe Destra (Precedente)
        goPrev();
      }

      isDragging = false;
      // Fai ripartire l'autoplay
      autoPlayInterval = setInterval(goNext, 6000);
    });
  });
});

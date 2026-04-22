document.addEventListener("DOMContentLoaded", function () {
  // Gestione Tema
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
  });

  // Funzione Carosello
  function initCarousel(id) {
    const container = document.getElementById(id);
    const track = container.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextBtn = container.querySelector(".next-btn");
    const prevBtn = container.querySelector(".prev-btn");
    const dotsNav = container.querySelector(".carousel-dots");
    let index = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dotsNav.appendChild(dot);
    });

    const update = (i) => {
      track.style.transform = `translateX(-${i * 100}%)`;
      Array.from(dotsNav.children).forEach((d, j) =>
        d.classList.toggle("active", i === j)
      );
    };

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      update(index);
    });
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      update(index);
    });
  }

  initCarousel("packages-carousel");
  initCarousel("reviews-carousel");
});

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GESTIONE TEMA (DARK/LIGHT MODE) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Controlla se c'è un tema salvato in precedenza
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- 2. GESTIONE FORM CONTATTI ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const messaggio = document.getElementById('messaggio').value.trim();

            if (nome === "" || email === "" || messaggio === "") {
                event.preventDefault();
                alert("Per favore, compila tutti i campi prima di inviare il messaggio.");
            }
        });
    }

    // --- 3. SCROLL FLUIDO ---
    const links = document.querySelectorAll('nav ul li a:not(.btn-accent)');
    for (const link of links) {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // --- 4. GESTIONE CAROSELLI MULTIPLI ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = carousel.querySelector('.next-btn');
        const prevBtn = carousel.querySelector('.prev-btn');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let currentIndex = 0;

        // Genera i pallini (dots) in base al numero di slide
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function updateCarousel(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel(currentIndex);
            });
        }

        dotsContainer.addEventListener('click', e => {
            const targetDot = e.target.closest('span');
            if (!targetDot) return;
            currentIndex = parseInt(targetDot.dataset.index);
            updateCarousel(currentIndex);
        });

        // Autoplay indipendente per ogni carosello (opzionale)
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        }, 7000); // Scorre ogni 7 secondi
    });

});
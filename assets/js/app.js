document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');

    // 1. Aterrizaje en S2 al cargar la página
    // Con el padding del 5% en el carrusel y secciones de 90vw,
    // el scroll inicial debe ser exactamente 90vw para posicionar S2 en el centro.
    const scrollAmount = window.innerWidth * 0.9; // 90vw exactos
    carousel.scrollLeft = scrollAmount;

    // 2. Controlar la opacidad (Efecto "Intuir")
    // IntersectionObserver vigila qué sección está en el centro de la pantalla
    const observerOptions = {
        root: carousel,
        threshold: 0.6 // Se activa cuando al menos el 60% de la sección es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección entra al centro, le damos opacidad 100%
                entry.target.classList.add('is-active');
            } else {
                // Si se va hacia los lados, vuelve al 50%
                entry.target.classList.remove('is-active');
            }
        });
    }, observerOptions);

    // Ponemos al observador a vigilar las tres secciones
    sections.forEach(section => observer.observe(section));
});

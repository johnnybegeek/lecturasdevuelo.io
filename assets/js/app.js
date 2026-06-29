document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');

    // 1. Aterrizaje en S2 al cargar la página
    // Como S1 ocupa 90vw, el centro de S2 está a 135vw. 
    // Restando la mitad de la pantalla (50vw), necesitamos hacer scroll de 85vw.
    const scrollAmount = window.innerWidth * 0.85;
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

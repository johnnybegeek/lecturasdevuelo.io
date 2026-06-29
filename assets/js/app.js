document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');

    // Aterrizaje en S2 al cargar la página
    // Para alinear el centro de S2 (135vw) con el centro de la pantalla (50vw),
    // el scroll inicial debe ser 85vw.
    const scrollAmount = window.innerWidth * 0.85; 
    carousel.scrollLeft = scrollAmount;

    // Controlar la opacidad (Efecto "Intuir")
    // Usamos un threshold bajo (0.1) para detectar secciones que solo muestran un 5%
    const observerOptions = {
        root: carousel,
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            } else {
                entry.target.classList.remove('is-active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');

    // 1. Aterrizaje en S2 al cargar la página usando scrollIntoView
    // Esto centra S2 de manera nativa y permite que S1 y S3 sean visibles
    if (sections.length >= 2) {
        sections[1].scrollIntoView({
            behavior: 'auto',
            inline: 'center',
            block: 'nearest'
        });
    }

    // 2. Controlar la opacidad (Efecto "Intuir")
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

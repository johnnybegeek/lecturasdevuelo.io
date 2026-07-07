/**
 * Solución para carrusel horizontal (móvil) y grid (escritorio)
 * 
 * - Móvil: Carrusel horizontal con scroll-snap y efecto "Intuir"
 * - Escritorio: Grid 3x2 con todas las tiles visibles y efectos hover
 */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');
    const s2 = document.getElementById('s2');

    // Detectar si es móvil (menos de 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // Versión móvil: Carrusel horizontal
        
        // 1. Aterrizaje nativo y limpio en S2
        requestAnimationFrame(() => {
            s2.scrollIntoView({ behavior: 'auto', inline: 'center' });
        });

        // 2. Controlar la opacidad (Efecto "Intuir")
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
    } else {
        // Versión escritorio: Grid 3x2
        // Todas las secciones son visibles, no se necesita observer
        sections.forEach(section => {
            section.classList.add('is-active');
        });
    }

    // Manejar cambio de tamaño de ventana
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth < 768;
        
        if (newIsMobile !== isMobile) {
            // Cambió el modo, recargar para aplicar los estilos correctos
            location.reload();
        }
    });
});

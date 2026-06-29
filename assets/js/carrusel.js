/**
 * Solución para carrusel horizontal usando scrollIntoView
 * Ventajas:
 * - Usa API nativa del navegador
 * - No requiere manipular scrollLeft
 * - No requiere desactivar scroll-snap-type
 * - Más robusto y compatible
 * - El navegador maneja el posicionamiento automáticamente
 */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');
    const s2 = document.getElementById('s2'); // Seleccionamos S2 directamente

    // 1. Aterrizaje nativo y limpio en S2
    // Usamos requestAnimationFrame para asegurar que el DOM está listo
    requestAnimationFrame(() => {
        s2.scrollIntoView({ behavior: 'auto', inline: 'center' });
    });

    // 2. Controlar la opacidad con IntersectionObserver
    const observerOptions = {
        root: carousel,
        threshold: 0.6
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

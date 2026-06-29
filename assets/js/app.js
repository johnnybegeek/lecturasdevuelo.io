/**
 * Solución para carrusel horizontal usando scrollIntoView
 * 
 * Ventajas de este enfoque:
 * - Usa API nativa del navegador diseñada exactamente para este propósito
 * - No requiere manipular scrollLeft ni desactivar scroll-snap-type
 * - Más robusto y compatible con el comportamiento nativo del carrusel
 * - El navegador maneja el posicionamiento automáticamente
 * - Inmune a futuros cambios de diseño (sin números mágicos)
 * - Mejor rendimiento al delegar al navegador
 */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const sections = document.querySelectorAll('.section');
    const s2 = document.getElementById('s2'); // Seleccionamos S2 directamente

    // 1. Aterrizaje nativo y limpio en S2
    // Usamos requestAnimationFrame para asegurar que el DOM está listo
    // y el navegador ha calculado las dimensiones reales
    requestAnimationFrame(() => {
        s2.scrollIntoView({ behavior: 'auto', inline: 'center' });
    });

    // 2. Controlar la opacidad (Efecto "Intuir")
    // Usamos un threshold de 0.1 para detectar secciones que muestran al menos 10%
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

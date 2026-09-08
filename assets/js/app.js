/**
 * Aplica la clase 'is-active' a todas las secciones para que sean visibles
 * El diseño responsive (grid 3x2 en móvil, grid 3x2 en escritorio) se maneja por CSS
 */

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('is-active');
    });
});

/**
 * Script para manejar el swipe horizontal entre secciones (S1, S2, S3)
 * en la versión móvil de Lecturas de Vuelo (LV1).
 */

// Esperar a que el DOM esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwipe);
} else {
    initSwipe();
}

function initSwipe() {
    const container = document.getElementById('sections-container');
    const sections = document.querySelectorAll('.section');
    
    // Posición actual (0 = S2, -1 = S1, 1 = S3)
    let currentSection = 0;
    
    // Posición inicial: S2 (centro)
    container.style.left = '0';
    
    // Actualizar la clase 'active' para la sección actual
    function updateActiveSection() {
        sections.forEach((section, index) => {
            if (index === currentSection + 1) { // +1 porque S1 es index 0, S2 es 1, S3 es 2
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    // Mover el contenedor a la sección especificada
    function moveToSection(sectionIndex) {
        // sectionIndex: -1 (S1), 0 (S2), 1 (S3)
        const newPosition = -sectionIndex * 100 + 'vw';
        container.style.left = newPosition;
        currentSection = sectionIndex;
        updateActiveSection();
    }
    
    // Inicializar la sección activa
    updateActiveSection();
    
    // Variables para el swipe
    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    
    // Manejar el inicio del toque/tarrastro
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });
    
    // Manejar el movimiento del toque
    container.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        // Calcular la distancia recorrida
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Si el movimiento es más horizontal que vertical, bloquear el scroll vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Manejar el final del toque
    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Umbral mínimo para considerar un swipe (10% del ancho de la pantalla)
        const threshold = window.innerWidth * 0.1;
        
        // Determinar la dirección del swipe
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe hacia la izquierda (mover a la sección de la derecha)
                if (currentSection < 1) { // Solo permitir si no está en S3
                    moveToSection(currentSection + 1);
                }
            } else {
                // Swipe hacia la derecha (mover a la sección de la izquierda)
                if (currentSection > -1) { // Solo permitir si no está en S1
                    moveToSection(currentSection - 1);
                }
            }
        }
        
        isSwiping = false;
    }, { passive: true });
    
    // Soporte para ratón (arrastrar con el ratón)
    container.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isSwiping = true;
        container.style.cursor = 'grabbing';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isSwiping) return;
        
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    });
    
    container.addEventListener('mouseup', (e) => {
        if (!isSwiping) return;
        
        const endX = e.clientX;
        const diffX = startX - endX;
        
        const threshold = window.innerWidth * 0.1;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                if (currentSection < 1) {
                    moveToSection(currentSection + 1);
                }
            } else {
                if (currentSection > -1) {
                    moveToSection(currentSection - 1);
                }
            }
        }
        
        isSwiping = false;
        container.style.cursor = 'default';
    });
    
    container.addEventListener('mouseleave', () => {
        isSwiping = false;
        container.style.cursor = 'default';
    });
    
    // Ajustar el contenedor al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        moveToSection(currentSection);
    });
}

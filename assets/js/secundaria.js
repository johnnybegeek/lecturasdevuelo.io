// Efecto de scroll para móvil
// Funciona tanto para scroll en window (páginas normales) como en contenedores (mirador)
document.addEventListener('DOMContentLoaded', function() {
    const mobileHeader = document.getElementById('mobileHeader');
    const floatingLogo = document.getElementById('floatingLogo');
    const scrollThreshold = 50; // píxeles de scroll antes de ocultar el header

    // Detectar si estamos en el mirador (tiene carrusel)
    const carousel = document.getElementById('miradorCarousel');
    const isMirador = carousel !== null;

    // Función para manejar el scroll
    function handleScroll() {
        let scrollPosition = 0;
        
        if (isMirador) {
            // En mirador, el scroll es dentro del carrusel
            scrollPosition = carousel.scrollTop;
        } else {
            // En otras páginas, el scroll es en la ventana
            scrollPosition = window.scrollY || window.pageYOffset;
        }

        // Mostrar u ocultar el header y el logo flotante
        if (scrollPosition > scrollThreshold) {
            if (mobileHeader) mobileHeader.classList.add('hide');
            if (floatingLogo) floatingLogo.classList.add('visible');
        } else {
            if (mobileHeader) mobileHeader.classList.remove('hide');
            if (floatingLogo) floatingLogo.classList.remove('visible');
        }
    }

    // Añadir listener según el contexto
    if (isMirador) {
        // En mirador, escuchar el scroll del carrusel
        carousel.addEventListener('scroll', handleScroll, { passive: true });
        
        // También escuchar el scroll del carrusel para el IntersectionObserver del mirador
        // (el listener de mirador.js ya lo maneja, pero nos aseguramos de que el header funcione)
    } else {
        // En otras páginas, escuchar el scroll de la ventana
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Hacer clic en el logo flotante para volver arriba
    if (floatingLogo) {
        floatingLogo.addEventListener('click', function(e) {
            e.preventDefault();
            if (isMirador) {
                // En mirador, volver al inicio del carrusel
                carousel.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // En otras páginas, volver al inicio de la ventana
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Inicializar el estado al cargar
    handleScroll();
});

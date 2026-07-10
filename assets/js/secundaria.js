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

        if (scrollPosition > scrollThreshold) {
            mobileHeader.classList.add('hide');
            floatingLogo.classList.add('visible');
        } else {
            mobileHeader.classList.remove('hide');
            floatingLogo.classList.remove('visible');
        }
    }

    // Añadir listener según el contexto
    if (isMirador) {
        carousel.addEventListener('scroll', handleScroll);
    } else {
        window.addEventListener('scroll', handleScroll);
    }

    // Hacer clic en el logo flotante para volver arriba
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

    // Inicializar el estado al cargar
    handleScroll();
});

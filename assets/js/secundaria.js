// Efecto de scroll para móvil
// Funciona tanto para scroll en window (páginas normales) como en contenedores (mirador)
document.addEventListener('DOMContentLoaded', function() {
    const mobileHeader = document.getElementById('mobileHeader');
    const floatingLogo = document.getElementById('floatingLogo');
    const scrollThreshold = 50; // píxeles de scroll antes de ocultar el header

    // Detectar si estamos en el mirador (tiene carrusel)
    const carousel = document.getElementById('miradorCarousel');
    const isMirador = carousel !== null;

    // Verificar que los elementos existen
    if (!mobileHeader) {
        console.error('secundaria.js: No se encontró mobileHeader');
    }
    if (!floatingLogo) {
        console.error('secundaria.js: No se encontró floatingLogo');
    }
    if (!mobileHeader || !floatingLogo) {
        return; // Salir si no hay elementos para manejar
    }

    // Función para manejar el scroll
    function handleScroll() {
        let scrollPosition = 0;
        
        if (isMirador && carousel) {
            // En mirador, el scroll es dentro del carrusel
            scrollPosition = carousel.scrollTop;
        } else {
            // En otras páginas, el scroll es en la ventana
            scrollPosition = window.scrollY || window.pageYOffset;
        }

        console.log('Scroll position:', scrollPosition, 'Threshold:', scrollThreshold); // Depuración

        // Mostrar u ocultar el header y el logo flotante
        if (scrollPosition > scrollThreshold) {
            mobileHeader.classList.add('hide');
            floatingLogo.classList.add('visible');
        } else {
            mobileHeader.classList.remove('hide');
            floatingLogo.classList.remove('visible');
        }
    }

    // Añadir listener según el contexto
    if (isMirador && carousel) {
        // En mirador, escuchar el scroll del carrusel
        carousel.addEventListener('scroll', handleScroll, { passive: true });
        console.log('Listener de scroll adjunto al carrusel'); // Depuración
    } else {
        // En otras páginas, escuchar el scroll de la ventana
        window.addEventListener('scroll', handleScroll, { passive: true });
        console.log('Listener de scroll adjunto al window'); // Depuración
    }

    // Llamar a handleScroll al cargar para inicializar el estado
    handleScroll();

    // Hacer clic en el logo flotante para volver arriba
    floatingLogo.addEventListener('click', function(e) {
        e.preventDefault();
        if (isMirador && carousel) {
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
        // Después de volver arriba, mostrar el header y ocultar el logo
        setTimeout(() => {
            mobileHeader.classList.remove('hide');
            floatingLogo.classList.remove('visible');
        }, 300); // Esperar a que termine el scroll
    });
});

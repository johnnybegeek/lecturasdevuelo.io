// Efecto de scroll para móvil
// Funciona tanto para scroll en window (páginas normales) como en contenedores (ventanilla)
// Usa polling para esperar a que el floatingLogo se cargue (por si está en un include)
document.addEventListener('DOMContentLoaded', function() {
    const mobileHeader = document.getElementById('mobileHeader');
    const scrollThreshold = 50; // píxeles de scroll antes de ocultar el header

    // Detectar si estamos en la ventanilla (tiene carrusel)
    const carousel = document.getElementById('ventanillaCarousel');
    const isVentanilla = carousel !== null;

    // Verificar que mobileHeader existe
    if (!mobileHeader) {
        console.error('secundaria.js: No se encontró mobileHeader');
        return;
    }

    // Función para inicializar cuando el floatingLogo esté disponible
    function initWhenReady() {
        const floatingLogo = document.getElementById('floatingLogo');

        if (!floatingLogo) {
            // El logo aún no se ha cargado (está en un include que se carga con common-components.js)
            // Intentar de nuevo en 100ms
            setTimeout(initWhenReady, 100);
            return;
        }

        // ¡Ahora sí tenemos ambos elementos!
        setupScrollListeners(mobileHeader, floatingLogo);
    }

    function setupScrollListeners(mobileHeader, floatingLogo) {
        // Función para manejar el scroll
        function handleScroll() {
            let scrollPosition = 0;
            
            if (isVentanilla && carousel) {
                // En ventanilla, el scroll es dentro del carrusel
                scrollPosition = carousel.scrollTop;
            } else {
                // En otras páginas, el scroll es en la ventana
                scrollPosition = window.scrollY || window.pageYOffset;
            }

            // Mostrar u ocultar el header y el logo flotante
            if (scrollPosition > scrollThreshold) {
                mobileHeader.classList.add('hide');
                floatingLogo.classList.add('visible');
            } else {
                mobileHeader.classList.remove('hide');
                floatingLogo.classList.remove('visible');
            }
        }

        // Añadir listener al carrusel (si existe)
        if (isVentanilla && carousel) {
            carousel.addEventListener('scroll', handleScroll, { passive: true });
        }

        // Siempre añadir listener al window (por si el scroll del carrusel no se propaga)
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Llamar a handleScroll al cargar para inicializar el estado
        handleScroll();

        // Hacer clic en el logo flotante para volver arriba
        floatingLogo.addEventListener('click', function(e) {
            e.preventDefault();
            if (isVentanilla && carousel) {
                // En ventanilla, volver al inicio del carrusel
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
            }, 300);
        });
    }

    // Empezar a comprobar si el floatingLogo existe
    initWhenReady();
});

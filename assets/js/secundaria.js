// Efecto de scroll para móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileHeader = document.getElementById('mobileHeader');
    const floatingLogo = document.getElementById('floatingLogo');
    const scrollThreshold = 50; // píxeles de scroll antes de ocultar el header

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            mobileHeader.classList.add('hide');
            floatingLogo.classList.add('visible');
        } else {
            mobileHeader.classList.remove('hide');
            floatingLogo.classList.remove('visible');
        }
    });

    // Hacer clic en el logo flotante para volver arriba
    floatingLogo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

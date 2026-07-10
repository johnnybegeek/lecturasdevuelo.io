/**
 * Lógica del visor de imágenes (Mirador)
 * - Carga imágenes de la carpeta blog/paytowin050626/
 * - Carrusel vertical con efecto "intuición" (usando scroll-snap y CSS)
 * - Modal para ver imágenes ampliadas
 * - Barra de miniaturas para escritorio
 */

// Lista de imágenes en la carpeta blog/paytowin050626/
// Las rutas son relativas a la raíz del sitio (usando ../ para subir desde /mirador/)
const images = [
    { src: '../blog/paytowin050626/blacklotus.webp', alt: 'Black Lotus' },
    { src: '../blog/paytowin050626/ghostintheshell.webp', alt: 'Ghost in the Shell' },
    { src: '../blog/paytowin050626/kickstarter.webp', alt: 'Kickstarter' },
    { src: '../blog/paytowin050626/travian.webp', alt: 'Travian' }
];

// Variables globales
let currentImageIndex = 0;
let isModalOpen = false;
let touchStartX = 0;
let touchEndX = 0;

// Elementos DOM
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('miradorCarousel');
    const thumbnailBar = document.getElementById('thumbnailBar');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    // Inicializar el carrusel
    initCarousel(carousel, thumbnailBar);

    // Inicializar el modal
    initModal(modal, modalImage, modalClose, modalPrev, modalNext);

    // Configurar IntersectionObserver para detectar la imagen central
    setupIntersectionObserver(carousel);

    // Configurar navegación por teclado
    setupKeyboardNavigation();
});

/**
 * Inicializa el carrusel con las imágenes
 */
function initCarousel(carousel, thumbnailBar) {
    images.forEach((image, index) => {
        // Crear contenedor de imagen para el carrusel
        const imageContainer = document.createElement('div');
        imageContainer.className = 'mirador-image-container';
        imageContainer.dataset.index = index;

        const img = document.createElement('img');
        img.className = 'mirador-image';
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        img.dataset.index = index;

        // Añadir evento click para abrir el modal
        img.addEventListener('click', () => openModal(index));

        imageContainer.appendChild(img);
        carousel.appendChild(imageContainer);

        // Crear miniatura para la barra lateral (escritorio)
        if (thumbnailBar) {
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item';
            thumbnailItem.dataset.index = index;

            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = image.src;
            thumbnailImg.alt = image.alt;
            thumbnailImg.loading = 'lazy';

            thumbnailItem.appendChild(thumbnailImg);
            thumbnailBar.appendChild(thumbnailItem);

            // Añadir evento click para navegar al hacer clic en la miniatura
            thumbnailItem.addEventListener('click', () => {
                currentImageIndex = index;
                scrollToImage(index);
            });
        }
    });

    // Inicialmente, la primera imagen es la activa
    updateActiveStates();
}

/**
 * Configura IntersectionObserver para detectar la imagen central
 * Usamos un threshold bajo y rootMargin para detectar cuando una imagen está cerca del centro
 */
function setupIntersectionObserver(carousel) {
    const imageContainers = document.querySelectorAll('.mirador-image-container');
    
    const observerOptions = {
        root: carousel,
        rootMargin: '-50% 0px -50% 0px', // Detecta cuando la imagen está en el centro
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.dataset.index);
                currentImageIndex = index;
                updateActiveStates();
            }
        });
    }, observerOptions);

    imageContainers.forEach(container => observer.observe(container));
}

/**
 * Actualiza los estados activos (imagen central, anterior y siguiente)
 */
function updateActiveStates() {
    const imageContainers = document.querySelectorAll('.mirador-image-container');
    
    imageContainers.forEach((container, index) => {
        container.classList.remove('prev', 'active', 'next');

        if (index === currentImageIndex) {
            container.classList.add('active');
        } else if (index === currentImageIndex - 1) {
            container.classList.add('prev');
        } else if (index === currentImageIndex + 1) {
            container.classList.add('next');
        }
    });

    // Actualizar clases activas en las miniaturas
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    thumbnailItems.forEach((item, index) => {
        if (index === currentImageIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Actualizar botones del modal si está abierto
    if (isModalOpen) {
        updateModalButtons();
    }
}

/**
 * Desplaza el carrusel a la imagen especificada
 */
function scrollToImage(index) {
    const carousel = document.getElementById('miradorCarousel');
    const imageContainers = document.querySelectorAll('.mirador-image-container');
    
    if (imageContainers[index]) {
        const container = imageContainers[index];
        const containerTop = container.offsetTop;
        const carouselHeight = carousel.offsetHeight;
        const containerHeight = container.offsetHeight;

        // Centrar la imagen en el carrusel
        const scrollPosition = containerTop - (carouselHeight / 2) + (containerHeight / 2);
        carousel.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Inicializa el modal
 */
function initModal(modal, modalImage, modalClose, modalPrev, modalNext) {
    // Cerrar modal al hacer clic en el botón de cerrar
    modalClose.addEventListener('click', () => closeModal());

    // Cerrar modal al hacer clic en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navegación en el modal
    modalPrev.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage(modalImage);
            updateModalButtons();
        }
    });

    modalNext.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateModalImage(modalImage);
            updateModalButtons();
        }
    });

    // Gestos táctiles para navegación en el modal
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(modalImage);
    }, false);
}

/**
 * Maneja el gesto de deslizamiento en el modal
 */
function handleSwipe(modalImage) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe a la izquierda: siguiente imagen
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                updateModalImage(modalImage);
                updateModalButtons();
            }
        } else {
            // Swipe a la derecha: imagen anterior
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateModalImage(modalImage);
                updateModalButtons();
            }
        }
    }
}

/**
 * Abre el modal con la imagen especificada
 */
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    updateModalImage(modalImage);
    updateModalButtons();

    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    isModalOpen = true;
}

/**
 * Cierra el modal
 */
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
    isModalOpen = false;
}

/**
 * Actualiza la imagen mostrada en el modal
 */
function updateModalImage(modalImage) {
    modalImage.src = images[currentImageIndex].src;
    modalImage.alt = images[currentImageIndex].alt;
}

/**
 * Actualiza el estado de los botones del modal
 */
function updateModalButtons() {
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    modalPrev.disabled = currentImageIndex === 0;
    modalNext.disabled = currentImageIndex === images.length - 1;
}

/**
 * Configura la navegación por teclado
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (!isModalOpen) return;

        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateModalImage(document.getElementById('modalImage'));
                    updateModalButtons();
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    updateModalImage(document.getElementById('modalImage'));
                    updateModalButtons();
                }
                break;
        }
    });
}

// Exportar funciones para testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCarousel,
        scrollToImage,
        openModal,
        closeModal
    };
}

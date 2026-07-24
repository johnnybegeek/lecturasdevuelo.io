/**
 * Lógica del visor de imágenes (Ventanilla)
 * - Carga imágenes dinámicamente de /ventanilla/ventana/images.json
 * - Carrusel vertical con efecto "intuición" (usando scroll-snap y CSS puro)
 * - Modal para ver imágenes ampliadas
 * - Barra de miniaturas para escritorio y móvil
 * NOTA: El comportamiento del header y logo flotante se maneja en secundaria.js
 */

// Variables globales
let images = [];
let currentImageIndex = 0;
let isModalOpen = false;
let touchStartX = 0;
let touchEndX = 0;

// Elementos DOM
document.addEventListener('DOMContentLoaded', async () => {
    const carousel = document.getElementById('ventanillaCarousel');
    const thumbnailBar = document.getElementById('thumbnailBar');
    const mobileThumbnailBar = document.getElementById('mobileThumbnailBar');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    // Cargar imágenes dinámicamente desde el JSON
    try {
        const response = await fetch('/ventanilla/ventana/images.json');
        if (response.ok) {
            images = await response.json();
        } else {
            console.error('No se pudo cargar images.json, usando imágenes por defecto');
            // Fallback: usar imágenes hardcodeadas si el JSON no existe
            images = [
                { src: '/ventanilla/ventana/Undercover.avif', alt: 'Undercover', name: 'Undercover' },
                { src: '/ventanilla/ventana/Fuji en el mar.avif', alt: 'Fuji en el mar', name: 'Fuji en el mar' },
                { src: '/ventanilla/ventana/Hola.avif', alt: 'Hola', name: 'Hola' },
                { src: '/ventanilla/ventana/Island.avif', alt: 'Island', name: 'Island' },
                { src: '/ventanilla/ventana/Relevo.avif', alt: 'Relevo', name: 'Relevo' },
                { src: '/ventanilla/ventana/Camino erroneo.avif', alt: 'Camino erróneo', name: 'Camino erróneo' }
            ];
        }
    } catch (error) {
        console.error('Error al cargar images.json:', error);
        // Fallback: usar imágenes hardcodeadas
        images = [
            { src: '/ventanilla/ventana/Undercover.avif', alt: 'Undercover', name: 'Undercover' },
            { src: '/ventanilla/ventana/Fuji en el mar.avif', alt: 'Fuji en el mar', name: 'Fuji en el mar' },
            { src: '/ventanilla/ventana/Hola.avif', alt: 'Hola', name: 'Hola' },
            { src: '/ventanilla/ventana/Island.avif', alt: 'Island', name: 'Island' },
            { src: '/ventanilla/ventana/Relevo.avif', alt: 'Relevo', name: 'Relevo' },
            { src: '/ventanilla/ventana/Camino erroneo.avif', alt: 'Camino erróneo', name: 'Camino erróneo' }
        ];
    }

    // Inicializar el carrusel
    initCarousel(carousel, thumbnailBar, mobileThumbnailBar);

    // Inicializar el modal
    initModal(modal, modalImage, modalClose, modalPrev, modalNext);

    // Configurar IntersectionObserver para detectar la imagen central
    // Usamos un threshold bajo para detectar cuando una imagen está cerca del centro
    setupIntersectionObserver(carousel);

    // Configurar navegación por teclado
    setupKeyboardNavigation();
});

/**
 * Inicializa el carrusel con las imágenes
 */
function initCarousel(carousel, thumbnailBar, mobileThumbnailBar) {
    images.forEach((image, index) => {
        // Crear contenedor de imagen para el carrusel
        const imageContainer = document.createElement('div');
        imageContainer.className = 'ventanilla-image-container';
        imageContainer.dataset.index = index;

        const img = document.createElement('img');
        img.className = 'ventanilla-image';
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        img.dataset.index = index;

        // Añadir evento click para abrir el modal
        img.addEventListener('click', () => openModal(index));

        imageContainer.appendChild(img);

        // Añadir el nombre de la imagen como pie de foto
        if (image.name) {
            const caption = document.createElement('div');
            caption.className = 'image-caption';
            caption.textContent = image.name;
            imageContainer.appendChild(caption);
        }

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
            thumbnailItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentImageIndex = index;
                scrollToImage(index);
            });
        }

        // Crear miniatura para la barra inferior (móvil)
        if (mobileThumbnailBar) {
            const mobileThumbnailItem = document.createElement('div');
            mobileThumbnailItem.className = 'thumbnail-item';
            mobileThumbnailItem.dataset.index = index;

            const mobileThumbnailImg = document.createElement('img');
            mobileThumbnailImg.src = image.src;
            mobileThumbnailImg.alt = image.alt;
            mobileThumbnailImg.loading = 'lazy';

            mobileThumbnailItem.appendChild(mobileThumbnailImg);
            mobileThumbnailBar.appendChild(mobileThumbnailItem);

            // Añadir evento click para navegar al hacer clic en la miniatura
            mobileThumbnailItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
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
 * Usamos un rootMargin que cubra el área central del carrusel
 */
function setupIntersectionObserver(carousel) {
    const imageContainers = document.querySelectorAll('.ventanilla-image-container');
    
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
 * Actualiza los estados activos (imagen central y miniaturas)
 */
function updateActiveStates() {
    const imageContainers = document.querySelectorAll('.ventanilla-image-container');
    
    // Remover todas las clases activas
    imageContainers.forEach(container => {
        container.classList.remove('active');
    });

    // Marcar la imagen central como activa
    if (imageContainers[currentImageIndex]) {
        imageContainers[currentImageIndex].classList.add('active');
    }

    // Actualizar clases activas en las miniaturas (escritorio y móvil)
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
    const carousel = document.getElementById('ventanillaCarousel');
    const imageContainers = document.querySelectorAll('.ventanilla-image-container');
    
    if (imageContainers[index]) {
        const container = imageContainers[index];
        
        // Usar scrollIntoView con comportamiento smooth y alineación al centro
        container.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        });
        
        // También actualizar el índice actual
        currentImageIndex = index;
        updateActiveStates();
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

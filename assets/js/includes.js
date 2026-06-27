// Función para cargar includes dinámicamente
function loadIncludes() {
    const includeElements = document.querySelectorAll('[data-include]');
    includeElements.forEach(async (element) => {
        const filePath = element.getAttribute('data-include');
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
                // Re-asignar event listeners después de cargar el HTML
                initNavListeners();
            } else {
                console.error(`Error al cargar ${filePath}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error al cargar ${filePath}:`, error);
        }
    });
}

// Inicializar listeners de navegación (para el menú y el tema)
function initNavListeners() {
    // Menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const menu = document.getElementById('main-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
        });
    }

    // Botón de tema día noche
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);
            document.body.classList.toggle('dark-mode');
            this.querySelector('span').textContent = !isPressed ? '\u2600\ufe0f' : '\ud83c\udf19';
        });
    }

    // Menú footer (si existe)
    const footerToggle = document.querySelector('.footer-menu-toggle');
    if (footerToggle) {
        footerToggle.addEventListener('click', function() {
            document.querySelector('.menu-footer ul').classList.toggle('active');
        });
    }
}

// Inicializar listeners directamente en páginas que no usan includes
function initDirectNavListeners() {
    // Menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        // Asegurar que el botón tiene los atributos ARIA
        if (!menuToggle.hasAttribute('aria-expanded')) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        if (!menuToggle.hasAttribute('aria-controls')) {
            menuToggle.setAttribute('aria-controls', 'main-menu');
        }
        
        menuToggle.addEventListener('click', function() {
            const menu = document.getElementById('main-menu');
            if (menu) {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                menu.classList.toggle('active');
            }
        });
    }

    // Botón de tema día noche
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Asegurar que el span tiene aria-hidden
        const themeSpan = themeToggle.querySelector('span');
        if (themeSpan && !themeSpan.hasAttribute('aria-hidden')) {
            themeSpan.setAttribute('aria-hidden', 'true');
        }
        
        themeToggle.addEventListener('click', function() {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);
            document.body.classList.toggle('dark-mode');
            if (this.querySelector('span')) {
                this.querySelector('span').textContent = !isPressed ? '\u2600\ufe0f' : '\ud83c\udf19';
            }
        });
    }

    // Menú footer (si existe)
    const footerToggle = document.querySelector('.footer-menu-toggle');
    if (footerToggle) {
        footerToggle.addEventListener('click', function() {
            document.querySelector('.menu-footer ul').classList.toggle('active');
        });
    }
}

// Cargar includes al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadIncludes();
    // También inicializar listeners directamente por si la página no usa includes
    initDirectNavListeners();
});

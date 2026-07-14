/**
 * common-components.js
 * Carga componentes HTML comunes desde /includes/ y los inserta en el DOM.
 * Mantiene contenido de respaldo estático para accesibilidad.
 */

(function() {
    'use strict';

    /**
     * Carga un componente desde un archivo HTML y lo inserta en un contenedor.
     * Si falla, el contenido de respaldo estático ya presente en el DOM permanece.
     * @param {string} containerId - ID del elemento contenedor
     * @param {string} componentPath - Ruta al archivo HTML del componente
     */
    async function loadComponent(containerId, componentPath) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Contenedor ${containerId} no encontrado`);
            return;
        }

        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const html = await response.text();
            container.innerHTML = html;
        } catch (error) {
            // El contenido de respaldo estático ya está presente en el HTML
            console.warn(`No se pudo cargar ${componentPath} en ${containerId}: ${error.message}`);
        }
    }

    /**
     * Actualiza el título del header móvil según la página actual
     */
    function updateHeaderTitle() {
        const titleElement = document.getElementById('headerTitle');
        if (!titleElement) return;

        // Extraer título de la página desde <title> o meta
        const pageTitle = document.title
            .replace(' - Lecturas de Vuelo', '')
            .replace('Lecturas de Vuelo - ', '');
        
        if (pageTitle && pageTitle !== 'Página Secundaria') {
            titleElement.textContent = pageTitle;
        }
    }

    /**
     * Obtiene la ruta base para cargar includes
     * Usa ruta absoluta desde la raíz del sitio
     */
    function getBasePath() {
        return '/';
    }

    /**
     * Inicializa la carga de componentes comunes
     */
    function initCommonComponents() {
        const basePath = getBasePath();
        
        // Cargar componentes con contenido de respaldo estático
        loadComponent('mobileHeaderContainer', basePath + 'includes/mobile-header.html');
        loadComponent('sidebarContainer', basePath + 'includes/desktop-sidebar.html');
        loadComponent('floatingLogoContainer', basePath + 'includes/floating-logo.html');

        // Actualizar título del header móvil según la página
        updateHeaderTitle();
    }

    // Cargar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCommonComponents);
    } else {
        initCommonComponents();
    }
})();

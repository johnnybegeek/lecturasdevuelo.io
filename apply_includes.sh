#!/bin/bash

# Script para aplicar includes a todas las páginas HTML del sitio
# Uso: ./apply_includes.sh

# Ruta base del proyecto
BASE_DIR="/workspace/johnnybegeek__lecturasdevuelo.io"
INCLUDES_DIR="$BASE_DIR/includes"

# Función para aplicar includes a un archivo HTML
apply_includes_to_file() {
    local file="$1"
    local relative_includes=""
    
    # Determinar la ruta relativa a includes/ según la ubicación del archivo
    if [[ "$file" == *"paginas/"* ]] || [[ "$file" == *"blog/"* ]] || [[ "$file" == *"roguelike/"* ]] || [[ "$file" == *"hub/"* ]]; then
        relative_includes="../includes"
    else
        relative_includes="includes"
    fi
    
    echo "Procesando: $file (relative_includes=$relative_includes)"
    
    # Crear un archivo temporal
    local temp_file="$file.tmp"
    
    # Copiar el contenido original al archivo temporal
    cp "$file" "$temp_file"
    
    # Reemplazar el bloque de header (logo + eslogan) por el include
    # Patrones a buscar:
    # 1. Bloque de logo-header + eslogan
    # 2. Bloque de navegación principal (header-fijo + menu-principal)
    # 3. Bloque de footer
    
    # Usar awk para procesar el archivo
    awk -v rel_includes="$relative_includes" '
    BEGIN { in_header = 0; in_nav = 0; in_footer = 0; }
    
    # Detectar inicio de header (logo + eslogan)
    /<!-- Cabecera con logotipo y título -->/ { in_header = 1; print; next; }
    /<div class="logo-header">/ { in_header = 1; }
    
    # Si estamos en el bloque de header, omitir hasta el final del bloque
    in_header {
        if (/<\/p>.*Eslogan del sitio/ || /<\/div>.*Logotipo del sitio/ || /<\/div>.*logo-header/) {
            in_header = 0;
            print "        <div data-include=\"" rel_includes "/header.html\"></div>";
            next;
        }
        next;
    }
    
    # Detectar inicio de navegación principal
    /<!-- Barra de navegación superior fija -->/ { in_nav = 1; print; next; }
    /<header class="header-fijo">/ { in_nav = 1; }
    
    # Si estamos en el bloque de nav, omitir hasta el final
    in_nav {
        if (/<\/nav>/ || /<\/header>/ || /<\/ul>.*menú principal/) {
            in_nav = 0;
            print "        <div data-include=\"" rel_includes "/nav.html\"></div>";
            next;
        }
        next;
    }
    
    # Detectar inicio de footer
    /<!-- Barra de navegación inferior fija -->/ { in_footer = 1; print; next; }
    /<footer class="footer-fijo">/ { in_footer = 1; }
    
    # Si estamos en el bloque de footer, omitir hasta el final
    in_footer {
        if (/<\/footer>/ || /<\/nav>.*footer/) {
            in_footer = 0;
            print "    <div data-include=\"" rel_includes "/footer.html\"></div>";
            next;
        }
        next;
    }
    
    # Imprimir todas las líneas que no son parte de los bloques
    { print; }
    ' "$temp_file" > "$file"
    
    # Añadir el script de loadIncludes si no existe
    if ! grep -q "loadIncludes" "$file"; then
        # Insertar el script antes de </body>
        sed -i '/<\/body>/i\
    <!-- Scripts para cargar includes -->\
    <script>\
        // Función para cargar includes\
        function loadIncludes() {\
            const includeElements = document.querySelectorAll("[data-include]");\
            includeElements.forEach(async (element) => {\
                const filePath = element.getAttribute("data-include");\
                try {\
                    const response = await fetch(filePath);\
                    if (response.ok) {\
                        const html = await response.text();\
                        element.innerHTML = html;\
                        initNavListeners();\
                    } else {\
                        console.error(`Error al cargar ${filePath}: ${response.statusText}`);\
                    }\
                } catch (error) {\
                    console.error(`Error al cargar ${filePath}:`, error);\
                }\
            });\
        }\
\
        // Inicializar listeners de navegación\
        function initNavListeners() {\
            const menuToggle = document.querySelector(".menu-toggle");\
            if (menuToggle) {\
                menuToggle.addEventListener("click", function() {\
                    const menu = document.getElementById("main-menu");\
                    const isExpanded = this.getAttribute("aria-expanded") === "true";\
                    this.setAttribute("aria-expanded", !isExpanded);\
                    menu.classList.toggle("active");\
                });\
            }\
\
            const themeToggle = document.getElementById("theme-toggle");\
            if (themeToggle) {\
                themeToggle.addEventListener("click", function() {\
                    const isPressed = this.getAttribute("aria-pressed") === "true";\
                    this.setAttribute("aria-pressed", !isPressed);\
                    document.body.classList.toggle("dark-mode");\
                    this.querySelector("span").textContent = !isPressed ? "☀️" : "🌙";\
                });\
            }\
\
            const footerToggle = document.querySelector(".footer-menu-toggle");\
            if (footerToggle) {\
                footerToggle.addEventListener("click", function() {\
                    document.querySelector(".menu-footer ul").classList.toggle("active");\
                });\
            }\
        }\
\
        // Cargar includes al iniciar la página\
        document.addEventListener("DOMContentLoaded", () => {\
            loadIncludes();\
        });\
    </script>' "$file"
    fi
    
    # Limpiar el archivo temporal
    rm "$temp_file"
}

# Procesar todas las páginas HTML (excluyendo includes/)
find "$BASE_DIR" -type f -name "*.html" ! -path "$INCLUDES_DIR/*" | while read -r file; do
    apply_includes_to_file "$file"
done

echo "Proceso completado. Todos los includes han sido aplicados."

#!/bin/bash

# Script para crear nuevas páginas basadas en la plantilla secundaria.html
# Uso: ./crear_pagina.sh nombre_de_la_pagina "Título de la página"

if [ $# -lt 2 ]; then
    echo "Uso: $0 nombre_de_la_pagina \"Título de la página\""
    exit 1
fi

NOMBRE_PAGINA="$1.html"
TITULO="$2"

# Verificar que secundaria.html existe
if [ ! -f "secundaria.html" ]; then
    echo "Error: No se encontró el archivo secundaria.html"
    exit 1
fi

# Crear la nueva página a partir de secundaria.html
sed "s/Página Secundaria/$TITULO/g" secundaria.html | \
sed "s/pagina secundaria de Lecturas de Vuelo/$TITULO - Lecturas de Vuelo/g" | \
sed "s/secondary.css/secundaria.css/g" > "$NOMBRE_PAGINA"

echo "Página creada: $NOMBRE_PAGINA con título: $TITULO"
echo "Ahora edita el contenido entre las etiquetas <div class=\"content-wrapper\"> y </div>"

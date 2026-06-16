# Documentación de `index.html` - Lecturas de Vuelo

Este documento describe la estructura, funcionalidad y propósito de cada elemento en el archivo [`index.html`](index.html), que sirve como página principal del sitio **Lecturas de Vuelo**. El objetivo es proporcionar una referencia clara para auditar el código, entender su comportamiento y facilitar futuras modificaciones.

---

## 📜 Estructura General

El archivo `index.html` sigue la estructura estándar de un documento HTML5, dividido en dos secciones principales:
1. **`<head>`**: Metadatos y recursos externos.
2. **`<body>`**: Contenido visible y lógica de interacción.

---

## 🧠 `<head>` - Metadatos y Recursos

### 1. Declaración del Documento
```html
<!DOCTYPE html>
```
- **Propósito**: Define el tipo de documento como HTML5.
- **Impacto**: Garantiza que el navegador interprete el código según el estándar HTML5.

---

### 2. Elemento `<html>`
```html
<html lang="es">
```
- **Propósito**: Raíz del documento HTML.
- **Atributo `lang="es"`**: Especifica que el contenido está en español, mejorando la accesibilidad y el SEO.

---

### 3. Metadatos Básicos

#### Título de la Página
```html
<title>Lecturas de Vuelo</title>
```
- **Propósito**: Define el título que aparece en la pestaña del navegador y en los resultados de búsqueda.
- **Relación**: Coincide con el nombre del sitio y el logotipo.

#### Codificación de Caracteres
```html
<meta charset="utf-8">
```
- **Propósito**: Establece la codificación UTF-8 para soportar caracteres especiales (ej: ñ, á, é, emojis).
- **Impacto**: Evita problemas de visualización de texto en diferentes idiomas.

#### Viewport para Dispositivos Móviles
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Propósito**: Configura la vista para que el sitio se adapte a pantallas de móviles y tablets.
- **Detalles**:
  - `width=device-width`: El ancho de la página se ajusta al ancho del dispositivo.
  - `initial-scale=1.0`: Zoom inicial al 100%.

---

### 4. Recursos Externos

#### Hoja de Estilos CSS
```html
<link rel="stylesheet" href="css/estilo.css">
```
- **Propósito**: Enlaza el archivo [`css/estilo.css`](css/estilo.css), que contiene los estilos globales del sitio (colores, fuentes, diseño responsivo, etc.).
- **Dependencia**: El diseño visual del sitio depende completamente de este archivo.

#### Script de Constantes de Texto
```html
<script src="js/constantes.js"></script>
```
- **Propósito**: Carga el archivo [`js/constantes.js`](js/constantes.js), que define los textos estáticos de las secciones principales.
- **Funcionalidad**:
  - Contiene el objeto `TEXT_CONSTANTS` con descripciones para cada sección (Departures, Arrivals, NavData, Hub, Who).
  - Incluye la función `applyTextConstants()`, que reemplaza el contenido de elementos con el atributo `data-text-key` por los textos definidos en `TEXT_CONSTANTS`.
  - Se ejecuta al cargar la página (`DOMContentLoaded`).
- **Relación con `index.html`**: Los elementos `<p data-text-key="...">` en el `<body>` son rellenados dinámicamente por este script.

---

## 🖼️ `<body>` - Contenido y Funcionalidad

### 1. Cabecera del Sitio (`logo-header`)
```html
<div class="logo-header">
    <a href="/index.html"><img src="../paginas/imagenes/logoblog.avif" alt="Logotipo de Lecturas de Vuelo" class="logo-img"></a>
    <h1>Lecturas de Vuelo</h1>
</div>
<p>Artículos a baja altitud</p>
```
- **Propósito**: Área superior que contiene el logotipo y el título del sitio.
- **Elementos**:
  - **Logotipo**:
    - `<img src="../paginas/imagenes/logoblog.avif">`: Imagen del logotipo (formato AVIF).
    - **Nota**: La ruta `../paginas/imagenes/` sugiere que el logotipo está almacenado en una carpeta de imágenes dentro de `paginas`.
    - **Atributo `alt`**: Texto alternativo para accesibilidad y SEO.
    - **Clase `logo-img`**: Estilos definidos en `estilo.css`.
    - **Enlace**: El logotipo es un enlace a `/index.html` (página principal).
  - **Título**: `<h1>Lecturas de Vuelo</h1>`: Título principal del sitio.
  - **Eslogan**: `<p>Artículos a baja altitud</p>`: Descripción breve del sitio.

---

### 2. Barra de Navegación (`header-fijo`)
```html
<header class="header-fijo">
    <nav class="menu-principal">
        <ul>
            <li><a href="/paginas/departures.html">Departures</a></li>
            <li><a href="/paginas/arrivals.html">Arrivals</a></li>
            <li><a href="/paginas/navdata.html">NavData</a></li>
            <li><a href="/paginas/hub.html">Hub</a></li>
            <li><a href="/paginas/who.html">Who</a></li>
        </ul>
        <button id="theme-toggle" aria-label="Alternar entre modo día y noche" aria-pressed="false"><span aria-hidden="true">🌙</span></button>
        <button class="menu-toggle" aria-label="Abrir menú">☰</button>
    </nav>
</header>
```
- **Propósito**: Barra de navegación superior fija que permite acceder a las diferentes secciones del sitio.
- **Clases**:
  - `header-fijo`: Estilos para que la barra permanezca fija en la parte superior al hacer scroll.
  - `menu-principal`: Contenedor del menú de navegación.
- **Elementos**:
  - **Lista de enlaces (`<ul>`)**:
    - Contiene 5 enlaces a las páginas principales:
      1. **Departures**: [`/paginas/departures.html`](paginas/departures.html) (Blog y enlaces a juegos).
      2. **Arrivals**: [`/paginas/arrivals.html`](paginas/arrivals.html) (Asuntos completados o archivados).
      3. **NavData**: [`/paginas/navdata.html`](paginas/navdata.html) (Recursos útiles).
      4. **Hub**: [`/paginas/hub.html`](paginas/hub.html) (Áreas temáticas).
      5. **Who**: [`/paginas/who.html`](paginas/who.html) (Proyectos en marcha).
    - **Nota**: En móviles, esta lista está oculta por defecto (se muestra al hacer clic en el botón de menú hamburguesa).
  - **Botón de tema (`#theme-toggle`)**:
    - **Funcionalidad**: Alterna entre modo claro y oscuro.
    - **Atributos de accesibilidad**:
      - `aria-label`: Describe la acción del botón.
      - `aria-pressed`: Indica el estado actual (falso por defecto).
    - **Contenido**: Emoji de luna (🌙) o sol (☀️) según el tema activo.
  - **Botón de menú hamburguesa (`.menu-toggle`)**:
    - **Funcionalidad**: Muestra/oculta el menú de enlaces en dispositivos móviles.
    - **Atributo `aria-label`**: "Abrir menú" para accesibilidad.
    - **Contenido**: Símbolo de menú hamburguesa (☰).

---

### 3. Contenido Principal (`<main>`)
```html
<main>
    <h2><a href="/paginas/departures.html">Departures</a></h2>
    <p data-text-key="departures"></p>

    <h2><a href="/paginas/arrivals.html">Arrivals</a></h2>
    <p data-text-key="arrivals"></p>

    <h2><a href="/paginas/navdata.html">NavData</a></h2>
    <p data-text-key="navdata"></p>

    <h2><a href="/paginas/hub.html">Hub</a></h2>
    <p data-text-key="hub"></p>

    <h2><a href="/paginas/who.html">Who</a></h2>
    <p data-text-key="who"></p>

    <br>
</main>
```
- **Propósito**: Contenido principal de la página, que presenta las 5 secciones del sitio con una breve descripción.
- **Estructura**:
  - Cada sección sigue el mismo patrón:
    1. **Título (`<h2>`)**: Enlace a la página correspondiente.
    2. **Descripción (`<p>`)**: Texto dinámico cargado desde `js/constantes.js` mediante el atributo `data-text-key`.
- **Secciones**:
  | Sección      | Enlace                          | Clave de Texto | Descripción (desde `constantes.js`)                          |
  |--------------|---------------------------------|----------------|-------------------------------------------------------------|
  | Departures   | `/paginas/departures.html`      | `departures`   | "Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha." |
  | Arrivals     | `/paginas/arrivals.html`        | `arrivals`     | "Asuntos completados o archivados, por si buscas inspiración."         |
  | NavData      | `/paginas/navdata.html`         | `navdata`      | "Recursos online que me resultan útiles y que quizás también pueden servirte." |
  | Hub          | `/paginas/hub.html`             | `hub`          | "Áreas temáticas que más me interesan."                     |
  | Who          | `/paginas/who.html`         | `who`          | "Quién está detrás de todo esto."                           |
- **`<br>`**: Salto de línea para espacio adicional al final.

---

### 4. Scripts de Funcionalidad

#### Menú Hamburguesa
```javascript
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav.menu-principal ul').classList.toggle('active');
});
```
- **Propósito**: Controla la visibilidad del menú de navegación en dispositivos móviles.
- **Funcionamiento**:
  - Al hacer clic en el botón `.menu-toggle`, se alterna la clase `active` en la lista `<ul>` del menú.
  - La clase `active` (definida en `estilo.css`) muestra el menú oculto en móviles.
- **Dependencia**: Requiere que `estilo.css` defina el comportamiento de la clase `active` (ej: `display: block`).

#### Botón de Tema (Día/Noche)
```javascript
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        this.querySelector('span').textContent = isDark ? '☀️' : '🌙';
        this.setAttribute('aria-pressed', isDark);
    });
}
```
- **Propósito**: Alterna entre el modo claro y oscuro del sitio.
- **Funcionamiento**:
  1. **Toggle de clase**: Añade/elimina la clase `dark-mode` en el `<body>`.
  2. **Actualización del emoji**:
     - Si el modo oscuro está activo (`dark-mode` presente), muestra ☀️ (sol).
     - Si no, muestra 🌙 (luna).
  3. **Accesibilidad**: Actualiza el atributo `aria-pressed` para reflejar el estado del botón.
- **Dependencia**: Requiere que `estilo.css` defina los estilos para la clase `dark-mode` (ej: colores oscuros para fondo y texto).

---

## 🔗 Relación con Otros Archivos

| Archivo               | Relación con `index.html`                                                                 | Propósito                                                                 |
|-----------------------|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [`css/estilo.css`](css/estilo.css) | Enlazado en `<head>`.                                                                   | Define el diseño visual (colores, fuentes, layout, responsividad).     |
| [`js/constantes.js`](js/constantes.js) | Cargado en `<head>`.                                                                     | Proporciona textos dinámicos para las secciones principales.           |
| [`paginas/departures.html`](paginas/departures.html) | Enlace en el menú y en el contenido principal.                                          | Página de blog y enlaces a juegos.                                       |
| [`paginas/arrivals.html`](paginas/arrivals.html) | Enlace en el menú y en el contenido principal.                                          | Página de asuntos completados o archivados.                             |
| [`paginas/navdata.html`](paginas/navdata.html) | Enlace en el menú y en el contenido principal.                                          | Página de recursos útiles.                                               |
| [`paginas/hub.html`](paginas/hub.html) | Enlace en el menú y en el contenido principal.                                          | Página de áreas temáticas.                                               |
| [`paginas/who.html`](paginas/who.html) | Enlace en el menú (como "Who") y en el contenido principal.                             | Página de proyectos en marcha.                                           |
| `../paginas/imagenes/logoblog.avif` | Ruta del logotipo en el `<header>`.                                                      | Imagen del logotipo del sitio.                                           |

---

## 🎯 Funcionalidades Clave

1. **Diseño Responsivo**:
   - El sitio se adapta a móviles gracias a:
     - La meta etiqueta `viewport`.
     - El menú hamburguesa (oculto en móviles por defecto).
     - Estilos en `estilo.css` (ej: media queries).

2. **Tema Oscuro/Claro**:
   - Controlado por el botón `#theme-toggle`.
   - Persistencia: **No implementada** (el tema se reinicia al recargar la página).

3. **Textos Dinámicos**:
   - Los textos de las secciones se cargan desde `js/constantes.js` usando el atributo `data-text-key`.
   - Centraliza la gestión de textos para facilitar traducciones o actualizaciones.

4. **Accesibilidad**:
   - Uso de atributos `aria-label` y `aria-pressed` en botones.
   - Texto alternativo (`alt`) en imágenes.
   - Estructura semántica (`<header>`, `<nav>`, `<main>`).

---

## 📌 Puntos de Mejora Potenciales

1. **Persistencia del Tema**:
   - Actualmente, el tema oscuro/claro no persiste al recargar la página. Se podría implementar usando `localStorage`.

2. **Ruta del Logotipo**:
   - La ruta `../paginas/imagenes/logoblog.avif` parece incorrecta (debería ser `paginas/imagenes/logoblog.avif` o `imagenes/logoblog.avif`).

3. **Enlace "Who"**:
   - El enlace apunta a `who.html` en lugar de `who.html`. Podría ser un error de nombrado.

4. **SEO**:
   - Falta meta descripción (`<meta name="description">`) para mejorar el posicionamiento en buscadores.

5. **Rendimiento**:
   - El script `constantes.js` podría cargarse de forma asíncrona (`async` o `defer`) para no bloquear la renderización.

---

## 📂 Estructura de Archivos Relacionados

```
lecturasdevuelo.io/
├── index.html          # Página principal (este archivo)
├── index.md            # Este documento
├── css/
│   └── estilo.css      # Estilos globales
├── js/
│   └── constantes.js   # Textos dinámicos
├── paginas/
│   ├── departures.html # Página de Departures
│   ├── arrivals.html   # Página de Arrivals
│   ├── navdata.html    # Página de NavData
│   ├── hub.html        # Página de Hub
│   └── who.html    # Página de Who (proyectos)
└── paginas/imagenes/
    └── logoblog.avif   # Logotipo del sitio
```

---

## 🔍 Resumen de Elementos por Tipo

| **Tipo**          | **Cantidad** | **Ejemplos**                                                                 |
|-------------------|--------------|-----------------------------------------------------------------------------|
| Metadatos         | 3            | `charset`, `viewport`, `title`                                              |
| Recursos externos  | 2            | `estilo.css`, `constantes.js`                                              |
| Secciones         | 5            | Departures, Arrivals, NavData, Hub, Who                                    |
| Botones           | 2            | `#theme-toggle`, `.menu-toggle`                                            |
| Event Listeners   | 2            | Menú hamburguesa, botón de tema                                            |
| Textos dinámicos  | 5            | Elementos con `data-text-key`                                              |

---

## 📝 Historial de Cambios (Referencia)

Este documento se crea como parte de la recopilación y auditoría del código existente en el proyecto **Lecturas de Vuelo**. Su objetivo es servir como referencia para:
- Entender la estructura actual del sitio.
- Facilitar la modificación o extensión de funcionalidades.
- Documentar decisiones de diseño y arquitectura.

---

*Última actualización: [Fecha de creación de este documento]*.

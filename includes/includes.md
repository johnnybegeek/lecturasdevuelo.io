# Documentación de `includes/` - Lecturas de Vuelo

Este documento describe el **propósito y funcionalidad** de cada archivo dentro del directorio [`includes/`](.) del sitio **Lecturas de Vuelo**. Este directorio contiene **fragmentos de código HTML reutilizables** que se incluyen en otras páginas del sitio para mantener una estructura consistente y facilitar el mantenimiento.

---

## 📜 **Estructura General del Directorio `includes/`**

El directorio `includes/` alberga **componentes HTML modulares** que pueden ser insertados en otras páginas mediante herramientas como `apply_includes.sh` (script presente en la raíz del proyecto). Estos fragmentos permiten:
- **Reutilización de código**: Evitar duplicación de elementos comunes (ej: cabecera, navegación, pie de página).
- **Mantenimiento centralizado**: Modificar un componente en un solo lugar y que los cambios se reflejen en todas las páginas que lo incluyen.
- **Consistencia visual**: Garantizar que elementos como el menú o el pie de página tengan el mismo diseño en todo el sitio.

---

## 📑 **Listado de Archivos y su Propósito**

### 1. **[`header.html`](header.html)**
- **Propósito**: Define la **cabecera del sitio**, que incluye el logotipo, el título y el eslogan.
- **Contenido**:
  - **Logotipo**:
    - Imagen del logotipo (`/paginas/imagenes/logoblog.avif`).
    - Enlace a `/index.html` (página principal).
    - Atributos de accesibilidad:
      - `aria-label`: "Lecturas de Vuelo - Volver a la página de inicio".
    - Atributos de optimización:
      - `width="100"` y `height="100"`: Dimensiones explícitas para evitar cambios de layout.
      - `loading="lazy"`: Carga diferida de la imagen.
      - `decoding="async"`: Decodificación asíncrona de la imagen.
  - **Título del sitio**:
    - `<h1 id="site-title">Lecturas de Vuelo</h1>`.
  - **Eslogan**:
    - `<p class="site-tagline" aria-labelledby="site-title">Artículos a baja altitud</p>`.
- **Relación con otras páginas**:
  - Este fragmento se incluye en todas las páginas del sitio para mantener una cabecera consistente.
- **Estilos**:
  - Las clases `logo-header`, `logo-img` y `site-tagline` están definidas en [`../css/estilo.css`](../css/estilo.css).

---

### 2. **[`nav.html`](nav.html)**
- **Propósito**: Define la **barra de navegación principal** del sitio, que incluye el menú de enlaces y los botones de control (tema y menú hamburguesa).
- **Contenido**:
  - **Estructura**:
    - `<nav class="menu-principal header-fijo" aria-label="Menú principal del sitio">`.
  - **Botones interactivos**:
    - **Botón de menú hamburguesa (`.menu-toggle`)**:
      - Atributos de accesibilidad:
        - `aria-label`: "Abrir menú principal".
        - `aria-expanded="false"`: Indica que el menú está cerrado por defecto.
        - `aria-controls="main-menu"`: Relaciona el botón con el menú que controla.
      - Contenido: Símbolo ☰ (menú hamburguesa).
    - **Botón de tema (`#theme-toggle`)**:
      - Atributos de accesibilidad:
        - `aria-label`: "Alternar entre modo día y noche".
        - `aria-pressed="false"`: Indica que el tema oscuro no está activo por defecto.
      - Contenido: Emoji 🌙 (luna).
  - **Lista de enlaces (`#main-menu`)**:
    - Rol semántico: `role="menubar"` para el `<ul>` y `role="menuitem"` para cada `<a>`.
    - Enlaces a las secciones principales:
      1. **Home** → `/index.html`
      2. **En Route** → `/paginas/enroute.html` *(Nota: Este archivo no existe en el directorio `paginas/`)*
      3. **Arrivals** → `/paginas/arrivals.html`
      4. **NavData** → `/paginas/navdata.html`
      5. **Hub** → `/paginas/hub.html`
      6. **Departures** → `/paginas/departures.html`
- **Relación con otras páginas**:
  - Este fragmento se incluye en todas las páginas del sitio para mantener un menú de navegación consistente.
- **Funcionalidad**:
  - Requiere JavaScript para:
    - Alternar la visibilidad del menú en móviles (clase `active`).
    - Alternar el tema claro/oscuro (clase `dark-mode` en `<body>`).
- **Estilos**:
  - Las clases `menu-principal`, `header-fijo`, `menu-toggle` y `theme-toggle` están definidas en [`../css/estilo.css`](../css/estilo.css).

---

### 3. **[`footer.html`](footer.html)**
- **Propósito**: Define el **pie de página del sitio**, que incluye un menú inferior con enlaces a páginas secundarias.
- **Contenido**:
  - **Estructura**:
    - `<footer class="footer-fijo">`.
  - **Botón de menú hamburguesa (`.footer-menu-toggle`)**:
    - Atributo de accesibilidad: `aria-label="Abrir menú"`.
    - Contenido: Símbolo ☰ (menú hamburguesa).
  - **Lista de enlaces (`.menu-footer`)**:
    - Enlaces a páginas secundarias:
      1. **Quién** → `/paginas/pruebas.html` *(Nota: Apunta a `pruebas.html`, que actúa como la sección "Who")*.
      2. **¿Por qué?** → `/paginas/why.html`
      3. **Créditos** → `/paginas/pruebas.html` *(Nota: Apunta a `pruebas.html`, pero no hay contenido de créditos en esa página)*.
- **Relación con otras páginas**:
  - Este fragmento se incluye en las páginas donde se desea mostrar un pie de página con enlaces secundarios.
- **Funcionalidad**:
  - Requiere JavaScript para alternar la visibilidad del menú en móviles (similar al menú principal).
- **Estilos**:
  - Las clases `footer-fijo` y `menu-footer` están definidas en [`../css/estilo.css`](../css/estilo.css).

---

## 🔗 **Relaciones entre Archivos en `includes/`**

Los tres archivos en `includes/` están diseñados para trabajar juntos y formar la **estructura base** de cualquier página del sitio:
1. **`header.html`**: Cabecera con logotipo, título y eslogan.
2. **`nav.html`**: Barra de navegación principal con menú y botones de control.
3. **`footer.html`**: Pie de página con enlaces secundarios.

---

## 🎯 **Resumen de Funcionalidades por Archivo**

| **Archivo**       | **Propósito**                          | **Elementos Clave**                                                                 | **Atributos de Accesibilidad**                     | **Dependencias**                     |
|------------------|----------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------|--------------------------------------|
| `header.html`    | Cabecera del sitio                     | Logotipo, título (`<h1>`), eslogan (`<p>`)                                          | `aria-label`, `aria-labelledby`                     | `estilo.css`                         |
| `nav.html`       | Barra de navegación principal           | Botón menú hamburguesa, botón tema, lista de enlaces (`<ul>`)                       | `aria-label`, `aria-expanded`, `aria-controls`, `role` | `estilo.css`, JavaScript (para funcionalidad) |
| `footer.html`    | Pie de página con enlaces secundarios  | Botón menú hamburguesa, lista de enlaces (`<ul>`)                                   | `aria-label`                                       | `estilo.css`, JavaScript (para funcionalidad) |

---

## 📌 **Observaciones y Puntos de Mejora**

### **Inconsistencias**
1. **Enlace "En Route" en `nav.html`**:
   - El menú principal incluye un enlace a `/paginas/enroute.html`, pero **este archivo no existe** en el directorio `paginas/`.
   - **Sugerencia**: Verificar si este enlace es necesario o si debe eliminarse.

2. **Enlace "Créditos" en `footer.html`**:
   - El enlace "Créditos" apunta a `/paginas/pruebas.html`, pero esta página no contiene información sobre créditos.
   - **Sugerencia**: Crear una página dedicada (`creditos.html`) o actualizar `pruebas.html` para incluir esta sección.

3. **Duplicidad de botones de menú hamburguesa**:
   - Tanto `nav.html` como `footer.html` incluyen un botón de menú hamburguesa (`.menu-toggle` y `.footer-menu-toggle`).
   - **Sugerencia**: Asegurarse de que ambos botones funcionen correctamente y no generen conflictos en el JavaScript.

4. **Ruta del logotipo en `header.html`**:
   - La ruta del logotipo es `/paginas/imagenes/logoblog.avif`.
   - **Sugerencia**: Verificar que esta ruta sea correcta y accesible desde todas las páginas.

### **Oportunidades**
1. **Reutilización de JavaScript**:
   - Los archivos `nav.html` y `footer.html` requieren JavaScript para la funcionalidad de los menús hamburguesa. Podría crearse un archivo JS dedicado para manejar estos eventos de manera centralizada.

2. **Consistencia en el menú principal**:
   - El menú en `nav.html` incluye "En Route", que no está presente en el menú de otras páginas (ej: `index.html` o `arrivals.html`).
   - **Sugerencia**: Alinear los menús para que todas las páginas tengan la misma estructura de navegación.

3. **Accesibilidad mejorada**:
   - Los archivos en `includes/` ya incluyen atributos de accesibilidad (`aria-label`, `aria-expanded`, `role`), pero podrían añadirse más (ej: `aria-current` para el enlace activo).

---

## 📂 **Estructura de Archivos en `includes/`**

```
includes/
├── footer.html  # Pie de página con enlaces secundarios
├── header.html  # Cabecera con logotipo, título y eslogan
└── nav.html     # Barra de navegación principal con menú y botones
```

---

## 📝 **Historial y Contexto**

Este documento se crea como parte de la **recopilación y auditoría** del proyecto **Lecturas de Vuelo**. Su objetivo es:
- Clarificar el propósito de cada archivo en el directorio `includes/`.
- Identificar inconsistencias o áreas de mejora.
- Facilitar el mantenimiento y la reutilización de componentes HTML.

---

*Última actualización: [Fecha de creación de este documento]*.

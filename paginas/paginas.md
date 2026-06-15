# Documentación de Páginas - Lecturas de Vuelo

Este documento describe el **propósito y funcionalidad** de cada página dentro del directorio [`paginas/`](.) del sitio **Lecturas de Vuelo**. Su objetivo es servir como referencia para auditar el contenido y entender el rol de cada página en el proyecto.

---

## 📜 **Estructura General del Directorio `paginas/`**

El directorio `paginas/` contiene los archivos HTML que representan las **secciones principales** del sitio. Todas las páginas comparten:
- **Estructura base**: `<head>` con metadatos, `<body>` con cabecera, barra de navegación, contenido principal y scripts.
- **Estilos**: Usan el archivo [`../css/estilo.css`](../css/estilo.css) para el diseño visual.
- **Textos dinámicos**: Algunas páginas utilizan el script [`../js/constantes.js`](../js/constantes.js) para cargar descripciones desde el objeto `TEXT_CONSTANTS`.
- **Navegación**: Incluyen una barra de navegación fija con enlaces a todas las secciones principales.
- **Funcionalidades comunes**:
  - **Menú hamburguesa**: Para dispositivos móviles.
  - **Botón de tema**: Alterna entre modo claro/oscuro.

---

## 📑 **Listado de Páginas y su Propósito**

### 1. **[`arrivals.html`](arrivals.html)**
- **Título**: "Lecturas de Vuelo: Arrivals"
- **Propósito**: Sección dedicada a **contenido completado o archivado**, como proyectos finalizados, artículos publicados o recursos que ya no se actualizarán pero que siguen siendo relevantes.
- **Contenido actual**:
  - Descripción dinámica cargada desde `constantes.js` (clave: `arrivals`).
  - Enlace a [`why.html`](why.html) bajo el título "Cosas de internet".
- **Relación con otras páginas**:
  - Es una de las 5 secciones principales enlazadas en el menú de navegación.
  - Su descripción en la página principal (`index.html`) es: *"Asuntos completados o archivados, por si buscas inspiración."*

---

### 2. **[`departures.html`](departures.html)**
- **Título**: "Lecturas de Vuelo: Departures"
- **Propósito**: Sección de **blog y enlaces a juegos**, donde se comparten ideas, reflexiones y proyectos en desarrollo o gestación.
- **Contenido actual**:
  - Descripción dinámica cargada desde `constantes.js` (clave: `departures`).
  - **Subsecciones**:
    - **Blog**: Enlace a [`../departures/paytowin050626.html`](../departures/paytowin050626.html) (artículo: *"El Pay-to-Win en juegos de mesa"*).
    - **Juegos**: Enlace a [`../games/juegos.html`](../games/juegos.html) (*"Algunos juegos"*).
- **Diseño**:
  - La descripción se muestra en un `div` con clase `callout-verde` (destacado visual).
- **Relación con otras páginas**:
  - Es la primera sección en el menú de navegación.
  - Su descripción en la página principal es: *"Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha."*

---

### 3. **[`hub.html`](hub.html)**
- **Título**: "Lecturas de Vuelo: Hub"
- **Propósito**: Sección que **agrupa áreas temáticas de interés** para el autor. Actúa como un índice de categorías o temas recurrentes en el sitio.
- **Contenido actual**:
  - Descripción dinámica cargada desde `constantes.js` (clave: `hub`).
  - **Listado de Hubs**:
    - Cosas de linux
    - Matemáticas para juegos
    - Juegos
- **Diseño**:
  - La descripción se muestra en un `div` con clase `callout-verde`.
  - El listado de hubs está en una lista `<ul>` con id `lista-hub`.
- **Relación con otras páginas**:
  - Su descripción en la página principal es: *"Áreas temáticas que más me interesan."*

---

### 4. **[`navdata.html`](navdata.html)**
- **Título**: "Lecturas de Vuelo: NavData"
- **Propósito**: Sección de **recursos útiles**, como enlaces, herramientas o referencias online que el autor recomienda o utiliza frecuentemente.
- **Contenido actual**:
  - Descripción dinámica cargada desde `constantes.js` (clave: `navdata`).
  - Actualmente **no tiene contenido adicional** (solo el `callout-verde` con la descripción).
- **Diseño**:
  - La descripción se muestra en un `div` con clase `callout-verde`.
- **Relación con otras páginas**:
  - Su descripción en la página principal es: *"Recursos online que me resultan útiles y que quizás también pueden servirte."*

---

### 5. **[`pruebas.html`](pruebas.html)**
- **Título**: "Página de Pruebas"
- **Propósito**: Página **genérica para probar enlaces y funcionalidades**. Aunque su nombre sugiere un uso temporal, en la práctica actúa como la sección **"Who"** (sobre el autor).
- **Contenido actual**:
  - Título principal: "Who" (aunque el título de la pestaña es "Página de Pruebas").
  - Descripción dinámica cargada desde `constantes.js` (clave: `who`).
  - Texto estático: *"Esta es una página genérica para probar los enlaces."*
  - Enlace para volver a la página principal: [`../index.html`](../index.html).
- **Diseño**:
  - La descripción se muestra en un `div` con clase `callout-verde`.
- **Relación con otras páginas**:
  - En el menú de navegación aparece como **"Who"** (no como "Pruebas").
  - Su descripción en la página principal es: *"Quién está detrás de todo esto."*
- **Nota**:
  - Hay una **inconsistencia** entre el nombre del archivo (`pruebas.html`) y su propósito real (sección "Who").

---

### 6. **[`why.html`](why.html)**
- **Título**: "¿Por qué una web personal?"
- **Propósito**: Explica la **motivación y proceso** detrás de la creación del sitio web. Es una página de **reflexión personal** sobre por qué se decidió construir una web estática y autoalojada.
- **Contenido actual**:
  - **Introducción**: Breve presentación del autor y su pasión por crear.
  - **Mis primeras opciones**:
    - Críticas a las redes sociales (brevedad, efimeridad).
    - Limitaciones de plataformas gratuitas (Blogger, WordPress).
    - Preocupaciones sobre privacidad y rastreo por parte de *big tech*.
    - Dificultades técnicas con opciones de pago.
  - **La epifanía de la web estática**:
    - Descubrimiento de la web de **Hendrik Erz** (creador de Zettlr) como inspiración.
    - Analogía: "un local a pie de calle en mi propio barrio" vs. "un hueco en un centro comercial gigantesco".
    - Proceso de creación: dominio, repositorio en GitHub, DNS, VS Code.
  - **This is my way**:
    - Reflexión sobre el proceso creativo y la satisfacción de construir algo propio.
    - Mención al *roadmap* y futuras implementaciones.
  - **Callout**:
    - Reconocimiento a Hendrik Erz como inspiración, con enlace a su web: [https://www.hendrik-erz.de](https://www.hendrik-erz.de).
- **Diseño**:
  - Incluye un `div` con clase `callout-verde` para destacar la referencia a Hendrik Erz.
- **Relación con otras páginas**:
  - Enlazada desde [`arrivals.html`](arrivals.html) bajo el título "Cosas de internet".
  - No aparece en el menú de navegación principal.

---

### 7. **[`wip.html`](wip.html)**
- **Título**: "WIP: Work In Progress"
- **Propósito**: Página dedicada a mostrar el **roadmap y estado actual** del desarrollo del sitio web. Actúa como un **diario de progreso** o bitácora de cambios.
- **Contenido actual**:
  - Descripción: *"Aquí encontraréis el roadmap del proceso de cómo está tomando forma esta web."*
  - **Subsecciones**:
    - **Memoria**: Enlace a [`/index.html`](../index.html) (lo realizado hasta el momento).
    - **Roadmap**: Enlace a [`/index.html`](../index.html) (futuras implementaciones).
- **Diseño**:
  - No utiliza `callout-verde` ni textos dinámicos.
- **Relación con otras páginas**:
  - No aparece en el menú de navegación principal.
  - Es una página de **apoyo** para seguir el desarrollo del sitio.
- **Nota**:
  - Los enlaces a "Memoria" y "Roadmap" apuntan a `index.html`, lo que sugiere que estas secciones podrían estar en la página principal o que falta implementar páginas específicas para ellas.

---

## 🔗 **Relaciones entre Páginas**

### **Menú de Navegación Principal**
Las siguientes páginas aparecen en el menú de navegación de **todas las páginas** (excepto `pruebas.html` y `wip.html`):
1. **Departures** → [`departures.html`](departures.html)
2. **Arrivals** → [`arrivals.html`](arrivals.html)
3. **NavData** → [`navdata.html`](navdata.html)
4. **Hub** → [`hub.html`](hub.html)
5. **Who** → [`pruebas.html`](pruebas.html) *(aunque el archivo se llame `pruebas.html`)*

### **Enlaces Internos**
| **Página**       | **Enlaza a**                                                                 | **Contexto**                          |
|------------------|-----------------------------------------------------------------------------|---------------------------------------|
| `arrivals.html`  | [`why.html`](why.html)                                                     | "Cosas de internet"                   |
| `departures.html`| [`../departures/paytowin050626.html`](../departures/paytowin050626.html) | Artículo sobre Pay-to-Win             |
| `departures.html`| [`../games/juegos.html`](../games/juegos.html)                           | "Algunos juegos"                      |
| `why.html`       | [https://www.hendrik-erz.de](https://www.hendrik-erz.de)                   | Inspiración para la web               |
| `why.html`       | [https://lecturasdevuelo.es](https://lecturasdevuelo.es)                 | Dominio del autor                     |
| `why.html`       | [https://www.netcup.de](https://www.netcup.de)                           | Opción de alojamiento mencionada      |
| `why.html`       | [https://www.infomaniak.com](https://www.infomaniak.com)                 | Opción de alojamiento mencionada      |
| `wip.html`       | [`../index.html`](../index.html)                                          | "Memoria" y "Roadmap"                 |
| `pruebas.html`   | [`../index.html`](../index.html)                                          | "Volver a la página principal"       |

---

## 🎯 **Resumen de Funcionalidades por Página**

| **Página**       | **Propósito Principal**               | **Contenido Dinámico** | **Callout Verde** | **En Menú Principal** | **Enlaces Externos** |
|------------------|---------------------------------------|-----------------------|-------------------|------------------------|----------------------|
| `arrivals.html`  | Contenido completado/archivado         | Sí (clave: `arrivals`)| No                | Sí                    | No                   |
| `departures.html`| Blog y enlaces a juegos                | Sí (clave: `departures`)| Sí               | Sí                    | No                   |
| `hub.html`       | Áreas temáticas de interés             | Sí (clave: `hub`)     | Sí               | Sí                    | No                   |
| `navdata.html`   | Recursos útiles                        | Sí (clave: `navdata`) | Sí               | Sí                    | No                   |
| `pruebas.html`   | Sobre el autor ("Who")                 | Sí (clave: `who`)     | Sí               | Sí (como "Who")       | No                   |
| `why.html`       | Motivación y proceso de la web          | No                    | Sí               | No                    | Sí (3 enlaces)        |
| `wip.html`       | Roadmap y progreso del sitio           | No                    | No                | No                    | No                   |

---

## 📌 **Observaciones y Puntos de Mejora**

### **Inconsistencias**
1. **`pruebas.html` vs. "Who"**:
   - El archivo se llaman `pruebas.html`, pero su propósito es la sección "Who" (sobre el autor).
   - **Sugerencia**: Renombrar el archivo a `who.html` para mayor claridad.

2. **Enlaces en `wip.html`**:
   - Los enlaces "Memoria" y "Roadmap" apuntan a `index.html`, pero no hay secciones específicas para ellos.
   - **Sugerencia**: Crear páginas dedicadas (`memoria.html` y `roadmap.html`) o anclas en `index.html`.

3. **Ruta del logotipo**:
   - Todas las páginas usan la ruta `../paginas/imagenes/logoblog.avif` para el logotipo.
   - **Sugerencia**: Verificar si la ruta es correcta (debería ser `imagenes/logoblog.avif` desde el directorio `paginas/`).

### **Oportunidades**
1. **Contenido vacío en `navdata.html`**:
   - Actualmente solo muestra la descripción dinámica. Podría completarse con enlaces a recursos útiles.

2. **Centralizar textos**:
   - Algunas páginas (como `why.html`) tienen textos estáticos que podrían moverse a `constantes.js` para mayor consistencia.

3. **Estructura de `wip.html`**:
   - Podría integrarse con un sistema de seguimiento de progreso (ej: lista de tareas, % completado).

---

## 📂 **Estructura de Archivos en `paginas/`**

```
paginas/
├── arrivals.html    # Contenido completado/archivado
├── departures.html  # Blog y enlaces a juegos
├── hub.html         # Áreas temáticas de interés
├── navdata.html     # Recursos útiles
├── pruebas.html     # Sobre el autor ("Who")
├── why.html         # Motivación y proceso de la web
├── wip.html         # Roadmap y progreso del sitio
└── imagenes/        # Imágenes usadas en las páginas
    └── logoblog.avif # Logotipo del sitio
```

---

## 📝 **Historial y Contexto**

Este documento se crea como parte de la **recopilación y auditoría** del proyecto **Lecturas de Vuelo**. Su objetivo es:
- Clarificar el propósito de cada página.
- Identificar inconsistencias o áreas de mejora.
- Facilitar la navegación y mantenimiento del sitio.

---

*Última actualización: [Fecha de creación de este documento]*.

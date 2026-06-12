# Documentación de `constantes.js`

Este archivo define **constantes de texto** y funciones para aplicarlas dinámicamente en el sitio web. Su propósito es centralizar los textos descriptivos de las secciones del sitio, facilitando su mantenimiento y evitando repeticiones en el código HTML.

---

## 📌 Estructura del Archivo

### 1. **Objeto `TEXT_CONSTANTS`**
Define los textos descriptivos para cada sección del sitio. Cada clave corresponde a una página o sección, y su valor es el texto que se mostrará.

```javascript
const TEXT_CONSTANTS = {
  departures: "Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha.",
  arrivals: "Asuntos completados o archivados, por si buscas inspiración.",
  navdata: "Recursos online que me resultan útiles y que quizás también pueden servirte.",
  hub: "Áreas temáticas que más me interesan.",
  who: "Quién está detrás de todo esto."
};
```

| Clave       | Descripción                                                                                     | Sección Asociada |
|-------------|-------------------------------------------------------------------------------------------------|------------------|
| `departures`| Texto para la sección de blog y enlaces a juegos, con ideas y reflexiones en desarrollo.       | Departures       |
| `arrivals`  | Texto para la sección de asuntos completados o archivados.                                       | Arrivals         |
| `navdata`   | Texto para la sección de recursos online útiles.                                                 | NavData          |
| `hub`       | Texto para la sección de áreas temáticas de interés.                                            | Hub              |
| `who`       | Texto para la sección sobre el autor del sitio.                                                 | Who              |

---

### 2. **Función `applyConstantsToCallouts()`**
Aplica los textos definidos en `TEXT_CONSTANTS` a los elementos HTML con la clase **`callout-verde`**.

#### 🔍 **Comportamiento:**
1. Selecciona todos los elementos con la clase `.callout-verde`.
2. Obtiene el título de la página desde el elemento `<h1>`.
3. Para cada `callout-verde`, busca un párrafo (`<p>`) dentro de él.
4. Si el título de la página coincide con una clave en `TEXT_CONSTANTS` (en minúsculas), reemplaza el contenido del párrafo con el texto correspondiente.

#### 📌 **Ejemplo de Uso:**
Si la página tiene el título `"Departures"` y hay un elemento como:
```html
<div class="callout-verde">
  <p>Texto predeterminado</p>
</div>
```
El texto del párrafo se reemplazará por:
`"Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha."`

---

### 3. **Función `applyConstantsToIndex()`**
Aplica los textos definidos en `TEXT_CONSTANTS` a los párrafos de la página principal (`index.html`).

#### 🔍 **Comportamiento:**
1. Selecciona todos los párrafos (`<p>`) dentro del elemento `<main>`.
2. Para cada párrafo, verifica si su elemento hermano anterior es un `<h2>` con un enlace (`<a>`).
3. Si el texto del enlace coincide con una clave en el objeto `mappings` (que mapea títulos de sección a `TEXT_CONSTANTS`), reemplaza el contenido del párrafo con el texto correspondiente.

#### 📌 **Mapeo de Títulos:**
```javascript
const mappings = {
  'Departures': TEXT_CONSTANTS.departures,
  'Arrivals': TEXT_CONSTANTS.arrivals,
  'NavData': TEXT_CONSTANTS.navdata,
  'Hub': TEXT_CONSTANTS.hub,
  'Who': TEXT_CONSTANTS.who
};
```

#### 📌 **Ejemplo de Uso:**
Si en `index.html` hay una estructura como:
```html
<h2><a>Departures</a></h2>
<p>Texto predeterminado</p>
```
El párrafo se reemplazará por:
`"Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha."`

---

### 4. **Evento `DOMContentLoaded`**
Ejecuta las funciones anteriores cuando el DOM de la página está completamente cargado.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.callout-verde')) {
    applyConstantsToCallouts();
  }
  if (document.querySelector('main p')) {
    applyConstantsToIndex();
  }
});
```

#### 🔍 **Lógica de Ejecución:**
- Si la página contiene elementos con la clase `.callout-verde`, ejecuta `applyConstantsToCallouts()`.
- Si la página contiene párrafos dentro de `<main>`, ejecuta `applyConstantsToIndex()`.

---

## 📂 **Relación con el Sitio Web**
Este archivo es parte de la lógica de **localización y mantenimiento de textos** del sitio. Permite:
1. **Centralizar los textos**: Todos los mensajes descriptivos están en un solo lugar.
2. **Facilitar actualizaciones**: Cambiar un texto solo requiere modificar `TEXT_CONSTANTS`.
3. **Evitar duplicación**: Los mismos textos se reutilizan en diferentes partes del sitio (páginas individuales y página principal).

---

## 🛠️ **Cómo Modificar**
1. **Añadir una nueva sección**:
   - Agrega una nueva clave al objeto `TEXT_CONSTANTS`.
   - Si es necesario, actualiza el objeto `mappings` en `applyConstantsToIndex()`.

2. **Cambiar un texto existente**:
   - Modifica el valor asociado a la clave correspondiente en `TEXT_CONSTANTS`.

3. **Añadir soporte para más elementos HTML**:
   - Crea una nueva función similar a `applyConstantsToCallouts()` o `applyConstantsToIndex()` para otros selectores.

---

## 📝 **Notas Adicionales**
- El archivo asume que los títulos de las páginas y secciones coinciden exactamente con las claves de `TEXT_CONSTANTS` (en minúsculas para `applyConstantsToCallouts()`).
- Las funciones solo actúan si los elementos HTML esperados existen en la página, evitando errores en páginas donde no son necesarios.

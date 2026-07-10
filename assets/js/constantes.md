# Documentación de `constantes.js`

Este archivo define **constantes de texto** y funciones para aplicarlas dinámicamente en el sitio web. Su propósito es centralizar los textos descriptivos de las secciones del sitio, facilitando su mantenimiento y evitando repeticiones en el código HTML.

---

## 📌 Estructura del Archivo

### 1. **Objeto `TEXT_CONSTANTS`**
Define los textos descriptivos para cada sección del sitio. Cada clave corresponde a una página o sección, y su valor es el texto que se mostrará.

```javascript
const TEXT_CONSTANTS = {
  blog: "Blog y enlaces a Juegos. Un espacio de ideas y reflexiones en marcha.",
  mirador: "Asuntos completados o archivados, por si buscas inspiración.",
  recursos: "Recursos online que me resultan útiles y que quizá también pueden servirte.",
  temas: "Áreas temáticas que más me interesan.",
  who: "Quién está detrás de todo esto.",
  juegos: "Prototipos."
};
```

| Clave       | Descripción                                                                                     | Sección Asociada |
|-------------|-------------------------------------------------------------------------------------------------|------------------|
| `blog`| Texto para la sección de blog y enlaces a juegos, con ideas y reflexiones en desarrollo.       | Blog       |
| `mirador`  | Texto para la sección de asuntos completados o archivados.                                       | Mirador         |
| `recursos`   | Texto para la sección de recursos online útiles.                                                 | Recursos          |
| `temas`       | Texto para la sección de áreas temáticas de interés.                                            | Temas              |
| `who`       | Texto para la sección sobre el autor del sitio.                                                 | Who              |
| `juegos`    | Texto para la sección de juegos.                                                               | Juegos           |

---

### 2. **Función `applyTextConstants()`**
Aplica los textos definidos en `TEXT_CONSTANTS` a los elementos HTML con el atributo `data-text-key`.

#### 🔍 **Comportamiento:**
1. Selecciona todos los elementos con el atributo `data-text-key`.
2. Para cada elemento, obtiene el valor del atributo `data-text-key`.
3. Si el valor coincide con una clave en `TEXT_CONSTANTS`, reemplaza el contenido del elemento con el texto correspondiente.

#### 📌 **Ejemplo de Uso:**
Si hay un elemento como:
```html
<p data-text-key="mirador">Texto predeterminado</p>
```
El texto del párrafo se reemplazará por:
`"Asuntos completados o archivados, por si buscas inspiración."`

---

### 3. **Evento `DOMContentLoaded`**
Ejecuta la función `applyTextConstants()` cuando el DOM de la página está completamente cargado.

```javascript
document.addEventListener('DOMContentLoaded', applyTextConstants);
```

---

## 📊 **Relación con el Sitio Web**
Este archivo es parte de la lógica de **localización y mantenimiento de textos** del sitio. Permite:
1. **Centralizar los textos**: Todos los mensajes descriptivos están en un solo lugar.
2. **Facilitar actualizaciones**: Cambiar un texto solo requiere modificar `TEXT_CONSTANTS`.
3. **Evitar duplicación**: Los mismos textos se reutilizan en diferentes partes del sitio.

---

## ✏️ **Cómo Modificar**
1. **Añadir una nueva sección**:
   - Agrega una nueva clave al objeto `TEXT_CONSTANTS`.

2. **Cambiar un texto existente**:
   - Modifica el valor asociado a la clave correspondiente en `TEXT_CONSTANTS`.

3. **Añadir soporte para más elementos HTML**:
   - Asegúrate de que los elementos HTML tengan el atributo `data-text-key` con la clave correspondiente.

---

## 📝 **Notas Adicionales**
- El archivo asume que los elementos HTML tienen el atributo `data-text-key` con la clave correspondiente en `TEXT_CONSTANTS`.
- La función solo actúa si los elementos HTML esperados existen en la página, evitando errores en páginas donde no son necesarios.

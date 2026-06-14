# Build Maravia: Generador de Palabras Aleatorias

## Descripción
Este documento describe los pasos seguidos para crear el juego **Maravia: Generador de Palabras Aleatorias**, un juego simple que permite generar palabras aleatorias con un número de letras especificado (entre 1 y 5).

---

## Pasos para la Creación del Juego

### 1. **Estructura del Proyecto**
- Se creó una carpeta llamada `Maravia` dentro del directorio `games/` del repositorio `lecturasdevuelo.io`.
- Dentro de esta carpeta, se generó el archivo `index.html`, que contiene el código HTML, CSS y JavaScript del juego.

### 2. **Diseño de la Interfaz (HTML)**
- Se diseñó una interfaz simple con:
  - Un título: **Maravia**.
  - Una descripción breve del juego en un `callout-verde`.
  - Un campo de entrada (`input`) para que el usuario introduzca el número de letras (1-5).
  - Un botón (`Enviar`) para generar la palabra aleatoria.
  - Un área (`div`) para mostrar el resultado.

### 3. **Estilo (CSS)**
- Se vinculó el archivo de estilos global del sitio (`../css/estilo.css`) para mantener la coherencia visual con el resto de la web.
- Se utilizaron clases como `logo-header`, `header-fijo`, `menu-principal`, `callout-verde`, y `dark-mode` para el tema oscuro.

### 4. **Lógica del Juego (JavaScript)**
- **Vocales y Consonantes**: Se definieron dos arrays:
  - `vocales`: `['A', 'E', 'I', 'O', 'U']`
  - `consonantes`: `['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']`

- **Generación de Letras Aleatorias**:
  - La función `generarLetraAleatoria(esVocal)` selecciona una letra aleatoria de los arrays de vocales o consonantes, dependiendo del parámetro `esVocal`.

- **Generación de Palabras Aleatorias**:
  - La función `generarPalabraAleatoria(n)` genera una palabra de `n` letras, alternando entre consonantes y vocales para que suene más natural.
  - Ejemplo: Para `n = 3`, podría generar "BAC", "DET", "MOP", etc.

- **Validación de Entrada**:
  - Se valida que el número introducido esté entre 1 y 5. Si no es válido, se muestra un mensaje de error en rojo.

- **Evento del Botón**:
  - Al hacer clic en el botón `Enviar`, se genera la palabra aleatoria y se muestra en el área de resultado.

### 5. **Funcionalidades Adicionales**
- **Menú Hamburguesa**: Para la navegación en dispositivos móviles.
- **Tema Oscuro/Claro**: Botón para alternar entre el modo día y noche, con actualización del emoji (🌙/☀️) y el estado `aria-pressed` para accesibilidad.

### 6. **Integración en el Sitio Web**
- Se añadió un enlace al juego en la página `games/juegos.html`:
  ```html
  <h2>Maravia</h2>
  <a href="/games/Maravia/index.html">Generador de palabras aleatorias</a>
  ```

### 7. **Pruebas**
- Se probó el juego en diferentes navegadores para asegurarse de que:
  - La generación de palabras funciona correctamente.
  - La validación de entrada rechaza valores fuera del rango (1-5).
  - El tema oscuro/claro se alterna correctamente.
  - El menú hamburguesa funciona en móviles.

---

## Tecnologías Utilizadas
- **HTML5**: Estructura de la página.
- **CSS3**: Estilos (vinculados desde `estilo.css`).
- **JavaScript**: Lógica del juego y funcionalidades interactivas.

---

## Ruta del Juego
- **URL Relativa**: `/games/Maravia/index.html`
- **Ubicación en el Repositorio**: [`games/Maravia/index.html`](./index.html)

---

## Notas
- El juego está diseñado para ser simple y fácil de usar, con un enfoque en la generación de palabras aleatorias para fines educativos o de entretenimiento.
- Se puede ampliar en el futuro añadiendo más opciones, como:
  - Generación de palabras con sílabas específicas.
  - Opciones para incluir o excluir ciertas letras.
  - Modo de juego con tiempo límite.

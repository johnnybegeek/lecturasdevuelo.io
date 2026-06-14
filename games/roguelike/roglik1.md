# Build Roglik1: Roguelike ASCII Accesible

## Descripción
Este documento describe los pasos seguidos para crear el juego **Roglik1: Roguelike ASCII Accesible**, un juego de exploración en un mapa generado aleatoriamente donde el jugador debe encontrar la salida. El juego está diseñado para ser accesible, con soporte para lectores de pantalla, preferencias de usuario (como modo claro/oscuro y contraste alto), y controles intuitivos.

---

## Pasos para la Creación del Juego

### 1. **Estructura del Proyecto**
- Se creó el archivo `roglik1.html` dentro del directorio `games/roguelike/` del repositorio `lecturasdevuelo.io`.
- El archivo contiene el código HTML, CSS y JavaScript del juego, todo en un solo archivo para facilitar su distribución y uso.

### 2. **Diseño de la Interfaz (HTML)**
- Se diseñó una interfaz dividida en varias secciones:
  - **Encabezado**: Título del juego y descripción breve.
  - **Área de juego (`#game`)**: Donde se renderiza el mapa del juego en ASCII.
  - **Panel de controles**: Incluye:
    - Información de posición actual (`#position-info`).
    - Instrucciones del juego (significado de los caracteres `@`, `#`, `.`, `>`).
    - Botón para reiniciar el juego.
  - **Modal de victoria**: Aparece cuando el jugador encuentra la salida.

### 3. **Estilo (CSS)**
- **Variables CSS**: Se utilizaron variables CSS para los colores (`--bg-color`, `--text-color`, `--wall-color`, etc.), lo que permite adaptar el juego a las preferencias del usuario (modo claro/oscuro, alto contraste).
- **Estilos específicos para el juego**:
  - `#game`: Estilo para el área de juego, con fondo oscuro, bordes redondeados y fuente monospace.
  - `.wall`, `.floor`, `.player`, `.exit`: Estilos para los diferentes elementos del mapa.
  - `.cell`: Estilo para cada celda del mapa, con `display: inline-block` para mantener el formato ASCII.
  - `.screen-reader-only`: Clase para ocultar elementos visualmente pero mantenerlos accesibles para lectores de pantalla.
- **Media Queries**:
  - `@media (prefers-contrast: high)`: Ajusta los colores para usuarios que prefieren alto contraste.
  - `@media (prefers-color-scheme: light)`: Adapta el juego al modo claro.
  - `@media (prefers-reduced-motion: reduce)`: Elimina transiciones y animaciones para usuarios que prefieren menos movimiento.
  - `@media (max-width: 600px)` y `@media (max-width: 768px)`: Ajusta el tamaño de la fuente y el diseño para pantallas pequeñas.

### 4. **Lógica del Juego (JavaScript)**
- **Configuración del mapa**:
  - `WIDTH = 25` y `HEIGHT = 15`: Dimensiones del mapa.
  - `playerX` y `playerY`: Posición inicial del jugador (1, 1).
  - `map`: Matriz 2D que representa el mapa, donde:
    - `#`: Pared.
    - `.`: Suelo.
    - `@`: Jugador.
    - `>`: Salida.

- **Generación del mapa (`initMap`)**:
  - Se genera un mapa aleatorio con paredes en los bordes y paredes aleatorias en el interior (15% de probabilidad por celda).
  - Se coloca la salida (`>`) en una posición aleatoria que no coincida con la del jugador.

- **Dibujo del mapa (`drawMap`)**:
  - Recorre la matriz `map` y genera el HTML para cada celda, aplicando las clases CSS correspondientes (`wall`, `floor`, `player`, `exit`).
  - Cada celda tiene un `aria-label` para accesibilidad.

- **Movimiento del jugador (`movePlayer`)**:
  - Calcula la nueva posición del jugador según la tecla pulsada.
  - Si la nueva posición es la salida (`>`), muestra el modal de victoria.
  - Si la nueva posición es una pared (`#`), no permite el movimiento y muestra un mensaje de error.
  - Si la nueva posición es válida, actualiza el mapa y redibuja.

- **Información de posición (`updatePositionInfo` y `getSurroundingDescription`)**:
  - Actualiza la posición actual del jugador en el panel de controles.
  - Proporciona una descripción de los elementos alrededor del jugador (pared, suelo, salida) para accesibilidad.

- **Eventos**:
  - `keydown`: Captura las teclas de flecha y WASD para mover al jugador.
  - `click` y `keydown` en los botones de reinicio y continuar para reiniciar el juego.

### 5. **Funcionalidades Adicionales**
- **Accesibilidad**:
  - Uso de `aria-label`, `aria-live`, `role`, y `tabindex` para mejorar la accesibilidad.
  - Mensajes para lectores de pantalla (`screen-reader-only`).
  - Descripciones de los elementos alrededor del jugador.
- **Responsive Design**: Adaptación a diferentes tamaños de pantalla.
- **Tema claro/oscuro**: Soporte para preferencias del usuario.
- **Alto contraste**: Soporte para usuarios con necesidades de alto contraste.

### 6. **Integración en el Sitio Web**
- Se añadió un enlace al juego en la página `games/juegos.html`:
  ```html
  <h2>Roguelike ASCII</h2>
  <a href="/games/roguelike/roglik1.html">Roguelike ASCII</a>
  ```

### 7. **Pruebas**
- Se probó el juego en diferentes navegadores para asegurarse de que:
  - El mapa se genera correctamente.
  - El jugador puede moverse con las teclas de flecha y WASD.
  - El modal de victoria aparece al encontrar la salida.
  - El botón de reinicio funciona correctamente.
  - La información de posición se actualiza en tiempo real.
  - El juego es accesible con lectores de pantalla.
  - El juego se adapta a las preferencias del usuario (modo claro/oscuro, alto contraste).

---

## Tecnologías Utilizadas
- **HTML5**: Estructura de la página y elementos semánticos.
- **CSS3**: Estilos, variables CSS, media queries y diseño responsive.
- **JavaScript (ES6)**: Lógica del juego, manipulación del DOM y manejo de eventos.

---

## Ruta del Juego
- **URL Relativa**: `/games/roguelike/roglik1.html`
- **Ubicación en el Repositorio**: [`games/roguelike/roglik1.html`](./roglik1.html)

---

## Notas
- El juego está diseñado para ser accesible y adaptable a las preferencias del usuario.
- Se puede ampliar en el futuro añadiendo más funcionalidades, como:
  - Enemigos que persigan al jugador.
  - Objetos para recolectar.
  - Múltiples niveles.
  - Guardado de progreso.

---

## Tareas Pendientes

### Ajustar roglik1
- Hay que incluirlo en una página canónica de lecturas de vuelo.
- Hay que cambiar los colores del mensaje de victoria, no se ven nada bien.

### Más versiones de roglik1
- Añadir algún enemigo que persiga al jugador.
- Añadir que siempre haya un punto rodeado por 4 paredes ortogonales. El jugador debe golpearlas 2-3 veces para romperlas y conseguir la llave. En ese momento aparece la puerta de salida.

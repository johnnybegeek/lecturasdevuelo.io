# Mazmorra aleatoria: documentación del código

## Qué es

Juego web autocontenido: un único archivo HTML con CSS y JavaScript en línea, sin dependencias ni servidor. El mapa no existe al empezar: se genera al andar. Características:

- Generación perezosa: pisar una puerta construye lo que hay al otro lado.
- Niebla de guerra: radio de visión de 3 casillas con bloqueo por muros.
- Puertas secretas retroactivas: aparecen cuando dos estructuras cercanas se conectan, con la explicación temática de que "ya estaban ahí".
- Semilla reproducible y controles por teclado numérico y cruceta táctil.

## Estructura del archivo

| Sección del script | Funciones principales | Responsabilidad |
|---|---|---|
| 1. RNG con semilla | `mulberry32`, `ri` | Azar determinista: misma semilla, misma mazmorra |
| 2. Estado del mundo | `K`, `overlaps` | Datos vivos del mundo y test de solape de rectángulos |
| 3. Puertas | `addDoors` | Colocar 1-3 puertas en los muros de una sala |
| 4. Generación perezosa | `generateBeyond` | Construir pasillo y sala al pisar una puerta |
| 5. Puertas secretas | `tallarConexion`, `trazarL`, `conectarCercana`, `maybeSecretDoor` | Conexiones retroactivas entre estructuras |
| 6. Niebla de guerra | `opaque`, `lineVisible`, `fov` | Visibilidad con radio 3 y bloqueo por muros |
| 7. Movimiento | `tryMove` | Pasos del jugador y disparo de la generación |
| 8. Dibujo | `draw` | Render del mapa en canvas 2D centrado en el jugador |
| 9. Inicio y entrada | `newDungeon`, manejadores de eventos | Reseteo, teclado, cruceta, botones |

## Datos del mundo

| Nombre | Tipo | Contenido |
|---|---|---|
| `tiles` | Map `"x,y"` → `"."` o `"+"` | Suelo y puerta tallados. Una casilla ausente es muro: no hay objetos "pared" |
| `doors` | Map `"x,y"` → `{x, y, dir, generated}` | Puertas normales. `dir` (N/S/E/W) apunta hacia fuera de su sala; `generated` evita regenerar |
| `rects` | Array de `{x, y, w, h}` | Rectángulos "reclamados" por cada zona tallada, con margen de 1 casilla para los muros. Sirven para que dos estructuras nunca se solapen |
| `explored`, `visible` | Set de `"x,y"` | Lo visto alguna vez y lo visible ahora (niebla) |
| `player` | `{x, y}` | Posición del jugador |
| `seed`, `rng` | entero, función | Semilla de la partida y generador |

Convención central: tallar = escribir en `tiles`. Todo lo no escrito es muro. Eso permite que el mundo no tenga tamaño definido y que la generación sea infinita y perezosa.

## Generación perezosa: `generateBeyond(door)`

Se invoca al pisar una puerta con `generated: false`. Proceso:

1. Marca la puerta como generada (no se repite).
2. Hasta 100 intentos: elige largo de pasillo (1-5), ancho y alto de sala (3-10 x 3-8), y ancla la sala para que el pasillo entre por un muro, según la dirección de la puerta.
3. Calcula la región candidata: pasillo + sala + margen de 1 para muros, recortando la columna o fila de la propia puerta (ya pertenece a la sala de origen).
4. Si la región solapa alguna reclamada (`overlaps`), reintenta con otros tamaños y posiciones. Si algún casilla del pasillo no está virgen, también reintenta.
5. Al comprometer: reclama la región en `rects`, talla pasillo y sala, guarda las casillas nuevas en `nuevos`, añade puertas con `addDoors` (sin puerta en el muro de entrada) y llama a `maybeSecretDoor(nuevos)`.
6. Si los 100 intentos fallan (zona bloqueada por estructuras previas), la puerta no queda tapiada: `conectarCercana` la une con la estructura previa más próxima.

Invariantes que garantiza este flujo: dos zonas distintas nunca comparten suelo; entre suelos de estructuras distintas siempre queda muro (el margen), salvo donde se talla una conexión; una puerta nunca da a un solape imposible salvo conexión retroactiva.

## Puertas: `addDoors` y tipos de puerta

`addDoors(x0, y0, w, h, skip)` coloca de 1 a 3 puertas en muros barajados al azar, a una casilla de las esquinas, evitando el lado `skip` (por donde se entra a la sala) y las posiciones ya ocupadas.

Dos tipos de puerta que comparten la casilla `"+"`:

- Puerta normal: se registra en `doors` con `generated: false`. Al pisarla dispara `generateBeyond`.
- Puerta secreta (retroactiva): se talla tarde con `tallarConexion` y no se registra en `doors`. Al pisarla no genera nada: solo conecta. Esa es la distinción mecánica de la puerta "secreta"; en el mapa se ve como una puerta dorada más, aparecida a posteriori.

## Puertas secretas retroactivas

Concepto temático: en la sala vieja esa puerta no se veía porque aún no existía; la explicación de juego es que era secreta. Dos disparadores con el mismo mecanismo:

1. Puerta tapiada (`conectarCercana`): al abrir una puerta cuya generación no cabe, se buscan casillas talladas en el semiplano de delante de la puerta (radio 9, ordenadas por distancia Manhattan, máximo 12) y se traza un pasillo en L hasta la más próxima alcanzable.
2. Proximidad (`maybeSecretDoor`): tras tallar una sala o pasillo, se escanea desde cada casilla nueva en las 4 direcciones; si a 1-3 casillas de muro hay una estructura anterior, esa dirección es candidata. Cada candidata tiene un 60% de probabilidad, hasta 2 conexiones por generación.

Funciones de apoyo:

- `trazarL`: construye el pasillo en L con dos variantes (primero lateral o primero de frente) y valida la primera que salga limpia: todas las casillas del trayecto deben ser muro virgen y no rozar suelos ajenos; la última casilla (la puerta) sí toca su destino. Longitud máxima 10.
- `tallarConexion`: talla el hueco como pasillo, la última casilla como puerta `"+"` pegada a la estructura antigua, y reclama el rectángulo con margen para futuras generaciones.

Ambos disparadores dependen del interruptor global `secretosOn` (tecla S o botón); el interruptor afecta solo a generaciones futuras.

## Niebla de guerra

- `opaque(x, y)`: solo el vacío es opaco; suelo y puertas son transparentes.
- `lineVisible`: línea de Bresenham desde el jugador a la casilla objetivo. Si atraviesa una casilla opaca antes de llegar, no se ve; el destino se ve aunque sea muro (los muros que cortan la visión quedan en el mapa).
- `fov`: para cada casilla con distancia euclídea al cuadrado menor o igual a 12 (radio 3) dentro del cuadrado 7x7, aplica `lineVisible`. Lo visible se acumula en `explored`.

Tres estados de render: no explorado (negro), explorado sin visión actual (tonos oscuros), visible (tonos claros). El contador HUD muestra semilla, salas y secretas creadas.

## Movimiento, dibujo y entrada

- `tryMove`: solo `"."` y `"+"` son pasables. Tras moverse recalcula niebla y dibuja.
- Dibujo: canvas 2D de 780x520, casillas de 26 px, viewport centrado en el jugador. Colores: suelo ocre, puerta dorada, muro gris, jugador círculo azul.
- Teclado: se lee `e.code` (no `e.key`), por lo que el teclado numérico funciona con o sin Bloq Numérico; las cifras de la fila superior son alternativa. R genera mapa nuevo, S alterna las secretas.
- Cruceta táctil: botones con `pointerdown` (dedo, ratón o lápiz), repetición automática cada 170 ms mientras se mantiene pulsado. `touch-action: manipulation` evita zoom por doble toque; el menú contextual de pulsación larga está bloqueado.

## Semillas

`mulberry32` genera la secuencia pseudoaleatoria a partir de `seed`. Como el único consumo de azar es la generación (las acciones del jugador no consumen valores), la misma semilla produce exactamente la misma mazmorra, siempre que se abran las mismas puertas en el mismo orden.

## Puntos de extensión

| Quiero añadir... | Dónde tocar |
|---|---|
| Criaturas, cofres, trampas | En `generateBeyond`, tras tallar la sala: se conocen `x0, y0, rw, rh` |
| Escaleras y niveles | En `newDungeon`: nuevo estado + reinicio de `tiles` con descenso |
| Radio de visión | Constante `R` y el umbral `R * R + 3` en `fov` |
| Probabilidad de secretas | `0.6` en `maybeSecretDoor` |
| Guardar y cargar | Serializar `tiles`, `doors`, `rects`, `player`, `seed` y los contadores |
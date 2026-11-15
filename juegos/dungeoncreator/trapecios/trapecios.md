# Memoria: rejilla de trapecios (hexágonos en cuartos)

Registro técnico y de decisiones del prototipo de movimiento sobre la rejilla fina obtenida al partir cada hexágono en 4 trapecios rectángulos. Forma parte del plan del generador de mapas para el sandbox de exploración.

## 1. La figura

- Hexágono regular (plano por arriba) dividido con dos cortes perpendiculares por el centro: uno une vértices opuestos (E-O) y otro une los puntos medios de dos aristas opuestas (N-S).
- Cada parte es un trapecio rectángulo (ángulos 90-60-120-90). Cuatro partes congruentes por hexágono, en dos variantes especulares (quirales).
- La teselación resultante no tiene nombre propio; no es regular ni arquimediana.

## 2. Geometría demostrada

- Cada trapecio tiene exactamente 8 trapecios alrededor: 4 comparten arista y 4 comparten solo un vértice. Por tanto la visibilidad de 8 casillas y el movimiento de 8 direcciones encajan con la geometría sin excepciones.
- Todos los vértices de la rejilla tocan exactamente 4 trapecios. La rejilla es isomorfa a la rejilla cuadrada con movimiento de rey: mismo grafo de adyacencia, distinta métrica.
- Los centroides de los trapecios caen en una red rectangular pura: paso horizontal 0,75R y paso vertical 0,866R (el apothema). En consecuencia el código representa cada celda por coordenadas enteras (i, j) y el movimiento es un desplazamiento de rey sobre ℤ².
- Distancias centro a centro entre vecinos: E-O 0,75R; N-S 0,866R; diagonales ~1,146R. La rejilla es anisótropa (los pasos N-S son un 15 % más largos que los E-O). Mientras el coste sea plano (1 PM por paso), la anisotropía es invisible para las reglas; si algún día el coste pasa a depender de la distancia, conviene revisar la rejilla.

## 3. Sistema de coordenadas

Bijección entre (i, j) ∈ ℤ² y trapecios:

- U = 2i + 1, V = 2j + 1.
- su = +1 si U ≡ 1 (mód 4), si no −1. Lado este (+) u oeste (−) del corte vertical.
- q = (U − su) / 4. Columna del hexágono.
- rem = V − 2q; sv = +1 si rem ≡ 1 (mód 4), si no −1. Mitad norte (+) o sur (−) del corte horizontal.
- r = (rem − sv) / 4. Fila del hexágono.
- Cuarto: TR = (su +, sv +), TL = (su −, sv +), BR = (su +, sv −), BL = (su −, sv −).

Centro del hexágono (q, r) en coordenadas del mundo (Y hacia arriba): x = 1,5Rq; y = 2ar + aq, con a = 0,866R (apotema). La rejilla es infinita: cualquier (i, j) es una celda válida, sin generación previa.

Direcciones y deltas sobre (i, j): N (0,1), NE (1,1), E (1,0), SE (1,−1), S (0,−1), SW (−1,−1), W (−1,0), NW (−1,1).

## 4. Reglas implementadas

- Paso de un trapecio a cualquiera de sus 8 vecinos: coste 1 PM, en todas las direcciones.
- PM inicial: 10 (constante PM_INICIAL, configurable).
- Con PM a 0 el movimiento se bloquea y el contador (formato PM:n, esquina superior derecha del mapa) pasa a rojo.
- Visibilidad: la casilla actual y sus 8 vecinas se muestran resaltadas. Las casillas ya vistas quedan marcadas como exploradas (tono verde apagado). El resto de la rejilla se dibuja con celdas gris azulado sobre fondo oscuro como referencia espacial.
- Botón Reiniciar: restablece posición (0,0), PM y memoria de exploración.

## 5. Controles

| Dirección | Numérico | Numérico sin Bloq Num | Letras | Mando táctil |
|---|---|---|---|---|
| N | 8 | ArrowUp / ↑ | W | ↑ |
| NE | 9 | PageUp | E | ↗ |
| E | 6 | ArrowRight / → | D | → |
| SE | 3 | PageDown | C | ↘ |
| S | 2 | ArrowDown / ↓ | X | ↓ |
| SW | 1 | End | Z | ↙ |
| W | 4 | ArrowLeft / ← | A | ← |
| NW | 7 | Home | Q | ↖ |

El centro del mando (5, Clear, S) es la posición actual: no mueve. El mando táctil es una rejilla 3×3 de flechas bajo el mapa, utilizable con el pulgar en pantalla y también con ratón en sobremesa.

## 6. Arquitectura del código

Un único archivo HTML autocontenido, sin dependencias ni llamadas externas. Dos bloques separados:

- Núcleo puro: constantes de geometría, DIRS, celda(), centroHex(), poligono(), centroide(), estadoInicial(), revelar(), mover(). No toca el DOM. Es portable tal cual al futuro motor TypeScript del sandbox.
- Interfaz: captura de teclado y mando, render en Canvas 2D, HUD y reinicio. Toda entrada converge en intentarMover(dir), que llama a mover() del núcleo y luego redibuja. Cambiar la capa de entrada o de render no afecta a las reglas.
- Render: cámara siempre centrada en el jugador; escala proporcional al ancho (unas 420 unidades de mundo visibles); paleta oscura de alto contraste (posición en verde brillante, vecinas en verde medio, exploradas en verde apagado, sin explorar en gris azulado); los contornos de los hexágonos se dibujan encima como capa macro, para que la estructura de hexágonos en cuartos siga legible.

## 7. Decisiones de diseño registradas

- La rejilla fina es combinatoriamente cuadrada (vecindad de rey). Elegirla tiene sentido si se quiere la estructura macro de hexágonos (regiones, biomas) con un movimiento de 8 direcciones debajo. Si en el futuro importa la equidistancia real de la frontera, la alternativa es la rejilla hexagonal pura o la subdivisión en 6 triángulos; esta decisión queda registrada en el plan del generador.
- Los hexágonos no participan en las reglas: (q, r) está disponible por cada celda y es la coordenada natural para la capa macro (bioma, región, chunk de generación). El prototipo aún no genera mundo: dibuja geometría neutra; la semilla, el ruido y los deltas del jugador se añaden sobre el núcleo sin tocar la interfaz.
- El coste plano de 1 PM por paso es una decisión de especificación, no una consecuencia de la geometría: las 8 direcciones tienen longitudes distintas (30, 34,6 y 45,8 unidades con R=40), y el coste uniforme las iguala de hecho.
- El estado serializable de la partida cabe en JSON: { i, j, pm, descubiertas }. Es el germen del guardado del sandbox (semilla + deltas + posición).

## 8. Estado del prototipo

- Movimiento de 8 direcciones verificado analíticamente sobre la retícula (i, j): cada celda tiene exactamente 8 vecinos y las fórmulas de conversión se comprobaron en los 8 rumbos y en coordenadas negativas.
- Pendiente de integración con el plan del generador: semilla del mundo, generación por chunks sobre (q, r), terreno por bioma y persistencia en IndexedDB.
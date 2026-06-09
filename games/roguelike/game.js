// Configuración del juego
const WIDTH = 25;
const HEIGHT = 15;
let playerX = 1;
let playerY = 1;
let map = [];
let exitX = 0;
let exitY = 0;

// Elementos DOM
const gameElement = document.getElementById('game');
const statusMessage = document.getElementById('status-message');
const positionInfo = document.getElementById('position-info');
const victoryModal = document.getElementById('victory-modal');
const continueBtn = document.getElementById('continue-btn');
const resetBtn = document.getElementById('reset-btn');

// Inicializar el mapa
function initMap() {
    map = [];
    for (let y = 0; y < HEIGHT; y++) {
        map[y] = [];
        for (let x = 0; x < WIDTH; x++) {
            if (y === 0 || y === HEIGHT - 1 || x === 0 || x === WIDTH - 1) {
                map[y][x] = '#'; // Paredes en los bordes
            } else if (Math.random() < 0.15) {
                map[y][x] = '#'; // Paredes aleatorias
            } else {
                map[y][x] = '.'; // Suelo
            }
        }
    }

    // Colocar salida aleatoria (no en bordes ni en posición del jugador)
    do {
        exitX = Math.floor(Math.random() * (WIDTH - 2)) + 1;
        exitY = Math.floor(Math.random() * (HEIGHT - 2)) + 1;
    } while (exitX === playerX && exitY === playerY);

    map[exitY][exitX] = '>'; // Salida
    map[playerY][playerX] = '@'; // Jugador

    updatePositionInfo();
    gameElement.focus();
}

// Dibujar el mapa
function drawMap() {
    let rows = [];
    for (let y = 0; y < HEIGHT; y++) {
        let row = [];
        for (let x = 0; x < WIDTH; x++) {
            let cell = map[y][x];
            let className = '';
            let ariaLabel = '';

            switch (cell) {
                case '#': className = 'wall'; ariaLabel = 'Pared'; break;
                case '.': className = 'floor'; ariaLabel = 'Suelo'; break;
                case '@': className = 'player'; ariaLabel = 'Jugador'; break;
                case '>': className = 'exit'; ariaLabel = 'Salida'; break;
            }

            row.push(`<span class="cell ${className}" role="img" aria-label="${ariaLabel}">${cell}</span>`);
        }
        rows.push(row.join(''));
    }
    gameElement.innerHTML = rows.join('<br>');
}

// Actualizar información de posición
function updatePositionInfo() {
    positionInfo.textContent = `Posición: Fila ${playerY + 1}, Columna ${playerX + 1}`;
    statusMessage.textContent = `Posición actual: fila ${playerY + 1}, columna ${playerX + 1}. ${getSurroundingDescription()}`;
}

// Descripción del entorno para lectores de pantalla
function getSurroundingDescription() {
    const directions = [
        { dx: 0, dy: -1, name: 'arriba' },
        { dx: 0, dy: 1, name: 'abajo' },
        { dx: -1, dy: 0, name: 'izquierda' },
        { dx: 1, dy: 0, name: 'derecha' }
    ];

    const descriptions = [];
    for (const dir of directions) {
        const nx = playerX + dir.dx;
        const ny = playerY + dir.dy;
        if (map[ny] && map[ny][nx]) {
            const cell = map[ny][nx];
            let desc = '';
            switch (cell) {
                case '#': desc = 'pared'; break;
                case '.': desc = 'suelo'; break;
                case '>': desc = 'salida'; break;
                default: desc = 'espacio vacío';
            }
            descriptions.push(`${dir.name}: ${desc}`);
        }
    }
    return descriptions.join(', ');
}

// Mover al jugador
function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    if (map[newY] && map[newY][newX]) {
        if (map[newY][newX] === '>') {
            victoryModal.style.display = 'block';
            continueBtn.focus();
        } else if (map[newY][newX] !== '#') {
            map[playerY][playerX] = '.';
            playerX = newX;
            playerY = newY;
            map[playerY][playerX] = '@';
            drawMap();
            updatePositionInfo();
            statusMessage.textContent = `Te has movido a fila ${playerY + 1}, columna ${playerX + 1}. ${getSurroundingDescription()}`;
        } else {
            statusMessage.textContent = `No puedes moverte allí. Hay una pared en dirección ${dx > 0 ? 'derecha' : dx < 0 ? 'izquierda' : dy < 0 ? 'arriba' : 'abajo'}.`;
        }
    }
}

// Event listeners
document.addEventListener('keydown', (e) => {
    const keys = {
        'ArrowUp': [0, -1], 'w': [0, -1], 'W': [0, -1],
        'ArrowDown': [0, 1], 's': [0, 1], 'S': [0, 1],
        'ArrowLeft': [-1, 0], 'a': [-1, 0], 'A': [-1, 0],
        'ArrowRight': [1, 0], 'd': [1, 0], 'D': [1, 0]
    };

    if (e.key in keys) {
        e.preventDefault();
        const [dx, dy] = keys[e.key];
        movePlayer(dx, dy);
    }

    if (e.key === 'Escape' && victoryModal.style.display === 'block') {
        victoryModal.style.display = 'none';
        initMap();
        drawMap();
        gameElement.focus();
    }
});

// Botón de continuar
continueBtn.addEventListener('click', () => {
    victoryModal.style.display = 'none';
    initMap();
    drawMap();
    gameElement.focus();
});

continueBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        victoryModal.style.display = 'none';
        initMap();
        drawMap();
        gameElement.focus();
    }
});

// Botón de reiniciar
resetBtn.addEventListener('click', () => {
    initMap();
    drawMap();
    gameElement.focus();
});

resetBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        initMap();
        drawMap();
        gameElement.focus();
    }
});

// Inicializar el juego
initMap();
drawMap();
gameElement.tabIndex = 0;

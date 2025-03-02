const menuIcon = document.getElementById("menuIcon");
const sidebar = document.getElementById("sidebar");

// Открытие/закрытие sidebar при нажатии на иконку
menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("active"); // Добавляем/убираем класс "active"
});

// Закрытие sidebar при клике вне его области
document.addEventListener("click", function (event) {
    if (event.target !== menuIcon && !sidebar.contains(event.target)) {
        sidebar.classList.remove("active"); // Закрываем sidebar
    }
});

const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 5 + 2, // Увеличили скорость
        opacity: Math.random(),
        angle: Math.random() * 2 - 1, // Наклон: случайное значение от -1 до 1
        drift: Math.random() * 2 - 1, // Смещение по горизонтали: от -1 до 1
    };
}

for (let i = 0; i < 100; i++) {
    snowflakes.push(createSnowflake());
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
        ctx.fill();
        ctx.closePath();

        // Движение снежинки
        snowflake.y += snowflake.speed; // Падение вниз
        snowflake.x += snowflake.drift; // Смещение в сторону

        // Если снежинка ушла за пределы экрана, возвращаем её в начало
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }

        // Если снежинка ушла за пределы экрана по горизонтали, возвращаем её
        if (snowflake.x > canvas.width || snowflake.x < 0) {
            snowflake.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawSnowflakes);
}

drawSnowflakes();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add("visible");
    } else {
        scrollToTopButton.classList.remove("visible");
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const overlay = document.getElementById("overlay");
const content = document.getElementById("content");

window.addEventListener("scroll", () => {
    // Вычисляем, насколько пользователь прокрутил страницу
    const scrollPosition = window.scrollY;

    // Вычисляем высоту главного экрана
    const mainScreenHeight = mainScreen.offsetHeight;

    // Максимальная прозрачность overlay (например, 0.7 для 70% затемнения)
    const maxOpacity = 0.7;

    // Вычисляем текущую прозрачность в зависимости от прокрутки
    let opacity = scrollPosition / mainScreenHeight;

    // Ограничиваем прозрачность, чтобы она не превышала maxOpacity
    if (opacity > maxOpacity) {
        opacity = maxOpacity;
    }

    // Применяем прозрачность к overlay
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

});

const textElements = document.querySelectorAll(".text-animation");

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

textElements.forEach(element => {
    textObserver.observe(element);
});

// Получаем элементы кнопок
document.addEventListener("DOMContentLoaded", () => {
    // ... (остальной код)

    // Получаем элементы кнопок
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");
    const rotateButton = document.getElementById("rotateButton");
    const downButton = document.getElementById("downButton");

    // Обработчики событий для кнопок
    leftButton.addEventListener("click", () => {
        console.log("Left button clicked"); // Отладка
        if (!isGameRunning) return;
        if (!collide(currentPiece, currentPiece.x - 1, currentPiece.y)) {
            currentPiece.x--;
            drawBoard();
        }
    });

    rightButton.addEventListener("click", () => {
        console.log("Right button clicked"); // Отладка
        if (!isGameRunning) return;
        if (!collide(currentPiece, currentPiece.x + 1, currentPiece.y)) {
            currentPiece.x++;
            drawBoard();
        }
    });

    rotateButton.addEventListener("click", () => {
        console.log("Rotate button clicked"); // Отладка
        if (!isGameRunning) return;
        const rotated = rotatePiece(currentPiece.shape);
        if (!collide({ ...currentPiece, shape: rotated }, currentPiece.x, currentPiece.y)) {
            currentPiece.shape = rotated;
            drawBoard();
        }
    });

    downButton.addEventListener("click", () => {
        console.log("Down button clicked"); // Отладка
        if (!isGameRunning) return;
        if (!collide(currentPiece, currentPiece.x, currentPiece.y + 1)) {
            currentPiece.y++;
            drawBoard();
        }
    });

    const canvas = document.getElementById("tetrisCanvas");
    const context = canvas.getContext("2d");
    const nextPieceCanvas = document.getElementById("nextPieceCanvas");
    const nextPieceContext = nextPieceCanvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const levelElement = document.getElementById("level");
    const startButton = document.getElementById("startButton");

    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;
    const COLORS = ["white", "purple", "red", "yellow"]; // Цвета фигур
    let score = 0;
    let level = 1;
    let board = [];
    let currentPiece;
    let nextPiece;
    let gameInterval;
    let isGameRunning = false;

    // Инициализация игрового поля
    function initBoard() {
        for (let row = 0; row < ROWS; row++) {
            board[row] = [];
            for (let col = 0; col < COLS; col++) {
                board[row][col] = 0;
            }
        }
    }

    // Создание новой фигуры
    function createPiece() {
        const pieces = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[1, 1, 1], [0, 1, 0]], // T
            [[1, 1, 0], [0, 1, 1]], // Z
            [[0, 1, 1], [1, 1, 0]], // S
            [[1, 1, 1], [1, 0, 0]], // L
            [[1, 1, 1], [0, 0, 1]], // J
        ];
        const randomIndex = Math.floor(Math.random() * pieces.length);
        return {
            shape: pieces[randomIndex],
            color: COLORS[Math.floor(Math.random() * COLORS.length)], // Случайный цвет
        };
    }

    // Отрисовка фигуры
    function drawPiece(piece, offsetX, offsetY, context) {
        piece.shape.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value) {
                    context.fillStyle = piece.color;
                    context.fillRect((offsetX + j) * BLOCK_SIZE, (offsetY + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    context.strokeStyle = "black";
                    context.strokeRect((offsetX + j) * BLOCK_SIZE, (offsetY + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
    }

    // Отрисовка игрового поля
    function drawBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        board.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value) {
                    context.fillStyle = value;
                    context.fillRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    context.strokeStyle = "black";
                    context.strokeRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
        if (currentPiece) {
            drawPiece(currentPiece, currentPiece.x, currentPiece.y, context);
        }
    }

    // Проверка столкновений
    function collide(piece, offsetX, offsetY) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                if (piece.shape[i][j] && (board[offsetY + i] && board[offsetY + i][offsetX + j]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Фиксация фигуры на поле
    function mergePiece() {
        currentPiece.shape.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value) {
                    board[currentPiece.y + i][currentPiece.x + j] = currentPiece.color;
                }
            });
        });
    }

    // Очистка заполненных строк
    function clearLines() {
        let linesCleared = 0;
        for (let i = ROWS - 1; i >= 0; i--) {
            if (board[i].every(cell => cell !== 0)) {
                board.splice(i, 1);
                board.unshift(new Array(COLS).fill(0));
                linesCleared++;
            }
        }
        if (linesCleared > 0) {
            score += linesCleared * 100;
            scoreElement.innerText = score;
            if (score % 500 === 0) {
                level++;
                levelElement.innerText = level;
                clearInterval(gameInterval);
                gameInterval = setInterval(update, 1000 / level);
            }
        }
    }

    // Обновление игры
    function update() {
        if (collide(currentPiece, currentPiece.x, currentPiece.y + 1)) {
            mergePiece();
            clearLines();
            currentPiece = {
                ...createPiece(),
                x: Math.floor(COLS / 2) - Math.floor(nextPiece.shape[0].length / 2),
                y: 0,
            };
            nextPiece = createPiece();
            drawNextPiece();
            if (collide(currentPiece, currentPiece.x, currentPiece.y)) {
                clearInterval(gameInterval);
                isGameRunning = false;
                alert("Игра окончена! Счет: " + score);
                initBoard();
                score = 0;
                level = 1;
                scoreElement.innerText = score;
                levelElement.innerText = level;
            }
        } else {
            currentPiece.y++;
        }
        drawBoard();
    }

    // Отрисовка следующей фигуры
    function drawNextPiece() {
        nextPieceContext.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
        drawPiece(nextPiece, 1, 1, nextPieceContext);
    }

    // Управление с клавиатуры
    document.addEventListener("keydown", (event) => {
        if (!isGameRunning) return;
        if (event.key === "ArrowLeft" && !collide(currentPiece, currentPiece.x - 1, currentPiece.y)) {
            currentPiece.x--;
        } else if (event.key === "ArrowRight" && !collide(currentPiece, currentPiece.x + 1, currentPiece.y)) {
            currentPiece.x++;
        } else if (event.key === "ArrowDown" && !collide(currentPiece, currentPiece.x, currentPiece.y + 1)) {
            currentPiece.y++;
        } else if (event.key === " ") {
            const rotated = rotatePiece(currentPiece.shape);
            if (!collide({ ...currentPiece, shape: rotated }, currentPiece.x, currentPiece.y)) {
                currentPiece.shape = rotated;
            }
        }
        drawBoard();
    });

    // Поворот фигуры
    function rotatePiece(piece) {
        const N = piece.length;
        const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse());
        return rotated;
    }

    // Запуск игры
    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        initBoard();
        currentPiece = {
            ...createPiece(),
            x: Math.floor(COLS / 2) - 2,
            y: 0,
        };
        nextPiece = createPiece();
        drawNextPiece();
        gameInterval = setInterval(update, 1000 / level);
    }

    // Обработчик кнопки старта
    startButton.addEventListener("click", startGame);
});
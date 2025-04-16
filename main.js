let inputdir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let snakearr = [{ x: 10, y: 10 }];
let food = { x: 13, y: 15 };

document.getElementById("highScoreBox").innerText = `High Score: ${highScore}`;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return (
        snake[0].x >= 20 || snake[0].x <= 0 ||
        snake[0].y >= 20 || snake[0].y <= 0
    );
}

function gameEngine() {
    if (isCollide(snakearr)) {
        alert("Game Over! Press OK to restart.");
        inputdir = { x: 0, y: 0 };
        snakearr = [{ x: 10, y: 10 }];
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        score = 0;
        document.getElementById("highScoreBox").innerText = `High Score: ${highScore}`;
    }

    if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2, b = 18;
        food = {
            x: Math.floor(a + (b - a) * Math.random()),
            y: Math.floor(a + (b - a) * Math.random())
        };
        score++;
        document.getElementById("scoreBox").innerText = "Score: " + score;
    }

    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? "head" : "snake");
        board.appendChild(snakeElement);
    });

    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            inputdir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputdir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputdir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputdir = { x: 1, y: 0 };
            break;
    }
});

document.getElementById("speedRange").addEventListener("input", e => {
    speed = Number(e.target.value);
    document.getElementById("speedValue").textContent = speed;
});

window.requestAnimationFrame(main);

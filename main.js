let inputdir = { x: 0, y: 0 };

let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakearr = [
    { x: 10, y: 10 }
];
food = { x: 13, y: 15 };




// main logic making in this class 
function main(ctime) {
    window.requestAnimationFrame(main);
    //fps counting and speed controll of this game
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

function isCollide(snake) {
    //return false;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
}
    if (snake[0].x>=20 ||snake[0].x<=0 ||snake[0].y>=20 || snake[0].y<=0) 
    {
        return true;
    }

}
function gameEngine() {
    //part  1 updating the sname array of this game 
    if (isCollide(snakearr)) {
        inputdir = { x: 0, y: 0 };
        alert("GAME OVER PRESS ENTER TO RE START....");
        snakearr = [
            { x: 10, y: 10 }
        ];
        score=0;
    }
    // if the snake eats the  food 

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 8, b = 15;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score++;
        console.log(score);
    }

    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        //const element = array[i];
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;
    // part 2  dispaling the snake food
    board.innerHTML = "score :"+score;

    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;

        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //   DISPALY food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }//stating the game 

    switch (e.key) {
        case "ArrowUp":
           // console.log("arrowUP");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
          //  console.log("arrowdown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
          //  console.log("arrowleft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
           // console.log("arrowrFight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
    }

})
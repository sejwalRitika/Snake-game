// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('images/food.mp3');
const gameOverSound = new Audio('images/gameover.wav');
const moveSound = new Audio('images/move.mp3');
const musicSound = new Audio('images/muisc.mp3');
let speed = 19;
let Score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };



// Game Functions 
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;

    }

}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any Key to Play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        Score = 0;

    }
    // If you have eaten  the food increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        Score += 1;
        if (Score > hiScoreval) {
            hiScoreval = Score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreval))
            hiScorebox.innerHTML = "hiScore: " + hiScoreval;
        }
        Scorebox.innerHTML = "Score:" + Score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }
    // Moving tha snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display  the snake and Food
    // Display  the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
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
        //  Display  the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}












// Main logic Starts here
musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    hiScoreval = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreval))
} else {
    hiScore = JSON.parse(hiScore);
    hiScorebox.innerHTML = "hiScore: " + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrownLeft":
            console.log("ArrownLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
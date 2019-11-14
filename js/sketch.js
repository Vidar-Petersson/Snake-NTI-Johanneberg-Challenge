let canvas;
let snakes = [];
let players = 1;
let scaling = 25;
let food;
let scaledSpeed = 7;
let scaledWidth;
let scaledHeight;
let highscore = 0;
let score = 0;
let scoreboard;
let playerRadio;

//Setup - initializes canvas, snakes, food, score and player options
function setup() {
    canvas = createCanvas((floor(windowHeight*0.65/scaling)*scaling), (floor(windowHeight*0.65/scaling)*scaling));
    scaledWidth = floor(width / scaling);
    scaledHeight = floor(height / scaling);
    frameRate(scaledSpeed);
    
    for (let i = 0; i < players; i++) {
        snakes[i] = new Snake();
    }
    food = new Food();
    food.location(snakes);
    
    scoreboard = createP();
    createP("Select number of players below: ");
    playerRadio = createRadio();
    playerRadio.option("1", 1).checked = true;
    playerRadio.option("2", 2);
    playerRadio.option("3", 3);
    playerRadio.changed(setPlayers);
}

//Sets number of players according to input from radio
function setPlayers() {
    players = playerRadio.value();
    snakes = [];
    for (let i = 0; i < players; i++) {
        snakes[i] = new Snake();
    }
}

//Assigning keys to each snake
function keyPressed() {
    let keys = {
        LEFT : [LEFT_ARROW, 65, 74],
        RIGHT : [RIGHT_ARROW, 68, 76],
        UP : [UP_ARROW, 87, 73],
        DOWN : [DOWN_ARROW, 83, 75],
    };
    for (let i=0; i < snakes.length; i++) {
        if (keyCode === keys.LEFT[i]) {
            snakes[i].setDir(-1, 0);
        } else if (keyCode === keys.RIGHT[i]) {
            snakes[i].setDir(1, 0);
        } else if (keyCode === keys.UP[i]) {
            snakes[i].setDir(0, -1);
        } else if (keyCode === keys.DOWN[i]) {
            snakes[i].setDir(0, 1);
        }
    }
}

//Signals game over and restarts the game
function endGame(snake) {
        window.alert("Game over, player " + (snake+1) + " lost! Restart?");
        score = 0;
        for (let i = 0; i < players; i++) {
            snakes[i] = new Snake();
        }
        food = new Food();
        food.location(snakes);
}

//Keeps track of current score and highscore
function checkScore(i) {
    if (snakes[i].body.length > score) {
        score = snakes[i].body.length;
        scoreboard.html("Score: " + score + " Highscore: " + highscore);
        if (score >= highscore) {
            highscore = score;
            scoreboard.html("Score: " + score + " Highscore: " + highscore);
        }
    }
}

//Updates the canvas
function draw() {
    scale(scaling);
    background(222);
    noStroke();

    food.show();
    for (let i=0; i < snakes.length; i++) {
        snakes[i].update();
        snakes[i].show(i);
        checkScore(i);
        
        if (snakes[i].checkCollision(snakes)) {
            endGame(i);
        }
        if (snakes[i].eat(food.position)) {
            food.location(snakes);
        }
    }
}
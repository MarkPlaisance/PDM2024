let mike;
let rotation = 0;
let score = 0;
let speed = 3;
let timeRemaining = 15;
let gameOver = false;
let success, fail, normal;
let lastAttempt; 

function preload(){
  mike = loadImage('assets/mike.jpg');
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES)

  success = color('blue');
  fail = color('red');
  normal = color('white');
  lastAttempt = normal;
}

function draw() {
  background(lastAttempt);

  if(gameOver){
    gameDone();
  } else{
    playing();
  }
}

function playing(){
    push();
    translate(width/2, height/2)
    rotate (rotation += speed);
    image(mike, 0, 0, mike.width/3, mike.height/3);
  pop();

  if(rotation >= 360)
    rotation = 0;

  textSize(16);
  text("Score: " + score, 20, 20);
  text("Time: " + ceil(timeRemaining), width-100,20);

  timeRemaining -= deltaTime / 1000
  if (timeRemaining < 0){
    lastAttempt = normal;
    gameOver = true;
  }
}

function gameDone(){
  text("Time's Up!", 100, 100);
  text("Score: " + score, 100, 150)
  text("Press Space to Play Again.", 100, 200);
}

function keyTyped(){
  if (key === ' '){
    if (gameOver) {
      timeRemaining = 15;
      score = 0;
      gameOver = false;
    }
    else{
    if (rotation >= 350 || rotation <= 10){
      score++;
      lastAttempt = success;
    } else{
      score--;
      lastAttempt = fail;
      }
    }
  }
}
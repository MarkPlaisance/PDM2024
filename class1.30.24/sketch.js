let purple;
let gold;
let x;
let y;
const size = 100;
let dragging = false;

function setup() {
  createCanvas(400, 400);
  purple = color('#461D7C');
  gold = color('#FDD023');
  x = width / 2;
  y = height / 2;

  //rectMode(CENTER);
}

function draw() {
  background(220);

  if(mouseIsPressed){
    if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size){
      fill(purple);
      stroke(gold);

      x += mouseX - pmouseX;
      y += mouseY - pmouseY;
    }
  }
  else{
    fill(gold);
    stroke(0);
  }

  square(x,y,100);

  function mousePressed(){
    if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size){
      dragging = true;
      console.log("dragging");
    }
    function mouseReleased(){
      dragging = false;
    }
    function mouseDragged(){
      if (dragging){

        x += mouseX - pmouseX;
        y += mouseY - pmouseY;
      }
    }
  }
}
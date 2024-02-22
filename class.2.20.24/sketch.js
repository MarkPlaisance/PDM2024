let button1
let button2;
let soundfX;

function preload(){
soundFx = new Tone.Players; ({
  popcorn : "assets/popcorn.mp3",
  water : "assets/water.mp3",
}) //.toDestination(); //tells your audio to go to your speakers
}

// function keyPressed(){
//   if (key === 'q') {
//     soundFx.player('popcorn').start();
//   } else if (key === 'w'){
//     soundFx.player('water').start();
//   }
// }

function setup() {
  createCanvas(400, 400);

  button1 = createButton('Popcorn Maker');
  button1.position(85,150);
  button1.MousePressed(() => soundFx.player ('popcorn').start());

  button2 = createButton('Water Fall');
  button2.position(205,150);
  button2.MousePressed(() => soundFx.player ('water').start());

}

function play1(){
  soundFx.player ('popcorn').start();
}

function play2() {
  soundFx.player ('water').start();
}

function draw() {
  background(220, 100, 200);
  text("Press Q or W", 120, 150)
}

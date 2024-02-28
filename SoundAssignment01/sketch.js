/*
Name : Mark Plaisance
Date : 02/24/2024
Class : CSC 2463
*/

let sounds = new Tone.Players ({
  'Hurt' : "assets/hurt.mp3",
  'Popcorn' : "assets/popcorn.mp3",
  'Water' : "assets/water.mp3",
  'Bruh' : "assets/bruh.mp3"
});
let button1, button2, button3, button4;
let delAmt = new Tone.FeedbackDelay ("8n",0.5);
let distAmt = new Tone.Distortion (0.5);
sounds.toDestination();
let delaySlider, fbSlider, distSlicer;

sounds.connect (delAmt);
delAmt.connect(distAmt);
distAmt.toDestination();

function setup() {
  createCanvas(400, 400);

  button1 = createButton('Popcorn');
  button1.position(85,150);
  button1.mousePressed(() =>sounds.player("Popcorn").start());

  button2 = createButton('Hurt Sound');
  button2.position(85,75);
  button2.mousePressed(() =>sounds.player("Hurt").start());

  button3 = createButton('Water');
  button3.position(250,75);
  button3.mousePressed(() =>sounds.player("Water").start());

  button4 = createButton('Bruh Sound Effect 2');
  button4.position(250,150);
  button4.mousePressed(() =>sounds.player("Bruh").start());


  delaySlider = createSlider (0.,0.9,0, 0.05);
  delaySlider.position (120,200);
  delaySlider.mouseMoved(() => {
  delay.delayTime.value = delaySlider.value();
  })

  fbSlider = createSlider (0,0.9,0,0.05);
  fbSlider.position(120,250);
  fbSlider.mouseMoved(() => delAmt.feedback.value = fbSlider.value());

  distSlider = createSlider(0,0.9,0,0.5);
  distSlider.position(120,300);
  distSlider.mouseMoved(() => distAmt.distortion = distSlider.value());

}


function draw() {
  background(200,20,0);
  text ("Add delay with slider", 130, 300);
  text ("Add distortion with slider", 130, 200);
  text("Add Feedback with slider", 130, 250 );
}
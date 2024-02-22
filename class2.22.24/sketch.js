let sounds = new Tone.Players ({
  'popcorn' : "assets/popcorn.mp3",
  'water' : "assets/water.mp3",
});
let delAmt = new Tone.FeedbackDelay ("8n", 0.5); //Delay
let distAmt = new Tone.Distortion (0.5); //Distortion
let button1, button2;
let delaySlider, fbSlider, distSlider;

sounds.connect(delAmt);
delAmt.connect(distAmt);
delAmt.toDestination();


function setup() {
  createCanvas(400, 400);

  button1 = createButton('Popcorn Maker');
  button1.position (85, 150);
  button1.mousePressed(() => sounds.player('popcorn').start())

  delaySlider = createSlider(0, 1, 0, 0.05);
  delaySlider.position (120, 200);
  delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value())

  fbSlider = createSlider (0, 0.9, 0, 0.05);
  fbSlider.position (120, 250);
  fbSlider.mouseMoved(() => delAmt.feedback.value = fbsSlider.value ());

  distSlider = createSlider (0, 0.9, 0, 0.5);
  distSlider.position (120, 300);
  distSlider.mouseMoved(() => distAmt.distortion = distSlider.value());
}

function draw() {
  background(220, 100, 220);
}

let filter = new Tone.Filter(1, "highpass");
let syn = new Tone.Synth({
  oscillator:{
    type: "sawtooth"
  },

  envelope:{
    attack: 2,
    decay: 0.5,
    sustain: 0.5,
    release: 1,
  }

}).connect(filter);

filter.toDestination();


function preload(){
  img = loadImage ("assets/boom.jpg");
}


function setup() {
  createCanvas(400, 400);
}


function draw() {
if(mouseIsPressed){
  background(img);
} else if(mouseIsPressed === false){
    background(240);
    text ('BOOM', width/2-50, height/2);
  }

}


function mousePressed(){
    syn.triggerAttackRelease("C2", "16n");
    filter.frequency.rampTo(7000, 0.1);

}


function mouseReleased(){
    filter.frequency.value = 1;
}
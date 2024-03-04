let sine = new Tone.Synth({
  oscillator: {
    type: 'sine'
  }
}).toDestination();

let square = new Tone.Synth({
  oscillator: {
    type: 'square'
  }
}).toDestination();

let triangle = new Tone.Synth({
  oscillator: {
    type: 'triangle'
  }
}).toDestination();

let saw = new Tone.Synth({
  oscillator: {
    type: 'sawtooth'
  }
}).toDestination();



function setup() {
  createCanvas(400, 400);
}


function keyPressed(){
  if (key === 'q'){sine.TriggerAttackRelease('c4', 1);
} else if (key =='w') {square.TriggerAttackRelease('c4',1)
} else if (key =='e') {triangle.TriggerAttackRelease('c4',1)
} else if (key =='r') {saw.TriggerAttackRelease('c4',1)};
}

function draw() {
  background(220, 100, 100);
  text ('Q = Sine', 150, 150);
  text ('W = Squre', 150, 175);
  text ('E = Triangle', 150, 200);
  text ('R = Sawtooth', 150, 225);

}


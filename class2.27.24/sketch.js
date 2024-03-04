
let synth1 = new Tone.PolySynth(Tone.Synth);
let synth2 = new Tone.PolySynth(Tone.DuoSynth);

let bend = new Tone.PitchShift();
bend.ptch - 0;

synth1.connect(bend)
bend.toDestination();

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5',
}

function setup() {
  createCanvas(400, 400);

  mySelect = createSelect();
  mySelect.position(100,100);
  mySelect.option('Simple Synth');
  mySelect.option('Duo Synth');
  mySelect.selected("Simple Synth");


  pitchSlider = createSlider(0, 12, 0, 0.1);
  pitchSlider.position (120, 200);
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());

}


function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttackRelease(playNotes);
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.3');
}



function draw() {
  background(100, 220, 150);
text ('play A-K for synth', 100, 200);
}

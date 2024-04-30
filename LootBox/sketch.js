/* TODO
  Select, import, and implement item pictures.
  Put 1 item in each rarity so i can test the random 0-100 and the switch cases
  Lay out the items i want and how many so i can divide them into the different switch cases
  Music: Box opening sound effect, sound effect for each item rarity, background music 
  Arduino input and output: button to open it, light when opening or rbg light indicating rarity
*/


let chestOpened = false; // Start with chest closed
let items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9", "i10"]; // All items (currently nameless) that can be pulled || Eventually all pngs
let rarities = [1,2,3,4,5,6,7,8,9,10]; // Rarirty values
let chestOpenCount = 0; // Amount of chests opens
let itemCounts = {}; // Number of items pulled
let popupText = ""; // Blank String for pop up text
let chestImgOpen, chestImgClose; // Load chest images
let rarity = ["Common","Uncommon","Rare","Epic", "Lengenary","LMtT"]; //Literally mike the tiger (0.1% chance of pulling) "Holy crap you literally pulled mike the tiger!"
//ive got a good feeling i should just initialize rarity as nothing cause i typed it like theyre multiple options but i think its just saying rarity is all of those

// Preloads images
function preload(){
  chestImgOpen = loadImage('assets/chestClose.png');
  chestImgClose = loadImage('assets/chestOpen.png');
}

// Sets up canvas and initializeItemCounts
function setup() {
  createCanvas(800, 600);
  initializeItemCounts();
}

// Draws everything, calls functions for drawn elements
function draw() {
  background(220);
  drawChest();
  drawCounter();
  drawItemCount();

  if (chestOpened){
    displayPopup();
  }
}

// Draws open or closed chest depending on chestOpened state
function drawChest(){
  if(!chestOpened){
    image(chestImgOpen, 190, 200, chestImgOpen.width, chestImgOpen.height);
  } else {
    image(chestImgClose, 190, 200, chestImgClose.width, chestImgClose.height);
  }
}

// Draws the counter of chests opened
function drawCounter(){
  fill(0);
  textSize(18);
  text("Chest Opened: " + chestOpenCount, 100, 22);
}

// Handles pressing the mouse over area drawn over chest
function mousePressed(){
  if (!chestOpened && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > 500 - 100 && mouseY < 500 + 100){
    openChest();
    updateItemCounts();
    console.log("Chest Opened"); // Log to console for debugging
  } else {
    chestOpened = false;
  }
}

// TODO Most of this function outdated and needs to call itemPull instead of rolling for the item itself
function openChest(){
  chestOpened = true;
  let randomIndex = floor(random(items.length));
  let item = items[randomIndex];
  let rarity = rarities[randomIndex];
  console.log("You got: ", item, " with rarity: ", rarity); // Log to console for debugging
  popupText = ("You got: " + item + " with rarity: " + rarity + "\nClick to Continue");
  chestOpenCount++;
  displayPopup();
}

// TODO fix how these work
function initializeItemCounts(){
  for (let i = 0; i < items.length; i++){
    itemCounts[items[i]] = 0;
  }
}

// TODO fix this so it properly counts item opened this
// This could most likely be an extension of itemPull to know where to ++
function updateItemCounts(){
  let randomIndex = floor(random(items.length));
  let item = items[randomIndex]; // I feel like this shouldnt be random
  itemCounts[item]++;
}

// Pops up (currently) a white square with text for item opened
function displayPopup(){
  fill(255);
  rectMode(CENTER);
  rect(400, 250, 220, 200);
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0);
  text(popupText, width / 2, 255);
}

// Draw the number of each item pulled on screen
function drawItemCount(){
  fill(0);
  textSize(18);
  let yPos = 22;
  for (let item in itemCounts){
    text("You Have " + itemCounts[item] + " " + item, 700, yPos);
    yPos += 20;
  }
}

// Rolls 0-100 to pick rarity, then rolls again within rarity to pick item
function itemPull(){

  rand = Math.floor(Math.random() * 101); // Random 0-100
  if (rand <= 100 && rand > 55){
    rarity = "Common";
  } else if (rand <= 55 && rand > 31) {
    rarity = "Uncommon";
  } else if (rand <= 31 && rand > 16) {
    rarity = "Rare";
  } else if (rand <= 16 && rand > 6) {
    rarity = "Epic";
  } else if (rand <= 6 && rand > 1) {
    rarity = "Legendary";
  } else if (rand <= 1) {
    rarity = "LMtT";
  }

  // Takes the rarity and rolls for an item in that rarity
  switch(rarity){ 
    case Common:
      //Random number to pick item
      break;
    case Uncommon:
      //RANDOM
      break;
    case Rare:
      //RANDOM
      break;
    case Epic:
      //RANDOM
      break;
    case Legendary:
      //RANDOM
      break;
    case LMtT:
      //MIKE
      break;
  }
}

//im a one man army call me ghengis khan
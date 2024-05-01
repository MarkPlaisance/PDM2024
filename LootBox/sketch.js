/* TODO
  Select, import, and implement item pictures.
  Put 1 item in each rarity so i can test the random 0-100 and the switch cases
  Lay out the items i want and how many so i can divide them into the different switch cases
  Music: Box opening sound effect, sound effect for each item rarity, background music 
  Arduino input and output: button to open it, light when opening or rbg light indicating rarity
*/


let chestOpened = false; // Start with chest closed
// let itemList = [
//   c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, // Common
//   u1, u2, u3, u4, u5, u6, u7, u8, // Uncommon
//   r1, r2, r3, r4, r5, r6, // Rare
//   e1, e2, e3, e4, // Epic
//   l1, l2, // Legendary
//   m1 // Mike
// ]; // All items (currently nameless) that can be pulled || Eventually all pngs
let chestOpenCount = 0; // Amount of chests opens
let itemCounts = {}; // Number of items pulled
let popupText = ""; // Blank String for pop up text
let chestImgOpen, chestImgClose; // Load chest images
let itemPulled;
let rarity = [Common, Uncommon, Rare, Epic, Legendary, LMtT]; // TODO proper way to declare these 
let itemIterator;
let rarityShort;
//ive got a good feeling i should just initialize rarity as nothing cause i typed it like theyre multiple options but i think its just saying rarity is all of those

// Preloads images
function preload(){
  chestImgOpen = loadImage('assets/chestClose.png');
  chestImgClose = loadImage('assets/chestOpen.png');
}

// Sets up canvas and initializeItemCounts
function setup() {
  createCanvas(800, 600);
  //initializeItemCounts();
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
    //updateItemCounts();
    console.log("Chest Opened"); // Log to console for debugging
  } else {
    chestOpened = false;
  }
}

// TODO Most of this function outdated and needs to call itemPull instead of rolling for the item itself
function openChest(){
  chestOpened = true;
  itemPull();


  console.log("You got: ", itemPulled, " with rarity: ", rarity); // Log to console for debugging
  popupText = ("You got: " + itemPulled + " with rarity: " + rarity + "\nClick to Continue");
  chestOpenCount++;
  displayPopup();
}

// TODO fix how these work
// function initializeItemCounts(){
//   for (let i = 0; i < items.length; i++){
//     itemCounts[items[i]] = 0;
//   }
// }

// TODO fix this so it properly counts item opened this
// This could most likely be an extension of itemPull to know where to ++
// function updateItemCounts(){
//   let randomIndex = floor(random(items.length));
//   let item = items[randomIndex]; // I feel like this shouldnt be random
//   itemCounts[item]++;
// }

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
function itemPull(rarity){

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
      rarityShort = 'c'; // Used to combine with rand for item
      itemIterator = Math.floor(Math.random() * 10) + 1; // Random [1-10]
      itemIterator = num.toString(); // Concert rand to string
      itemPulled = rarity.concat(itemIterator); // Combines rarityShort with rand 1-10
      break;

    case Uncommon:
      rarityShort = 'u';
      Math.floor(Math.random() * 8) + 1;
      itemIterator = num.toString();
      itemPulled = rarity.concat(itemIterator);
      break;

    case Rare:
      rarityShort = 'r';
      Math.floor(Math.random() * 6) + 1;
      itemIterator = num.toString();
      itemPulled = rarity.concat(itemIterator);
      break;

    case Epic:
      rarityShort = 'e';
      Math.floor(Math.random() * 4) + 1;
      itemIterator = num.toString();
      itemPulled = rarity.concat(itemIterator);
      break;

    case Legendary:
      rarityShort = 'l';
      Math.floor(Math.random() * 2) + 1;
      itemIterator = num.toString();
      itemPulled = rarity.concat(itemIterator);
      break;

    case LMtT:
      itemPulled = l1;
      break;
  }
}

//im a one man army call me ghengis khan
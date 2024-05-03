/* TODO
  Software:
    Select, import item pictures 
    Maybe put short delay between open attempt so sound effects have time to play
  Music:
    Box opening sound effect (extremely short)
    Sound effect for each item rarity
    Background music
  Arduino:
    Button to open chest (AND??) joystick as a mouse replacement
    Light when opening OR rbg light indicating rarity (Should be able to use rarityColor for RBG LED)
*/

let chestOpened = false;
let chestOpenCount = 0;
let popupText = "";
let chestImgOpen, chestImgClose;
let itemPulled;
let rarity;
let itemImages = {};
let itemPulledImage;
let itemCounts = {};
let rarityColor;
const itemMap = {
  'c1': { name: 'Common 1', image: 'assets/chestClose.png'}, // Locket Basement
  'c2': { name: 'Common 2', image: 'assets/chestClose.png'}, // Herget Hall
  'c3': { name: 'Common 3', image: 'assets/chestClose.png'}, // Leaky PFT
  'c4': { name: 'Common 4', image: 'assets/chestClose.png'}, // Library w/ tarps
  'c5': { name: 'Common 5', image: 'assets/chestClose.png'}, // Oaks trees
  'c6': { name: 'Common 6', image: 'assets/chestClose.png'}, // t-33 fighter jet
  'c7': { name: 'Common 7', image: 'assets/chestClose.png'}, // never ending construction
  'c8': { name: 'Common 8', image: 'assets/chestClose.png'}, // tigerland
  'c9': { name: 'Common 9', image: 'assets/chestClose.png'}, // Himes
  'c10':{ name: 'Common 10',image: 'assets/chestClose.png'}, // Mounds

  'u1': { name: 'Uncommon 1', image: 'assets/chestClose.png'}, // Football locker room
  'u2': { name: 'Uncommon 2', image: 'assets/chestClose.png'}, // Enchanted Forest
  'u3': { name: 'Uncommon 3', image: 'assets/chestClose.png'}, // Pregame
  'u4': { name: 'Uncommon 4', image: 'assets/chestClose.png'}, // Canes 1
  'u5': { name: 'Uncommon 5', image: 'assets/chestClose.png'}, // Japanese magnolias
  'u6': { name: 'Uncommon 6', image: 'assets/chestClose.png'}, // Memorial Tower
  'u7': { name: 'Uncommon 7', image: 'assets/chestClose.png'}, // Azalea Camelia dorms
  'u8': { name: 'Uncommon 8', image: 'assets/chestClose.png'}, // Brian Kelly

  'r1': { name: 'Rare 1', image: 'assets/chestClose.png'}, // Mike's Habitat
  'r2': { name: 'Rare 2', image: 'assets/chestClose.png'}, // Tiger Band
  'r3': { name: 'Rare 3', image: 'assets/chestClose.png'}, // 2019 Football team
  'r4': { name: 'Rare 4', image: 'assets/chestClose.png'}, // PFT Panera
  'r5': { name: 'Rare 5', image: 'assets/chestClose.png'}, // Dylan Crews
  'r6': { name: 'Rare 6', image: 'assets/chestClose.png'}, // Mike Mascot
  
  'e1': { name: 'Epic 1', image: 'assets/chestClose.png'}, // JD5
  'e2': { name: 'Epic 2', image: 'assets/chestClose.png'}, // Paul Skeenes
  'e3': { name: 'Epic 3', image: 'assets/chestClose.png'}, // Womens Baketball team
  'e4': { name: 'Epic 4', image: 'assets/chestClose.png'}, // Gymnastics Team

  'l1': { name: 'Legendary 1', image: 'assets/chestClose.png'}, // Death Valley
  'l2': { name: 'Legendary 2', image: 'assets/chestClose.png'}, // Joe Burrow

  'm1': { name: 'LMtT', image: 'assets/mike.jpg_large'}  // Mike the Tier
}
for (let key in itemMap){
  itemCounts[key] = 0;
}

// Preloads images
function preload(){
  chestImgOpen = loadImage('assets/chestClose.png');
  chestImgClose = loadImage('assets/chestOpen.png');

  loadImage('assets/chestClose.png')
  loadImage('assets/mike.jpg_large');
  
  for (let key in itemMap){ // Iterates through itemMap and loads all item images
    itemImages[key] = loadImage(itemMap[key].image);
  }
}

// Sets up canvas
function setup() {
  createCanvas(800, 635);
}

// Draws everything, calls functions for drawn elements
function draw() {
  background(220);
  drawChest();
  drawChestCounter();
  drawItemCounts()

  if (chestOpened){
    displayPopup();
    drawItem(itemPulledImage);
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
function drawChestCounter(){
  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Chest Opened: " + chestOpenCount, 10, 10);
}

// Handles pressing the mouse over area drawn over chest
function mousePressed(){
  if (!chestOpened && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > 500 - 100 && mouseY < 500 + 100){
    openChest();
  } else {
    chestOpened = false;
  }
}

// Handles actions when chest opened, calls itemPull, displayPopup, increments chestOpenCount
function openChest(){
  chestOpened = true;
  chestOpenCount++;
  itemPull();
  popupText = ("You got: " + itemMap[itemPulled].name + " with rarity: " + rarity + "\nClick to Continue");

  displayPopup();
}

// Draws a list of every item and how many of each have been pulled
function drawItemCounts(){
  fill(0);
  textSize(18);
  textAlign(RIGHT, TOP);

  let yPos = 10;
  for (let key in itemCounts){
    let displayText = itemMap[key].name + ": " + itemCounts[key];
    text(displayText, width - 10, yPos);
    yPos += 20;
  }
}

// Draws the picture for the pulled item
function drawItem(itemPulledImage){
  image(itemPulledImage, 300, 150, 200, 200);
}

// Draws a colored rectangle corresponding to itemPulled rarity and popupText for itemPulled description
function displayPopup(){
  fill(rarityColor);
  strokeWeight(4);
  rectMode(CENTER);
  rect(400, 250, 260, 220);
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(0);
  text(popupText, width / 2, 60);
}

// Rolls 0-100 to pick rarity, then rolls again within rarity to pick item
function itemPull(){
  let rand;
  let itemIndex
  let itemRange;
  let rarityShort;

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
    case 'Common':
      rarityShort = 'c'; // Used to combine with rand for item
      itemRange = Math.floor(Math.random() * 10) + 1; // Random [1-10]
      itemIndex = itemRange.toString(); // Convert rand(itemRange) to string(itemIndex)
      itemPulled = rarityShort.concat(itemIndex); // Combines rarityShort with rand 1-10
      rarityColor = '#EBEBEB';
      // TODO Implement a "play sound effect" here based off rarity quality
      break;

    case 'Uncommon':
      rarityShort = 'u';
      itemRange = Math.floor(Math.random() * 8) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#44D5FF';
      // TODO Implement a "play sound effect" here based off rarity quality
      break;

    case 'Rare':
      rarityShort = 'r';
      itemRange = Math.floor(Math.random() * 6) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#C90000';
      // TODO Implement a "play sound effect" here based off rarity quality
      break;

    case 'Epic':
      rarityShort = 'e';
      itemRange = Math.floor(Math.random() * 4) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#BF00EE';
      // TODO Implement a "play sound effect" here based off rarity quality
      break;

    case 'Legendary':
      rarityShort = 'l';
      itemRange = Math.floor(Math.random() * 2) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#FFC127';
      // TODO Implement a "play sound effect" here based off rarity quality
      break;

    case 'LMtT':
      itemPulled = 'm1';
      rarityColor = '#FDD023';
      // TODO Implement a "play sound effect" here based off rarity quality (Tiger Rag!!)
      break;
  }
  itemPulledImage = itemImages[itemPulled];
  itemCounts[itemPulled]++
}

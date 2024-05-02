/* TODO
  Select, import, and implement item pictures.
  Music: Box opening sound effect, sound effect for each item rarity, background music 
  Arduino input and output: button to open it, light when opening or rbg light indicating rarity
*/

let chestOpened = false; // Start with chest closed
let chestOpenCount = 0; // Amount of chests opens
// let itemCounts = {}; // Number of items pulled
let popupText = ""; // Blank String for pop up text
let chestImgOpen, chestImgClose; // Load chest images
let itemPulled;
let rarity;
let itemImages = {};
let itemPulledPicture;

const itemMap = {
  // Map of all items TODO change each right element to image
  'c1': { name: 'Common 1', image: 'assets/chestClose.png'},
  'c2': { name: 'Common 2', image: 'assets/chestClose.png'},
  'c3': { name: 'Common 3', image: 'assets/chestClose.png'},
  'c4': { name: 'Common 4', image: 'assets/chestClose.png'},
  'c5': { name: 'Common 5', image: 'assets/chestClose.png'},
  'c6': { name: 'Common 6', image: 'assets/chestClose.png'},
  'c7': { name: 'Common 7', image: 'assets/chestClose.png'},
  'c8': { name: 'Common 8', image: 'assets/chestClose.png'},
  'c9': { name: 'Common 9', image: 'assets/chestClose.png'},
  'c10':{ name: 'Common 10',image: 'assets/chestClose.png'},
  'u1': { name: 'Uncommon 1', image: 'assets/chestClose.png'},
  'u2': { name: 'Uncommon 2', image: 'assets/chestClose.png'},
  'u3': { name: 'Uncommon 3', image: 'assets/chestClose.png'},
  'u4': { name: 'Uncommon 4', image: 'assets/chestClose.png'},
  'u5': { name: 'Uncommon 5', image: 'assets/chestClose.png'},
  'u6': { name: 'Uncommon 6', image: 'assets/chestClose.png'},
  'u7': { name: 'Uncommon 7', image: 'assets/chestClose.png'},
  'u8': { name: 'Uncommon 8', image: 'assets/chestClose.png'},
  'r1': { name: 'Rare 1', image: 'assets/chestClose.png'},
  'r2': { name: 'Rare 2', image: 'assets/chestClose.png'},
  'r3': { name: 'Rare 3', image: 'assets/chestClose.png'},
  'r4': { name: 'Rare 4', image: 'assets/chestClose.png'},
  'r5': { name: 'Rare 5', image: 'assets/chestClose.png'},
  'r6': { name: 'Rare 6', image: 'assets/chestClose.png'},
  'e1': { name: 'Epic 1', image: 'assets/chestClose.png'},
  'e2': { name: 'Epic 2', image: 'assets/chestClose.png'},
  'e3': { name: 'Epic 3', image: 'assets/chestClose.png'},
  'e4': { name: 'Epic 4', image: 'assets/chestClose.png'},
  'l1': { name: 'Legendary 1', image: 'assets/chestClose.png'},
  'l2': { name: 'Legendary 2', image: 'assets/chestClose.png'},
  'm1': { name: 'LMtT', image: 'assets/mike.jpg_large'}
}

// Preloads images
function preload(){
  chestImgOpen = loadImage('assets/chestClose.png');
  chestImgClose = loadImage('assets/chestOpen.png');

  loadImage('assets/mike.jpg_large');
  // for (let key in itemMap){ // Loads all item images
  //   itemImages[key] = loadImage(itemMap[key].image);
  // }
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
  //drawItemCount();

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

// Draw the number of each item pulled on screen
// function drawItemCount(){
//   fill(0);
//   textSize(18);
//   let yPos = 22;
//   for (let item in itemCounts){
//     text("You Have " + itemCounts[item] + " " + item, 700, yPos);
//     yPos += 20;
//   }
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
  //image(itemPulledPicture, 10, 10, 100, 100);
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
      break;

    case 'Uncommon':
      rarityShort = 'u';
      itemRange = Math.floor(Math.random() * 8) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      break;

    case 'Rare':
      rarityShort = 'r';
      itemRange = Math.floor(Math.random() * 6) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      break;

    case 'Epic':
      rarityShort = 'e';
      itemRange = Math.floor(Math.random() * 4) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      break;

    case 'Legendary':
      rarityShort = 'l';
      itemRange = Math.floor(Math.random() * 2) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      break;

    case 'LMtT':
      itemPulled = 'm1';
      break;
  }
 // getItemPicture(itemPulled);
}

//Theres a line in here breaking it
//THIS SHIT DONT WORK RIGHT
// function getItemPicture(itemPulled){
//   itemPulledPicture = image(itemMap[itemPulled]);
// }

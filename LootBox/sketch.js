/* TODO
  Generate Item Rarity. Most likely using random number gen and switch cases with the different ranges (may have old csc1350 code)
  Select, import, and implement item pictures. Switch cases for matching item names to pick which picture to show when item is pulled
  
  Music: Box opening sound effect, sound effect for each item rarity, background music 
  Arduino input and output: button to open it, light when opening or rbg light indicating rarity
*/


let chestOpened = false;
let items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9", "i10"]; // All items (currently nameless) that can be pulled || Eventually all pngs
//let rarities = [1,2,3,4,5,6,7,8,9,10]; // Rarirty values
let chestOpenCount = 0; // Amount of chests opens
let itemCounts = {}; // Number of items pulled
let popupText = "";
let chestImgOpen, chestImgClose;
let rarity = ["Common","Uncommon","Rare","Epic", "Lengenary","LMtT"]; //Literally mike the tiger (0.1% chance of pulling) "Holy crap you literally pulled mike the tiger!"

function preload(){
  chestImgOpen = loadImage('assets/chestClose.png');
  chestImgClose = loadImage('assets/chestOpen.png');
}

function setup() {
  createCanvas(800, 600);
  initializeItemCounts();
}

function draw() {
  background(220);
  drawChest();
  drawCounter();
  drawItemCount();

  if (chestOpened){
    displayPopup();
  }
}

function drawChest(){
  if(!chestOpened){
    image(chestImgOpen, 190, 200, chestImgOpen.width, chestImgOpen.height);
  } else {
    image(chestImgClose, 190, 200, chestImgClose.width, chestImgClose.height);
  }
}

function drawCounter(){
  fill(0);
  textSize(18);
  text("Chest Opened: " + chestOpenCount, 100, 22);
}

function mousePressed(){
  if (!chestOpened && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > 500 - 100 && mouseY < 500 + 100){
    openChest();
    chestOpenCount++;
    updateItemCounts();
    console.log("Chest Opened"); // Log to console for debugging
  } else {
    chestOpened = false;
  }
}

function openChest(){
  chestOpened = true;
  let randomIndex = floor(random(items.length));
  let item = items[randomIndex];
  let rarity = rarities[randomIndex];
  console.log("You got: ", item, " with rarity: ", rarity); // Log to console for debugging
  popupText = ("You got: " + item + " with rarity: " + rarity + "\nClick to Continue");
  displayPopup();
}

function initializeItemCounts(){
  for (let i = 0; i < items.length; i++){
    itemCounts[items[i]] = 0;
  }
}

function updateItemCounts(){
  let randomIndex = floor(random(items.length));
  let item = items[randomIndex];
  itemCounts[item]++;
}

function displayPopup(){
  fill(255);
  rectMode(CENTER);
  rect(400, 250, 220, 200);
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0);
  text(popupText, width / 2, 255);
}

function drawItemCount(){
  fill(0);
  textSize(18);
  let yPos = 22;
  for (let item in itemCounts){
    text("You Have " + itemCounts[item] + " " + item, 700, yPos);
    yPos += 20;
  }
}

function itemPull(){
  rand = Math.floor(Math.random() * 101); // Random 0-100
  switch(rand){
    case rand > 50:
      rarity = Common;
      break;
    // Calculate the and set up the other switch cases for the other odds
  }
}

/*
 TODO what up future me. finish up the rest of the switch cases. i still need to do the math on how i would break up the 1-100 for each rarity. after that set up a function
 that could just be another switch case for each rarity to do another random pull for each item in thar rariety
 For eamplem case Common: random 1-4 to decide which common item is drawn
*/
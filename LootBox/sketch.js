/* TODO
  Music:
    Background music
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
let lastChestOpenTime = 0;
let lastJoyStickPressTime = 0;
let sounds = new Tone.Players ({
  'bgm' : 'assets/bgm.wav', // bgm
  'buzzer' : 'assets/buzzer.mp3', // common
  'wow' : 'assets/wow.mp3', // uncommon
  'hooray' : 'assets/hooray.mp3', //rare
  'yippee' : 'assets/yippee.mp3', //epic
  'vinethud' : 'assets/vinethud.mp3', // legendary
  'meow' : 'assets/meow.mp3' //mike
})
const itemMap = {
  'c1': { name: 'The Lockett Basement', image: 'assets/locketBasement.jpg'},
  'c2': { name: 'Herget Hall', image: 'assets/hergetHall.webp'},
  'c3': { name: 'Leaky Patrick F. Taylor', image: 'assets/leakyPFT.webp'},
  'c4': { name: 'LSU Library', image: 'assets/lsuLibrary.jpg'},
  'c5': { name: 'Stately Oaks', image: 'assets/statelyOaks.jpg'},
  'c6': { name: 'T-33 Jet', image: 'assets/t33Jet.jpg'},
  'c7': { name: 'Never Ending Construction', image: 'assets/construction.jpg'},
  'c8': { name: 'Tigerland', image: 'assets/tigerland.jpg'},
  'c9': { name: 'Himes Hall', image: 'assets/himesHall.jpg'},
  'c10':{ name: 'Electric Scooter',image: 'assets/electricScooter.jpg'},

  'u1': { name: 'Football Locker Room', image: 'assets/footballLockerRooms.webp'},
  'u2': { name: 'Enchanted Forest', image: 'assets/enchantedForest.jpg'},
  'u3': { name: 'Pregame!', image: 'assets/pregame.jpg'},
  'u4': { name: "Rasing Cane's", image: 'assets/canes.jpg'},
  'u5': { name: 'Japanese Magnolias', image: 'assets/japaneseMagnolias.jpg'},
  'u6': { name: 'Memorial Towers', image: 'assets/memorialTower.jpg'},
  'u7': { name: 'Azalea & Camellia Hall', image: 'assets/azaleaCameliaHalls.jpg'},
  'u8': { name: 'Brian Kelly', image: 'assets/brianKelly.webp'},

  'r1': { name: "Mike's Habitat", image: 'assets/mikeHabitat.jpg'},
  'r2': { name: 'LSU Tiger Band', image: 'assets/tigerband.webp'},
  'r3': { name: '2019 LSU Football', image: 'assets/2019lsuFootball.jpg'},
  'r4': { name: 'PFT Panera Bread', image: 'assets/pftPanera.webp'},
  'r5': { name: 'Dylan Crews', image: 'assets/dylanCrews.webp'},
  'r6': { name: 'Mascot Mike', image: 'assets/mikeMascot.jpg'},
  
  'e1': { name: 'Jayden Daniels', image: 'assets/jaydenDaniels.jpg'},
  'e2': { name: 'Paul Skenes', image: 'assets/paulSkenes.jpg'},
  'e3': { name: 'Womens Basketball', image: 'assets/womensBasketball.jpg'},
  'e4': { name: 'LSU Gymnastics', image: 'assets/gymnastics.avif'},

  'l1': { name: 'THE GOAT', image: 'assets/joeBurrow.jpg'},
  'l2': { name: 'Death Valley', image: 'assets/tigerStadium.jpg'},

  'm1': { name: 'Mike The Tiger!!', image: 'assets/mike.jpg_large'}
}
for (let key in itemMap){
  itemCounts[key] = 0;
}

// Arduino initalizers
let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 3;
let circleRadius = 25;


sounds.toDestination();

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
  createCanvas(900, 635);
  sounds.player("bgm").start();


  // Arduino connection code below here
  port = createSerial();
  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mouseClicked(connect);
}

// Draws everything, calls functions for drawn elements
function draw() {
  background('#FFE891');
  drawChest();
  drawChestCounter();
  drawItemCounts();

  if (chestOpened){
    displayPopup();
    drawItem(itemPulledImage);
  }

  if (!chestOpened){
    port.write('000000' + "\n");
  }


  // Arduino code below here
  let str = port.readUntil("\n");
  let values = str.split(",");
  if (values.length > 2) {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);

    if (joyX > 0) {
      circleX += speed;
    } else if (joyX < 0) {
      circleX -= speed;
    }

    if (joyY > 0) {
      circleY += speed;
    } else if (joyY < 0) {
      circleY -= speed;
    }
  }

  // Simulate mouse click with joystick push
  if (sw == 1) {
    handleJoystickPress();
  }

  circle(circleX, circleY, circleRadius);
}

// Handles joystick presses
function handleJoystickPress() {
  const currentTime = millis();
  if (currentTime - lastJoyStickPressTime > 1000) { // 1000 milliseconds delay
    lastJoyStickPressTime = currentTime;

    if (!chestOpened && circleX > 100 && circleX < 500 && circleY > 100 && circleY < 500) {
      mousePressed();
    } else {
      chestOpened = false;
    }
  }
}

 // Connect to Arduino
function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

// Draws open or closed chest depending on chestOpened state, draws background elements
function drawChest(){
  if(!chestOpened){
    image(chestImgOpen, 100, 220, chestImgOpen.width, chestImgOpen.height);
  } else {
    image(chestImgClose, 100, 220, chestImgClose.width, chestImgClose.height);
  }

  fill('#461D7C');
  noStroke();
  rectMode(CENTER);
  rect(400,60, 900, 150);

  fill('#F4F4F4')
  rect(800,200,320,900);

  stroke('#999999')
  strokeWeight(5)
  rect(88,68,150,90);

  fill('#999999');
  noStroke();
  rect(300,140,680,10);

  rect(640,300,10,900);
}

// Draws the counter of chests opened
function drawChestCounter(){
  fill('#000000');
  textSize(25);
  textAlign(LEFT, TOP);
  text("Chests\nOpened: " + chestOpenCount, 20, 40);
}

// Handles when the mouse is pressed
function mousePressed(){
  if (!chestOpened && mouseX > 310 - 200 && mouseX < 310 + 200 && mouseY > 400 - 200 && mouseY < 400 + 200){
    openChest();
  } else {
    chestOpened = false;
  }
}

// Handles actions when chest opened, calls itemPull, displayPopup, increments chestOpenCount
function openChest(){
  const currentTime = millis();
  const timeSinceLastOpen = currentTime - lastChestOpenTime;

  if (timeSinceLastOpen > 1000) {
    lastChestOpenTime = currentTime;
    chestOpened = true;
    chestOpenCount++;
    itemPull();
    popupText = ("You got: " + itemMap[itemPulled].name + "\nRarity: " + rarity + "\nClick to Continue");

    displayPopup();
  } else {
    console.log("Wait a bit longer before opening another chest!");
  }
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
  image(itemPulledImage, 175, 170, 270, 200);
}

// Draws a colored rectangle corresponding to itemPulled rarity and popupText for itemPulled description
function displayPopup(){
  fill(rarityColor);
  strokeWeight(4);
  rectMode(CENTER);
  rect(310, 270, 285, 220);
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(255);
  text(popupText, 400, 65);
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
    rarity = "Ultra";
  }

  // Takes the rarity and rolls for an item in that rarity
  switch(rarity){ 
    case 'Common':
      rarityShort = 'c'; // Used to combine with rand for item
      itemRange = Math.floor(Math.random() * 10) + 1; // Random [1-10]
      itemIndex = itemRange.toString(); // Convert rand(itemRange) to string(itemIndex)
      itemPulled = rarityShort.concat(itemIndex); // Combines rarityShort with rand 1-10
      rarityColor = '#EBEBEB'; // Sets background color to match rarity
      sounds.player("buzzer").start(); // Plays rarity specific sound effect
      break;

    case 'Uncommon':
      rarityShort = 'u';
      itemRange = Math.floor(Math.random() * 8) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#00FD19';
      sounds.player("wow").start();
      break;

    case 'Rare':
      rarityShort = 'r';
      itemRange = Math.floor(Math.random() * 6) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#44D5FF';
      sounds.player("hooray").start();
      break;

    case 'Epic':
      rarityShort = 'e';
      itemRange = Math.floor(Math.random() * 4) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#C90000';
      sounds.player("yippee").start();
      break;

    case 'Legendary':
      rarityShort = 'l';
      itemRange = Math.floor(Math.random() * 2) + 1;
      itemIndex = itemRange.toString();
      itemPulled = rarityShort.concat(itemIndex);
      rarityColor = '#FFC127';
      sounds.player("vinethud").start();
      break;

    case 'Ultra':
      itemPulled = 'm1';
      rarityColor = '#FDD023';
      sounds.player("meow").start();
      break;
  }
  itemPulledImage = itemImages[itemPulled];
  itemCounts[itemPulled]++

  port.write(rarity + "\n");

}

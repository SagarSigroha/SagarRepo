let gameState = "intro"; 
let petals = [];
let enemies = [];
let introImg, infoImg, winImg;
let chakraVideo;
let bgSound;


function preload() {
 
  introImg = loadImage("img/1.jpg");
  infoImg = loadImage("img/gn.jpg");
  winImg = loadImage("img/4.jpg");
  bgSound = loadSound("med.mp3")
  chakraVideo = createVideo("img/lum.mp4");
  chakraVideo.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  chakraVideo = createVideo("img/lum.mp4", () => {
    chakraVideo.loop();       });
  
  setupLevel();
  noCursor();
  if (!bgSound.isPlaying()) {
    bgSound.loop();
    bgSound.setVolume(1); 
  }
}

function draw() {
  background(0);

  
  if (gameState == "intro") {
    if (introImg) image(introImg, 0, 0, width, height);
      }
  else if (gameState == "info") {
    if (infoImg) image(infoImg, 0, 0, width, height);
      }
  else if (gameState == "game") {
    if (chakraVideo) image(chakraVideo, 0, 0, width, height);
      }
  else if (gameState == "win") {
    if (winImg) image(winImg, 0, 0, width, height);
      }

    fill(255);
  textAlign(CENTER, CENTER);
  if (gameState == "intro") {
    textSize(50); text("SOUL ASCEND", width/2, height/2 - 70);
    textSize(20); text( "You are a wandering soul seeking Nirvana.\nAwaken the chakras within to transcend illusion.\nPress ENTER to Begin", width/2, height/2 + 50);
  }
  else if (gameState == "info") {
    textSize(26); text("Root Chakra : Muladhara", width/2, height/2 - 100);
    textSize(18); text("Conquer Lust and collect petals to awaken.\nPress ENTER to Begin Challenge", width/2, height/2);
  }
  else if (gameState == "win") {
    textSize(28); text("Muladhara Awakened", width/2, height/2 - 50);
    textSize(20); text("You have stabilized your energy.", width/2, height/2 + 50);
  }

    displaySoul(mouseX, mouseY);

  
  if (gameState == "game") {
   
    for (let p of petals) {
      p.display();
      if (!p.collected && dist(mouseX, mouseY, p.x, p.y) < 25) p.collected = true;
    }

    //Enemies
    for (let e of enemies) {
      e.move();
      e.display();
      if (dist(mouseX, mouseY, e.x, e.y) < 25) setupLevel();
    }

    if (petals.every(p => p.collected)) gameState = "win";
  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (gameState == "intro") gameState = "info";
    else if (gameState == "info") gameState = "game";
  }
}


function setupLevel() {
  petals = [];
  for (let i=0; i<4; i++) petals.push(new Petal(random(100,width-100), random(200,height-100)));

  enemies = [];
  for (let i=0; i<12; i++) enemies.push(new Enemy(random(width), random(height)));
}


function displaySoul(x, y){
  let size = 30;
  noStroke();
  for (let i=5;i>0;i--){
    fill(255, 255, 255, 30/i);
    ellipse(x, y, size + i*15);
  }
  fill(255,200); ellipse(x, y, size);
}



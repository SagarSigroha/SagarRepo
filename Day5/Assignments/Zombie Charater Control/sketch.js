let spriteImage, sprites =[];
let spriteX = 8, spriteY = 12;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;

function preload() {
  //load the full sprite image
  spriteImage = loadImage("Images/zombb.png");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  
  let w = spriteImage.width/spriteX;
  let h = spriteImage.height/spriteY;
  
  //loop through the 4 rows
  for(let i = 0; i<spriteY;i++) {
    //create an empty array for each row
    sprites[i] = [];
    
    //within each row, loop through the columns
     for(let j = 0;j<spriteX;j++) {
      // store the images in the 2D array
      sprites[i][j] = spriteImage.get(j*w, i*h, w, h ); 
    }
  }
  
}

function draw() {
  background(123, 200, 89);
  //draw the appropriate image from the array based on the row selected (check keyPressed) and the x and y position
  image(sprites[row][count],x,y);
  if(frameCount%5==0) {
    count = (count+1)%spriteX;
    x = x+ xdir;
    y = y+ ydir;
  }
  fill(77, 65, 33);
  stroke(0)
  strokeWeight(2)
  rect(0,192,innerWidth, innerHeight);

  fill (123, 200, 89);
  noStroke();
   rect(0,0,innerWidth, 10);
}

function keyPressed() {
  //read the appropriate row based on the key direction
  if(keyIsDown(RIGHT_ARROW) && keyIsDown(88)) {
    row = 5; // select the right row
    xdir = 0 ; //make sure the sprite doesnt move along x axis
    ydir = 0; //make sprite move up
    

    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
    row = 1;
    xdir = 14;
    ydir = 0;

} else if (keyIsDown(LEFT_ARROW) && keyIsDown(88)) {
    row = 11;
    xdir = 0;
    ydir = 0;

} else if (keyIsDown(RIGHT_ARROW) && keyIsDown(90)) {
    row = 4;
    xdir = 0;
    ydir = 0;

} else if (keyIsDown(LEFT_ARROW) && keyIsDown(90)) {
    row = 10;
    xdir = 0;
    ydir = 0;

     } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 3;
    xdir = 7;
    ydir = 0;

     } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 9;
    xdir = -7;
    ydir = 0;
    
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
    row = 7;
    xdir = -14;
    ydir = 0;

  }  else if(keyCode == LEFT_ARROW) {
    row = 8;
    ydir = 0; //make sure the sprite doesnt move along y axis
    xdir = -7; //make sprite move left

    }  else if(keyCode == 32) {
    row = 6;
    ydir = 0; //make sure the sprite doesnt move along y axis
    xdir = 0; //make sprite move left
       
 
  } else if(keyCode == RIGHT_ARROW) {
    row = 2;
    ydir = 0; //make sure the sprite doesnt move along y axis
    xdir = 7; //make sprite move left
  }}

  function keyReleased() {
  row = 0;
  xdir = 0;
  ydir = 0;
  }
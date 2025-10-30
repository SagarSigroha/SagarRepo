let xPos = 0; yPos = 0;

function setup() {
  createCanvas(1000, 1000);
 
  // noStroke()
}

function draw() {
 
background(0,10);
  fill(0,10,10,10,10);
  stroke(random(10, 255), random(10, 255), random(10, 255),500);
  strokeWeight(random(0, 50))

  ellipse(random(1000), random(1000),random(50, 200));
  // xPos++
  // yPos++;

}

// function mousePressed() {
//   xPos= random(0,1000);
//   yPos= random(0,1000);

// }
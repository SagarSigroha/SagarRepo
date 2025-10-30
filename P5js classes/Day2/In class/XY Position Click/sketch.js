let xPos;

function setup() {
  xPos = 0;
  createCanvas(400, 400);
  background(0);
}
function draw() {
}

function mousePressed() {
  drawBox(mouseX, mouseY);
}

function drawBox(x,y) {
  rect(x,y,80,100);
}

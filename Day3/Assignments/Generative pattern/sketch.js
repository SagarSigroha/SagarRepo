let x, y, size;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  background(20);
  x = 0;
  y = 0;
  size = 20;
}

function draw() {
  size = 10 + mouseX / 10;
  fill(random(10,255), random(10,255),random(10,255));
  rect(x, y, size, size);
  x = x + size;
  if (x > width) {
    x = 0;
    y = y + size;
  }
  if (y > height) {
    y = 0;
  }
}

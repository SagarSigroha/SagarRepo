function setup() {
  createCanvas(1000, 1000);
  noStroke();
  background(20);
}

function mousePressed() {
shape(mouseX,mouseY);
}

function shape(x,y) {
  fill(random(100,250),0,0)
  ellipse(x,y,500)
 ellipse(x,y-350,300)
}
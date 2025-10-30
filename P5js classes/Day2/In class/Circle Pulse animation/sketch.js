let x;

function setup() {
  createCanvas(1000, 1000);
  x=0;}

function draw() {
  background(0);
  fill(54,102,200);
  ellipse(width/2,height/2,sin(frameCount/10)*500);

  fill(0);
  ellipse(width/2,height/2,sin(frameCount/100)*100);
 }
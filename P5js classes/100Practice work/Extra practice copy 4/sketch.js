function setup() {
  
  createCanvas(1000, 1000, WEBGL);
  //WEBGL makes origin at centre of the canvas 
    background(200, 150, 50);
}

function draw() {
rectMode(CENTER)

  // -ve values becs of origin at centre and canvas is divided into -x,x,-y,y

  // rotate around yaxis
  rotateY(frameCount * 0.05);
  fill(40, 180, 50, 150);
  stroke("blue");
  rect(100, -100, 200, 300, 90, 0, 90, 0);

  fill(mouseY);

 
 }

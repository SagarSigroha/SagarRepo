function setup() {
  createCanvas(1000, 1000);
  background(0);
  
}

function draw() {
  noStroke();
  fill(mouseX/4,mouseY/3,mouseX/10+mouseY/6);
  
  //follows the mouse
  ellipse(mouseX, mouseY, 20);

  ellipse(width - mouseY, mouseY, 20);

 
  ellipse(mouseX, height - mouseX, 20);

 
  ellipse(width-mouseY, height - mouseX, 20);

}
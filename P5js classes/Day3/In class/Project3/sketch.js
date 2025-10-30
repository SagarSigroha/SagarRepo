function setup() {
  createCanvas(1000, 1000);
  noStroke();
  background(20);
}
function draw(){}

function mouseClicked() {
if(mouseY<height/2) 
  
  {ellipse(mouseX,mouseY,30,30)}

else { rect(mouseX,mouseY,20,20)}
}
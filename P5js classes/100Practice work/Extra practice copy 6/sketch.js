let x;
function setup() {

  createCanvas(1000, 1000);
 
}

function draw() {
 x= map(mouseX,0,1000,255,0)
background(x);

}

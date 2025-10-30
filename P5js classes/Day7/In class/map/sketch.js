function setup() {
  createCanvas(innerWidth, innerHeight);
  }

function draw() {
 let x = 0
 x = map(mouseX,0,width ,255,0);
background(x)
}
let noPetal = 8;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
drawFlower(20,0,100);

 



function drawFlower(petals,x,y) {
   push();
//move origin
translate(x,y);
noStroke();
fill("red");
ellipse(0,0,80);
rotate(frameCount);

for (let i=0; i<petals; i++) {
rotate(360/petals);
fill(200,0,23,100);
noStroke();
ellipse(90,0,100,50);
}


  pop();

  }
}
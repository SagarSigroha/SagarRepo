// let sx=50

// function setup() {
//   createCanvas(400,400)
// }
// function draw() {
//   background(0)
//   rect(sx,150,20,20)
//   sx+=5
// }
let sqsize;
function setup() {
createCanvas(1000,1000);

background(0);

sqsize = random(150,500)
}

function draw() {
  
fill(random(0,255),random(0,255),random(0,255)),90;
stroke(random(0,255),random(0,255),random(0,255),90);
strokeWeight(random(5,200));
square(150,150,sqsize);
}



















// let sx=100;
// sy=100;
// ss=100
// function setup() {
// createCanvas(1000, 1000);
//     background(200, 150, 50);
// }

// function draw() {
//   background(200, 150, 50);
//   fill(140,50,40,);
// ellipse(sx,sy,ss);
// sx=sx+5
// sy=sy+5
// ss=ss+10
// }

// function mousePressed() {
// sx=0;
// sy=0;
// ss=0;

// }
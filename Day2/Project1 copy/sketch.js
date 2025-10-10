function setup() {
createCanvas(1000, 1000);
noStroke();
}

function draw() {
background(255);

let pulse = sin(frameCount * 0.02) * 20; 

// Left c
fill(255, 100, 120, 180);
ellipse(400, 500, 400 + pulse, 400 + pulse);

// Right c
fill(255, 150, 100, 180);
ellipse(600, 500, 400 + pulse, 400 + pulse);

// Overlapping c
fill(255, 200, 180, 150);
ellipse(500, 500, 320 + pulse*2, 320 + pulse*2);

// outer c
fill(255, 120, 120, 40);
ellipse(400, 500, 480 + pulse , 480 + pulse);
// outer right c
fill(255, 160, 120, 40);
ellipse(600, 500, 480 + pulse, 480 + pulse);
}

function mousePressed() {
  background(255);}

// let pulse = sin(frameCount * 0.02) * 20; 

// // Left c
// fill(255, 100, 120, 180);
// ellipse(400, 500, 400 + pulse, 400 + pulse);

// // Right c
// fill(255, 150, 100, 180);
// ellipse(600, 500, 400 + pulse, 400 + pulse);

// // Overlapping c
// fill(255, 200, 180, 150);
// ellipse(500, 500, 320 + pulse*2, 320 + pulse*2);

// // outer c
// fill(255, 120, 120, 40);
// ellipse(400, 500, 480 + pulse , 480 + pulse);
// // outer right c
// fill(255, 160, 120, 40);
// ellipse(600, 500, 480 + pulse, 480 + pulse);
// }
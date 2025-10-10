function setup() {
  createCanvas(1000, 1000);
  noStroke();
}

function draw() {
  background(40, 20, 10);

  // shaky
  let pulse = sin(frameCount * 0.05) * 30 + random(-5, 5);
  let shift = sin(frameCount * 0.02) * 50;

  // Left c
  fill(150, 150, 100, 200);
  ellipse(400 + random(-2, 2), 500 + shift, 400 + pulse, 400 + pulse);

  // Right c
  fill(150, 90, 80, 250);
  ellipse(600 + random(-2, 2), 500 - shift, 400 + pulse, 400 + pulse);

  // Overlapping c
  fill(180, 120, 50, 200);
  ellipse(500 - shift, 500 + shift, 340 + pulse * 5, 340 + pulse * 0.5);

  // outer lc
  fill(120, 200, 100, 40);
  ellipse(400, 500, 500 + random(-10, 10), 500 + random(-10, 10));
  
  // outer rc
  fill(140, 220, 120, 40);
  ellipse(600, 500, 500 + random(-10, 10), 500 + random(-10, 10));

  // bubbles
  for (let i = 0; i < 10; i++) {
    fill(120, 255, 100, 80);
    ellipse(random(width), random(height), random(10, 30));
  }
}

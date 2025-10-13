function setup() {
  createCanvas(1000, 1000);  
  noStroke();                
}

function draw() {
  background(40, 20, 10);    

  // pulse and shake values
  let pulse = sin(frameCount / 20) * 30 + random(-5, 5); 
  let shift = sin(frameCount / 50) * 50;                 

  // left c
  fill(150, 150, 100, 200);       
  ellipse(400 + random(-2, 2), 500 + shift, 400 + pulse, 400 + pulse); 

  // right c
  fill(100, 90, 80, 250);
  ellipse(600 + random(-2, 2), 500 - shift, 400 + pulse, 400 + pulse); 

  // middle overlapping c
  fill(180, 120, 50, 200);
  ellipse(500 - shift, 500 + shift, 340 + pulse * 5, 340 + pulse * 0.5); 

  // outer left c
  fill(120, 200, 100, 40);
  ellipse(400, 500, 500 + random(-10, 10), 500 + random(-10, 10));  

  // outer right c
  fill(140, 220, 120, 40);
  ellipse(600, 500, 500 + random(-10, 10), 500 + random(-10, 10));  

  // c
  fill(120, 255, 100, 80);
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
  ellipse(random(width), random(height), random(10, 30)); 
}

let size = 100;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  ellipseMode(CENTER);
}

function draw() {
  background(20);

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      
      // center position of each circle
      let cx = x + size / 2;
      let cy = y + size / 2;
      
      // check distance from mouse
      let d = dist(mouseX, mouseY, cx, cy);
      
      // if mouse is near, change color and size
      if (d < size / 2) {
        fill(random(255), random(255), random(255)); // random color when hovered
        ellipse(cx, cy, size * 1.2);
      } else {
        fill(100, 150, 255); // default color
        ellipse(cx, cy, size * 0.8);
        noCursor()
      }
    }
  }
}

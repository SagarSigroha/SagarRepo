let size = 100;
let colors = []; // store random colors for each circle

function setup() {
  createCanvas(innerWidth, innerHeight);

  // initialize random colors for each circle
  for (let y = 0; y < height; y += size) {
    let row = [];
    for (let x = 0; x < width; x += size) {
      row.push(color(random(255), random(255), random(255)));
    }
    colors.push(row);
  }
}

function draw() {
  background(20);
  
  // draw grid of circles
  for (let j = 0; j < height; j += size) {
    for (let i = 0; i < width; i += size) {
      let row = int(j / size);
      let col = int(i / size);
      fill(colors[row][col]);
      ellipse(i + size / 2, j + size / 2, size * 0.8);
    }
  }
}

// when mouse is clicked, change color of the clicked circle
function mousePressed() {
  let col = int(mouseX / size);
  let row = int(mouseY / size);

  if (row >= 0 && row < colors.length && col >= 0 && col < colors[row].length) {
    colors[row][col] = color(random(255), random(255), random(255)); // new random color
  }
}

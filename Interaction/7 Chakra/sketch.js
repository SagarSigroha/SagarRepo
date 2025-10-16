let chakras = [];
let currentText = "";
let allActivated = false;
let auraSize = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  textAlign(CENTER, CENTER);
  
  for (let i = 0; i < 7; i++) {
    let y = height - 100 - i * 100;
    chakras.push(new Chakra(width / 2, y, i));
  }
}

function draw() {
  background(10, 10, 30);

  // Draw faint vertical energy line
  stroke(255, 80);
  strokeWeight(2);
  line(width / 2, 50, width / 2, height - 50);
  noStroke();

  // Draw each chakra
  for (let c of chakras) {
    c.update();
    c.display();
  }

  // Show narration text
  fill(255);
  textSize(18);
  text(currentText, width / 2, height - 40);

  // Final aura animation
  if (allActivated) {
    drawAura();
  }
}

function keyPressed() {
  let i = int(key) - 1;
  if (i >= 0 && i < chakras.length) {
    chakras[i].activate();
  }
}

function mousePressed() {
  // Also allow mouse clicking to activate chakras
  for (let c of chakras) {
    if (dist(mouseX, mouseY, c.x, c.y) < c.size / 2 + 20) {
      c.activate();
    }
  }
}

class Chakra {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.active = false;
    this.size = 50;
    this.glow = 0;
    this.color = chakraColor(index);
    this.text = chakraText(index);
  }

  activate() {
    if (!this.active) {
      this.active = true;
      currentText = this.text;
      this.glow = 100;
      checkAllActivated();
    }
  }

  update() {
    if (this.active) {
      // breathing glow effect
      this.glow = 100 + sin(frameCount * 0.1) * 50;
    } else {
      this.glow = lerp(this.glow, 20, 0.05);
    }
  }

  display() {
    // glowing aura
    noStroke();
    for (let g = 3; g > 0; g--) {
      fill(red(this.color), green(this.color), blue(this.color), this.glow / (g * 1.5));
      ellipse(this.x, this.y, this.size + g * 40);
    }

    // main circle
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

function chakraColor(i) {
  let colors = [
    color("#FF0000"), // Root
    color("#FF7F00"), // Sacral
    color("#FFFF00"), // Solar Plexus
    color("#00FF00"), // Heart
    color("#0000FF"), // Throat
    color("#4B0082"), // Third Eye
    color("#EE82EE")  // Crown
  ];
  return colors[i];
}

function chakraText(i) {
  let lines = [
    "Muladhara – Root Chakra: You feel grounded and safe.",
    "Svadhisthana – Sacral Chakra: Creative energy begins to flow.",
    "Manipura – Solar Plexus Chakra: The fire of will ignites within you.",
    "Anahata – Heart Chakra: Compassion and love expand outward.",
    "Vishuddha – Throat Chakra: Your voice resonates with truth.",
    "Ajna – Third Eye Chakra: Vision and intuition awaken.",
    "Sahasrara – Crown Chakra: You merge with the cosmic light."
  ];
  return lines[i];
}

function checkAllActivated() {
  allActivated = chakras.every(c => c.active);
}

function drawAura() {
  auraSize += 2;
  if (auraSize > width * 1.5) auraSize = 0;

  push();
  noFill();
  stroke(255, 150 + sin(frameCount * 0.1) * 100);
  strokeWeight(3);
  ellipse(width / 2, height / 2, auraSize);
  pop();

  fill(255);
  textSize(24);
  text("Kundalini has risen. You are pure awareness. ", width / 2, 40);
}

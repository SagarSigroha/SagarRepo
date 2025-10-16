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
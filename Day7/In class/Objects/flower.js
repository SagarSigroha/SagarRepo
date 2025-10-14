class Flower{
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.xSpeed = xspeed;
    this.ySpeed = ySpeed;
    
  }

  drawFlower() {
    ellipse(this.x, this.y, 20);
  }
  moveFlower(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

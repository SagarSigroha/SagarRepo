class Ball{
    constructor(x, y, xSpeed, ySpeed){

        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.size = 20;
    }
    show(){
        circle(this.x, this.y, this.size);

    }

move(){
  this.y += this.ySpeed;
  this.x += this.xSpeed;
}
checkCollisionWall() {
    if(this.y <this.size/2 || this.y>height-this.size/2) {
      this.ySpeed = -this.ySpeed*1.2;
    }
  }

}
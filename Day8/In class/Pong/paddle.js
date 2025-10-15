class paddle{
    constructor(x, y, height, width, speed){

        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;


    }
    show(){
        rect(this.x, this.y, this.width, this.height);

    }
    moveUp(){

        if(this.y>0)
        {
           this.y -=this.speed;
        }

    }
    moveDown(){
        if(this.y<height-this.height)
        {
           this.y +=this.speed;
        }

    }

    reset() {
    this.x = width/2;
    this.y = height/2;
  }

  checkCollisionWall() {
    if(this.y <this.size/2 || this.y>height-this.size/2) {
      this.ySpeed = -this.ySpeed;
    }
  } 
  checkWinner() {
    if(this.x<0) {
      return 2;
    } else if(this.x>width) {
      return 1;
    } else {
      return 0;
    }
  }

  checkCollisionPaddle(paddle) {
     if(this.x<paddle.x+paddle.width &&
      this.x > paddle.x &&
      this.y<paddle.y + paddle.height &&
      this.y > paddle.y
    ) {
      console.log("BAM!!");
      this.xSpeed = -this.xSpeed*1.2;
    }
  }
}
let gBall, player1 = 0, player2 = 0;
let lPaddle, rPaddle;
function setup() {
  createCanvas(innerWidth, innerHeight);
  gBall = new Ball(width / 2, height / 2, 5, 5);

  let pWidth = 10, pHeight = 100;
  lPaddle = new paddle(0, height / 2 - pHeight/2, pHeight, pWidth, 5);

  rPaddle = new paddle(width - pWidth, height / 2 - pHeight/2, pHeight, pWidth, 5);
}

function draw() {
  background(220);
  //BALL BEHAVIOUR

  gBall.move();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.checkCollisionWall();
  gBall.show();

  let point = gBall.checkWinner();
  if(point == 1) {
    player1++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  } else if(point ==2 ) {
    player2++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  }

  lPaddle.show();
  rPaddle.show();

//if keys UP and DOWN are pressed move the right paddle

if(keyIsDown(UP_ARROW)){

  rPaddle.moveUp();
} else if(keyIsDown(DOWN_ARROW)){

  rPaddle.moveDown();
}

//if keys W and s are pressed move the left paddle

if(keyIsDown(87)){

  lPaddle.moveUp();
} else if(keyIsDown(83)){

  lPaddle.moveDown();
}

}
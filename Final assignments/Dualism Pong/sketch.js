let ball;
let leftPaddle, rightPaddle;
let paddleWidth = 15;
let paddleHeight = 200;
let paddleSpeed = 50;
let roleSwitchTime = 10000; // 10 seconds
let lastSwitch = 0;
let ballControlledBy = 'player1';
let scoreLeft = 0;
let scoreRight = 0;
let gameOver = false;

// Paddle colors
let leftColor, rightColor;

// Ball speed
let baseSpeed = 7;
let speedIncrement = 0.01;
let maxBallSpeed = 15;
let ballTrail = [];
let sparkles = [];

// Sounds
let bgSound, shiftOrangeSound, shiftBlueSound, hitOrangeSound, hitBlueSound;

function preload() {
  soundFormats('mp3', 'wav');
  bgSound = loadSound('bg.mp3');
  shiftOrangeSound = loadSound('shiftOrange.mp3');
  shiftBlueSound = loadSound('shiftBlue.mp3');
  hitOrangeSound = loadSound('hitOrange.mp3');
  hitBlueSound = loadSound('hitBlue.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  leftColor = color(0, 162, 232); // blue
  rightColor = color(255, 127, 39); // orange
  
  initializeGame();
  lastSwitch = millis();

  // Start background music
  bgSound.loop();
  bgSound.setVolume(0.5);
  
  // Set sound effect volumes
  shiftOrangeSound.setVolume(0.5);
  shiftBlueSound.setVolume(0.5);
  hitOrangeSound.setVolume(0.5);
  hitBlueSound.setVolume(0.5);
}

function draw() {
  background(0, 60);

  if (!gameOver) {
    drawMagicalBall();

    updateAndDrawPaddle(leftPaddle, leftColor, keyIsDown(87), keyIsDown(83), ballControlledBy === 'player1');
    updateAndDrawPaddle(rightPaddle, rightColor, keyIsDown(UP_ARROW), keyIsDown(DOWN_ARROW), ballControlledBy === 'player2');

    updateSparkles();

    // Score display
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text(scoreLeft + " : " + scoreRight, width / 2, 50);

    // Role switching with sound
    if (millis() - lastSwitch > roleSwitchTime) {
      let newController = ballControlledBy === 'player1' ? 'player2' : 'player1';
      if (newController === 'player2') shiftOrangeSound.play();
      else shiftBlueSound.play();
      ballControlledBy = newController;
      lastSwitch = millis();
    }

    // Ball control smoothing
    let ballSpeed = baseSpeed;
    if (ballControlledBy === 'player1') {
      if (keyIsDown(87)) ball.vy = lerp(ball.vy, -ballSpeed, 0.2);
      else if (keyIsDown(83)) ball.vy = lerp(ball.vy, ballSpeed, 0.2);
      if (keyIsDown(65)) ball.vx = lerp(ball.vx, -ballSpeed, 0.2);
      else if (keyIsDown(68)) ball.vx = lerp(ball.vx, ballSpeed, 0.2);
    } else {
      if (keyIsDown(UP_ARROW)) ball.vy = lerp(ball.vy, -ballSpeed, 0.2);
      else if (keyIsDown(DOWN_ARROW)) ball.vy = lerp(ball.vy, ballSpeed, 0.2);
      if (keyIsDown(LEFT_ARROW)) ball.vx = lerp(ball.vx, -ballSpeed, 0.2);
      else if (keyIsDown(RIGHT_ARROW)) ball.vx = lerp(ball.vx, ballSpeed, 0.2);
    }

    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Gradually increase speed but cap it
    ball.vx += (ball.vx > 0 ? speedIncrement : -speedIncrement);
    ball.vy += (ball.vy > 0 ? speedIncrement : -speedIncrement);
    ball.vx = constrain(ball.vx, -maxBallSpeed, maxBallSpeed);
    ball.vy = constrain(ball.vy, -maxBallSpeed, maxBallSpeed);

    // Bounce top/bottom
    if (ball.y <= 0 || ball.y >= height) ball.vy *= -1;

    // Paddle collisions with sound
    if (ball.x - 10 <= leftPaddle.x + paddleWidth && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight) {
      ball.vx *= -1;
      leftPaddle.glow = 200;
      createSparkles(ball.x, ball.y, leftColor);
      if (ballControlledBy === 'player1') hitBlueSound.play();
      else hitOrangeSound.play();
    }

    if (ball.x + 10 >= rightPaddle.x && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight) {
      ball.vx *= -1;
      rightPaddle.glow = 200;
      createSparkles(ball.x, ball.y, rightColor);
      if (ballControlledBy === 'player1') hitBlueSound.play();
      else hitOrangeSound.play();
    }

    // Reduce paddle glow
    if (leftPaddle.glow) leftPaddle.glow = max(0, leftPaddle.glow - 10);
    if (rightPaddle.glow) rightPaddle.glow = max(0, rightPaddle.glow - 10);

    // Scoring
    if (ball.x < 0) {
      scoreRight++;
      resetBall();
    }
    if (ball.x > width) {
      scoreLeft++;
      resetBall();
    }

    // Win condition
    if (scoreLeft >= 10 || scoreRight >= 10) {
      gameOver = true;
    }

  } else {
    // Game over screen
    textSize(64);
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    let winner = scoreLeft >= 10 ? "Player 1 Wins!" : "Player 2 Wins!";
    text(winner, width / 2, height / 2 - 50);
    
    textSize(32);
    text("Press ENTER to Restart", width / 2, height / 2 + 50);
  }
}

function keyPressed() {
  if (gameOver && keyCode === ENTER) {
    scoreLeft = 0;
    scoreRight = 0;
    gameOver = false;
    initializeGame();
  }
}

function updateAndDrawPaddle(p, col, upKey, downKey, isControlled) {
  let targetY = p.y;

  if (!isControlled) {
    if (upKey) targetY -= paddleSpeed;
    if (downKey) targetY += paddleSpeed;
  }
  
  p.y = lerp(p.y, targetY, 0.3);
  p.y = constrain(p.y, 0, height - paddleHeight);

  noStroke();
  for (let i = 3; i > 0; i--) {
    fill(red(col), green(col), blue(col), (p.glow / i));
    rect(p.x - i, p.y - i, paddleWidth + i * 2, paddleHeight + i * 2);
  }

  fill(col);
  rect(p.x, p.y, paddleWidth, paddleHeight);
}

function drawMagicalBall() {
  let ballColor = ballControlledBy === 'player1' ? leftColor : rightColor;
  
  ballTrail.push({x: ball.x, y: ball.y, c: ballColor, size: 20 + random(5,10), alpha: 150});
  for (let t of ballTrail) {
    noStroke();
    fill(red(t.c), green(t.c), blue(t.c), t.alpha);
    ellipse(t.x, t.y, t.size, t.size);
    t.alpha -= 4;
    t.size *= 0.95;
  }
  ballTrail = ballTrail.filter(t => t.alpha > 0);

  noStroke();
  for (let r = 30; r >= 6; r -= 2) {
    let alpha = map(r, 6, 30, 200, 10);
    fill(red(ballColor), green(ballColor), blue(ballColor), alpha);
    ellipse(ball.x, ball.y, r*2, r*2);
  }
  
  fill(ballColor);
  ellipse(ball.x, ball.y, 20, 20);
}

function createSparkles(x, y, col) {
  for (let i = 0; i < 15; i++) {
    sparkles.push({
      x: x,
      y: y,
      vx: random(-3,3),
      vy: random(-3,3),
      alpha: 255,
      size: random(4,8),
      c: col
    });
  }
}

function updateSparkles() {
  for (let i = 0; i < sparkles.length; i++) {
    let s = sparkles[i];
    noStroke();
    fill(red(s.c), green(s.c), blue(s.c), s.alpha);
    ellipse(s.x, s.y, s.size, s.size);
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= 10;
    s.size *= 0.95;
  }
  sparkles = sparkles.filter(s => s.alpha > 0);
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = random([-baseSpeed, baseSpeed]);
  ball.vy = random([-baseSpeed, baseSpeed]);
  ballControlledBy = random(['player1','player2']);
  lastSwitch = millis();
}

function initializeGame() {
  ball = {x: width / 2, y: height / 2, vx: random([-baseSpeed, baseSpeed]), vy: random([-baseSpeed, baseSpeed])};
  leftPaddle = {x: 50, y: height / 2 - paddleHeight / 2, glow: 0};
  rightPaddle = {x: width - 50 - paddleWidth, y: height / 2 - paddleHeight / 2, glow: 0};
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeGame();
}

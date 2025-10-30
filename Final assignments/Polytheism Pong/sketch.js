// Polytheist Pong (p5.js) - No Scoring Version
// Circular arena of divine chaos — gods change the ball physics, 
// but there’s no winner or loser, only eternal play.
//
// Controls:
// Player 1: A / D to rotate paddle, W to appeal
// Player 2: LEFT / RIGHT to rotate paddle, UP to appeal

let ball, extraBalls;
let ballTrail = [];
let paddleAngle1, paddleAngle2;
let paddleWidth, paddleRadius;
let godList = [];
let activeGodIndex = 0;
let GOD_DURATION = 8000;
let lastGodSwitch = 0;
let appealCooldownP1 = 0, appealCooldownP2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  initializeGame();
  createGods();
  lastGodSwitch = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeGame();
}

function initializeGame() {
  paddleRadius = min(width, height) / 2 - 80;
  paddleAngle1 = -PI/6;
  paddleAngle2 = PI + PI/6;
  paddleWidth = PI / 9;
  resetBall();
  extraBalls = [];
  ballTrail = [];
}

function createGods() {
  godList = [
    {
      name: "Ares (War)",
      color: [220, 40, 40],
      applyModifiers: m => { m.speedMultiplier = 1.35; m.curve = 0; m.cloneChance = 0; },
      onAppeal: p => p.tempRebound = 1.8
    },
    {
      name: "Athena (Wisdom)",
      color: [100, 180, 255],
      applyModifiers: m => { m.speedMultiplier = 0.75; m.paddleWidthMultiplier = 0.8; },
      onAppeal: p => p.tempPaddleW = 1.5
    },
    {
      name: "Poseidon (Sea)",
      color: [20, 120, 180],
      applyModifiers: m => { m.curve = 0.008; m.curveBias = 0.2; },
      onAppeal: p => p.opponentSlow = 0.6
    },
    {
      name: "Hermes (Trickster)",
      color: [220, 200, 80],
      applyModifiers: m => { m.cloneChance = 0.12; },
      onAppeal: p => p.tempHitSpeed = 1.4
    },
    {
      name: "Hestia (Hearth)",
      color: [255, 160, 90],
      applyModifiers: m => { m.speedMultiplier = 0.9; m.trailLength = 70; },
      onAppeal: p => p.shieldNextMiss = true
    }
  ];
}

function draw() {
  background(12, 10, 22);
  let now = millis();

  if (now - lastGodSwitch > GOD_DURATION) {
    activeGodIndex = (activeGodIndex + 1) % godList.length;
    lastGodSwitch = now;
  }
  let activeGod = godList[activeGodIndex];
  let timeLeft = max(0, GOD_DURATION - (now - lastGodSwitch));

  let modifiers = { speedMultiplier: 1, paddleWidthMultiplier: 1, curve: 0, curveBias: 0, cloneChance: 0, trailLength: 40 };
  activeGod.applyModifiers(modifiers);

  noFill(); stroke(90); strokeWeight(3);
  ellipse(width/2, height/2, paddleRadius*2);

  if (!this.player1) this.player1 = createPlayerState();
  if (!this.player2) this.player2 = createPlayerState();

  handlePaddleInput(this.player1, 'P1');
  handlePaddleInput(this.player2, 'P2');

  updateBall(modifiers);
  updateExtraBalls(modifiers);

  drawTrails(modifiers.trailLength);
  drawBall(ball);
  for (let b of extraBalls) drawBall(b);

  let p1Width = paddleWidth * modifiers.paddleWidthMultiplier * (this.player1.tempPaddleW || 1);
  let p2Width = paddleWidth * modifiers.paddleWidthMultiplier * (this.player2.tempPaddleW || 1);
  drawPaddle(paddleAngle1, color(120,220,255), p1Width);
  drawPaddle(paddleAngle2, color(255,120,120), p2Width);

  if (checkPaddleCollision(ball, paddleAngle1, this.player1, modifiers)) attemptCloneSpawn(modifiers, ball);
  if (checkPaddleCollision(ball, paddleAngle2, this.player2, modifiers)) attemptCloneSpawn(modifiers, ball);
  for (let b of extraBalls) {
    if (checkPaddleCollision(b, paddleAngle1, this.player1, modifiers)) attemptCloneSpawn(modifiers, b);
    if (checkPaddleCollision(b, paddleAngle2, this.player2, modifiers)) attemptCloneSpawn(modifiers, b);
  }

  checkOutOfBounds(ball);
  extraBalls = extraBalls.filter(b => !checkOutOfBounds(b, true));

  drawHUD(activeGod.name, activeGod.color, timeLeft);
  decayPlayerTemps(this.player1);
  decayPlayerTemps(this.player2);

  if (appealCooldownP1 > 0) appealCooldownP1 = max(0, appealCooldownP1 - deltaTime);
  if (appealCooldownP2 > 0) appealCooldownP2 = max(0, appealCooldownP2 - deltaTime);
}

function createPlayerState() {
  return { tempPaddleW: 1, tempRebound: 1, tempHitSpeed: 1, opponentSlow: 1, shieldNextMiss: false };
}

function handlePaddleInput(p, id) {
  if (id === 'P1') {
    if (keyIsDown(65)) paddleAngle1 -= 0.06;
    if (keyIsDown(68)) paddleAngle1 += 0.06;
    if (keyIsDown(87) && appealCooldownP1 <= 0) {
      godList[activeGodIndex].onAppeal(p);
      appealCooldownP1 = 5000;
    }
  } else {
    if (keyIsDown(LEFT_ARROW)) paddleAngle2 -= 0.06;
    if (keyIsDown(RIGHT_ARROW)) paddleAngle2 += 0.06;
    if (keyIsDown(UP_ARROW) && appealCooldownP2 <= 0) {
      godList[activeGodIndex].onAppeal(p);
      appealCooldownP2 = 5000;
    }
  }
}

function resetBall() {
  ball = { x: width/2, y: height/2, angle: random(TWO_PI), speed: 4, radius: 18 };
  extraBalls = [];
  ballTrail = [];
}

function updateBall(mod) {
  let bias = mod.curveBias || 0;
  let curveAmt = mod.curve || 0;
  ball.angle += curveAmt * sin((ball.x + ball.y) * 0.01) + curveAmt * bias * 0.25;
  let sp = ball.speed * mod.speedMultiplier;
  ball.x += sp * cos(ball.angle);
  ball.y += sp * sin(ball.angle);
  ball.speed = constrain(ball.speed, 2, 12);
}

function updateExtraBalls(mod) {
  for (let b of extraBalls) {
    let curveAmt = mod.curve || 0;
    let bias = mod.curveBias || 0;
    b.angle += curveAmt * sin((b.x + b.y)*0.01) + curveAmt * bias * 0.25;
    let sp = b.speed * mod.speedMultiplier;
    b.x += sp * cos(b.angle);
    b.y += sp * sin(b.angle);
    b.speed = constrain(b.speed, 2, 12);
  }
}

function drawTrails(maxLen) {
  ballTrail.push({x: ball.x, y: ball.y});
  if (ballTrail.length > maxLen) ballTrail.shift();
  noStroke();
  for (let i = 0; i < ballTrail.length; i++) {
    let alpha = map(i, 0, ballTrail.length, 10, 180);
    fill(255, 200, 60, alpha);
    ellipse(ballTrail[i].x, ballTrail[i].y, ball.radius * 1.2);
  }
  for (let b of extraBalls) {
    fill(200, 240, 255, 100);
    ellipse(b.x, b.y, b.radius);
  }
}

function drawBall(b) {
  push();
  for (let i = 40; i > 0; i--) {
    let a = map(i, 0, 40, 0, 160);
    fill(255, 200, 40, a);
    ellipse(b.x + random(-1,1), b.y + random(-1,1), b.radius*2 + i*0.6);
  }
  pop();
  fill(255, 210, 60);
  ellipse(b.x, b.y, b.radius*2);
}

function drawPaddle(angle, col, w = paddleWidth) {
  let x1 = width/2 + paddleRadius * cos(angle - w/2);
  let y1 = height/2 + paddleRadius * sin(angle - w/2);
  let x2 = width/2 + paddleRadius * cos(angle + w/2);
  let y2 = height/2 + paddleRadius * sin(angle + w/2);
  stroke(col);
  strokeWeight(10);
  line(x1,y1,x2,y2);
}

function checkPaddleCollision(b, angle, p, m) {
  let dx = b.x - width/2, dy = b.y - height/2;
  let angleBall = atan2(dy, dx);
  let distFromCenter = sqrt(dx*dx + dy*dy);
  let diff = angleDiff(angleBall, angle);
  if (distFromCenter > paddleRadius - b.radius*2 && diff < (paddleWidth * (m && m.paddleWidthMultiplier || 1))/2) {
    let normal = angleBall;
    let incidence = b.angle;
    let rebound = (p && p.tempRebound) ? p.tempRebound : 1;
    b.angle = normal + PI + ((normal - incidence) * 0.3) + random(-0.2,0.2);
    let hitBoost = (p && p.tempHitSpeed) ? p.tempHitSpeed : 1;
    b.speed = constrain(b.speed * (1.0 + 0.08*rebound) * hitBoost, 2, 14);
    return true;
  }
  return false;
}

function attemptCloneSpawn(m, b) {
  if (random() < (m.cloneChance || 0)) {
    let nb = { x: b.x + random(-10,10), y: b.y + random(-10,10), angle: b.angle + random(-0.6,0.6), speed: b.speed, radius: max(8, b.radius*0.6) };
    extraBalls.push(nb);
    if (extraBalls.length > 3) extraBalls.shift();
  }
}

function checkOutOfBounds(b, isExtra = false) {
  let dx = b.x - width/2;
  let dy = b.y - height/2;
  let dist = sqrt(dx*dx + dy*dy);
  if (dist > paddleRadius + 40) {
    if (!isExtra) resetBall();
    return true;
  }
  return false;
}

function angleDiff(a,b){let d=abs(a-b)%TWO_PI;return d>PI?TWO_PI-d:d;}

function drawHUD(godName, godColor, timeLeft) {
  push();
  noStroke();
  fill(godColor[0], godColor[1], godColor[2], 200);
  rectMode(CENTER);
  rect(width/2, 30, 360, 40, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(`${godName} — ${nf(timeLeft/1000,1,1)}s`, width/2, 30);

  textSize(12);
  fill(200);
  let p1cd = max(0, round(appealCooldownP1/1000));
  let p2cd = max(0, round(appealCooldownP2/1000));
  text(`P1 Appeal (W): ${p1cd > 0 ? p1cd + "s" : "READY"}`, width/4, height - 15);
  text(`P2 Appeal (UP): ${p2cd > 0 ? p2cd + "s" : "READY"}`, (3*width)/4, height - 15);
  pop();
}

function decayPlayerTemps(p) {
  if (!p) return;
  p.tempPaddleW = lerp(p.tempPaddleW || 1, 1, 0.03);
  p.tempRebound = lerp(p.tempRebound || 1, 1, 0.04);
  p.tempHitSpeed = lerp(p.tempHitSpeed || 1, 1, 0.04);
}

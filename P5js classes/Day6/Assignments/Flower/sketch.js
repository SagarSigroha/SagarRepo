let isOpen = false;
let quotes = [];
let currentQuote = "";

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(18);
  rectMode(CENTER);

  // Bhagavad Gita teachings
  quotes = [
    "You have the right to work, but not to the fruits of work.",
    "Change is the law of the universe. You can be a millionaire or a pauper in an instant.",
    "The soul is neither born, and nor does it die.",
    "A person can rise through the efforts of his own mind; or draw himself down, in the same manner.",
    "Man is made by his belief. As he believes, so he is.",
    "Set your heart upon your work, but never on its reward.",
    "The mind is restless, turbulent, powerful and obstinate. It is difficult to control, but it can be conquered through practice.",
    "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    "Perform your duty with a balanced mind, abandoning attachment and remaining the same in success and failure.",
    "He who sees inaction in action, and action in inaction, is wise among men."
  ];
}

function draw() {
  background(innerWidth,innerHeight); // soft paper tone

  // Draw book
  drawBook(width / 2, height / 2, 250, 180, isOpen);

  // Draw title or quote
  fill(50);
  if (isOpen) {
    textSize(16);
    textWrap(WORD);
    text(currentQuote, width / 2, height / 2, 200);
  } else {
    textSize(22);
    text("Click the book to open Bhagavad Gita", width / 2, height / 2);
  }
}

function mousePressed() {
  // Check if click is on book area
  if (mouseX > width / 2 - 125 && mouseX < width / 2 + 125 &&
      mouseY > height / 2 - 90 && mouseY < height / 2 + 90) {
    isOpen = !isOpen;

    if (isOpen) {
      // Pick a random quote
      currentQuote = random(quotes);
    }
  }
}

function drawBook(x, y, w, h, open) {
  noStroke();
  if (open) {
    // Open book: two pages
    fill(255);
    rect(x - w / 4, y, w / 2, h, 10);
    rect(x + w / 4, y, w / 2, h, 10);
    // Spine
    fill(150, 75, 0);
    rect(x, y, 10, h);
  } else {
    // Closed book
    fill(150, 75, 0);
    rect(x, y, w, h, 10);
    fill(255);
    textSize(20);
    text("Bhagavad Gita", x, y);
  }
}

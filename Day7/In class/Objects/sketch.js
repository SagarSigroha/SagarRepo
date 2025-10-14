let flowers =[];
function setup() {
  createCanvas(400, 400);
  }

function draw() {
 background(200);
 
 for(let i=0; i<flowers.length; i++ )
 {
flowers[i].drawFlower();

 }

}

function mousePressed() {
  let tempFlower = new Flower(mouseX,mouseY);
  flowers.push(tempFlower);
}
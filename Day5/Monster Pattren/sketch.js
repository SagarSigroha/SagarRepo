let size=50, g0,g1,g2,g3

function preload(){
  g0= loadImage("Images/g0.jpeg");
  g1= loadImage("Images/g1.jpeg");
  g2= loadImage("Images/g2.jpeg");
  g3= loadImage("Images/g3.jpeg");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
frameRate(3)
      
}
function draw(){
  background(220);
for(let j=0; j<height; j=j+size)
   {for(let i=0; i<width; i=i+size){

  let choice = floor(random(0,4))
  if(choice==0) {
    image(g0,i,j);}
    else if(choice==1) {
    image(g1,i,j);}
    else if(choice==2) {
    image(g2,i,j);}
    else if(choice==3) {
    image(g3,i,j);}
  }}
}

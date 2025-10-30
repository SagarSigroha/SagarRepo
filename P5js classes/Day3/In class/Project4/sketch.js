let x,y,size,choice;
function setup() {
  createCanvas(innerWidth, innerHeight);
  
  background(220);
  x=0;
  y=0;
  size=20;
}

function draw(){
 let choice=random(0,1);
  
  if(choice<0.5){
    line(x+size,y,x,y+size);
  }
  else{
    line(x,y,x+size,y+size);
  }


x=x+size;

if(x>width) {
  x=0;
  y=y+size;
}
}
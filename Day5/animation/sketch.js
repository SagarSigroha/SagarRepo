let size=80
function setup() {
  createCanvas(innerWidth, innerHeight);
    
  
}
function draw(){
  background(220);
for(let j=0; j<height; j=j+size)
   {for(let i=0; i<width; i=i+size)
  {fill(random(0,200),150,300)
    rect(i,j,size)}
    let choise= dloor(random(0,4));
    if (choice==1){
      fill("red");}
      else if (choice==2){
      fill("green")}
      else if (choice==2){
      fill("green")}
      else if (choice==4){
      fill("green")}
    }
}
}
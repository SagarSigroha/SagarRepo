let spriteImg;
let sRows = 4, sCols= 8;
let sprites= []
let count =0
let xDir

function preload(){
  spriteImg= loadImage("Images/fire.jpeg");}

function setup() {
  createCanvas(innerWidth, innerHeight);

  let sWidth = spriteImg.width/sCols;
  let sHeight = spriteImg.height/sRows;

  for(let i=0;i<sRows;i++){
    for (let j=0;j<sCols;j++) {

      sprites[sprites.length]= 
      spriteImg.get(j*sWidth,i*sHeight,sWidth,sHeight);
        }
    }
    console.log(sprites);
}

function draw(){
  background(0);
  if(isKeyPressed) {count++ ;
  }
  
  image(sprites[count%sprites.length],0,0);
}
 
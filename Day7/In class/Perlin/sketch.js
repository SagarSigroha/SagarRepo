function setup() {
  createCanvas(400, 400);
  }

function draw() {
 background(200);
 let noiseValue = noise(0.01*frameCount + 1000);
 let noiseMapped = map(noise,0,1 ,10,200);
ellipse(width/2, hight/2, noiseMapped)

}
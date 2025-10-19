
class Petal{
  constructor(x,y){ 
    this.x=x; 
    this.y=y; 
    this.collected=false; 
    this.baseSize=20; 
  }
  
  display(){
    if (!this.collected){
      let pulse = this.baseSize + sin(frameCount*0.2)*5;
      noStroke(); fill(255,0,0,100); ellipse(this.x,this.y,pulse+15);
      fill(255,0,0); beginShape();
      vertex(this.x,this.y-pulse);
      bezierVertex(this.x+pulse/2,this.y-pulse/2,this.x+pulse/2,this.y+pulse/2,this.x,this.y+pulse);
      bezierVertex(this.x-pulse/2,this.y+pulse/2,this.x-pulse/2,this.y-pulse/2,this.x,this.y-pulse);
      endShape(CLOSE);
    }
  }
}


class Enemy{
  constructor(x,y){ this.x=x; this.y=y; this.vx=random(-3,3); this.vy=random(-3,3); }
  
  move(){ this.x+=this.vx; this.y+=this.vy;
     if(this.x<0||this.x>width)this.vx*=-1; 
     if(this.y<0||this.y>height)this.vy*=-1; }

  display(){ fill(255,50); ellipse(this.x,this.y,25); }
}
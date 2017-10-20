// bricks.js

/** @class Astroid1
  * The paddle in a Breakout game
  */
export default class Asteroid1 {
  constructor(pivots, size, location, velocity) {
    this.size = size;
    this.location = location;
    this.velocity = velocity;
    this.health = Math.round(size/2);
    this.pivots = pivots;
  }

  getLocation() {
    return this.location;
  }

  checkBulletCollision(bulletLocation){ //do some math
    //for(var i=0; i<this.pivots.length; i++){
      //var pivot = this.pivots[i];
      //var nextPivot = this.pivots[i+1];
      //if(i==this.pivots.length-1) nextPivot = this.pivots[0];
      //var slope = (nextPivot[1]-pivot[1])/(nextPivot[0]-pivot[0]);
      //c = y - mx
      //var cAstro = this.location[1] - slope*this.location[0];
      //var cBullet = bulletLocation[1] - slope*bulletLocation[0][0];
    //}
    if(Math.abs(this.location[0]-bulletLocation[0]) < this.size*.8 && Math.abs(this.location[1]-bulletLocation[1]) < this.size*.8){
      console.log("destroy!!!");
    }
  }

  update() {
    this.location = [this.location[0]+this.velocity[0],this.location[1]+this.velocity[1]];
    if(this.location[0] > 500) this.location[0] = 0;
    if(this.location[0] < 0) this.location[0] = 500;
    if(this.location[1] > 500) this.location[1] = 0;
    if(this.location[1] < 0) this.location[1] = 500;
  }

  render(context) {
    var pivots = this.pivots;
    var xPosition = this.location[0];
    var yPosition = this.location[1];
    context.beginPath();
    context.moveTo(xPosition+pivots[0][0],yPosition+pivots[0][1]);
    for(var i = 1; i < pivots.length; i++) {
      context.lineTo(xPosition+pivots[i][0],yPosition+pivots[i][1]);
    }
    context.closePath();
    context.fillStyle = "#FFCC00";
    context.fill();
  }
}

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

  remove() {
    this.location[0] = "null";
    this.location[1] = "null";
    this.velocity[0] = 0;
    this.velocity[1] = 0;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(velocity) {
    this.velocity = velocity;
  }

  getSize() {
    return this.size;
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

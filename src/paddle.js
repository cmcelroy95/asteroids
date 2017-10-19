// Snake.js

/** @class Paddle
  * The paddle in a Breakout game
  */
export default class Paddle {
  constructor() {
    this.location = [250,250];
    this.velocity = [0,0];
    this.direction = 0; //in radians
    this.drag = .02; //the ammound subtracted from velocity per cycle
    this.thrusterForce = .1;

    // bind class methods
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  check() {

  }

  //rotate: -1: counterclockwise, 0: false, 1: counterclockwise
  //thrusters: on/off true/false
  update(rotate, thrusters) {
    this.check()

    //update direction
    if(rotate == 'left'){
      this.direction -= .1;
      if(this.direction < 0) this.direction += (2 * Math.PI);
    }
    else if(rotate == 'right'){
      this.direction += .1;
      if(this.direction > 2 * Math.PI) this.direction -= (2 * Math.PI);
    }

    //thrusters changes velocity if true, do some math
    var xForce = 0;
    var yForce = 0;
    if(thrusters){
      xForce = this.thrusterForce * Math.cos(this.direction);
      yForce = this.thrusterForce * Math.sin(this.direction);
    }

    //update velocity
    var velocityX = this.velocity[0]+xForce;
    if (velocityX < 0) velocityX += this.drag;
    if (velocityX > 0) velocityX -= this.drag;
    var velocityY = this.velocity[1]+yForce;
    if (velocityY < 0) velocityY += this.drag;
    if (velocityY > 0) velocityY -= this.drag;
    this.velocity = [velocityX, velocityY];

    //update location
    this.location = [this.location[0]+this.velocity[0], this.location[1]+this.velocity[1]];
  }

  render(context) {
    var shipSize = 20;

    //get the 3 corners of the ships triangle show.bs.collapse
    var location = this.location;
    var frontDirection = this.direction;
    var front = [location[0] + shipSize * Math.cos(frontDirection), location[1] + shipSize * Math.sin(frontDirection)];
    var backLeftDirection = frontDirection + (.8 * Math.PI);
    var backLeft = [location[0] + shipSize * Math.cos(backLeftDirection), location[1] + shipSize * Math.sin(backLeftDirection)]
    var backRightDirection = frontDirection - (.8 * Math.PI);
    var backRight = [location[0] + shipSize * Math.cos(backRightDirection), location[1] + shipSize * Math.sin(backRightDirection)]

    // the triangle
    context.beginPath();
    context.moveTo(front[0], front[1]);
    context.lineTo(backLeft[0], backLeft[1]);
    context.lineTo(backRight[0], backRight[1]);
    context.closePath();

    // the outline
    context.lineWidth = 1;
    context.strokeStyle = '#666666';
    context.stroke();

    // the fill color
    context.fillStyle = "#FFCC00";
    context.fill();
  }
}

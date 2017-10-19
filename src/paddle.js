// Snake.js

/** @class Paddle
  * The paddle in a Breakout game
  */
export default class Paddle {
  constructor() {
    this.paddleWidth = 10;
    this.location = 45;
    // bind class methods
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  check(cellCoordinates, direction) {
    var x = cellCoordinates[0];
    var y = cellCoordinates[1];
    if(x > this.location && x < this.location + this.paddleWidth){
      var locationOnPaddle = x - this.location;
      var xDirection = direction[0];
      var scalar = locationOnPaddle -  this.paddleWidth/2;
      var newXDirection = xDirection + scalar/10;
      return [newXDirection, direction[1] * -1];
    }
    else return direction;
  }

  update(direction) {
    switch(direction) {
      case null:
        break;
      case 'right':
        this.location++;
        break;
      case 'left':
        this.location--;
        break;
    }
    //don't let paddle move past edge
    if(this.location < 0 || this.location > this.width)
      return true;
  }
  /** @function render
    * Render the snake
    */
  render(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.location,97,this.paddleWidth,1);
  }
}

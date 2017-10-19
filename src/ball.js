// Snake.js

/** @class ball
  * The ball in a Breakout game
  */
export default class Ball {
  constructor() {
    this.ballWidth = 1;
    this.location = [50.0, 90.0];
    // bind class methods
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }
  update(direction) {
    this.location[0] += direction[0];
    this.location[1] += direction[1];
    return this.location;
    //don't let paddle move past edge
    if(this.location < 0 || this.location > this.width)
      return true;
  }
  /** @function render
    * Render the snake
    */
  render(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.location[0],this.location[1],1,1);
  }
}

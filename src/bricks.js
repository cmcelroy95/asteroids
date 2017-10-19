// bricks.js

/** @class bricks
  * The paddle in a Breakout game
  */
export default class Bricks {
  constructor() {
    this.bricksDestroyed = 0;
    this.bricks = [];
    for(var y = 0; y < 5; y++){
      var newRow = [];
      for(var x = 0; x < 10; x++){
        newRow.push([x, y]);
      }
      this.bricks.push(newRow);
    }
    // bind class methods
    this.score = this.score.bind(this);
    this.check = this.check.bind(this);
    this.render = this.render.bind(this);
  }
  score(){
    return this.bricksDestroyed;
  }
  check(cellCoordinates, direction) {
    var x = cellCoordinates[0];
    var y = cellCoordinates[1];
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    if(this.bricks[y] && this.bricks[y][x] && this.bricks[y][x] !== "removed") {
      this.bricks[y][x] = "removed";
      this.bricksDestroyed++;
      var audio = new Audio('./wallbounce.wav');
      //audio.play();
      if(cellCoordinates[1]<=(y*10)+1 || cellCoordinates[1]>=((y+1)*10)-1)
        return [direction[0], direction[1]*-1];
      else
        return [direction[0]*-1, direction[1]];
    }
    else return direction;
  }

  /** @function render
    * Render the snake
    */
  render(ctx) {
    ctx.fillStyle = 'green';
    this.bricks.forEach(function(row){
      row.forEach(function(brick){
        if(brick !== "removed") ctx.fillRect(brick[0]*10,brick[1]*10,10, 10);
      })
    })
  }
}

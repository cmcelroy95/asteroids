// game.js

import Paddle from './paddle';
import Bricks from './bricks';
import Ball from './ball';

/** @class Game
  * Represents a Breakout game
  */
export default class Game {
  constructor() {
    this.paddle = new Paddle();
    this.paddleDirection = null;
    this.ball = new Ball();
    this.ballDirection = [0, -1];
    this.bricks = new Bricks();
    this.over = false;
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    // Bind class functions
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.endGame = this.endGame.bind(this);
    // controls
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    // Start the game loop
    this.interval = setInterval(this.loop, 20);
  }
  endGame(score){
    var messageBox = document.createElement('div');
    messageBox.innerHTML = "Game ends with a score of " + score;
    document.body.appendChild(messageBox);
    console.log("display box");
    clearInterval(this.interval);
  }
  handleKeyDown(event) {
    switch(event.key){
      case 'a':
      case 'ArrowLeft':
        this.paddleDirection = 'left';
        break;
      case 'd':
      case 'ArrowRight':
        this.paddleDirection = 'right';
        break;
    }
  }
  handleKeyUp(event) {
    this.paddleDirection = null;
  }
  /** @method update
    * Updates the game world.
    */
  update() {
    this.paddle.update(this.paddleDirection);
    var ballLocation = this.ball.update(this.ballDirection);
    if(ballLocation[1] <= 50) this.ballDirection = this.bricks.check(ballLocation, this.ballDirection); //returns same direction if no bounce
    if(ballLocation[1] == 96) this.ballDirection = this.paddle.check(ballLocation, this.ballDirection);
    if(ballLocation[0] < 0 || ballLocation[0] > 99) this.ballDirection = [this.ballDirection[0]*-1, this.ballDirection[1]];
    if(ballLocation[1] < 0) this.ballDirection = [this.ballDirection[0], this.ballDirection[1]*-1];
    if(ballLocation[1] > 100)this.endGame(this.bricks.score());
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 100, 100);
    this.paddle.render(this.backBufferContext);
    this.ball.render(this.backBufferContext);
    this.bricks.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0)
  }
  loop() {
    this.update();
    this.render();
  }
}

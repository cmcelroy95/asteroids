// game.js

import Ship from './ship';
import Asteroid1 from './asteroid1';
import AsteroidsController from './asteroids-controller';
import BulletsController from './bullets-controller';
import CollisionController from './collision-controller';
//import Bricks from './bricks';
//import Ball from './ball';

/** @ class Game
  * Represents a Breakout game
  */
export default class Game {
  constructor() {
    this.ship = new Ship();
    this.thrustersOn = false;
    this.over = false;
    this.asteroid1 = new Asteroid1(50, [1,1]);
    this.asteroidsController = new AsteroidsController();
    this.asteroidsController.createAsteroids(5);
    this.bulletsController = new BulletsController();
    this.collisionController = new CollisionController();
    //this.asteroids = new Asteroids(10);
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 500;
    this.backBufferCanvas.height = 500;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 500;
    this.screenBufferCanvas.height = 500;
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
    // Start the game
    this.interval = setInterval(this.loop, 50);
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
        this.rotateDirection = 'left';
        break;
      case 'd':
      case 'ArrowRight':
        this.rotateDirection = 'right';
        break;
      case 'w':
      case 'ArrowUp':
        this.thrustersOn = true;
    }
    if(event.keyCode === 32){
      var location = this.ship.getLocation();
      var velocity = this.ship.getVelocity();
      var direction = this.ship.getDirection();
      var directionX = Math.cos(direction) * 2;
      var directionY = Math.sin(direction) * 2;
      this.bulletsController.fire(location, [velocity[0]+directionX, velocity[1]+directionY]);
    }
  }
  handleKeyUp(event) {
    this.rotateDirection = null;
    if(event.key === 'w' || event.key === 'ArrowUp'){
      this.thrustersOn = false;
    }
  }
  update() {
    this.ship.update(this.rotateDirection, this.thrustersOn);
    //this.asteroid1.update();
    this.asteroidsController.update();
    this.bulletsController.update();
    this.collisionController.greedyCheck(this.ship.getLocation(), this.asteroidsController.getAsteroids(), this.bulletsController.getBullets());
  }
  render() {
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.fillRect(0, 0, 500, 500);
    this.ship.render(this.backBufferContext);
    this.asteroidsController.render(this.backBufferContext);
    this.bulletsController.render(this.backBufferContext);
    //this.asteroid1.render(this.backBufferContext);
    //this.ball.render(this.backBufferContext);
    //this.bricks.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0)
  }
  loop() {
    this.update();
    this.render();
  }
}

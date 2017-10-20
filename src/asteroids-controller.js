import Asteroid1 from './asteroid1';

export default class AsteroidsController {
  constructor() {
    this.asteroids = [];
  }

  createAsteroids(numAsteroids) {
    var xPosition;
    var yPosition;
    for(var i=0; i<numAsteroids; i++){
      var spawnSide =  Math.round(Math.random() * 4);
      var xVelocity = 1 * Math.random();
      var yVelocity = 1 * Math.random();
      switch(spawnSide){
        case 0: yPosition = 500; xPosition = 500 * Math.random(); yVelocity = -1 * Math.random(); break;
        case 1: yPosition = 500 * Math.random(); xPosition = 0; break;
        case 2: yPosition = 0; xPosition = 500 * Math.random(); break;
        case 3: yPosition = 500 * Math.random(); xPosition = 500; xVelocity = -1 * Math.random(); break;
      }
      var size = Math.random() * 20 + 5;
      var pivots = this.getAsteroidPivots(Math.round(Math.random()*1), size);
      this.asteroids.push(new Asteroid1(pivots, size, [xPosition,yPosition], [xVelocity,yVelocity]));
    }
  }

  getAsteroidPivots(style, size){
    var asteroidPivotStyle = [ //this is all of the different astroid figure configurations
      [
        [1*size,0],
        [.5*size,-1*size],
        [.4*size,-1*size],
        [0,-.5*size],
        [-.5*size,-1*size],
        [-1*size,-.2*size],
        [-.1*size,0],
        [-1*size,.1*size],
        [-.5*size,.9*size],
        [.2*size,1*size]
      ],
      [
        [1*size,0],
        [1*size,-.5*size],
        [.8*size,-.8*size],
        [.2*size,-.2*size],
        [-.5*size,0],
        [-.8*size,.3*size],
        [-.3*size,.6*size],
        [.2*size,.8*size],
        [.4*size,.4*size]
      ]
    ];
    return asteroidPivotStyle[style];
  }

  getAsteroids() {
    return this.asteroids;
  }

  update(context) {
    this.asteroids.forEach(function(asteroid){
      asteroid.update();
    });
  }

  render(context) {
    this.asteroids.forEach(function(asteroid){
      asteroid.render(context)
    });
  }
}

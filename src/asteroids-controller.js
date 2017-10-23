import Asteroid1 from './asteroid1';
import AudioController from './audio-controller';

export default class AsteroidsController {
  constructor() {
    this.asteroids = [];
    this.massDestroyed = 0; //this will count as the players score, makes sense..
    this.audioController = new AudioController();
    this.numAsteroids;

    //create score platform
    this.scoreBox = document.createElement('div');
    this.scoreBox.id = "score-box";
    this.scoreBox.innerHTML = "Score<br />" + this.massDestroyed;
    document.body.appendChild(this.scoreBox);
  }

  createAsteroids(numAsteroids) {
    this.asteroids = [];
    this.numAsteroids = numAsteroids;
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
      var size = Math.random() * 30 + 10;
      var pivots = this.getAsteroidPivots(Math.round(Math.random()*1), size);
      this.asteroids.push(new Asteroid1(pivots, size, [xPosition,yPosition], [xVelocity,yVelocity]));
    }
  }

  destroyAsteroid(asteroid) {
    this.numAsteroids--;
    if(asteroid.size < 10){
      this.audioController.playTrack('bangSmall');
      asteroid.remove();
      this.massDestroyed += Math.round(asteroid.size);
      this.scoreBox.innerHTML = "Score<br />" + this.massDestroyed;
      return;
    }
    if(asteroid.size < 30) this.audioController.playTrack('bangMedium');
    else this.audioController.playTrack('bangLarge');

    var massLoss = .8;
    var splitMag = .3;

    var oldMass = asteroid.getSize();
    var newMassRatio = Math.random();
    var newMass1 = oldMass * newMassRatio * massLoss; //some mass lost
    var newMass2 = oldMass * (1 - newMassRatio) * massLoss;
    this.massDestroyed += Math.round(oldMass - (newMass1 + newMass2)); //this prevents larger asteroids from being a less efficient job
    this.scoreBox.innerHTML = "Score<br />" + this.massDestroyed;

    var oldVelocity = asteroid.getVelocity();
    var newVelocity1;
    var newVelocity2;
    newVelocity1 = [oldVelocity[0]-splitMag, oldVelocity[1]-splitMag];
    newVelocity2 = [oldVelocity[0]+splitMag, oldVelocity[1]+splitMag];
    var position = asteroid.location;
    var xPosition = position[0];
    var yPosition = position[1];
    asteroid.remove();
    var pivots1 = this.getAsteroidPivots(Math.round(Math.random()*1), newMass1);
    var pivots2 = this.getAsteroidPivots(Math.round(Math.random()*1), newMass2);
    if(newMass1 > 8){
      this.asteroids.push(new Asteroid1(pivots1, newMass1, [xPosition+20,yPosition], [newVelocity1[0],newVelocity1[1]]));
      this.numAsteroids++;
    }
    if(newMass2 > 8){
      this.asteroids.push(new Asteroid1(pivots2, newMass2, [xPosition-20,yPosition], [newVelocity2[0],newVelocity2[1]]));
      this.numAsteroids++;
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
    console.log(this.numAsteroids);
    this.asteroids.forEach(function(asteroid){
      asteroid.update();
    });
    if(this.numAsteroids == 0) {
      console.log("next Level");
      return 'levelCleared';
    }
  }

  render(context) {
    this.asteroids.forEach(function(asteroid){
      asteroid.render(context)
    });
  }
}

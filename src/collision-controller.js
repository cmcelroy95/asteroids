import AudioController from './audio-controller';

export default class CollisionController {
  constructor(asteroidsController, bulletsController) {
    this.asteroidsController = asteroidsController;
    this.bulletsController = bulletsController;
    this.audioController = new AudioController();

    this.greedyCheck = this.greedyCheck.bind(this);
    this.checkBulletAsteroidCollision = this.checkBulletAsteroidCollision.bind(this);
  }

  greedyCheck(shipLocation, asteroids, bulletLocations){
    var metric = 50;
    var asteroidLocation;
    //check ship/asteroids collisions
    for(var i = 0; i < asteroids.length; i++){
      if(asteroids[i].location[0] == -100) continue;
      asteroidLocation = asteroids[i].getLocation();
      if(Math.abs(asteroidLocation[0]-shipLocation[0]) < metric && Math.abs(asteroidLocation[1]-shipLocation[1]) < metric){
        var message = this.checkShipAsteroidCollision(asteroids[i], shipLocation);
        if(message === "ship hit") return message;
      }
    }
    //check asteroid/bullet collisions
    for(var i = 0; i < bulletLocations.length; i++){
      var bullet = bulletLocations[i];
      if(bullet[0][0] == -100) {continue;}
      for(var j = 0; j < asteroids.length; j++){
        asteroidLocation = asteroids[j].getLocation();
        if(Math.abs(bullet[0][0]-asteroidLocation[0]) < metric && Math.abs(bullet[0][1]-asteroidLocation[1]) < metric){
          this.checkBulletAsteroidCollision(asteroids[j], bullet);
        }
      }
    }
    //check asteroid/asteroid collisions
    for(var firstAstroIndex=0; firstAstroIndex<asteroids.length - 1; firstAstroIndex++){
      asteroidLocation = asteroids[firstAstroIndex].location;
      if(asteroidLocation[0] == -100) continue;
      for(var secondAstroIndex=firstAstroIndex+1; secondAstroIndex<asteroids.length; secondAstroIndex++){
        var otherAsteroidLocation = asteroids[secondAstroIndex].getLocation();
        if(Math.abs(asteroidLocation[0]-otherAsteroidLocation[0]) < metric && Math.abs(asteroidLocation[1]-otherAsteroidLocation[1] < metric)){
          this.checkAsteroidAsteroidCollision(asteroids[firstAstroIndex], asteroids[secondAstroIndex]);
        }
      }
    }
  }

  checkShipAsteroidCollision(asteroid, shipLocation){
    var asteroidLocation = asteroid.location;
    var size = asteroid.size;
    if(Math.abs(shipLocation[0]-asteroidLocation[0]) < size*.8 && Math.abs(shipLocation[1]-asteroidLocation[1]) < size*.8){
      this.asteroidsController.destroyAsteroid(asteroid);
      return "ship hit";
    }
  }

  checkBulletAsteroidCollision(asteroid, bullet){
    var asteroidLocation = asteroid.location;
    var size = asteroid.size;
    if(Math.abs(bullet[0][0]-asteroidLocation[0]) < size && Math.abs(bullet[0][1]-asteroidLocation[1]) < size){
      this.bulletsController.removeBullet(bullet);
      this.asteroidsController.destroyAsteroid(asteroid);
    }
  }

  checkAsteroidAsteroidCollision(asteroid, otherAsteroid){
    var asteroidLocation = asteroid.getLocation();
    var otherAsteroidLocation = otherAsteroid.getLocation();
    var xDifference = Math.abs(asteroidLocation[0]-otherAsteroidLocation[0]);
    var yDifference = Math.abs(asteroidLocation[1]-otherAsteroidLocation[1]);
    var threshHold = (asteroid.getSize() + otherAsteroid.getSize());
    if(xDifference < threshHold && yDifference < threshHold){
      this.asteroidAsteroidCollision(asteroid, otherAsteroid);
    }
  }

  asteroidAsteroidCollision(asteroid, otherAsteroid){
    var asteroidPosition = asteroid.getLocation();
    var otherAsteroidLocation = otherAsteroid.getLocation();
    var asteroidVelocity = asteroid.getVelocity();
    var otherAsteroidVelocity = otherAsteroid.getVelocity();

    asteroid.setVelocity(otherAsteroidVelocity);
    otherAsteroid.setVelocity(asteroidVelocity);

    this.audioController.playTrack('bangLarge');
  }

  update(shipLocation, asteroids, bulletLocations) {
    this.greedyCheck(shipLocation, asteroids, bulletLocations);
  }

  render(context) {

  }
}

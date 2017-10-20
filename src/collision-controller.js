export default class CollisionController {
  constructor() {
  }

  greedyCheck(shipLocation, asteroids, bulletLocations){
    var asteroidLocation;
    //check ship/asteroids collisions
    asteroids.forEach(function(asteroid){
      asteroidLocation = asteroid.getLocation();
      if(Math.abs(asteroidLocation[0]-shipLocation[0]) < 50 && Math.abs(asteroidLocation[1]-shipLocation[1]) < 50){
        //console.log("ship collision");
      }
    });
    //check asteroid/bullet collisions
    bulletLocations.forEach(function(bullet){
      asteroids.forEach(function(asteroid){
        asteroidLocation = asteroid.getLocation();
        if(Math.abs(bullet[0][0]-asteroidLocation[0]) < 50 && Math.abs(bullet[0][1]-asteroidLocation[1]) < 50){
          asteroid.checkBulletCollision(bullet[0]);
          //console.log("bullet collision");
        }
      });
    });
    //check asteroid/asteroid collisions
    for(var firstAstroIndex=0; firstAstroIndex<asteroids.length - 1; firstAstroIndex++){
      asteroidLocation = asteroids[firstAstroIndex].getLocation();
      for(var secondAstroIndex=firstAstroIndex+1; secondAstroIndex<asteroids.length; secondAstroIndex++){
        var otherAsteroidLocation = asteroids[secondAstroIndex].getLocation();
        if(Math.abs(asteroidLocation[0]-otherAsteroidLocation[0]) < 10 && Math.abs(asteroidLocation[1]-otherAsteroidLocation[1] < 10)){
          //console.log("asteroid collision");
        }
      }
    }
  }

  update(shipLocation, asteroids, bulletLocations) {
    this.greedyCheck(shipLocation, asteroids, bulletLocations);
  }

  render(context) {

  }
}

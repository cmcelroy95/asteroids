export default class bulletsController {
  constructor() {
    this.bullets = [];
  }

  fire(location, velocity) {
    this.bullets.push([location,velocity]);
  }

  getBullets() {
    return this.bullets;
  }

  update(context) {
    this.bullets.forEach(function(bullet){
      var xVelocity = bullet[1][0];
      var yVelocity = bullet[1][1];

      bullet[0][0] = bullet[0][0] + xVelocity;
      bullet[0][1] = bullet[0][1] + yVelocity;
    });
  }

  render(context) {
    this.bullets.forEach(function(bullet){
      context.fillStyle = "#FFCC00";
      context.fillRect(bullet[0][0], bullet[0][1], 1, 1);
    });
  }
}

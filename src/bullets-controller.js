import AudioController from './audio-controller';

export default class bulletsController {
  constructor() {
    this.bullets = [];
    this.fireTimeOut = 0;
    this.audioController = new AudioController();
  }

  fire(location, velocity) {
    if(this.fireTimeOut <= 0){
      this.bullets.push([location,velocity]);
      this.audioController.playTrack('fire');
    }
    this.fireTimeOut = 10;
  }

  getBullets() {
    return this.bullets;
  }

  removeBullet(bullet){
    bullet[0][0] = -100;
    bullet[0][1] = -100;
    bullet[1][0] = 0;
    bullet[1][1] = 0;
  }

  update(context) {
    this.fireTimeOut--;
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

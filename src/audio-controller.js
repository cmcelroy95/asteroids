export default class AudioController {
  constructor() {
    this.tracks = {
      'beat1': new Audio('beat1.wav'),
      'beat2': new Audio('beat2.wav'),
      'fire': new Audio('fire.wav'),
      'thrust': new Audio('thrust.wav'),
      'bangSmall': new Audio('bangSmall.wav'),
      'bangMedium': new Audio('bangMedium.wav'),
      'bangLarge': new Audio('bangMedium.wav')
    }
  }

  playTrack(name){
    this.tracks[name].play();
  }
}

// const glidingBird = {
//   sx: 4,
//   sy: 762,
//   width: 27,
//   height: 27,
// };
// const groundImage = {
//   sx: 456,
//   sy: 0,
//   width: 256,
//   height: 88,
// };
// const pillarTop = {
//   sx: 86,
//   sy: 502,
//   width: 44,
//   height: 255,
// };
// const pillarBottom = {
//   sx: 86,
//   sy: 502,
//   width: 44,
//   height: 255,
// };
// const flyingBird = {
//   sx: 48,
//   sy: 762,
//   width: 27,
//   height: 27,
// };
let spriteImage = new Image();
spriteImage.src = "./assets/assets.png";
export class Sprites {
  constructor(canvas) {
    (this.spriteImage = spriteImage),
      (this.glidingBird = {
        sx: 4,
        sy: 762,
        width: 27,
        height: 27,
      });
    this.flyingBird = {
      sx: 48,
      sy: 762,
      width: 27,
      height: 27,
    };
    this.groundImage = {
      sx: 456,
      sy: 0,
      width: 256,
      height: 88,
    };
    this.pillarTop = {
      sx: 86,
      sy: 502,
      width: 44,
      height: 255,
    };
    this.pillarBottom = {
      sx: 130,
      sy: 503,
      width: 44,
      height: 255,
    };
    this.scoreBoard = {
      sx: 258,
      sy: 405,
      width: 177,
      height: 95,
    };
    this.gameOver = {
      sx:631,
      sy:98,
      width:115,
      height:27
    };
    this.playButton = {
      sx:557,
      sy:187,
      width:72,
      height:39
    };
    this.tapToPlay = {
      sx:459,
      sy:166,
      width:84,
      height:52
    };
    this.background = {
      sx:226,
      sy:0,
      width:227,
      height:403
    };
    this.gameTitle={
      sx:548,
      sy:148,
      width:137,
      height:22
    }


    canvas.sprites = this;
  }
}
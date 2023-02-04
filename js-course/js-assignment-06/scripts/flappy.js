 export class Flappy {
    constructor(canvas) {
      this.yOffset = canvas.height / 2;
      this.xOffset = 0.4 * canvas.width;
      this.height = 40;
      this.width = 40;
      this.alive = true;
      // this.image = birdImage;
      this.flyingUp = false;
      this.u = 0;
      this.v = this.u - canvas.g * canvas.t;
      // this.s = this.yOffset;
      this.fallSpeed = 0;
      this.passedPillars = 0;
      this.color = "red";
      // this.selectedBird = canvas.sprites.glidingBird;
  
      this.fall = function () {
        this.v = this.u - canvas.g * canvas.t;
        this.yOffset -= this.v;
      };
    }
  }
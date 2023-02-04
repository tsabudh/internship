 export class Flappy {
    constructor(canvas) {
      this.yOffset = canvas.height / 2;
      this.xOffset = 0.4 * canvas.width;
      this.height = 22;
      this.width = 27;
      this.alive = true;
      this.flyingUp = false;
      this.u = 0;
      this.v = this.u - canvas.g * canvas.t;
      this.fallSpeed = 0;
      this.passedPillars = 0;
      this.canvas = canvas;

      
    }
    fall() {
        this.v = this.u - this.canvas.g * this.canvas.t;
        this.yOffset -= this.v;
      };
  }
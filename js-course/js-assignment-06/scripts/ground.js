export class Ground {
    constructor(canvas) {
      this.sprite = groundImage;
      this.xOffset = 0;
      this.canvas = canvas;
    }
    update() {
      if (this.xOffset < -this.canvas.width) {
        this.xOffset =0;
      } else {
        this.xOffset -= this.canvas.speed;
      }
    }
  }
import * as sprites from "./globals.js";

export class Ground {
  constructor(canvas) {
    this.sprite = canvas.sprites.groundImage;
    this.xOffset = 0;
    this.canvas = canvas;
    this.yOffset = canvas.height - 85; //85 is ground depth

  }
  update() {
    if (this.xOffset < -this.canvas.width) {
      this.xOffset = 0;
    } else {
      this.xOffset -= this.canvas.speed;
    }
  }
}

import { platformImage } from "./level.js";
export class Platform {
  constructor(canvas, location) {
    this.canvas = canvas;
    this.height = 20;
    this.width = 150;
    this.x = location.x;
    this.y = location.y;

    canvas.platforms.push(this);
  }

  draw() {
    let ctx = this.canvas.context;
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
  // ctx.stroke();
    let grassHeight = 30;
    ctx.drawImage(
      platformImage,
      this.x,
      this.y - grassHeight,
      this.width,
      this.height + grassHeight * 2
    );
  }
}

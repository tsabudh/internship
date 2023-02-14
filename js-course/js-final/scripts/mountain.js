import { mountain1, lineSegmentCollection, mountainImage } from "./level.js";

export class Mountain {
  constructor(canvas, mountainDetails) {
    this.canvas = canvas;
    this.path = mountainDetails.path;
    canvas.mountains.push(this);
  }

  draw() {
    let ctx = this.canvas.context;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.path[0].x, 1000);
    this.path.forEach((coordinates) => {
      ctx.lineTo(coordinates.x, coordinates.y);
    });
    ctx.lineTo(this.path[this.path.length - 1].x, 1000);
    ctx.closePath();
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(mountainImage, this.path[0].x, 0);
    ctx.fillStyle = `rgba(114,51,36,0.5)`;
    ctx.restore();
  }
}

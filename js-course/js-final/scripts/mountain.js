import { mountain1, lineSegmentCollection } from "./level.js";


export class Mountain {
  constructor(canvas, mountainDetails) {
    this.canvas = canvas;

    this.path = mountainDetails.path;
    canvas.mountains.push(this);
  }

  
  draw() {
    let ctx = this.canvas.context;
    ctx.beginPath();
    ctx.moveTo(this.path[0].x, 1000);
    this.path.forEach((coordinates) => {
      ctx.lineTo(coordinates.x, coordinates.y);
    });
    ctx.lineTo(this.path[this.path.length - 1].x, 1000);
    ctx.closePath();
    ctx.fillStyle = `rgba(89,24,21,0.5)`;
    ctx.stroke();
  }
}

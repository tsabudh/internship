import { Vector } from "./vector.js";
import { lineSegmentCollection, mountain1 } from "./level.js";

export class Collision {
  constructor(canvas) {
    this.canvas = canvas;
  }

  checkCollision() {

    let lines = [...lineSegmentCollection];
    let lineBelow = [];

    if (lineBelow) {
      lines.forEach((lineSegment) => {
        //if hero is above line
        if (
          this.canvas.hero.location.x + this.canvas.hero.width >
            lineSegment.start.x &&
          this.canvas.hero.location.x < lineSegment.end.x
        ) {
          //check if hero is already above line
          if (lineBelow.indexOf(lineSegment) == -1) {
            lineBelow.push(lineSegment);
          }
        } else {
          // only splice array when item is found
          if (lineBelow.indexOf(lineSegment) > -1) {
            lineBelow.splice(lineBelow.indexOf(lineSegment), 1);
          }
        }
      });

      lineBelow.forEach((line) => {
        Math.abs(
          (this.canvas.hero.location.x - line.start.x) *
            (-line.end.y + line.start.y) +
            (this.canvas.hero.location.y - line.start.y) *
              (line.end.x - line.start.x)
        ) /
          Math.sqrt(
            (-line.end.y + line.start.y) ** 2 + (line.end.x - line.start.x) ** 2
          );

        //  this.canvas.hero.jointsCollection = [
        //   ...joints.left,
        //   ...joints.right,
        //   ...joints.bottom,
        // ];

        this.canvas.hero.jointsCollection.forEach((point) => {
          let distanceFromJoint =
            Math.abs(
              (point.x - line.start.x) * (-line.end.y + line.start.y) +
                (point.y - line.start.y) * (line.end.x - line.start.x)
            ) /
            Math.sqrt(
              (-line.end.y + line.start.y) ** 2 +
                (line.end.x - line.start.x) ** 2
            );

          // console.log(point, distanceFromJoint)
          if (
            distanceFromJoint < 5 &&
            line.start.x < point.x &&
            line.end.x > point.x
          ) {
            console.log("collided");
            this.canvas.gameStatus = "GAME_OVER";
          }
        });
      });
    }
  }
}

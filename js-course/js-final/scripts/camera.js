import { Vector } from "./vector.js";

export class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.location = new Vector(0, 0);
    this.width = canvas.width;
    this.height = canvas.height;
  }

  update() {
    if (this.canvas.hero.hasLanded) {
      if (this.canvas.hero.location.x > this.location.x) {
        this.location.x;
      }
    }
    if (
      this.canvas.hero.hasLanded &&
      this.canvas.hero.platformBelow.x > this.canvas.hero.x
    ) {
      console.log("change camera offset");
    }
    let boundRightOfHero = this.canvas.hero.boundXRight;
    let boundLeftOfHero = this.canvas.hero.boundXLeft;
    let velocityXOfHero = this.canvas.hero.velocity.x;

    if (
      // if camera box's right bound is hitting right end of canvas and hero is moving to right
      boundRightOfHero >= this.location.x + this.width &&
      velocityXOfHero > 0
    ) {
      // console.log(boundRightOfHero);
      let difference = this.location.x;
      this.location.x = boundRightOfHero - this.width;
      difference = this.location.x - difference;
      this.canvas.context.translate(-difference, 0);
      // this.canvas.context.translate(-this.canvas.hero.velocity.x, 0);
    }

    if (boundLeftOfHero <= this.location.x && velocityXOfHero < 0) {
      let difference = this.location.x;
      this.location.x = boundLeftOfHero;
      difference = this.location.x - difference;
      this.canvas.context.translate(-difference, 0);
    }
  }
}

import { enemy1 } from "./level.js";
import { Vector } from "./vector.js";
import { cannonImage } from "./level.js";
export class Enemy {
  constructor(canvas, enemyDetails) {
    this.canvas = canvas;
    this.x = enemyDetails.location.x;
    this.y = enemyDetails.location.y;
    this.width = 50;
    this.height = 50;

    this.cannonball = {};
    this.cannonball.direction = new Vector(0, 0);
    this.cannonball.location = new Vector(this.x, this.y);
    this.cannonball.dimensions = { width: 20, height: 20 };

    this.canvas.enemies.push(this);
    this.cannonFired = false;
    this.weaponType = enemyDetails.weapon;
    this.range = enemyDetails.range;
  }

  draw() {
    let ctx = this.canvas.context;

    ctx.drawImage(cannonImage, this.x, this.y, this.width, this.height);
  }

  fireCanons() {
    let hero = this.canvas.hero,
      ctx = this.canvas.context;

    this.cannonball.location = this.cannonball.location.add(
      this.cannonball.direction
    );
    ctx.fillStyle = "whitesmoke";
    if (
      // fire cannon only if enemy is flying, has not landed,
      // and within range
      hero.velocity.getMagnitude() > 1 &&
      hero.hasLanded == false &&
      hero.location.x + this.range > this.x &&
      hero.location.x < this.x
    ) {
      if (this.cannonFired == false)
        this.cannonball.direction = new Vector(
          hero.location.x - this.cannonball.location.x,
          hero.location.y - this.cannonball.location.y
        ).getUnitVector();

      console.log(hero.location.x, this.cannonball.direction);
      this.cannonFired = true;
      ctx.fillStyle = "whitesmoke";

      if (this.weaponType == "rocket") {
        ctx.fillStyle = "red";
        this.cannonball.direction = new Vector(
          hero.location.x - this.cannonball.location.x,
          hero.location.y - this.cannonball.location.y
        ).getUnitVector();
      }
    }

    ctx.beginPath();
    ctx.arc(
      this.cannonball.location.x,
      this.cannonball.location.y,
      this.cannonball.dimensions.width * 0.5,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = "transparent";
    ctx.stroke();
    ctx.fill();
  }

  reset() {
    this.cannonball.location = new Vector(this.x, this.y);
  }

  checkWeaponHit() {
    let hero = this.canvas.hero;

    if (Math.abs(hero.location.x - this.cannonball.location.x) < hero.width) {
      // console.log("closer");
      hero.jointsCollection.forEach((joint) => {
        let distance = Math.sqrt(
          (joint.x - this.cannonball.location.x) ** 2 +
            (joint.y - this.cannonball.location.y) ** 2
        );

        if (distance < this.cannonball.dimensions.width * 0.5) {
          console.log("collidded with cannon");
          this.canvas.gameStatus = "GAME_OVER";
        }
      });
    }
  }
}

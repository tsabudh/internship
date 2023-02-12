import { enemy1 } from "./level.js";
import { Vector } from "./vector.js";

export class Enemy {
  constructor(canvas, enemyDetails) {
    this.canvas = canvas;
    this.x = enemyDetails.location.x;
    this.y = enemyDetails.location.y;

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

    ctx.rect(this.x, this.y, 50, 50);
    ctx.stroke();
  }

  fireCanons() {
    let hero = this.canvas.hero,
      ctx = this.canvas.context;
    // this.cannonball.x += this.cannonballDirection.x;
    // this.cannonball.y += this.cannonballDirection.y;

    this.cannonball.location = this.cannonball.location.add(
      this.cannonball.direction
    );
    if (
      // fire cannon only if enemy is flying, has not landed,
      //
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

      this.cannonFired = true;

      if (this.weaponType == "rocket") {
        ctx.fillStyle = "red";
        this.cannonball.direction = new Vector(
          hero.location.x - this.cannonball.location.x,
          hero.location.y - this.cannonball.location.y
        ).getUnitVector();
      }
    }
    // console.log(this.cannonball);

    ctx.fillRect(
      this.cannonball.location.x,
      this.cannonball.location.y,
      this.cannonball.dimensions.width,
      this.cannonball.dimensions.height
    );
  }

  checkWeaponHit() {
    let hero = this.canvas.hero;

    if (Math.abs(hero.location.x - this.cannonball.location.x) < hero.width) {
      // console.log("closer");
      hero.jointsCollection.forEach((joint) => {
        let distance = Math.sqrt(
          (joint.x -
            (this.cannonball.location.x +
              this.cannonball.dimensions.width * 0.5)) **
            2 +
            (joint.y -
              (this.cannonball.location.y +
                this.cannonball.dimensions.height * 0.5)) **
              2
        );
        console.log(distance);
        if (distance < 10) {
          console.log("collidded with cannon");
          this.canvas.gameStatus = "GAME_OVER";
        }
      });
    }
  }
}

import { heroImage } from "./level.js";
import { Vector } from "./vector.js";
export class Hero {
  constructor(canvas) {
    this.canvas = canvas;
    this.height = 50;
    this.width = 50;
    this.hasLanded = false;
    this.crashLanded = false;

    this.fuelMax = 500;
    this.fuel = this.fuelMax;

    this.jointsCollection = [];
    this.numberOfJointsPerSide = 8;
    this.platformBelow = null;

    this.location = new Vector(300, 0);
    this.velocity = new Vector(0, 0);
    this.maxVelocity = new Vector(2, 3);
    this.acceleration = new Vector(0, 0);

    this.thrusterUp = new Vector(0, -0.15);
    this.thrusterLeft = new Vector(-0.05, 0);
    this.thrusterRight = new Vector(0.05, 0);

    this.thrusterUpOn = false;
    this.thrusterLeftOn = false;
    this.thrusterRightOn = false;

    this.boundHeight = 150;
    this.boundWidth = 500;
    this.boundXLeft =
      this.location.x - this.boundWidth * 0.5 - this.width * 0.5;
    this.boundXRight = this.location.x + this.boundWidth * 0.5;
  }

  update() {
    //* fuel
    if (this.thrusterUpOn || this.thrusterLeftOn || this.thrusterRightOn) {
      this.fuel--;
    }

    //* motion
    this.velocity = this.velocity.add(this.canvas.gravity);
    this.velocity = this.velocity.add(this.acceleration);
    this.velocity = Vector.prototype.min(this.velocity, this.maxVelocity);

    this.location = this.location.add(
      this.velocity
      // Vector.prototype.min(this.velocity, this.maxVelocity)
    );

    if (this.location.y > this.canvas.groundLevel - this.height)
      this.location.y = this.canvas.groundLevel - this.height;

    //* bound hero inside playing area between first and last platform
    if (this.location.x < this.canvas.platforms[0].x) {
      this.location.x = this.canvas.platforms[0].x;
      this.velocity.x = 0;
    } else if (
      this.location.x + this.width >
      this.canvas.platforms[this.canvas.platforms.length - 1].x +
        this.canvas.platforms[this.canvas.platforms.length - 1].width
    ) {
      this.location.x =
        this.canvas.platforms[this.canvas.platforms.length - 1].x +
        this.canvas.platforms[this.canvas.platforms.length - 1].width -
        this.width;
      this.velocity.x = 0;
    }
    //* bounding box update
    this.boundXLeft =
      this.location.x - this.boundWidth * 0.5 + this.width * 0.5;
    this.boundXRight = this.boundXLeft + this.boundWidth;

    //* hero joints for collision checkup
    let joints = {
      left: [],
      right: [],
      bottom: [],
      top: [],
    };

    for (let i = 0; i <= this.numberOfJointsPerSide; i++) {
      joints.left[i] = {
        x: this.location.x,
        y: this.location.y + (this.height / this.numberOfJointsPerSide) * i,
      };
      joints.right[i] = {
        x: this.location.x + this.width,
        y: this.location.y + (this.height / this.numberOfJointsPerSide) * i,
      };
      joints.bottom[i] = {
        x: this.location.x + (this.width / this.numberOfJointsPerSide) * i,
        y: this.location.y + this.height,
      };
      joints.top[i] = {
        x: this.location.x + (this.width / this.numberOfJointsPerSide) * i,
        y: this.location.y,
      };
    }
    this.jointsCollection = [
      ...joints.left,
      ...joints.right,
      ...joints.bottom,
      ...joints.top,
    ];
  }

  checkForLanding() {
    this.canvas.platforms.forEach((platform) => {
      if (
        this.location.x + this.width > platform.x &&
        this.location.x < platform.x + platform.width
      ) {
        this.platformBelow = platform;
        if (this.location.y + this.height >= this.platformBelow.y) {
          this.location.y = this.platformBelow.y - this.height;
          this.hasLanded = true;
          //if hero lands on edge bring him fully on platform
          if (this.location.x < this.platformBelow.x) {
            // this.location.x = this.platformBelow.x;
            this.location.x += 2;
          } else if (
            this.location.x + this.width >
            this.platformBelow.x + this.platformBelow.width
          ) {
            // this.location.x =
            //   this.platformBelow.x + this.platformBelow.width - this.width;
            this.location.x -= 2;
          }
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.fuel < this.fuelMax ? (this.fuel += 2) : this.fuelMax;
          // this.fuel = this.fuelMax;
          if (this.velocity.y >= 10) {
            console.log("speedlanded");
            this.velocity.y = 0;
            this.fuel = 0;
          }
        } else {
          this.hasLanded = false;
        }
      }
    });
  }

  checkInputs() {
    //* up thrusters
    //if hero has fuel and thrusterUp is not on
    if (
      this.fuel > 0 &&
      this.canvas.keyDown.w == true &&
      this.thrusterUpOn == false
    ) {
      this.acceleration = this.acceleration.add(this.thrusterUp);
      this.thrusterUpOn = true;

      //if hero does not have fuel but thrusterUp is still on
    } else if (
      this.fuel < 0 &&
      this.canvas.keyDown.w == true &&
      this.thrusterUpOn == true
    ) {
      this.acceleration = this.acceleration.sub(this.thrusterUp);
      this.thrusterUpOn = false;

      // if fuel is not empty and user stops thrusters
    } else if (this.canvas.keyDown.w == false && this.thrusterUpOn == true) {
      this.acceleration = this.acceleration.sub(this.thrusterUp);
      this.thrusterUpOn = false;
    }

    //left thrusters
    if (
      this.fuel > 0 &&
      this.canvas.keyDown.a == true &&
      this.thrusterLeftOn == false
    ) {
      this.acceleration = this.acceleration.add(this.thrusterLeft);
      this.thrusterLeftOn = true;
      //if hero does not have fuel but thrusterUp is still on
    } else if (
      this.fuel < 0 &&
      this.canvas.keyDown.w == true &&
      this.thrusterUpOn == true
    ) {
      this.acceleration = this.acceleration.sub(this.thrusterUp);
      this.thrusterUpOn = false;

      // if fuel is not empty and user stops thrusters
    } else if (this.canvas.keyDown.a == false && this.thrusterLeftOn == true) {
      this.acceleration = this.acceleration.sub(this.thrusterLeft);
      this.thrusterLeftOn = false;
    }

    // right thrusters
    if (
      this.fuel > 0 &&
      this.canvas.keyDown.d == true &&
      this.thrusterRightOn == false
    ) {
      this.acceleration = this.acceleration.add(this.thrusterRight);
      this.thrusterRightOn = true;
      //if hero does not have fuel but thrusterUp is still on
    } else if (
      this.fuel < 0 &&
      this.canvas.keyDown.w == true &&
      this.thrusterUpOn == true
    ) {
      this.acceleration = this.acceleration.sub(this.thrusterUp);
      this.thrusterUpOn = false;

      // if fuel is not empty and user stops thrusters
    } else if (this.canvas.keyDown.d == false && this.thrusterRightOn == true) {
      this.acceleration = this.acceleration.sub(this.thrusterRight);
      this.thrusterRightOn = false;
    }
  }

  draw() {
    let ctx = this.canvas.context;
    //hero
    ctx.beginPath();
    ctx.rect(this.location.x, this.location.y, this.width, this.height);
    ctx.stroke();
    //draw hero Image
    ctx.drawImage(
      heroImage,
      this.location.x,
      this.location.y,
      this.width,
      this.height
    );

    // bounding box
    // ctx.beginPath();
    // ctx.rect(
    //   this.boundXLeft,
    //   this.location.y - this.height,
    //   this.boundWidth,
    //   this.boundHeight
    // );

    ctx.stroke();
  }

  showFuelIndicator() {
    let ctx = this.canvas.context;
    let fuelIndicator = {
      x: this.canvas.camera.location.x,
      y: this.canvas.camera.location.y,
      width: 100,
      height: 10,
    };
    ctx.rect(
      fuelIndicator.x,
      fuelIndicator.y,
      fuelIndicator.width,
      fuelIndicator.height
    );
    ctx.strokeStyle = "whitesmoke";
    ctx.stroke();
    let fuelRatio = (this.fuel / 500) * fuelIndicator.width;
    ctx.fillStyle = "whitesmoke";
    ctx.fillRect(
      fuelIndicator.x,
      fuelIndicator.y,
      fuelRatio,
      fuelIndicator.height
    );
  }
  // onGround() {
  //   return this.location == this.canvas.groundLevel - this.height;
  // }
}

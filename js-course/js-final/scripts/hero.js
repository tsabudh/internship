import { Vector } from "./vector.js";
export class Hero {
  constructor(canvas) {
    this.canvas = canvas;
    this.height = 50;
    this.width = 50;
    this.hasLanded = false;
    this.crashLanded = false;

    this.fuel = 500;

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
    this.boundWidth = 300;
    this.boundXLeft =
      this.location.x - this.boundWidth * 0.5 - this.width * 0.5;
    this.boundXRight = this.location.x + this.boundWidth * 0.5;
  }

  update() {
    //* fuel
    if (this.thrusterUpOn || this.thrusterLeftOn || this.thrusterRightOn) {
      this.fuel--;
    }
    console.log(this.fuel);

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
    // this.canvas.context.translate(-this.hero.location.x, this.hero.location.y);

    //* bounding box update
    this.boundXLeft =
      this.location.x - this.boundWidth * 0.5 + this.width * 0.5;
    this.boundXRight = this.boundXLeft + this.boundWidth;

    //* hero joints for collision checkup
    let joints = {
      left: [],
      right: [],
      bottom: [],
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
    }
    this.jointsCollection = [...joints.left, ...joints.right, ...joints.bottom];
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
          this.velocity.y = 0;
          this.fuel = 500;
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
    //up thrusters
    if (
      
      this.canvas.keyDown.w == true &&
      this.thrusterUpOn == false
    ) {
      this.acceleration = this.acceleration.add(this.thrusterUp);
     this.thrusterUpOn = true;

      //if thrusters are already on
    } else if (
      
      this.canvas.keyDown.w == false &&
   this.thrusterUpOn == true
    ) {
      // this.acceleration = new Vector(0, 0);

      this.acceleration = this.acceleration.sub(this.thrusterUp);
     this.thrusterUpOn = false;
    }

    //left thrusters
    if (this.canvas.keyDown.a == true && this.thrusterLeftOn == false) {
      this.acceleration = this.acceleration.add(this.thrusterLeft);
      this.thrusterLeftOn = true;
      //if thrusters are already on
    } else if (this.canvas.keyDown.a == false && this.thrusterLeftOn == true) {
      this.acceleration = this.acceleration.sub(this.thrusterLeft);
      this.thrusterLeftOn = false;
    }

    // right thrusters
    if (this.canvas.keyDown.d == true && this.thrusterRightOn == false) {
      this.acceleration = this.acceleration.add(this.thrusterRight);
      this.thrusterRightOn = true;
      //if thrusters are already on
    } else if (this.canvas.keyDown.d == false && this.thrusterRightOn == true) {
      this.acceleration = this.acceleration.sub(this.thrusterRight);
      this.thrusterRightOn = false;
    }
  }

  draw() {
    //hero
    this.canvas.context.beginPath();
    this.canvas.context.rect(
      this.location.x,
      this.location.y,
      this.width,
      this.height
    );
    this.canvas.context.stroke();

    // bounding box
    this.canvas.context.beginPath();
    this.canvas.context.rect(
      this.boundXLeft,
      this.location.y - this.height,
      this.boundWidth,
      this.boundHeight
    );

    this.canvas.context.stroke();
  }
  onGround() {
    return this.location == this.canvas.groundLevel - this.height;
  }
}

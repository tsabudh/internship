import { Hero } from "./hero.js";
import { InputHandler } from "./inputhandler.js";
import { Vector } from "./vector.js";
import { Camera } from "./camera.js";
import { platform1, mountain1 } from "./level.js";

import { Platform } from "./platform.js";
import { Mountain } from "./mountain.js";
import { Collision } from "./collision.js";

export class Canvas {
  constructor(id, container, width, height) {
    let canvasEl = document.createElement("canvas");
    canvasEl.setAttribute("id", id);
    canvasEl.setAttribute("width", width + "px");
    canvasEl.setAttribute("height", height + "px");
    document.querySelector(container).appendChild(canvasEl);

    this.location = new Vector(0, 0);
    this.width = width;
    this.height = height;
    this.groundLevel = 480;

    this.gravity = new Vector(0, 0.1);

    this.g = 10;
    this.animationCounter = 0;
    this.screenFrequency = 60;
    this.timeElapsed = 0;
    this.staggeredFrame = 6;
    this.seconds = 0;
    this.time = 0;
    this.t = 0.01;
    this.lastKey = "";
    this.keyDown = { a: false, d: false, w: false };

    this.context = canvasEl.getContext("2d");
    this.hero = new Hero(this);
    this.inputHandler = new InputHandler(this);
    this.camera = new Camera(this);
    this.collision = new Collision(this);
    this.platforms = [];
    this.mountains = [];
  }

  initializeLevel() {
    platform1.forEach((platformDetails, index) => {
      let platform = {};
      platform[`${index}`] = new Platform(this, platformDetails.location);
    });

    mountain1.forEach((mountainDetails, index) => {
      let mountain = {};
      mountain[`${index}`] = new Mountain(this, mountainDetails);
    });
  }

  update() {
    // this.context.translate(this.hero.location.x, this.hero.location.y);
    if (this.animationCounter % this.screenFrequency === 0) {
      this.timeElapsed++;
    }
    if (this.animationCounter % this.staggeredFrame == 0) {
      this.seconds++;
    }
  }

  drawGround() {
    let ctx = this.context;
    ctx.strokeStyle = "brown";
    ctx.beginPath();
    ctx.rect(0, this.groundLevel, 10000, 20);
    ctx.stroke();
  }

  clear() {
    let ctx = this.context;
    // this.canvas.context.translate(-1, 0);
    let isHeroWithin =
      this.hero.location.x > this.camera.location.x &&
      this.hero.location.x < this.camera.location.x + this.width;
    // console.log(
    //   "camera bound is from:",
    //   this.camera.boundXLeft.toFixed(2),
    //   "to:",
    //   this.camera.boundXRight.toFixed(2),
    //   this.hero.location.x.toFixed(0),
    //   "|| view is from:",
    //   this.camera.location.x.toFixed(0),
    //   " to :",
    //   (this.camera.location.x + this.width).toFixed(2),
    //   isHeroWithin
    // );

    ctx.clearRect(this.camera.location.x, 0, this.width, this.height);
    // ctx.clearRect(this.camera.location.x, 0, this.width, this.height);
  }
}

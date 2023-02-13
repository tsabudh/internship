import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";
import { InputHandler } from "./inputhandler.js";
import { Vector } from "./vector.js";
import { Camera } from "./camera.js";
import { platform1, mountain1, background1, enemy1 } from "./level.js";

import { Platform } from "./platform.js";
import { Mountain } from "./mountain.js";
import { Collision } from "./collision.js";
import { mars1 } from "./level.js";



export class Canvas {
  constructor(id, container, width, height) {
    let canvasEl = document.createElement("canvas");
    canvasEl.setAttribute("id", id);
    canvasEl.setAttribute("width", width + "px");
    canvasEl.setAttribute("height", height + "px");
    document.querySelector(container).appendChild(canvasEl);

    this.location = new Vector(0, 0);
    this.gravity = new Vector(0, 0.1);

    this.width = width;
    this.height = height;
    this.groundLevel = 480;

    this.gameStatus = "NOT_STARTED";
    this.checkpoint = 0;

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
    this.enemies = [];
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

    enemy1.forEach((enemyDetails, index) => {
      let enemy = {};
      enemy[`${index}`] = new Enemy(this, enemyDetails);
    });
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

    ctx.clearRect(this.camera.location.x, 0, this.width, this.height);
  }

  drawMainMenu() {
    let ctx = this.context;
    ctx.drawImage(mars1, 0, 0, this.width, this.height);
    ctx.font = "50px serif";
    ctx.fillText("Click to start", this.width / 3, 50);
    ctx.stroke();
  }

  drawRestartMenu() {
    let ctx = this.context;

    ctx.font = "50px serif";
    ctx.fillText("Game over!!", this.camera.location.x + this.width / 3, 50);
    ctx.fillText(
      "Click to restart!",
      this.camera.location.x + this.width / 3,
      100
    );
    ctx.stroke();
  }

  drawPausedMenu() {
    let ctx = this.context;

    ctx.font = "50px serif";
    ctx.fillText("Game Paused!!", this.camera.location.x + this.width / 3, 50);
    ctx.fillText(
      "Press Escape to play!",
      this.camera.location.x + this.width / 3,
      100
    );
    ctx.stroke();
  }
  drawBackground() {
    this.context.drawImage(background1, 0, 0);
  }

  startGame() {
    this.location = new Vector(0, 0);
    this.hero.location = new Vector(300, 0);
    this.hero.acceleration = new Vector(0, 0);
    this.hero.velocity = new Vector(0, 0);
    this.hero.fuel = this.hero.fuelMax;

   this.camera.location = new Vector(0, 0);
   this.context.setTransform(1, 0, 0, 1, 0, 0);


    // this.platforms = [];
    // this.mountains = [];
    // this.enemies = [];
  }
}

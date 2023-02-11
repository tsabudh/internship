// import { Hero } from "./hero.js";
import { Canvas } from "./canvas.js";
import { Platform } from "./platform.js";
// import { InputHandler } from "./inputhandler.js";
import { Camera } from "./camera.js";
import { platform1 } from "./level.js";
import { Mountain } from "./mountain.js";
// import { checkForCrashLand } from "./collision.js";

function gameLoop(canvas) {
  function animate() {
    // console.log(canvas.mountains);
    //clear canvas
    canvas.clear();

    //update environment
    canvas.update();

    // draw environment
    canvas.drawGround();

    //draw hero
    // canvas.hero.checkForFuel();
    canvas.hero.checkInputs();
    canvas.hero.update();
    canvas.hero.checkForLanding();
    canvas.hero.draw();

    //camera
    canvas.camera.update();

    //mountains collision
    canvas.collision.checkCollision();

    // checkForCrashLand(canvas);
    canvas.mountains.forEach((mountain) => {
      mountain.draw();
    });
    //draw platforms
    canvas.platforms.forEach((platform) => {
      platform.draw();
    });

    // recall animate
    window.requestAnimationFrame(animate);
  }
  animate();
}

function main() {
  let canvas = new Canvas("canvas-1", "body", 1000, 500);
  // platform1.forEach((platformDetails, index) => {
  //   let platform = {};
  //   platform[`${index}`] = new Platform(canvas, platformDetails.location);
  // });
  canvas.initializeLevel();
  gameLoop(canvas);
}

main();

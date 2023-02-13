// import { Hero } from "./hero.js";
import { Canvas } from "./canvas.js";
import { Platform } from "./platform.js";
// import { InputHandler } from "./inputhandler.js";
import { Camera } from "./camera.js";
import { platform1, background1 } from "./level.js";
import { Mountain } from "./mountain.js";
// import { checkForCrashLand } from "./collision.js";

function gameLoop(canvas) {
  function animate() {
    console.log("gameStatus:", canvas.gameStatus);
    console.log(
      "canvas location is:",
      canvas.location,
      "this camera location is:",
      canvas.camera.location,
      "hero location is:"
    );

    if (canvas.gameStatus == "NOT_STARTED") {
      canvas.clear();

      canvas.drawMainMenu();
    }
    if (canvas.gameStatus == "GAME_START") {
      canvas.startGame();
      canvas.gameStatus = "PLAYING";
    }

    if (canvas.gameStatus == "GAME_OVER") {
      console.log("game over. Show game over sign and menu for restart");
      canvas.drawRestartMenu();
    }

    if (canvas.gameStatus == "PAUSED") {
      canvas.drawPausedMenu();
    }
    if (canvas.gameStatus == "PLAYING") {
      // console.log(canvas.mountains);
      //clear canvas
      canvas.clear();

      //update environment
      // canvas.update();

      // draw environment
      // canvas.drawBackground();

      canvas.mountains.forEach((mountain) => {
        mountain.draw();
      });
      //draw platforms
      canvas.platforms.forEach((platform) => {
        platform.draw();
      });

      // draw enemies
      canvas.enemies.forEach((enemy) => {
        enemy.draw();
        enemy.fireCanons();
        enemy.checkWeaponHit();
      });

      //draw hero
      // canvas.hero.checkForFuel();
      canvas.hero.checkInputs();
      canvas.hero.update();
      canvas.hero.checkForLanding();
      canvas.hero.draw();
      canvas.hero.showFuelIndicator();

      //camera
      canvas.camera.update();

      //mountains collision
      canvas.collision.checkCollision();

      // checkForCrashLand(canvas);
    }

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

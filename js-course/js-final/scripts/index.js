import { Canvas } from "./canvas.js";
import { Platform } from "./platform.js";
import { Camera } from "./camera.js";
import { platform1, background1 } from "./level.js";
import { Mountain } from "./mountain.js";

function gameLoop(canvas) {
  function animate() {
    console.log("gameStatus:", canvas.gameStatus);
    console.log(canvas.hero.thrusterUpOn);
    if (canvas.gameStatus == "NOT_STARTED") {
      canvas.clear();

      canvas.drawMainMenu();
    }
    if (canvas.gameStatus == "GAME_START") {
      canvas.startGame();
      canvas.gameStatus = "PLAYING";
    }

    if (canvas.gameStatus == "GAME_OVER") {
      canvas.drawRestartMenu();
    }

    if (canvas.gameStatus == "PAUSED") {
      canvas.drawPausedMenu();
    }
    if (canvas.gameStatus == "PLAYING") {
      //clear canvas
      canvas.clear();

      //update environment
      // canvas.update();

      // draw environment
      canvas.drawBackground();

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
  canvas.initializeLevel();
  gameLoop(canvas);
}

main();

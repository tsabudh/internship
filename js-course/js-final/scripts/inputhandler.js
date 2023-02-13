import { Canvas } from "./canvas.js";
export class InputHandler {
  constructor(canvas) {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape" && canvas.gameStatus == "PLAYING") {
        canvas.gameStatus = "PAUSED";
      } else if (e.key == "Escape" && canvas.gameStatus == "PAUSED") {
        canvas.gameStatus = "PLAYING";
      }
      if (canvas.gameStatus == "PLAYING") {
        if (e.key == "a") canvas.keyDown.a = true;
        if (e.key == "d") canvas.keyDown.d = true;
        if (e.key == "w") canvas.keyDown.w = true;
        if (e.key == "a") canvas.keyDown.a = true;
        if (e.key == "a") canvas.keyDown.a = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (canvas.gameStatus == "PLAYING") {
        if (e.key == "a") canvas.keyDown.a = false;
        if (e.key == "d") canvas.keyDown.d = false;
        if (e.key == "w") canvas.keyDown.w = false;
        if (e.key == "a") canvas.keyDown.a = false;
        if (e.key == "a") canvas.keyDown.a = false;
      }
    });

    window.addEventListener("click", (e) => {
      if (canvas.gameStatus == "NOT_STARTED") {
        console.log("clicked when game not started");
        // canvas = new Canvas("canvas-1", "body", 1000, 500);

        canvas.gameStatus = "PLAYING";
      } else if (canvas.gameStatus == "GAME_OVER") {
        canvas.gameStatus = "GAME_START";
        // canvas.gameStatus = "NOT_STARTED";
      }
    });
  }
}

import { Canvas } from "./canvas.js";
import { startGame } from "./game.js";


//global variables
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;


function main() {
  let canvas0 = new Canvas("canvas-0", "body", CANVAS_WIDTH, CANVAS_HEIGHT, 5);
  let canvas0El = document.getElementsByTagName("canvas")[0];
  startGame(canvas0El, canvas0);
}

main();

//global variable
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const PILLAR_SIZE = 100;
const OBSTACLE_SPEED = 10;
const FONT_SIZE = 30;

let assets = new Image();
assets.src = "./assets/assets.png";

const glidingBird = {
  sx: 4,
  sy: 762,
  width: 27,
  height: 27,
};
const groundImage = {
  sx: 456,
  sy: 0,
  width: 256,
  height: 88,
};
const pillarTop = {
  sx: 86,
  sy: 502,
  width: 44,
  height: 255,
};
const pillarBottom = {
  sx: 86,
  sy: 502,
  width: 44,
  height: 255,
};
const flyingBird = {
  sx: 48,
  sy: 762,
  width: 27,
  height: 27,
};
const birdImage = new Image();
birdImage.src = "./assets/bird.png";

const birdUpImage = new Image();
birdUpImage.src = "./assets/birdup.png";

const pillarImage = new Image();
pillarImage.src = "./assets/pillar.png";
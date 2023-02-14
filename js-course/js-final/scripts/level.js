import { Canvas } from "./canvas.js";

export let mars1 = new Image();
mars1.src = "./assets/mars1.webp";

export let platformImage = new Image();
platformImage.src = "./assets/platform.png";
export let cannonImage = new Image();
cannonImage.src = "./assets/cannon.png";

export let background1 = new Image();
background1.src = "./assets/background1.jpg";

export let heroImage = new Image();
heroImage.src = "./assets/hero.png";

export let mountainImage = new Image();
mountainImage.src = "./assets/mountain1.jpg";

export let platform1 = [
  {
    location: { x: 250, y: 250 },
  },
  {
    location: { x: 1000, y: 350 },
  },
  {
    location: { x: 1800, y: 430 },
  },
  {
    location: { x: 2500, y: 250 },
  },
  {
    location: { x: 3600, y: 150 },
  },
];

export let mountain1 = [
  {
    path: [
      { x: -100, y: 150 },
      { x: 0, y: 280 },
      { x: 150, y: 200 },
      { x: 250, y: 280 },
    ],
  },
  {
    path: [
      { x: 250, y: 280 }, //line segment
      { x: 450, y: 280 },
      { x: 1000, y: 350 },
    ],
  },
  {
    path: [
      { x: 1000, y: 390 },
      { x: 1200, y: 390 },
      { x: 1700, y: 280 },
      { x: 1800, y: 440 },
    ],
  },
  {
    path: [
      { x: 1800, y: 450 },
      { x: 2000, y: 450 },
      { x: 2050, y: 140 },
      { x: 2300, y: 350 },
      { x: 2400, y: 250 },
      { x: 2500, y: 280 },
    ],
  },
  {
    path: [
      { x: 2500, y: 280 },
      { x: 2800, y: 290 },
      { x: 2900, y: 170 },
      { x: 3015, y: 450 },
      { x: 3100, y: 160 },
      { x: 3150, y: 350 },
      { x: 3400, y: 250 },
      { x: 3600, y: 160 },
    ],
  },
  {
    path: [
      { x: 3600, y: 190 },
      { x: 3800, y: 190 },
      { x: 3900, y: 250 },
      { x: 4000, y: 280 },
    ],
  },
];

export let enemy1 = [
  {
    weapon: "cannon",
    range:200,
    location: { x: 700, y: 350 },
  },
  {
    weapon: "rocket",
    range:250,
    location: { x: 1400, y: 360 },
  },
];

export let lineSegmentCollection = [];

for (let i = 0; i < mountain1.length; i++) {
  for (let j = 0; j < mountain1[i].path.length; j++) {
    let newSegment;
    //* edge case
    if (j == mountain1[i].path.length - 1 && mountain1[i + 1]) {
      newSegment = {
        start: mountain1[i].path[j],
        end: mountain1[i + 1].path[0],
      };
    } else {
      newSegment = {
        start: mountain1[i].path[j],
        end: mountain1[i].path[j + 1],
      };
    }

    //push only if start and end are defined
    if (newSegment.start && newSegment.end) {
      lineSegmentCollection.push(newSegment);
    }
  }
}

import { ctx, GROUND, WIDTH } from "./canvas.js";
import { loadImage } from "./utils.js";

export let dinoImage, cactusImage, birdImage, restartButtonImage;

export async function loadAssets() {
  [dinoImage, cactusImage, birdImage, restartButtonImage] = await Promise.all([
    loadImage("./Assets/dino_basic.png"),
    loadImage("./Assets/cactus_1.png"),
    loadImage("./Assets/bird_up.png"),
    loadImage("./Assets/restart.png"),
  ]);
}

export const gameState = {
  isGameActive: false,
};

// game objects
export const dino = {
  x: 10,
  y: GROUND,
  width: 64,
  height: 64,
  y_velocity: 0,
  isJumping: false,
  draw() {
    ctx.fillStyle = "green";
    ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height);
    console.log("dino draw");
  },
  drawHitBox() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
};

export class Cactus {
  constructor() {
    this.x = WIDTH;
    this.y = GROUND;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height);
  }

  drawHitBox() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export class Bird {
  constructor() {
    this.x = WIDTH;
    this.y = 64;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.drawImage(birdImage, this.x, this.y, this.width, this.height);
  }

  drawHitBox() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

// UI elements
export const restartButton = {
  x: WIDTH / 2 - 16,
  y: GROUND - 128,
  width: 32,
  height: 28,
  draw() {
    ctx.drawImage(restartButtonImage, this.x, this.y, this.width, this.height);
  },
  isInside(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  },
};

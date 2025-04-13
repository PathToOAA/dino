import { ctx } from "./canvas.js";

const dinoImage = new Image();
dinoImage.src = "./Assets/dino_basic.png";

export const dino = {
  x: 10,
  y: 320,
  width: 64,
  height: 64,
  draw() {
    ctx.fillStyle = "green";
    ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height);
  },
  drawHitBox() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
};

const cactusImage = new Image();
cactusImage.src = "./Assets/cactus_1.png";

export class Cactus {
  constructor() {
    this.x = 500;
    this.y = 320;
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

const birdImage = new Image();
birdImage.src = "./Assets/bird_up.png";

export class Bird {
  constructor() {
    this.x = 500;
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

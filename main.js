import { canvas, ctx } from "./canvas.js";
import { dino, Cactus, Bird } from "./object.js";

const timer = 0; // 기본 타이머
const cactusContainer = []; // Cactus 객체를 담을 배열
const birdContainer = []; // Bird 객체를 담을 배열
const jumpTimer = 0; // 점프 타이머
let animation = null;

// 프레임마다 실행되는 함수
function update() {
  animation = requestAnimationFrame(update);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 새 생성
  if (timer % 270 === 0) {
    const bird = new Bird();
    birdContainer.push(bird);
  }
  // 새들 관리
  birdContainer.forEach((bird, i, o) => {
    if (bird.x < 0) {
      o.splice(i, 1);
    }

    bird.x--;
    bird.draw();
  });

  // 선인장 생성
  if (timer % 320 === 0) {
    const cactus = new Cactus();
    cactusContainer.push(cactus);
  }

  // 선인장들 관리
  cactusContainer.forEach((cactus, i, o) => {
    if (cactus.x < 0) {
      o.splice(i, 1);
    }

    onCollision(dino, cactus);

    cactus.x--;
    cactus.draw();
  });

  // 점프 기능
  if (점프중 == true) {
    dino.y -= 1.5;
    jumpTimer++;
  }
  if (점프중 == false) {
    if (dino.y < 320) {
      dino.y += 1.5;
    }
  }
  if (jumpTimer > 100) {
    점프중 = false;
    jumpTimer = 0;
  }

  dino.draw();
}

update();

// 충돌 확인
function onCollision(dino, cactus) {
  const x축차이 = cactus.x - (dino.x + dino.width);
  const y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

// 점프 이벤트 핸들러
const 점프중 = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    점프중 = true;
  }
});

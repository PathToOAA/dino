import { canvas, ctx } from "./canvas.js";
import { dino, Cactus, Bird } from "./object.js";

const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;

let lastTime = performance.now();
let accumulater = 0;

const cactusContainer = []; // Cactus 객체를 담을 배열
const birdContainer = []; // Bird 객체를 담을 배열
let jumpTimer = 0; // 점프 타이머
let animation = null;
let 점프중 = false;

let frameCount = 0;
// 프레임당 1번 실행되는 함수
function update() {
  // 게임 상태 갱신

  frameCount++;

  // dino

  // cactus ================================================

  // 생성
  if (frameCount % 150 === 0) {
    const cactus = new Cactus();
    cactusContainer.push(cactus);
  }

  // 소멸, 충돌 처리, 이동
  cactusContainer.forEach((cactus, i, o) => {
    if (cactus.x < 0) {
      o.splice(i, 1);
    }
    onCollision(dino, cactus);
    cactus.x -= 3;
  });

  // bird ==================================================

  // 생성
  if (frameCount % 120 === 0) {
    const bird = new Bird();
    birdContainer.push(bird);
  }

  // 소멸, 충돌 처리, 이동
  birdContainer.forEach((bird, i, o) => {
    if (bird.x < 0) {
      o.splice(i, 1);
    }
    onCollision(dino, bird);
    bird.x -= 2;
  });

  // =======================================================
}

// 프레임마다 실행되는 함수
function gameLoop(currentTime) {
  // currentTime: 내부적으로 perfarmance.now()와 동일한 타임스탬프
  animation = requestAnimationFrame(gameLoop);
  let deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  accumulater += deltaTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 프레임 타임에 맞춰 업데이트
  while (accumulater >= FRAME_TIME) {
    update();
    accumulater -= FRAME_TIME;
  }

  // 새들 그리기
  birdContainer.forEach((bird, i, o) => {
    bird.draw();
  });

  // 선인장들 그리기
  cactusContainer.forEach((cactus, i, o) => {
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

  // dino 그리기
  dino.draw();

  // hitbox 표시
  // dino.drawHitBox();
  // cactusContainer.forEach((cactus) => {
  //   cactus.drawHitBox();
  // });
  // birdContainer.forEach((bird) => {
  //   bird.drawHitBox();
  // });
}

gameLoop(lastTime);

// 충돌 확인
function onCollision(dino, enemy) {
  let x축중첩 = false;
  if (dino.x < enemy.x + enemy.width && dino.x + dino.width > enemy.x) {
    x축중첩 = true;
  }
  let y축중첩 = false;
  if (dino.y < enemy.y + enemy.height && dino.y + dino.height > enemy.y) {
    y축중첩 = true;
  }
  if (x축중첩 && y축중첩) {
    console.log("충돌 객체: ", enemy);
    cancelAnimationFrame(animation);
  }
}

// 점프 이벤트 핸들러
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    점프중 = true;
  }
});

document.addEventListener("pointerdown", function (e) {
  if (e.button === 0) {
    점프중 = true;
  }
});

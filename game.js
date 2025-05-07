import { canvas, ctx } from "./canvas.js";
import { dino, Cactus, Bird, gameState as g, restartButton } from "./model.js";
import { GROUND } from "./canvas.js";

const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;

let lastTime = performance.now();
let accumulater = 0;

const cactusContainer = []; // Cactus 객체를 담을 배열
const birdContainer = []; // Bird 객체를 담을 배열
let animation = null;

let frameCount = 0;
// 프레임당 1번 실행되는 함수
function update() {
  // 게임 상태 갱신

  frameCount++;

  // dino==================================================

  // 점프 기능
  if (dino.isJumping == true) {
    dino.y -= dino.y_velocity;
    dino.y_velocity -= 0.12;

    if (dino.y >= 320) {
      dino.y = 320;
      dino.y_velocity = 0;
      dino.isJumping = false;
    }
  }

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

// 프레임 타임보다 자주 실행되는 함수
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
  birdContainer.forEach((bird) => {
    bird.draw();
  });

  // 선인장들 그리기
  cactusContainer.forEach((cactus) => {
    cactus.draw();
  });

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

function startGame() {
  // init event handler
  document.removeEventListener("pointerdown", startOnPointerDown);
  canvas.removeEventListener("click", restartHandler);

  // init model
  g.isGameActive = true;
  dino.y = GROUND;
  dino.y_velocity = 0;
  dino.isJumping = false;
  cactusContainer.length = 0;
  birdContainer.length = 0;
  frameCount = 0;

  // call gameLoop
  gameLoop(lastTime);
}

function stopGame() {
  // stop gameLoop
  cancelAnimationFrame(animation);
  animation = null;

  // update model
  g.isGameActive = false;

  // pop up UI
  restartButton.draw();
  canvas.addEventListener("click", restartHandler);
}

// 충돌 확인 -> stopGame() 호출
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
    stopGame();
  }
}

export function initController() {
  document.addEventListener("pointerdown", startOnPointerDown);
  document.addEventListener("pointerdown", jumpOnPointerDown);
  document.addEventListener("keydown", startOnKeyDown);
  document.addEventListener("keydown", jumpOnKeyDown);
}

function startOnPointerDown(e) {
  if (e.button === 0 && !g.isGameActive) {
    startGame();
  }
}

function jumpOnPointerDown(e) {
  if (e.button === 0 && g.isGameActive && dino.isJumping == false) {
    dino.isJumping = true;
    dino.y_velocity = 6;
  }
}

function startOnKeyDown(e) {
  if (e.code === "Space" && !g.isGameActive) {
    startGame();
  }
}

function jumpOnKeyDown(e) {
  if (e.code === "Space" && g.isGameActive && dino.isJumping == false) {
    dino.isJumping = true;
    dino.y_velocity = 6;
  }
}

// restart event
function restartHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (restartButton.isInside(x, y)) {
    startGame();
  }
}

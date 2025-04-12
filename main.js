var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dinoImage = new Image();
dinoImage.src = "./Assets/dino_basic.png";

var dino = {
  x: 10,
  y: 320,
  width: 64,
  height: 64,
  draw() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height);
  },
};

var cactusImage = new Image();
cactusImage.src = "./Assets/cactus_1.png";

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 320;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height);
  }
}

var birdImage = new Image();
birdImage.src = "./Assets/bird_up.png";

class Bird {
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
}

// 화질 개선
ctx.imageSmoothingEnabled = false;

var timer = 0;
var cactus여러개 = [];
var birdList = [];
var 점프timer = 0;
var animation;

function 프레임마다실행할거() {
  animation = requestAnimationFrame(프레임마다실행할거);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 새 생성
  if (timer % 270 === 0) {
    var bird = new Bird();
    birdList.push(bird);
  }
  // 새들 관리
  birdList.forEach((bird, i, o) => {
    if (bird.x < 0) {
      o.splice(i, 1);
    }

    bird.x--;
    bird.draw();
  });

  // 선인장 생성
  if (timer % 320 === 0) {
    var cactus = new Cactus();
    cactus여러개.push(cactus);
  }

  // 선인장들 관리
  cactus여러개.forEach((cactus, i, o) => {
    if (cactus.x < 0) {
      o.splice(i, 1);
    }

    충돌하냐(dino, cactus);

    cactus.x--;
    cactus.draw();
  });

  // 점프 기능
  if (점프중 == true) {
    dino.y -= 1.5;
    점프timer++;
  }
  if (점프중 == false) {
    if (dino.y < 320) {
      dino.y += 1.5;
    }
  }
  if (점프timer > 100) {
    점프중 = false;
    점프timer = 0;
  }

  dino.draw();
}

프레임마다실행할거();

// 충돌 확인
function 충돌하냐(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

// 점프 이벤트 핸들러
var 점프중 = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    점프중 = true;
  }
});

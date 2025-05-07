export let canvas, ctx;

export function initCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // 캔버스 크기 설정
  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 100;

  // 픽셀 이미지 화질 저하 방지
  ctx.imageSmoothingEnabled = false;
}

// 게임 사이즈 설정
export const GROUND = 320;
export const WIDTH = 500;

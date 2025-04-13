export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 픽셀 이미지 화질 저하 방지
ctx.imageSmoothingEnabled = false;

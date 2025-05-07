import { initCanvas } from "./canvas.js";
import { loadAssets, dino } from "./model.js";
import { initController } from "./game.js";

document.addEventListener("DOMContentLoaded", async () => {
  initCanvas();
  initController();

  try {
    await loadAssets();
    dino.draw();
  } catch (error) {
    console.error("이미지 로드 실패", error);
  }
});

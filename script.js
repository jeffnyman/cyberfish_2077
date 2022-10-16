import { Game } from "./src/game.js";

window.addEventListener("load", () => {
  const viewport = document.getElementById("viewport");
  const context = viewport.getContext("2d");

  viewport.width = 500;
  viewport.height = 500;

  const game = new Game(viewport.width, viewport.height);

  function gameLoop() {
    context.clearRect(0, 0, viewport.width, viewport.height);

    game.update();
    game.draw(context);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});

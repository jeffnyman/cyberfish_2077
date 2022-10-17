import { Game } from "./src/game.js";

window.addEventListener("load", () => {
  const viewport = document.getElementById("viewport");
  const context = viewport.getContext("2d");

  viewport.width = 500;
  viewport.height = 500;

  const game = new Game(viewport.width, viewport.height);

  // Store the value of the timestamp from the previous
  // animation loop.
  let lastTime = 0;

  function gameLoop(timeStamp) {
    // Delta time is the difference in milliseconds between
    // the timestamp from the current loop and the timestamp
    // from the previous loop. The timeStamp actually comes
    // from the requestAnimationFrame, which passes this
    // value to the function it calls.
    const deltaTime = timeStamp - lastTime;

    // Ideally this should show 16.6 milliseconds or less.
    // 1000 milliseconds / 16.6 = 60 fps
    // What we're seeing is how long it takes the computer
    // to run one loop, which is an animation frame. And
    // then how many of those frames run per second.

    // console.log(deltaTime);

    // Assign timestamp from current loop so it can be used
    // to calculate delta time in the next loop.
    lastTime = timeStamp;

    context.clearRect(0, 0, viewport.width, viewport.height);

    game.update(deltaTime);
    game.draw(context);

    requestAnimationFrame(gameLoop);
  }

  gameLoop(0);
});

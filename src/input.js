class InputHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (event) => {
      this.handleKeyPress(event);
    });

    window.addEventListener("keyup", (event) => {
      this.handleKeyUp(event);
    });
  }

  handleKeyPress(event) {
    let key = this.game.actions.indexOf(event.key);

    if ((event.key === "ArrowUp" || event.key === "ArrowDown") && key === -1) {
      this.game.actions.push(event.key);
    } else if (event.key === " ") {
      this.game.player.firePrimary();
    }
  }

  handleKeyUp(event) {
    let key = this.game.actions.indexOf(event.key);

    if (key > -1) {
      this.game.actions.splice(key, 1);
    }
  }
}

export { InputHandler };

class Projectile {
  constructor(game, x, y) {
    this.game = game;

    // Location

    /*
    Starting coordinates of each projectile will depend on
    the player's current position. 
    */

    this.x = x;
    this.y = y;

    // Dimensions

    this.width = 10;
    this.height = 3;

    // Movement

    this.speedX = 3;

    // Conditions

    this.dissipated = false;
  }

  update() {
    this.x += this.speedX;

    // If the horizontal coordinate of the projectile is 80%
    // of the game viewport, it should disappear.

    if (this.x > this.game.width * 0.8) {
      this.dissipated = true;
    }
  }

  draw(context) {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Projectile };

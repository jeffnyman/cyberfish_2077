class Explosion {
  constructor(game, x, y) {
    this.game = game;

    // Dimensions

    this.spriteHeight = 200;

    // Animation

    this.frameX = 0;
    this.maxFrame = 8;
    this.fps = 15;
    this.timer = 0;
    this.interval = 1000 / this.fps;

    // Conditions

    this.outOfPlay = true;
  }

  update(deltaTime) {
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }

    this.frameX++;

    if (this.frameX > this.maxFrame) {
      this.outOfPlay = true;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

class SmokeExplosion extends Explosion {
  constructor(game, x, y) {
    super(game, x, y);

    // Dimensions

    this.spriteWidth = 200;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;

    // Location

    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;

    // Representation

    this.image = document.getElementById("smokeExplosion");
  }
}

export { SmokeExplosion };

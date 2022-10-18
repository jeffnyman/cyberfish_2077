import { Projectile } from "./projectile.js";

class Player {
  constructor(game) {
    this.game = game;

    // Dimensions

    this.width = 120;
    this.height = 190;

    // Location

    this.x = 20;
    this.y = 100;

    // Movement

    this.speedY = 0;
    this.maxSpeed = 3;

    // Animation

    this.frameX = 0; // cycle through sprite sheet horizontally
    this.frameY = 0; // determine row of sprite sheet to cycle through
    this.maxFrame = 37; // maximum frames to cycle through

    // Representation

    this.image = document.getElementById("player");

    // Data

    /*
    Holds all currently active projectiles. This is stored
    on the player object rather than the game object because
    the player generates projectiles as part of their
    tech-infused biology.
    */
    this.projectiles = [];

    this.ammo = 20;
    this.maxAmmo = 50;
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;

    // Mechanics

    this.ammoTimer = 0;
    this.ammoInterval = 500;
  }

  update(deltaTime) {
    if (this.game.actions.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.actions.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;

    // Handle vertical boundaries.

    if (this.y > this.game.height - this.height * 0.5) {
      this.y = this.game.height - this.height * 0.5;
    } else if (this.y < -this.height * 0.5) {
      this.y = -this.height * 0.5;
    }

    this.handleProjectiles();
    this.handleAmmo(deltaTime);

    // Sprite animation

    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    // Handle powerup.

    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.ammo += 0.1;
      }
    }
  }

  draw(context) {
    // The next two lines were the blank rectangle approach before
    // we had a sprite.
    // context.fillStyle = "black";
    // context.fillRect(this.x, this.y, this.width, this.height);

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    // Draw projectiles.

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });

    // Draw player.

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  firePrimary() {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30),
      );

      this.ammo--;
    }

    if (this.powerUp) {
      this.fireSecondary();
    }
  }

  fireSecondary() {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 175),
      );
    }
  }

  handleProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    // Creates a new projectiles array, leaving out
    // any of the ones that should have disappeared.
    // All projectiles start off with dissipated being
    // false. So the "not dissipated" would mean
    // true.

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.dissipated,
    );

    // The same thing is done for projectiles that have
    // hit an enemy. In this case, the particles are
    // indicated by collided rather than dissipated.

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.collided,
    );
  }

  handleAmmo(deltaTime) {
    // ammoTimer = when limit is reached, event is trigged
    // ammoInternal = the limit that timer needs to reach
    // The goal is to replenish ammo based on some interval.
    // This will happen if the ammo is not currently at the
    // maximum amount of ammo.

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
      }

      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
  }

  enterPowerUp() {
    // This next line allows for a situation where the player
    // collides with a lucky fish, enters powerup, and then
    // immediately collides with another lucky fish. They
    // always get the timer from the most recent fish.
    this.powerUpTimer = 0;

    this.powerUp = true;
    this.ammo = this.maxAmmo;
  }
}

export { Player };

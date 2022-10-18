import { Layer } from "./layer.js";

class Background {
  constructor(game) {
    this.game = game;

    this.image1 = document.getElementById("layer1");
    this.image2 = document.getElementById("layer2");
    this.image3 = document.getElementById("layer3");
    this.image4 = document.getElementById("layer4");

    this.layer1 = new Layer(this.game, this.image1, 0.2);
    this.layer2 = new Layer(this.game, this.image2, 0.4);
    this.layer3 = new Layer(this.game, this.image3, 1);
    this.layer4 = new Layer(this.game, this.image4, 1.5);

    // Layer4 is not being added to this group. This is so it
    // can be drawn later which will allow the player and the
    // enemies to be drawn behind that layer.
    this.layers = [this.layer1, this.layer2, this.layer3];
  }

  update() {
    this.layers.forEach((layer) => layer.update());
  }

  draw(context) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}

export { Background };

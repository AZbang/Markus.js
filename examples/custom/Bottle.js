class Bottle extends markus.elements.Sprite {
  constructor(...args) {
    super(...args);

    this.addTick((dt) => this.update(dt));
  }
  addSpeed(v) {
    this.speed += v;
  }
  update(dt) {
    this.angle += this.speed*dt;
  }
}

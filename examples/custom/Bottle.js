class Bottle extends markus.sprite {
  constructor(...args) {
    super(...args);
    this.addTick((dt) => this.update(dt));

    this.on('pointertap', () => {
      this.speed += 1;
    })
  }
  update(dt) {
    this.angle += this.speed*dt;
  }
}

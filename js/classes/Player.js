class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 100;
    this.height = 100;
    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.y += this.velocity.y;

    // Above the bottom of the canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
      this.sides.bottom = this.position.y + this.height;
    } else {
      this.velocity.y = 0;
    }
  }
}

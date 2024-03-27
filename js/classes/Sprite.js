class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;

    // Whether or not image has loaded fully
    this.image.onload = () => {
      this.loaded = true;
    };

    this.loaded = false;
  }

  draw() {
    // Don't do anything unless image loaded
    if (!this.loaded) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

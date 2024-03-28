class Sprite {
  constructor({ position, imageSrc, frameRate = 1 }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frameRate = frameRate;

    // Whether or not image has loaded fully
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };

    this.loaded = false;
  }

  draw() {
    // Don't do anything unless image loaded
    if (!this.loaded) return;

    const cropbox = {
      position: {
        x: 0,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

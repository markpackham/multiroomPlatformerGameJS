const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 100;
    this.height = 100;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();

// let playerBottom = y + playerHeight;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();

  // if (playerBottom < canvas.height) {
  //   y++;
  //   playerBottom = y + playerHeight;
  // }
}

animate();

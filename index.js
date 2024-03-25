const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let y = 100;
const playerHeight = 100;

let playerBottom = y + playerHeight;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = "red";
  c.fillRect(100, y, 100, 100);
  if (playerBottom < canvas.height) {
    y++;
    playerBottom = y + playerHeight;
  }
}

animate();

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const player = new Player();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();
  player.update();
}

animate();

// Keyboard events
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Jump
    case "w":
      // Do not let player air jump
      if (player.velocity.y === 0) {
        player.velocity.y = -10;
      }
    // Player moves Left
    case "a":
      player.velocity.x = -5;
      break;
    // Player moves Right
    case "d":
      player.velocity.x = 5;
      break;
  }
});

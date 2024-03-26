const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const player = new Player();

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.velocity.x = 0;

  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.a.pressed) {
    player.velocity.x = -5;
  }

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
      break;
    // Player moves Left
    case "a":
      keys.a.pressed = true;
      break;
    // Player moves Right
    case "d":
      keys.d.pressed = true;
      break;
  }
});

// Stop player moving when keys released
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

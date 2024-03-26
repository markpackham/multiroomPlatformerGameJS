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

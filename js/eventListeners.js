// Keyboard events
window.addEventListener("keydown", (event) => {
  // Do not do anything if player busy with task like moving through door
  if (player.preventInput) return;

  switch (event.key) {
    // Jump
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }

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

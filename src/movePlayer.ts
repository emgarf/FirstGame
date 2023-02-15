export const movePlayer = (arrow, player) => {
  if (arrow?.left.isDown) {
      player?.body.setVelocityX(-200);
  } else if (arrow?.right.isDown) {
      player?.body.setVelocityX(200);
  } else {
      player?.body.setVelocityX(0);
  }

  if (arrow?.up.isDown && player?.body.onFloor()) {
    player.body.setVelocityY(-200);
  }
}
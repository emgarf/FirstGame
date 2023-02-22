export const movePlayer = (arrow, player) => {
  if (arrow.left.isDown) {
    player.body.setVelocityX(-300);
    player.body.setVelocityY(0);
  } else if (arrow.right.isDown) {
    player.body.setVelocityX(300);
    player.body.setVelocityY(0);
  } else if (arrow.up.isDown) {
    player.body.setVelocityY(-300);
    player.body.setVelocityX(0);
  } else if (arrow.down.isDown) {
    player.body.setVelocityY(300);
    player.body.setVelocityX(0);
  } else {
      player.body.setVelocityX(0);
      player.body.setVelocityY(0);
  }
}
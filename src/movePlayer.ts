export const movePlayer = (arrow, player) => {
  const velocity = 350;
  player?.body?.setMaxSpeed(velocity);

  if (arrow.left.isDown) {
    player.body?.setVelocityX(-velocity);
  } else if (arrow.right.isDown) {
    player.body?.setVelocityX(velocity);
  } else {
    player.body?.setVelocityX(0);
  }
  
  if (arrow.up.isDown) {
    player.body?.setVelocityY(-velocity);
  } else if (arrow.down.isDown) {
    player.body?.setVelocityY(velocity);
  } else {
    player.body?.setVelocityY(0);
  }
}
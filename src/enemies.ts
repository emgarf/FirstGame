export const addTopSingleEnemy = (enemies: Phaser.Physics.Arcade.Group, score: number, time: Phaser.Time.Clock) => {
  const enemy = enemies.create(Phaser.Math.Between(130, 370), -10, 'enemy');
  enemy.body.velocity.y = 200 + score;

  time.addEvent({
    delay: 5000,
    callback: () => enemy.destroy(),
  })
}

export const addRightSingleEnemy = (enemies: Phaser.Physics.Arcade.Group, time: Phaser.Time.Clock) => {
  const enemy = enemies.create(510, Phaser.Math.Between(130, 370), 'enemy');
  enemy.body.velocity.x = -200;

  time.addEvent({
    delay: 5000,
    callback: () => enemy.destroy(),
  })
}

export const addTopRowEnemies = (enemies: Phaser.Physics.Arcade.Group, score: number, time: Phaser.Time.Clock) => {
  const noEnemy1 = Phaser.Math.Between(0, 5);
  let noEnemy2 = 10;
  if (score < 100) {
    if (noEnemy1 === 5) {
      noEnemy2 = 4;
    } else {
      noEnemy2 = noEnemy1 + 1;
    }
  }

  for (let i = 0; i < 6; i++) {
    if (noEnemy1 === i || noEnemy2 === i) {
      continue;
    }
    const enemy = enemies.create(i * 48 + 130, -10, 'enemy');
    enemy.body.velocity.y = Math.min(200 + score, 250);

    time.addEvent({
      delay: 5000,
      callback: () => enemy.destroy(),
    })
  }
}

export default class MenuScene extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}

  upKey!: Phaser.Input.Keyboard.Key;

  create(data) {
    const particles = this.add.particles('pixel');

    particles.createEmitter({
			quantity: 1,
      alpha: {start: 0.5, end: 0},
			speedY: {min: 50, max: 200},
			scale: {start: 1, end: 0.5},
			lifespan: 6000,
      y: 0,
      x: {min: -400, max: 900},
			on: true,
		});

    // Game Name
    const score = data.score ? data.score : 0;
    const nameLabel = this.add.text(250, -50, 'Super Dodge', {font: '50px Arial', color: '#fff'});
    nameLabel.setOrigin(0.5, 0.5);
    this.tweens.add({targets: nameLabel, duration: 1000, y: 150, ease: 'Bounce.easeOut'});

    // Score
    const scoreText = 'score: ' + score;
    const scoreLabel = this.add.text(250, 250, scoreText, {font: '25px Arial', color: '#fff'});
    scoreLabel.setScale(0);
    scoreLabel.setOrigin(0.5, 0.5);
    this.tweens.add({targets: scoreLabel, duration: 1000, scale: 1, ease: 'Bounce.easeOut'});

    // Start text
    const startText = 'press the spacebar key to start';
    const startLabel = this.add.text(250, 350, startText, {font: '25px Arial', color: '#fff'});
    startLabel.setOrigin(0.5, 0.5);
    this.tweens.add({targets: startLabel, duration: 1000, scale: 1.05, yoyo: true, repeat: -1});

    this.upKey = this.input.keyboard.addKey('space');
  }

  update() {
    if (this.upKey.isDown) {
      this.scene.start('PlayScene');
    }
  }
}
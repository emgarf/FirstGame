export default class MenuScene extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}

  upKey;

  create(data) {
    const score = data.score ? data.score : 0;
    const nameLabel = this.add.text(250, 150, 'Super Dodge', {font: '50px Arial', color: '#fff'});
    nameLabel.setOrigin(0.5, 0.5);

    const scoreText = 'score: ' + score;
    const scoreLabel = this.add.text(250, 250, scoreText, {font: '25px Arial', color: '#fff'});
    scoreLabel.setOrigin(0.5, 0.5);

    const startText = 'press the spacebar key to start';
    const startLabel = this.add.text(250, 350, startText, {font: '25px Arial', color: '#fff'});
    startLabel.setOrigin(0.5, 0.5);

    this.upKey = this.input.keyboard.addKey('space');
  }

  update() {
    if (this.upKey.isDown) {
      this.scene.start('PlayScene');
    }
  }
}
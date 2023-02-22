export default class LoadScene extends Phaser.Scene {
  constructor() {
		super('LoadScene');
	}

  preload() {
    this.load.image('player', 'assets/player.png');
		this.load.image('wallH', 'assets/wallHorizontal.png');
		this.load.image('wallV', 'assets/wallVertical.png');
		this.load.audio('pooboy', ['assets/pooboy.ogg', 'assets/pooboy.mp3']);
		this.load.image('enemy', 'assets/enemy.png');

    let loadLabel = this.add.text(250, 250, 'loading', {font: '30px Arial', color: '#fff'});
    loadLabel.setOrigin(0.5, 0.5);
  }

  create() {
    this.scene.start('MenuScene')
  }
}
export default class LoadScene extends Phaser.Scene {
  constructor() {
		super('LoadScene');
	}

  preload() {
    this.load.image('player', 'images/player.png');
		this.load.image('wallH', 'images/wallHorizontal.png');
		this.load.image('wallV', 'images/wallVertical.png');
		this.load.audio('pooboy', ['musics/pooboy.ogg', 'musics/pooboy.mp3']);
		this.load.image('enemy', 'images/enemy.png');

    let loadLabel = this.add.text(250, 250, 'loading', {font: '30px Arial', color: '#fff'});
    loadLabel.setOrigin(0.5, 0.5);
  }

  create() {
    this.scene.start('MenuScene')
  }
}
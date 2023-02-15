import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world');
	}

	arrow: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
	player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;

	preload() {
		this.load.image('background', 'assets/background.png');
		this.load.image('player', 'assets/player.png')
	}

	create() {
		this.add.image(250, 170, 'background');
		this.player = this.physics.add.image(400, 100, 'player');
		this.arrow = this.input.keyboard.createCursorKeys();

		this.player.setCollideWorldBounds(true);
	}

	update() {
		this.movePlayer();
	}

	movePlayer() {
		if (this.arrow?.left.isDown) {
        this.player?.body.setVelocityX(-200);
    } else if (this.arrow?.right.isDown) {
        this.player?.body.setVelocityX(200);
    } else {
        this.player?.body.setVelocityX(0);
    }

		if (this.arrow?.up.isDown && this.player?.body.onFloor()) {
			this.player.body.setVelocityY(-320);
		}
	}
}

import Phaser from 'phaser';
import {movePlayer} from './movePlayer';

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world');
	}

	arrow!: Phaser.Types.Input.Keyboard.CursorKeys;
	player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	walls!: Phaser.Physics.Arcade.StaticGroup;

	preload() {
		this.load.image('background', 'assets/background.png');
		this.load.image('player', 'assets/player.png')
		this.load.image('wallH', 'assets/wallHorizontal.png')
	}

	create() {
		this.add.image(250, 170, 'background');
		this.player = this.physics.add.image(100, 100, 'player');
		this.arrow = this.input.keyboard.createCursorKeys();
		// this.player.setCollideWorldBounds(true);
		this.createWorld();
	}

	update() {
		this.physics.collide(this.player, this.walls);
		movePlayer(this.arrow, this.player);

		if (this.player.y > 340) {
			this.playerDie();
		}
	}

	createWorld() {
		this.walls = this.physics.add.staticGroup();
		this.walls.create(50, 300, 'wallH');
		this.walls.create(450, 300, 'wallH');
	}

	playerDie() {
		this.scene.start(this);
	}
}

import {movePlayer} from './movePlayer';

export default class PlayScene extends Phaser.Scene {
	constructor() {
		super('PlayScene');
	}

	arrow!: Phaser.Types.Input.Keyboard.CursorKeys;
	player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	walls!: Phaser.Physics.Arcade.StaticGroup;
	enemies;
	bgSound;
	scoreLabel;

	create() {
		this.player = this.physics.add.image(150, 150, 'player');
		this.arrow = this.input.keyboard.createCursorKeys();
		this.scoreLabel = this.add.text(30, 25, 'score: 0', {fontFamily: 'Arial', fontSize: '22px', color: '#fff'});
		this.enemies = this.physics.add.group();
		this.time.addEvent({
			delay: Phaser.Math.Between(900, 1200),
			callback: () => this.addTopRowEnemies(),
			loop: true,
		})

		this.time.addEvent({
			delay: Phaser.Math.Between(900, 1200),
			// callback: () => this.addRightEnemy(),
			loop: true,
		})
		this.bgSound = this.sound.add('pooboy', {volume: 0.3});
		this.bgSound.loop = true;
		this.bgSound.play();
		this.createWorld();
	}

	update() {
		this.physics.collide(this.player, this.walls);
		movePlayer(this.arrow, this.player);

		if (this.physics.overlap(this.player, this.enemies)) {
			this.bgSound.destroy();
			this.playerDie();
		}
	}

	addTopRowEnemies() {
		const rand = Phaser.Math.Between(0, 5);
		for (var i = 0; i < 6; i++) {
			if (rand === i) {
				continue;
			}
			const enemy = this.enemies.create(i * 50 + 130, -10, 'enemy');
			enemy.body.velocity.y = 200;

			this.time.addEvent({
				delay: 10000,
				callback: () => enemy.destroy(),
			})
		}
	}

	addRightEnemy() {
		const enemy = this.enemies.create(510, Phaser.Math.Between(135, 365), 'enemy');

		enemy.body.velocity.x = -300;

		this.time.addEvent({
			delay: 10000,
			callback: () => enemy.destroy(),
		})
	}

	createWorld() {
		this.walls = this.physics.add.staticGroup();
		this.walls.create(250, 380, 'wallH');
		this.walls.create(250, 100, 'wallH');
		this.walls.create(100, 240, 'wallV');
		this.walls.create(400, 240, 'wallV');
	}

	playerDie() {
		this.scene.start('MenuScene');
	}
}

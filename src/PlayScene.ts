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
	score: number = 0;

	create() {
		this.player = this.physics.add.image(150, 150, 'player');
		this.arrow = this.input.keyboard.createCursorKeys();
		this.scoreLabel = this.add.text(30, 25, 'score: 0', {fontFamily: 'Arial', fontSize: '22px', color: '#fff'});
		this.enemies = this.physics.add.group();

		this.time.addEvent({
			delay: Phaser.Math.Between(900, 1200),
			callback: () => this.handleEnemies(),
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

	handleEnemies() {
		if (this.score <= 50) {
			this.addTopSingleEnemy();
		} else {
			this.addTopRowEnemies();
			if (this.score > 110) {
				this.addRightSingleEnemy()
			}
		}
	}

	addTopSingleEnemy() {
		const enemy = this.enemies.create(Phaser.Math.Between(130, 370), -10, 'enemy');
		enemy.body.velocity.y = 200 + this.score;

		this.time.addEvent({
			delay: 5000,
			callback: () => enemy.destroy(),
		})

		this.incrementScore();
	}

	addRightSingleEnemy() {
		const enemy = this.enemies.create(510, Phaser.Math.Between(130, 370), 'enemy');
		enemy.body.velocity.x = -200;

		this.time.addEvent({
			delay: 5000,
			callback: () => enemy.destroy(),
		})

		this.incrementScore();
	}

	addTopRowEnemies() {
		const rand = Phaser.Math.Between(0, 5);
		for (let i = 0; i < 6; i++) {
			if (rand === i) {
				continue;
			}
			const enemy = this.enemies.create(i * 48 + 130, -10, 'enemy');
			enemy.body.velocity.y = 200;

			this.time.addEvent({
				delay: 5000,
				callback: () => enemy.destroy(),
			})
		}

		this.incrementScore();
	}

	incrementScore() {
		this.score += 5;
		this.scoreLabel.setText('score : ' + this.score);
	}

	createWorld() {
		this.walls = this.physics.add.staticGroup();
		this.walls.create(250, 390, 'wallH');
		this.walls.create(250, 90, 'wallH');
		this.walls.create(100, 240, 'wallV');
		this.walls.create(400, 240, 'wallV');
	}

	playerDie() {
		this.scene.start('MenuScene', {score: this.score});
	}
}

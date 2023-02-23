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
	deathSound;
	scoreLabel;
	score!: number;
	emitter;
	nextEnemy!: number;

	create() {
		const particles = this.add.particles('pixelPlayer');
		this.score = 0;
		this.player = this.physics.add.image(150, 150, 'player');
		this.arrow = this.input.keyboard.createCursorKeys();
		this.scoreLabel = this.add.text(30, 25, 'score: 0', {fontFamily: 'Arial', fontSize: '22px', color: '#fff'});
		this.enemies = this.physics.add.group();
		this.emitter = particles.createEmitter({
			quantity: 20,
			speed: {min: -150, max: 150},
			scale: {start: 8, end: 1},
			lifespan: 600,
			on: false,
		})

		this.bgSound = this.sound.add('pooboy', {volume: 0.3});
		this.deathSound = this.sound.add('death', {volume: 0.7});
		this.bgSound.loop = true;
		this.bgSound.play();
		this.createWorld();

		this.nextEnemy = 0;
	}

	update() {
		const now = Date.now();

		if (this.nextEnemy < now) {
			this.handleEnemies();
			this.nextEnemy = now + Phaser.Math.Between(1000, 1400);
		}

		this.physics.collide(this.player, this.walls);
		movePlayer(this.arrow, this.player);

		if (this.physics.overlap(this.player, this.enemies)) {
			this.playerDie();
		}
	}

	handleEnemies() {
		if (this.score <= 40) {
			this.addTopSingleEnemy();
		} else {
			this.addTopRowEnemies(this.score);
			if (this.score > 160) {
				this.addRightSingleEnemy()
			}
		}
	}

	addPyramidEnemies() {

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

	addTopRowEnemies(currentScore: number) {
		const noEnemy1 = Phaser.Math.Between(0, 5);
		let noEnemy2 = 10;
		if (currentScore < 150) {
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
		this.scoreLabel.setText('score: ' + this.score);
	}

	createWorld() {
		this.walls = this.physics.add.staticGroup();
		this.walls.create(250, 390, 'wallH');
		this.walls.create(250, 90, 'wallH');
		this.walls.create(100, 240, 'wallV');
		this.walls.create(400, 240, 'wallV');
	}

	playerDie() {
		this.deathSound.play();
		this.player.destroy();
		this.cameras.main.shake(300, 0.02);
		this.emitter.setPosition(this.player.x, this.player.y);
		this.emitter.explode();

		this.time.addEvent({
			delay: 600,
			callback: () => {this.bgSound.destroy(); this.scene.start('MenuScene', {score: this.score})}
		})
	}
}

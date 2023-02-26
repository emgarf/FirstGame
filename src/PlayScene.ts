import {movePlayer} from './movePlayer';
import {addRightSingleEnemy, addTopRowEnemies, addTopSingleEnemy} from './enemies';
export default class PlayScene extends Phaser.Scene {
	constructor() {
		super('PlayScene');
	}

	arrow: Phaser.Types.Input.Keyboard.CursorKeys;
	deathSound: Phaser.Sound.BaseSound;
	player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	walls: Phaser.Physics.Arcade.StaticGroup;
	scoreLabel: Phaser.GameObjects.Text;
	score: number;
	enemies: Phaser.Physics.Arcade.Group;
	nextEnemy: number;
	prevEnemy: number;
	isAscending: boolean;
	bgSound;
	emitter;

	create() {
		const particles = this.add.particles('pixelPlayer');
		this.score = 0;
		this.player = this.physics.add.image(250, 250, 'player');
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

		this.isAscending = false;
		this.nextEnemy = 0;
		this.prevEnemy = 4;
	}

	update() {
		const now = Date.now();

		if (this.nextEnemy < now) {
			this.handleEnemies();
			if (this.score < 200) {
				this.nextEnemy = this.nextEnemyTimer(now, 1000, 250, 130);
			} else if (this.score < 300) {
				this.nextEnemy = this.nextEnemyTimer(now, 1200, 1000, 250);
			} else {
				this.nextEnemy = now + 300;
			}
			this.incrementScore();
		}

		this.physics.collide(this.player, this.walls);
		movePlayer(this.arrow, this.player);

		if (this.physics.overlap(this.player, this.enemies)) {
			this.playerDie();
		}
	}

	incrementScore() {
		this.score += 5;
		this.scoreLabel.setText('score: ' + this.score);
	}

	handleEnemies() {
		if (this.score <= 200) {
			addTopSingleEnemy(this.enemies, this.score, this.time);
		} else {
			if (this.score < 300) {
				addTopRowEnemies(this.enemies, this.score, this.time);
			} else {
				this.handlePyramidEnemies();
				if (this.score > 550) {
					addRightSingleEnemy(this.enemies, this.time);
				}
			}
		}
	}
	
	handlePyramidEnemies() {
		if (this.prevEnemy === 0) {
			this.isAscending = true;
		}
		if (this.prevEnemy === 4) {
			this.isAscending = false;
		}
		this.pyramidEnemies();
	}

	pyramidEnemies() {
		for (let i = 0; i < 6; i++) {
			if (this.prevEnemy === i || this.prevEnemy + 1 === i) {
				continue;
			}
			const enemy = this.enemies.create(i * 48 + 130, -10, 'enemy');
			enemy.body.velocity.y = 200;
		}
		if (this.isAscending === false) {
			this.prevEnemy -= 1;
		}
		if (this.isAscending === true) {
			this.prevEnemy += 1;
		}
	}

	nextEnemyTimer(now, startDifficulty, endDifficulty, scoreToReachEnd) {
		if (this.nextEnemy < now) {
			const progress = Math.min(this.score / scoreToReachEnd, 1);
			const delay = startDifficulty - (startDifficulty - endDifficulty) * progress;
			return now + delay;
		}
	}

	createWorld() {
		this.walls = this.physics.add.staticGroup();
		this.walls.create(250, 400, 'wallH');
		this.walls.create(250, 100, 'wallH');
		this.walls.create(100, 250, 'wallV');
		this.walls.create(400, 250, 'wallV');
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

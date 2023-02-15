import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 500,
	height: 340,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 },
		},
	},
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)

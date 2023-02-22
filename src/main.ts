import Phaser from 'phaser'

import LoadScene from './LoadScene';
import MenuScene from './MenuScene';
import PlayScene from './PlayScene';

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 500,
	height: 500,
	backgroundColor: '#2c3e50',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [LoadScene, MenuScene, PlayScene],
}

export default new Phaser.Game(config)

import BootScene from './BootScene.js';
import BattleScene from './BattleScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'game-container',
    scene: [BootScene, BattleScene]
};

const game = new Phaser.Game(config);

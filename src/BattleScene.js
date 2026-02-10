class BattleScene extends Phaser.Scene {
    constructor() {
        super('BattleScene');
        this.userInput = "";
        this.currentAnswer = 0;
        this.wrongAnswers = 0;
    }

    create() {
        // 1. Background & Karakter
        this.add.image(400, 300, 'bg_hutan');
        this.player = this.add.sprite(150, 450, 'hero_attack');
        this.pocong = this.add.sprite(650, 450, 'pocong');

        // 2. Partikel Efek Tebasan
        this.emitter = this.add.particles(0, 0, 'flare', {
            speed: 200, scale: { start: 0.6, end: 0 },
            blendMode: 'ADD', lifespan: 500, emitting: false
        });

        // 3. Jumpscare Overlay
        this.ghostOverlay = this.add.image(400, 300, 'jumpscare_img').setAlpha(0).setDepth(100);

        // 4. UI Matematika (Text-based)
        this.soalText = this.add.text(400, 100, '', { font: '48px Arial', fill: '#ffffff', backgroundColor: '#4ECDC4', padding: 10 }).setOrigin(0.5);
        this.inputText = this.add.text(400, 180, '', { font: '64px Arial', fill: '#2F3E46', backgroundColor: '#ffffff', padding: 10, minWidth: 200 }).setOrigin(0.5);

        // 5. Buat Numpad (Tombol Angka)
        this.createNumpad();
        this.generateSoal();
    }

    generateSoal() {
        let a = Phaser.Math.Between(1, 10);
        let b = Phaser.Math.Between(1, 10);
        this.currentAnswer = a + b;
        this.soalText.setText(`${a} + ${b} = ?`);
        this.userInput = "";
        this.inputText.setText("");
    }

    createNumpad() {
        const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'HAPUS', '0', 'ENTER'];
        let xStart = 280, yStart = 300;
        
        buttons.forEach((label, index) => {
            let x = xStart + (index % 3) * 120;
            let y = yStart + Math.floor(index / 3) * 70;

            let btn = this.add.text(x, y, label, {
                font: '24px Arial', fill: '#000', backgroundColor: '#fff',
                padding: { x: 20, y: 10 }, align: 'center', fixedWidth: 100
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.handleInput(label));
            
            // Efek hover sederhana
            btn.on('pointerover', () => btn.setBackgroundColor('#FFE66D'));
            btn.on('pointerout', () => btn.setBackgroundColor('#ffffff'));
        });
    }

    handleInput(val) {
        if (val === 'HAPUS') {
            this.userInput = this.userInput.slice(0, -1);
        } else if (val === 'ENTER') {
            this.checkAnswer();
        } else {
            if (this.userInput.length < 5) this.userInput += val;
        }
        this.inputText.setText(this.userInput);
    }

    checkAnswer() {
        if (parseInt(this.userInput) === this.currentAnswer) {
            this.attackEnemy();
        } else {
            this.triggerWrongEffect();
        }
    }

    attackEnemy() {
        // Animasi Dash & Tebasan
        this.tweens.add({
            targets: this.player,
            x: 600, duration: 200, yoyo: true,
            onStart: () => {
                this.emitter.setPosition(this.player.x, this.player.y);
                this.emitter.start();
            },
            onComplete: () => {
                this.emitter.stop();
                this.cameras.main.shake(200, 0.02);
                this.pocong.setTint(0xff0000);
                this.time.delayedCall(200, () => {
                    this.pocong.clearTint();
                    this.generateSoal();
                });
            }
        });
    }

    triggerWrongEffect() {
        this.wrongAnswers++;
        if (this.wrongAnswers >= 3) {
            this.triggerJumpscare();
            this.wrongAnswers = 0;
        } else {
            this.cameras.main.flash(300, 255, 0, 0);
        }
        this.userInput = "";
        this.inputText.setText("");
    }

    triggerJumpscare() {
        this.ghostOverlay.setAlpha(1);
        this.cameras.main.shake(500, 0.05);
        this.time.delayedCall(800, () => this.ghostOverlay.setAlpha(0));
    }
}
export default BattleScene;
